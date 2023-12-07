import { CorsOptions } from "cors";

const whiteList = ["http://localhost:3000"];
const corsOptions: CorsOptions = {
	origin: function (origin, callback) {
		if ((origin && whiteList.indexOf(origin) !== -1) || !origin) {
			callback(null, true);
		} else {
			callback(new Error("Not allowed by CORS"));
		}
	},
	credentials: true, // This is important for requests with credentials
};

export default corsOptions;
