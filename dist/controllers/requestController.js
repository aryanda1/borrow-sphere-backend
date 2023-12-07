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
exports.handleFetchRequestDetails = exports.handleFetchRequests = exports.handleRequestCreation = void 0;
const CommunityRequest_1 = __importDefault(require("../models/CommunityRequest"));
const User_1 = __importDefault(require("../models/User"));
const handleRequestCreation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, requestDescription, location, requestLatitude, requestLongitude, community, } = req.body;
    console.log(req.body);
    const newRequest = new CommunityRequest_1.default({
        creatorUsername: username,
        acceptorUsername: null,
        requestDescription,
        location,
        requestLatitude,
        requestLongitude,
        community,
        cancelled: false,
        completed: false,
    });
    try {
        yield newRequest.save();
        return res.status(201).json("Request created successfully");
    }
    catch (err) {
        return res.status(500).json(err);
    }
});
exports.handleRequestCreation = handleRequestCreation;
const handleFetchRequests = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username } = req.body;
    if (!username) {
        return res.status(400).json("Invalid request");
    }
    try {
        const user = yield User_1.default.findOne({ username: username }).exec();
        if (!user) {
            return res.status(400).json("Invalid request");
        }
        const community = user.community;
        const requests = yield CommunityRequest_1.default.find({
            community: community,
        })
            .sort({ createdAt: -1 })
            .exec();
        return res.status(200).json(requests);
    }
    catch (err) {
        return res.status(500).json(err);
    }
});
exports.handleFetchRequests = handleFetchRequests;
const handleFetchRequestDetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { requestId } = req.query;
    const { username } = req.body;
    if (!requestId) {
        return res.status(400).json("requestId not found");
    }
    if (!username) {
        return res.status(400).json("username not found");
    }
    try {
        const communityRequest = yield CommunityRequest_1.default.findById(requestId).exec();
        if (!communityRequest) {
            return res.status(400).json("Could not find any matching request");
        }
        let contactNumber = "";
        if (communityRequest.creatorUsername === username) {
            if (communityRequest.acceptorUsername) {
                const user = yield User_1.default.findOne({
                    username: communityRequest.acceptorUsername,
                }).exec();
                if (!user) {
                    return res.status(400).json("Invalid user as acceptor");
                }
                contactNumber = user.phoneNumber;
            }
        }
        else if (communityRequest.acceptorUsername === username) {
            const user = yield User_1.default.findOne({
                username: communityRequest.creatorUsername,
            }).exec();
            if (!user) {
                return res.status(400).json("Could not find creator user");
            }
            contactNumber = user.phoneNumber;
        }
        const responseData = {
            _id: communityRequest._id,
            creatorUsername: communityRequest.creatorUsername,
            acceptorUsername: communityRequest.acceptorUsername,
            requestDescription: communityRequest.requestDescription,
            location: communityRequest.location,
            requestLatitude: communityRequest.requestLatitude,
            requestLongitude: communityRequest.requestLongitude,
            community: communityRequest.community,
            cancelled: communityRequest.cancelled,
            completed: communityRequest.completed,
            contactNumber: contactNumber ? contactNumber : null,
        };
        return res
            .status(200)
            .json({ message: "Request found", data: responseData });
    }
    catch (err) {
        return res.status(500).json(err);
    }
});
exports.handleFetchRequestDetails = handleFetchRequestDetails;
//# sourceMappingURL=requestController.js.map