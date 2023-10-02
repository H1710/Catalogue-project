const { CommentController } = require("../controllers/comment");

const router = require("express").Router();
router.post("/create", CommentController.createComment);
router.get("/get/blog/:id", CommentController.getComments);
router.get("/reply", CommentController.replyComment);

module.exports = router;
