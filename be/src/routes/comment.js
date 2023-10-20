const { CommentController } = require("../controllers/comment");

const router = require("express").Router();
router.post("/create", CommentController.createComment);
router.get("/blog/:blogId", CommentController.getComments);
router.get("/reply", CommentController.replyComment);

module.exports = router;
