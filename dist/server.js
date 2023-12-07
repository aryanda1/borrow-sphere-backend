"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = require("dotenv");
const mongoose_1 = __importDefault(require("mongoose"));
const dbConn_1 = __importDefault(require("./config/dbConn"));
const cors_1 = __importDefault(require("cors"));
const cors_2 = __importDefault(require("./config/cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const jwtAuth_1 = __importDefault(require("./middleware/jwtAuth"));
const userAuth_1 = __importDefault(require("./routes/userAuth"));
const tokenRefresh_1 = __importDefault(require("./routes/tokenRefresh"));
const editProfile_1 = __importDefault(require("./routes/editProfile"));
const requests_1 = __importDefault(require("./routes/requests"));
const communities_1 = __importDefault(require("./routes/communities"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 4000;
(0, dotenv_1.config)();
(0, dbConn_1.default)();
app.use((0, cors_1.default)(cors_2.default));
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use("/api/user", userAuth_1.default);
app.use("/api/refresh", tokenRefresh_1.default);
app.use(jwtAuth_1.default);
app.use("/api/editprofile", editProfile_1.default);
app.use("/api/requests", requests_1.default);
app.use("/api/communities", communities_1.default);
app.get("/", (req, res) => {
    res.send("Hello World!");
});
mongoose_1.default.connection.once("connected", () => {
    app.listen(PORT, () => {
        console.log(`Listening at http://localhost:${PORT}`);
    });
});
process.on("SIGINT", () => {
    mongoose_1.default.connection.close(function () {
        console.log("MongoDB disconnected");
        process.exit(0);
    });
});
//# sourceMappingURL=server.js.map