const { BlogController } = require("../controllers/blog");
const router = require("express").Router();

const upload = require("../utils/storageImage");

router.post("/create", upload.single("thumbnail"), BlogController.createBlog);
router.get("/get/:id", BlogController.getBlogById);
router.get("/get-all", BlogController.getAllBlog);
router.delete("/delete", BlogController.deleteBlog);
router.patch("/edit", BlogController.editBlog);
router.patch("/hide", BlogController.hideBlog);
router.get("/rating", BlogController.ratingBlog);
router.get("/searchByStatus", BlogController.searchBlogByStatus);

module.exports = router;
