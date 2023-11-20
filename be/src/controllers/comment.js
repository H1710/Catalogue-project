const db = require("../models/index");
const ServicePackage = db.servicePackage;
const User = db.user;
const Comment = db.blogComment;

class CommentController {
  static async createCommentBlog(req, res) {
    try {
      const { content, userId, blogId } = req.body;
      const newComment = await Comment.create({
        content,
        userId,
        blogId,
      });

      if (newComment) {
        res.status(200).json({
          message: "Comment created successfully",
          comment: newComment,
        });
      } else {
        res.status(500).json({ message: "Failed to create comment" });
      }
    } catch (error) {
      console.error("Error creating comment:", error);
      res.status(500).json({ message: "Something went wrong!" });
    }
  }
  static async getCommentsBlog(req, res) {
    try {
      const blogId = req.params.blogId;
      // const blogId = req.body.blogId;
      console.log(blogId);
      const comment = await Comment.findAll({
        where: { blogId },
        attributes: [
          "id",
          "content",
          "total_votes",
          "createdAt",
          "userId",
          "replyCommentId",
        ],
        include: [
          {
            model: User, // Thay User bằng mô hình tương ứng cho bảng User
            attributes: ["name", "avatar"], // Lựa chọn các thuộc tính bạn muốn lấy từ bảng User
          },
        ],
      });
      res.status(200).json({ comment });
    } catch (error) {
      res.status(500).json({ message: "somehitng went wrong" });
    }
  }
  static async replyCommentBlog(req, res) {
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

  static async hideCommentBlog(req, res) {
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
        order: [["date", "DESC"]],
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
