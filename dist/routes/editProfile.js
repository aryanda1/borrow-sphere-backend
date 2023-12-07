"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const editProfileController_1 = require("../controllers/editProfileController");
const router = (0, express_1.Router)();
router.put("/", editProfileController_1.editProfile);
exports.default = router;
//# sourceMappingURL=editProfile.js.map