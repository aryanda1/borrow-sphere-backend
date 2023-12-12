import { CorsOptions } from "cors";

var allowlist = [
	"http://localhost:3000",
	"https://borrow-sphere.ary0n.fun",
	"https://borrow-sphere-client.vercel.app",
];
var corsOptions = function (req: any, callback: any) {
	var corsOptions;
	console.log(req.header("Origin"));
	console.log(allowlist.indexOf(req.header("Origin")));
	if (allowlist.indexOf(req.header("Origin")) !== -1) {
		corsOptions = { origin: req.header("Origin"), credentials: true };
	} else {
		corsOptions = { origin: false };
	}
	callback(null, corsOptions);
};

export default corsOptions;
