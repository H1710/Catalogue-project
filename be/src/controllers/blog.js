const db = require("../models/index");
const uploadImage = require("../utils/uploadImage");
const Blog = db.blog;
const User = db.user;

class BlogController {
  static async createBlog(req, res) {
    try {
      const { title, content, userId } = req.body;

      const thumbnail = req.file;
      if (!thumbnail) {
        return res.status(400).json({ message: "Thumbnail not found" });
      }
      const user = await User.findByPk(userId);
      if (!user) {
        return res.status(400).json({ message: "User not found" });
      }
      const data = await uploadImage(thumbnail.filename, thumbnail.mimetype);

      const newBlog = await user.createBlog({
        title: title,
        content: content,
        thumbnail: data.data.webContentLink,
      });

      return res.status(200).json({ newBlog: newBlog });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "can not create a new blog." });
    }
  }
  static async getBlogById(req, res) {
    try {
      const id = req.params.id;
      const blog = await Blog.findByPk(id);
      if (!blog) {
        return res.status(400).send({ message: "Blog not found." });
      }
      return res.status(200).json({ blog: blog });
    } catch (error) {
      res.status(400).send({ message: "Something went wrong." });
    }
  }
  static async getAllBlog(req, res) {}
}
exports.BlogController = BlogController;
