"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleLogout = exports.handleLogin = exports.handleRegistration = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const User_1 = __importDefault(require("../models/User"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require("dotenv/config");
const handleRegistration = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { registerEmail, registerUsername, registerPassword, registerFirstName, registerLastName, registerPhoneNumber, } = req.body;
    if (!registerEmail ||
        !registerUsername ||
        !registerPassword ||
        !registerFirstName ||
        !registerLastName ||
        !registerPhoneNumber) {
        return res.status(400).json("Missing basic information");
    }
    let duplicate = yield User_1.default.findOne({ username: registerUsername }).exec();
    if (duplicate) {
        return res.status(409).json("Username already exists");
    }
    duplicate = yield User_1.default.findOne({ email: registerEmail }).exec();
    if (duplicate) {
        return res.status(409).json("Email already exists");
    }
    try {
        const hashedPassword = yield bcrypt_1.default.hash(registerPassword, 10);
        const accessToken = jsonwebtoken_1.default.sign({ username: registerUsername }, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: "1d",
        });
        const refreshToken = jsonwebtoken_1.default.sign({ username: registerUsername }, process.env.REFRESH_TOKEN_SECRET, {
            expiresIn: "30d",
        });
        const newUser = new User_1.default({
            email: registerEmail,
            username: registerUsername,
            password: hashedPassword,
            firstName: registerFirstName,
            lastName: registerLastName,
            phoneNumber: registerPhoneNumber,
            refreshToken: refreshToken,
            community: "",
        });
        yield newUser.save();
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            sameSite: "none",
            secure: true,
        });
        return res.status(201).json({
            message: "Registration successful for " + registerUsername + "!",
            user: {
                accessToken: accessToken,
                username: registerUsername,
                firstName: registerFirstName,
                lastName: registerLastName,
                phoneNumber: registerPhoneNumber,
                email: registerEmail,
                community: "",
            },
        });
    }
    catch (err) {
        return res.status(500).json(err);
    }
});
exports.handleRegistration = handleRegistration;
const handleLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { loginEmail, loginPassword } = req.body;
    if (!loginEmail || !loginPassword) {
        return res.status(400).json("Email and password are required");
    }
    const userExists = yield User_1.default.findOne({ email: loginEmail }).exec();
    if (!userExists) {
        return res.status(404).json("User not found");
    }
    const passwordMatch = yield bcrypt_1.default.compare(loginPassword, userExists.password);
    if (!passwordMatch) {
        return res.status(401).json("Incorrect password");
    }
    const accessToken = jsonwebtoken_1.default.sign({ username: userExists.username }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "1d",
    });
    const refreshToken = jsonwebtoken_1.default.sign({ username: userExists.username }, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: "30d",
    });
    try {
        yield User_1.default.updateOne({ email: loginEmail }, { refreshToken: refreshToken }).exec();
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            sameSite: "none",
            secure: true,
        });
        return res.status(200).json({
            message: "Sign in successful",
            user: {
                accessToken: accessToken,
                username: userExists.username,
                firstName: userExists.firstName,
                lastName: userExists.lastName,
                phoneNumber: userExists.phoneNumber,
                email: userExists.email,
                community: userExists.community,
            },
        });
    }
    catch (err) {
        return res.status(500).json(err);
    }
});
exports.handleLogin = handleLogin;
const handleLogout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const refreshToken = req.cookies ? req.cookies.refreshToken : null;
    if (!refreshToken) {
        return res.sendStatus(204);
    }
    res.clearCookie("refreshToken", {
        httpOnly: true,
        sameSite: "none",
        secure: true,
    });
    try {
        User_1.default.findOne({ refreshToken: refreshToken }).exec((err, user) => {
            if (err) {
                return res.status(500).json(err);
            }
            if (!user) {
                return res.status(204);
            }
            user
                .updateOne({ refreshToken: "" })
                .exec()
                .then(() => {
                return res.sendStatus(204);
            });
        });
    }
    catch (err) {
        return res.status(500).json(err);
    }
});
exports.handleLogout = handleLogout;
//# sourceMappingURL=authController.js.map