"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const whiteList = [
    'https://borrow-sphere-client.vercel.app',
    'https://borrow-sphere-client.vercel.app/*',
];
const corsOptions = {
    origin: function (origin, callback) {
        if ((origin && whiteList.indexOf(origin) !== -1) || !origin) {
            callback(null, true);
        }
        else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true,
};
exports.default = corsOptions;
//# sourceMappingURL=cors.js.map