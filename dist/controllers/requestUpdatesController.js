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
exports.handleRequestDetailsUpdate = void 0;
const CommunityRequest_1 = __importDefault(require("../models/CommunityRequest"));
const handleRequestDetailsUpdate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { updateType, requestId } = req.body;
    const { username } = req.body;
    if (!updateType) {
        return res.status(400).json("updateType not found");
    }
    if (!requestId) {
        return res.status(400).json("requestId not found");
    }
    switch (updateType) {
        case "accept":
            try {
                const request = yield CommunityRequest_1.default.findById(requestId).exec();
                if (!request) {
                    return res.status(400).json("Could not find any matching request");
                }
                if (request.acceptorUsername) {
                    return res.status(400).json("Request already accepted");
                }
                if (request.cancelled || request.completed) {
                    return res.status(400).json("Request cannot be accepted");
                }
                if (request.creatorUsername === username) {
                    return res
                        .status(400)
                        .json("Request creator cannot accept their own request");
                }
                yield request.updateOne({ acceptorUsername: username });
                return res.status(200).json("Request accepted");
            }
            catch (err) {
                return res.status(500).json(err);
            }
        case "cancel":
            try {
                const request = yield CommunityRequest_1.default.findById(requestId).exec();
                if (!request) {
                    return res.status(400).json("Could not find any matching request");
                }
                if (request.cancelled || request.completed) {
                    return res.status(400).json("Request is already cancelled/completed");
                }
                if (request.creatorUsername !== username) {
                    return res
                        .status(400)
                        .json("Only request creator can cancel the request");
                }
                yield request.updateOne({ cancelled: true });
                return res.status(200).json("Request cancelled");
            }
            catch (err) {
                return res.status(500).json(err);
            }
        case "complete":
            try {
                const request = yield CommunityRequest_1.default.findById(requestId).exec();
                if (!request) {
                    return res.status(400).json("Could not find any matching request");
                }
                if (request.cancelled || request.completed) {
                    return res.status(400).json("Request is already cancelled/completed");
                }
                if (request.creatorUsername !== username) {
                    return res
                        .status(400)
                        .json("Only request creator can mark the request as completed");
                }
                yield request.updateOne({ completed: true });
                return res.status(200).json("Request marked as completed");
            }
            catch (err) {
                return res.status(500).json(err);
            }
        case "abandon":
            try {
                const request = yield CommunityRequest_1.default.findById(requestId).exec();
                if (!request) {
                    return res.status(400).json("Could not find any matching request");
                }
                if (request.cancelled || request.completed) {
                    return res.status(400).json("Request is already cancelled/completed");
                }
                if (request.acceptorUsername !== username) {
                    return res
                        .status(400)
                        .json("You aren't the acceptor of this request");
                }
                yield request.updateOne({ acceptorUsername: null });
                return res.status(200).json("Request abandoned");
            }
            catch (err) {
                return res.status(500).json(err);
            }
    }
});
exports.handleRequestDetailsUpdate = handleRequestDetailsUpdate;
//# sourceMappingURL=requestUpdatesController.js.map