const db = require("../models/index");
const ServicePackage = db.servicePackage;
const User = db.user;
const BlogComment = db.blogComment;
const TemplateComment = db.templateComment;

class CommentController {
  static async createCommentBlog(req, res) {
    try {
      const { content, userId, blogId } = req.body;
      const newComment = await BlogComment.create({
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
      res.status(500).json({ message: "Something went wrong!" });
    }
  }
  static async getCommentsBlog(req, res) {
    try {
      const blogId = req.params.blogId;
      // const blogId = req.body.blogId;
      const comment = await BlogComment.findAll({
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
            model: User,
            attributes: ["name", "avatar", "email"],
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

      const newReply = await BlogComment.create({
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
      const comments = await BlogComment.findAll({
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

  static async createCommentTemplate(req, res) {
    try {
      const { content, userId, templateId } = req.body;
      const newComment = await TemplateComment.create({
        content,
        userId,
        templateId,
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
  static async getCommentsTemplate(req, res) {
    try {
      const templateId = req.params.templateId;
      // const blogId = req.body.blogId;
      console.log(templateId);
      const comment = await TemplateComment.findAll({
        where: { templateId },
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
            attributes: ["name", "avatar", "email"], // Lựa chọn các thuộc tính bạn muốn lấy từ bảng User
          },
        ],
      });
      res.status(200).json({ comment });
    } catch (error) {
      res.status(500).json({ message: "somehitng went wrong" });
    }
  }
}
exports.CommentController = CommentController;
