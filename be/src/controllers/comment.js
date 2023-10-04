const db = require("../models/index");
const ServicePackage = db.servicePackage;

class CommentController {
  static async createComment(req, res) {}
  static async getComments(req, res) {}
  static async replyComment(req, res) {}
}
exports.CommentController = CommentController;
