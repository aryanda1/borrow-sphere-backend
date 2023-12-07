import { CorsOptions } from "cors";

const whiteList = [
	'https://borrow-sphere-client.vercel.app',
	'https://borrow-sphere-client.vercel.app/*',
  ];
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
