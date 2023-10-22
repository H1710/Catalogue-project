const router = require("express").Router();
const userRoute = require("./user");
const templateRoute = require("./template");
const authRoute = require("./auth");
const serviecePackageRoute = require("./serviecepackage");
const orderRoute = require("./order");
const blogRoute = require("./blog");
const commentRoute = require("./comment");
const roleRoute = require("./role");

router.use("/user", userRoute);
router.use("/template", templateRoute);
router.use("/auth", authRoute);
router.use("/service-package", serviecePackageRoute);
router.use("/order", orderRoute);
router.use("/blog", blogRoute);
router.use("/comment", commentRoute);
router.use("/role", roleRoute);

const upload = require("../utils/storageImage");

const { UploadController } = require("../controllers/upload");
const roleModel = require("../models/roleModel");
router.post("/upload", upload.single("file"), UploadController.uploadImage);

//http://localhost:5000/api/v1/auth

router.use("/", (req, res) => {
  res.status(404).send({ message: "Not Found" });
});

module.exports = router;
