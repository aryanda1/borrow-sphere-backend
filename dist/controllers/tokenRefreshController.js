"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleTokenRefresh = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importDefault(require("../models/User"));
require("dotenv/config");
const handleTokenRefresh = (req, res) => {
    const refreshToken = req.cookies ? req.cookies.refreshToken : null;
    if (!refreshToken) {
        return res.status(401).json("No refresh token received.");
    }
    try {
        User_1.default.findOne({ refreshToken: refreshToken }).exec((err, user) => {
            if (err) {
                return res.status(500).json(err);
            }
            if (!user) {
                return res.status(403).json("No matching user found.");
            }
            jsonwebtoken_1.default.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
                if (err || decoded.username != user.username)
                    return res.status(403).json("Invalid refresh token.");
            });
            const accessToken = jsonwebtoken_1.default.sign({ username: user.username }, process.env.ACCESS_TOKEN_SECRET, {
                expiresIn: "1d",
            });
            return res.status(200).json({
                message: "Token refreshed",
                user: {
                    accessToken: accessToken,
                    username: user.username,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    phoneNumber: user.phoneNumber,
                    email: user.email,
                    community: user.community,
                },
            });
        });
    }
    catch (err) {
        return res.status(500).json(err);
    }
};
exports.handleTokenRefresh = handleTokenRefresh;
//# sourceMappingURL=tokenRefreshController.js.map