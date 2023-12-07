"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const requestController_1 = require("../controllers/requestController");
const requestUpdatesController_1 = require("../controllers/requestUpdatesController");
const router = (0, express_1.Router)();
router.post("/create", requestController_1.handleRequestCreation);
router.get("/fetch", requestController_1.handleFetchRequests);
router.get("/fetchdetails", requestController_1.handleFetchRequestDetails);
router.put("/update", requestUpdatesController_1.handleRequestDetailsUpdate);
exports.default = router;
//# sourceMappingURL=requests.js.map