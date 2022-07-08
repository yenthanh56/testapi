const User = require("../models/User");

const userController = {
	getAllUsers: async (req, res) => {
		try {
			const user = await User.find();
			return res.status(200).json(user);
		} catch (error) {
			return res.status(500).json(error);
		}
	},
	deleteUser: async (req, res) => {
		try {
			await User.findById(req.params.id);
			return res.status(200).json("Delete Successfully");
		} catch (error) {}
	},
};

module.exports = userController;
