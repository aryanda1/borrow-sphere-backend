import { CorsOptions } from "cors";

const whiteList = [
    'https://borrow-sphere-client.vercel.app',
    'https://borrow-sphere.ary0n.fun',
];
const corsOptions: CorsOptions = {
	origin: whiteList,
	credentials: true, // This is important for requests with credentials
};

export default corsOptions;
