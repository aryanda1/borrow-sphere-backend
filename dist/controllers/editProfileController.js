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
exports.editProfile = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const User_1 = __importDefault(require("../models/User"));
const editProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { editProperty, editValue } = req.body;
    const { username } = req.body;
    if (!editProperty || !editValue) {
        return res.status(400).json({ message: "All fields are required" });
    }
    try {
        const user = yield User_1.default.findOne({ username: username }).exec();
        if (!user) {
            return res
                .status(400)
                .json("User not found. Your token seems to be invalid");
        }
        switch (editProperty) {
            case "email":
                console.log(editValue);
                return editEmail(user, editValue, res);
            case "password":
                return editPassword(user, editValue, res);
            case "firstName":
                return editFirstName(user, editValue, res);
            case "lastName":
                return editLastName(user, editValue, res);
            case "phoneNumber":
                return editPhoneNumber(user, editValue, res);
            default:
                return res.status(400).json({ message: "Invalid edit property" });
        }
    }
    catch (err) {
        return res.status(500).json(err);
    }
});
exports.editProfile = editProfile;
const editEmail = (user, newEmail, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield user.updateOne({ email: newEmail }).exec();
        return res.status(200).json({
            message: "Email updated successfully",
            user: {
                username: user.username,
                firstName: user.firstName,
                lastName: user.lastName,
                phoneNumber: user.phoneNumber,
                email: newEmail,
                community: user.community,
            },
        });
    }
    catch (err) {
        return res.status(400).json(err);
    }
});
const editPassword = (user, newPassword, res) => __awaiter(void 0, void 0, void 0, function* () {
    const salt = yield bcrypt_1.default.genSalt(10);
    const hashedPassword = yield bcrypt_1.default.hash(newPassword, salt);
    try {
        yield user.updateOne({ password: hashedPassword }).exec();
        return res.status(200).json({
            message: "Password updated successfully",
            user: {
                username: user.username,
                firstName: user.firstName,
                lastName: user.lastName,
                phoneNumber: user.phoneNumber,
                email: user.email,
                community: user.community,
            },
        });
    }
    catch (err) {
        return res.status(400).json(err);
    }
});
const editFirstName = (user, newFirstName, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield user.updateOne({ firstName: newFirstName }).exec();
        return res.status(200).json({
            message: "First name updated successfully",
            user: {
                username: user.username,
                firstName: newFirstName,
                lastName: user.lastName,
                phoneNumber: user.phoneNumber,
                email: user.email,
                community: user.community,
            },
        });
    }
    catch (err) {
        return res.status(400).json(err);
    }
});
const editLastName = (user, newLastName, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield user.updateOne({ lastName: newLastName }).exec();
        return res.status(200).json({
            message: "Last name updated successfully",
            user: {
                username: user.username,
                firstName: user.firstName,
                lastName: newLastName,
                phoneNumber: user.phoneNumber,
                email: user.email,
                community: user.community,
            },
        });
    }
    catch (err) {
        return res.status(400).json(err);
    }
});
const editPhoneNumber = (user, newPhoneNumber, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield user.updateOne({ phoneNumber: newPhoneNumber }).exec();
        return res.status(200).json({
            message: "Phone number updated successfully",
            user: {
                username: user.username,
                firstName: user.firstName,
                lastName: user.lastName,
                phoneNumber: newPhoneNumber,
                email: user.email,
                community: user.community,
            },
        });
    }
    catch (err) {
        return res.status(400).json(err);
    }
});
//# sourceMappingURL=editProfileController.js.map