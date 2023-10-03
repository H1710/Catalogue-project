const db = require("../models/index");
const uploadImage = require("../utils/uploadImage");
const ServicePackage = db.servicePackage;

class BlogController {
  static async createBlog(req, res) {
    console.log(req.body);
    const thumbnail = req.file;
    console.log(thumbnail);
  }
  static async getBlogById(req, res) {}
  static async getAllBlog(req, res) {}
}
exports.BlogController = BlogController;
