const { BlogController } = require("../controllers/blog");
const AuthMiddleware = require("../middleware/authentication");
const router = require("express").Router();

const upload = require("../utils/storageImage");

router.post(
  "/create",
  AuthMiddleware.auth,
  upload.single("thumbnail"),
  BlogController.createBlog
);
router.get("/get/:id", BlogController.getBlogById);
router.get(
  "/get-by-user/:userId",
  AuthMiddleware.auth,
  BlogController.getBlogByUserId
);
router.get("/get-all", BlogController.getAllBlog);
router.post("/searchByTitleName", BlogController.searchBlogByTitleByName);
router.post("/vote-blog-cmt", BlogController.voteBlogCmt);
router.delete("/delete/:id", BlogController.deleteBlog);
router.patch("/edit/:id", upload.single("thumbnail"), BlogController.editBlog);
router.patch("/hide", BlogController.hideBlog);
router.post("/rating", BlogController.ratingBlog);
router.get("/search-ByStatus", BlogController.searchBlogByStatus);
router.patch(
  "/approve-accept",
  AuthMiddleware.auth,
  AuthMiddleware.validateAdmin,
  BlogController.acceptBlog
);
router.patch(
  "/cancel-blog",
  AuthMiddleware.auth,
  AuthMiddleware.validateAdmin,
  BlogController.cancelBlog
);
router.get("/filter", BlogController.filterBlog);
router.get(
  "/processing",
  AuthMiddleware.auth,
  AuthMiddleware.validateAdmin,
  BlogController.getProcessingBlog
);
router.get("/accepted", BlogController.getAcceptedBlog);
router.get("/search-blog", BlogController.SearchBlogByTags);

router.post("/auto-create-blog", BlogController.autoCreateBlog);

module.exports = router;
