"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const communityController_1 = require("../controllers/communityController");
const router = (0, express_1.Router)();
router.get("/fetch", communityController_1.handleFetchCommunities);
router.post("/create", communityController_1.handleCommunityCreation);
router.put("/join", communityController_1.handleJoinCommunity);
exports.default = router;
//# sourceMappingURL=communities.js.map