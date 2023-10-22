const { CommentController } = require("../controllers/comment");

const router = require("express").Router();
router.post("/create", CommentController.createComment);
router.get("/blog/:blogId", CommentController.getComments);
router.get("/reply", CommentController.replyComment);
router.post("/commentblog", CommentController.commentblog);
router.patch("/hide-comment", CommentController.hideComment);
router.get("/sort-by-date", CommentController.sortByDate);
module.exports = router;
