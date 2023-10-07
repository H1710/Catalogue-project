
const seq = require("../db/dbConnection");
const db = require("../models/index");
const ServicePackage = db.servicePackage;
const Blog = db.blog;


class BlogController {
  static async createBlog(req, res) {
    try {

      const { title, content } = req.body;
      const thumbnail = req.file ? req.file.path : null;
      const date = new Date();
      const status = false;
      const newBlog = await Blog.create({
        title: title,
        content: content,
        thumbnail: thumbnail,
        status: status,
        date: date
      })
      return res.status(200).json({ newBlog });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "can not create a new blog." })
    }

  }
  static async getBlogById(req, res) {
    try {
      const id = req.params.id;
      const blog = await Blog.findByPk(id);
      if (!blog) {
        return res
          .status(400)
          .send({ message: "Blog not found." });
      }
      return res.status(200).json({ blog });
    } catch (error) {
      res.status(400).send({ message: "Something went wrong." });
    }
  }
  static async getAllBlog(req, res) {
    try {
      let page = req.query.page;
      if(page == '') {
        page = 1;
      }
      let sort = req.query.sort;
      if(sort == '') {
        sort = 'asc';
      }
      const limit = 3;
      const offset = (page - 1) * limit;
      const blogs = await seq.query('SELECT b.id, b.title, b.content, b.thumbnail, b.status, b.createdAt, b.updatedAt, b.userId, avg(br.rating) as avgRating FROM catalogue_project.blog_ratings as br right join catalogue_project.blogs as b on br.blogId = b.id group by b.id, b.title, b.content, b.thumbnail, b.status, b.createdAt, b.updatedAt, b.userId order by b.createdAt ' + sort + ' limit ? offset ?', {
        replacements: [limit, offset],
        type: seq.QueryTypes.SELECT
      })
      res.json({
        blogs: blogs
      })
    } catch (error) {
      console.error(error);
      res.status(400).send({ message: "Something went wrong." });
    }
  }

  
}
exports.BlogController = BlogController;
