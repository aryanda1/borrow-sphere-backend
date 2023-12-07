import { CorsOptions } from "cors";

const whiteList = ["*"];
const corsOptions: CorsOptions = {
	origin: whiteList,
	credentials: true, // This is important for requests with credentials
};

export default corsOptions;
