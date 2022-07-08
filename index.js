// const express = require('express')
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const authRoute = require("./Router/auth");
const userRoute = require("./Router/user");
dotenv.config();
const PORT = process.env.PORT || 3000;
const app = express();

mongoose.connect(
	process.env.MONGOODB_URL,
	{
		useUnifiedTopology: true,
		useNewUrlParser: true,
	},
	() => {
		console.log("Connect DB");
	}
);

app.use(cors());
app.use(cookieParser());
app.use(express.json());

// ROUTES
app.use("/v1/auth", authRoute);
app.use("/v1/user", userRoute);

app.listen(PORT, () => {
	console.log(`Example app listening on PORT ${PORT}`);
});