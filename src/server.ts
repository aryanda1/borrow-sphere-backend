import express from "express";
import { config } from "dotenv";
import mongoose from "mongoose";
import connectToDb from "./config/dbConn";

// Middleware
import corsOptions from "./config/cors";
import cookieParser from "cookie-parser";
import jwtAuth from "./middleware/jwtAuth";

// Routes
import userAuthRouter from "./routes/userAuth";
import tokenRefreshRouter from "./routes/tokenRefresh";
import editProfileRouter from "./routes/editProfile";
import requestsRouter from "./routes/requests";
import communityRouter from "./routes/communities";

const app = express();
const PORT = process.env.PORT || 4000;

config();
connectToDb();

// Replace app.use(cors(corsOptions)); with custom CORS middleware
app.use((req, res, next) => {
	let origin = req.headers.origin;
	console.log(origin);
	console.log(corsOptions.origin);
	console.log(corsOptions.origin.includes(origin));
	if (corsOptions.origin.includes(origin)) {
		res.header("Access-Control-Allow-Origin", origin);
		res.header("Access-Control-Allow-Credentials", true); // Set credentials header
	}
	res.header(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content-Type, Accept"
	);
	next();
});
app.use(express.json());
app.use(cookieParser());

app.use("/api/user", userAuthRouter);
app.use("/api/refresh", tokenRefreshRouter);

app.use(jwtAuth);

app.use("/api/editprofile", editProfileRouter);
app.use("/api/requests", requestsRouter);
app.use("/api/communities", communityRouter);

app.get("/", (req, res) => {
	res.send("Hello World!");
});

mongoose.connection.once("connected", () => {
	app.listen(PORT, () => {
		console.log(`Listening at http://localhost:${PORT}`);
	});
});

process.on("SIGINT", () => {
	mongoose.connection.close(function () {
		console.log("MongoDB disconnected");
		process.exit(0);
	});
});
