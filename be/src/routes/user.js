const { UserController } = require("../controllers/user");

const router = require("express").Router();

router.post("/create", UserController.createUser);
router.post("/auto-create-user", UserController.autoCreateUser);
router.get("/getUserById", UserController.getUserById);
router.post("/updateUser", UserController.createUser);
router.delete("/deleteUser", UserController.deleteUser);
router.get("/get-all-order-user", UserController.getAllOrderOfUser)

module.exports = router;
