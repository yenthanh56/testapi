const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const authController = {
	registerUser: async (req, res) => {
		try {
			const salt = await bcrypt.genSalt(10);
			const hashed = await bcrypt.hash(req.body.password, salt);

			// create new user
			const newUser = await new User({
				username: req.body.username,
				password: hashed,
				email: req.body.email,
			});
			// save to DB
			await newUser.save();
			return res.status(200).json("register successfully");
		} catch (error) {
			return res.status(500).json(error);
		}
	},
	loginUser: async (req, res) => {
		try {
			const user = await User.findOne({
				username: req.body.username,
			});
			if (!user) {
				return res.status(403).json("UserName Wrong!!!");
			}
			const passwordValid = await bcrypt.compare(
				req.body.password,
				user.password
			);
			if (!passwordValid) {
				return res.status(403).json("PassWord Wrong!!!");
			}
			if (user && passwordValid) {
				// when login receive token
				const accessToken = jwt.sign(
					{
						id: user.id,
						admin: user.admin,
					},
					process.env.JWT_ACCESSTOKEN,
					{ expiresIn: "1d" }
				);
				const { password, ...other } = user._doc;
				return res.status(200).json({ ...other, accessToken });
			}
		} catch (error) {
			return res.status(500).json(error);
		}
	},
};

module.exports = authController;
