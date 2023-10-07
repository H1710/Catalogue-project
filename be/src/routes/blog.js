const { BlogController } = require("../controllers/blog");
const router = require("express").Router();

const upload = require("../utils/storageImage");

router.post("/create", upload.single("thumbnail"), BlogController.createBlog);
router.get("/get/:id", BlogController.getBlogById);
router.get("/get-all", BlogController.getAllBlog);
router.get("/get-all", BlogController.getAllBlog);
router.get("/get-all", BlogController.getAllBlog);
router.get("/get-all", BlogController.getAllBlog);
module.exports = router;
