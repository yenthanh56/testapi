const userRoute = require("./user");

function router(app) {
	app.use("/v1/user", userRoute);
}
module.exports = router;
