const db = require("../models/index");
const Commentblog = db.commentblog;

class CommentController {
  static async createComment(req, res) {
    try {
      const { date, content, userId, blogId } = req.body;
      const newComment = await BlogComment.create({
        date,
        content,
        userId,
        blogId,
      });

      if (newComment) {
        res.status(200).json({ message: "Comment created successfully", comment: newComment });
      } else {
        res.status(500).json({ message: "Failed to create comment" });
      }
    } catch (error) {
      console.error("Error creating comment:", error);
      res.status(500).json({ message: "Something went wrong!" });
    }
  }
  static async getComments(req, res) {
    try {

      const comments = await BlogComment.findAll();

      if (comments) {
        res.status(200).json(comments);
      } else {
        res.status(404).json({ message: "No comments found" });
      }
    } catch (error) {
      console.error("Error getting comments:", error);
      res.status(500).json({ message: "Something went wrong!" });
    }
  }
  static async replyComment(req, res) {
    try {
      const { date, content, userId, blogId, replyCommentId } = req.body;

      const newReply = await Commentblog.create({
        date,
        content,
        userId,
        blogId,
        replyCommentId,
      });

      if (newReply) {
        res.status(200).json({ message: "Reply comment successfully" });
      } else {
        res.status(500).json({ message: "Failed to create reply" });
      }
    } catch (error) {
      console.error("Error creating reply:", error);
      res.status(500).json({ message: "Something went wrong!" });
    }
  }
  static async commentblog(req, res) {
    try {
      const { date, content, userId, blogId } = req.body;

      const newComment = await Commentblog.create({
        date,
        content,
        userId,
        blogId,
      });

      if (newComment) {
        res.status(200).json({ message: "Commentblog successfully" });
      } else {
        res.status(500).json({ message: "Failed to create comment" });
      }
    } catch (error) {
      console.error("Error creating comment:", error);
      res.status(500).json({ message: "Something went wrong!" });
    }
  }

  static async hideComment(req, res) {
    try {
      const { commentId } = req.params;
      const result = await Commentblog.update(
        { isHidden: true },
        { where: { id: commentId } }
      );

      if (result[0] === 1) {
        res.status(200).json({ message: "Comment hidden successfully" });
      } else {
        res.status(404).json({ message: "Comment not found" });
      }
    } catch (error) {
      console.error("Error hiding comment:", error);
      res.status(500).json({ message: "Something went wrong!" });
    }
  }

  static async sortByDate(req, res) {
    try {
      const comments = await Commentblog.findAll({
        order: [['date', 'DESC']],
      });

      if (comments.length > 0) {
        res.status(200).json(comments);
      } else {
        res.status(404).json({ message: "No comments found" });
      }
    } catch (error) {
      console.error("Error sorting comments by date:", error);
      res.status(500).json({ message: "Something went wrong!" });
    }
  }

}
exports.CommentController = CommentController;
