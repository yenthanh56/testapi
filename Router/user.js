// const middleWareController = require("../controllers/middleWareControllers");
// const middleWareController = require("../controllers/middleWareControllers");
const userController = require("../controllers/userControllers");
const router = require("express").Router();

router.delete("/:id", userController.deleteUser);
router.get("/", userController.getAllUsers);

module.exports = router;
