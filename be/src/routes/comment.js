const { CommentController } = require("../controllers/comment");

const router = require("express").Router();
router.post("/create", CommentController.createComment);
router.get("/get/blog/:id", CommentController.getComments);
router.get("/reply", CommentController.replyComment);
router.post("/commentblog", CommentController.commentblog);
router.patch("/hide-comment", CommentController.hideComment);
router.get("/sort-by-date", CommentController.sortByDate);
module.exports = router;
