const { BlogController } = require("../controllers/blog");
const router = require("express").Router();

const upload = require("../utils/storageImage");

router.post("/create", upload.single("thumbnail"), BlogController.createBlog);
router.get("/get/:id", BlogController.getBlogById);
router.get("/get-all", BlogController.getAllBlog);
router.post("/searchByTitleName", BlogController.searchBlogByTitleByName);
router.post("/vote-blog-cmt", BlogController.voteBlogCmt);
router.delete("/delete/:id", BlogController.deleteBlog);
router.patch("/edit/:id", upload.single("thumbnail"), BlogController.editBlog);
router.patch("/hide", BlogController.hideBlog);
router.get("/rating", BlogController.ratingBlog);
router.get("/search-ByStatus", BlogController.searchBlogByStatus);
router.patch("/approve-accept", BlogController.acceptBlog);
router.patch("/cancel-blog", BlogController.cancelBlog);
router.get("/filter", BlogController.filterBlog);
router.get("/processing", BlogController.getProcessingBlog);
router.get("/accepted", BlogController.getAcceptedBlog);

router.post("/auto-create-blog", BlogController.autoCreateBlog);

module.exports = router;
