const { CommentController } = require("../controllers/comment");

const router = require("express").Router();
router.post("/blog/create", CommentController.createCommentBlog);
router.get("/blog/:blogId", CommentController.getCommentsBlog);
router.get("/blog/reply", CommentController.replyCommentBlog);
router.patch("/blog/hide-comment", CommentController.hideCommentBlog);

router.post("/template/create", CommentController.createCommentTemplate);
router.get("/template/:templateId", CommentController.getCommentsTemplate);

router.get("/sort-by-date", CommentController.sortByDate);
module.exports = router;
