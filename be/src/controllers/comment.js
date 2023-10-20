const db = require("../models/index");
const ServicePackage = db.servicePackage;
const User = db.user;
const Comment = db.blogComment;

class CommentController {
  static async createComment(req, res) {}
  static async getComments(req, res) {
    try {
      const blogId = req.params.blogId;
      // const blogId = req.body.blogId;
      console.log(blogId);
      const comment = await Comment.findAll({
        where: { blogId },
        attributes: ["id", "content", "total_votes", "createdAt", "userId", "replyCommentId"],
        include: [
          {
            model: User, // Thay User bằng mô hình tương ứng cho bảng User
            attributes: ["name", "avatar"], // Lựa chọn các thuộc tính bạn muốn lấy từ bảng User
          },
        ],
      });
      res.status(200).json({ comment })
    } catch (error) {
      res.status(500).json({ message: "somehitng went wrong"});
    }
  }
  static async replyComment(req, res) {}
}
exports.CommentController = CommentController;
