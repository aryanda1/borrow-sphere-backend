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
exports.handleJoinCommunity = exports.handleFetchCommunities = exports.handleCommunityCreation = void 0;
const Community_1 = __importDefault(require("../models/Community"));
const User_1 = __importDefault(require("../models/User"));
const handleCommunityCreation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, name, description, latitude, longitude } = req.body;
    const { username } = req.body;
    if (!id || !name || !description || !latitude || !longitude) {
        return res.status(400).json("All fields are required.");
    }
    if (username !== "admin") {
        return res.status(401).json("Unauthorized.");
    }
    try {
        const community = yield Community_1.default.findOne({ communityId: id }).exec();
        if (community) {
            return res.status(400).json("ID is already in use.");
        }
        const newCommunity = new Community_1.default({
            communityId: id,
            communityName: name,
            communityDescription: description,
            communityLatitude: latitude,
            communityLongitude: longitude,
        });
        yield newCommunity.save();
        res.status(201).json("Community created successfully.");
    }
    catch (err) {
        res.status(500).json(err);
    }
});
exports.handleCommunityCreation = handleCommunityCreation;
const handleFetchCommunities = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const communities = yield Community_1.default.find().exec();
        res.status(200).json({
            message: "Communities fetched successfully.",
            communities: communities,
        });
    }
    catch (err) {
        res.status(500).json(err);
    }
});
exports.handleFetchCommunities = handleFetchCommunities;
const handleJoinCommunity = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { communityId } = req.body;
    const { username } = req.body;
    if (!communityId) {
        return res.status(400).json("Community ID is required.");
    }
    try {
        const user = yield User_1.default.findOne({ username: username }).exec();
        if (!user) {
            return res.status(400).json("User could not be found.");
        }
        const community = yield Community_1.default.findOne({
            communityId: communityId,
        }).exec();
        if (!community) {
            return res.status(400).json("Community could not be found.");
        }
        yield user.updateOne({ community: communityId }).exec();
        const updatedUser = yield User_1.default.findOne({ username: username }).exec();
        res.status(200).json({
            message: "User joined community successfully.",
            updatedUser: updatedUser,
        });
    }
    catch (err) {
        res.status(500).json(err);
    }
});
exports.handleJoinCommunity = handleJoinCommunity;
//# sourceMappingURL=communityController.js.map