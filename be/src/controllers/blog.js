const db = require("../models/index");
const ServicePackage = db.servicePackage;

class BlogController {
  static async createBlog(req, res) {
    // console.log(req.body);
    const thumbnail = req.file;
  }
  static async getBlogById(req, res) {}
  static async getAllBlog(req, res) {}
}
exports.BlogController = BlogController;
