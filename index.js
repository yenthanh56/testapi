// const express = require('express')
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const authRoute = require("./Router/auth");
const userRoute = require("./Router/user");
dotenv.config();
// const PORT = process.env.PORT || 3000;
const app = express();

mongoose.connect(process.env.MONGOODB_URL, () => {
	console.log("Connect DB");
});

app.use(cors());
app.use(cookieParser());
app.use(express.json());

app.get("/", (req, res) => {
	return res.json({ message: "welcome" });
});

// ROUTES
app.use("/v1/auth", authRoute);
app.use("/v1/user", userRoute);

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
console.log("Database_URL", process.env.MONGOODB_URL);
