"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const tokenRefreshController_1 = require("../controllers/tokenRefreshController");
const router = (0, express_1.Router)();
router.get("/", tokenRefreshController_1.handleTokenRefresh);
exports.default = router;
//# sourceMappingURL=tokenRefresh.js.map