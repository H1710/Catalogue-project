const db = require("../models/index");
const Blog = db.blog;

class BlogController {
  static async createBlog(req, res) {
    // console.log(req.body);
    const thumbnail = req.file;
  }
  static async getBlogById(req, res) { }
  static async getAllBlog(req, res) { }
  static async deleteBlog(req, res) {
    try {
      const blogID = req.body.id;
      const blog = await Blog.findByPk(blogID);
      console.log(blog);
      if (!blog) {
        return res.status(404).json({ message: "Blog not found" });
      }
      await blog.destroy({
        where: {
          id: blogID,
        },
      });
      return res.status(200).json({ message: "Remove blog successfully" });
    } catch (error) {
      return res.status(500).json({ message: "Can not remove!" });
    }
  }
}
exports.BlogController = BlogController;
