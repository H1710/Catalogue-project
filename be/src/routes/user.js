const { UserController } = require("../controllers/user");

const upload = require("../utils/storageImage");

const router = require("express").Router();

router.post("/create", UserController.createUser);
router.post("/auto-create-user", UserController.autoCreateUser);
router.get("/getUser/:id", UserController.getUserById);
router.post("/updateUser", UserController.createUser);
router.patch("/deleteUser/:id", UserController.deleteUser);
router.patch("/update-user", UserController.updateUser)

router.get("/get-list-by-year/:year", UserController.getListByYear);
router.get("/get-user-by-year/:year", UserController.getUserByYear);
router.get("/get-all", UserController.getAllUser);
router.post("/select-package", UserController.selectPackage);
router.post(
  "/upload-image",
  upload.single("designImage"),
  UserController.uploadImageByUser
);
router.get("/get-list-year", UserController.getListYears);

router.get("/get-images-upload/:userId", UserController.getImageUpload);
module.exports = router;
