// const express = require('express')
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
// const authRoute = require("./Router/auth");
// const userRoute = require("./Router/user");
const router = require("./Router/index");
dotenv.config({ path: __dirname + "/.env" });
// const PORT = process.env.PORT || 3000;
const app = express();

mongoose.connect(
	process.env.MONGOODB_URL,

	() => {
		console.log("Connect DB");
	}
);

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: "false" }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
	return res.json({ message: "welcome" });
});
app.get("/v1/abc", (req, res) => {
	return res.json({ message: "welcome" });
});

// ROUTES
// app.get("/v1/auth", authRoute);
// app.get("/v1/user", userRoute);
router(app);
// app.listen(PORT, () => {
// 	console.log(`Example app listening on PORT ${PORT}`);
// });
app.listen(process.env.PORT || 3000, function () {
	console.log(
		"Express server listening on port %d in %s mode",
		this.address().port,
		app.settings.env
	);
});
