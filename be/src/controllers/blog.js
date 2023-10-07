const db = require("../models/index");
const uploadImage = require("../utils/uploadImage");
const Blog = db.blog;
const User = db.user;
const blogRating = db.blogRating;

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

  static async deleteBlog(req, res) {
    try {
      const blogID = req.params.id;
      const blog = await Blog.findByPk(blogID);
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

  static async editBlog(req, res) {
    try {
      const { title, content } = req.body;
      const id = req.params.id;
      const thumbnail = req.file;
      const blog = await Blog.findByPk(id);
      if (!blog) {
        return res.status(404).json({ message: "Blog not found" });
      }
      await blog.update(
        {
          status: "No process",
          title: title,
          content: content,
          thumbnail: thumbnail,
        },
        {
          where: {
            id: id,
          },
        }
      );
      return res
        .status(200)
        .json({ message: "Update blog successfully", newBlog: blog });
    } catch (error) {
      return res.status(500).json({ message: "Can not update!" });
    }
  }

  static async hideBlog(req, res) {
    try {
      const blogId = req.body.id;
      const blog = await Blog.findByPk(blogId);
      if (!blog) {
        return res.status(404).json({ message: "Blog not found" });
      }
      await blog.update(
        {
          status: "Hide",
        },
        {
          where: {
            id: blogId,
          },
        }
      );
      return res.status(200).json({ message: "Hide blog successfully" });
    } catch (error) {
      return res.status(500).json({ message: "Can not Hide!" });
    }
  }

  //search blog where status No process
  static async searchBlogByStatus(req, res) {
    try {
      const blogs = await Blog.findAll({
        where: {
          status: "No process",
        },
      });

      if (blogs.length > 0) {
        return res
          .status(200)
          .json({ message: "Search blog successfully", blogs });
      } else {
        return res
          .status(404)
          .json({ message: "No blogs found with the specified criteria" });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Can not search!" });
    }
  }

  static async ratingBlog(req, res) {
    try {
      const { blogId, userId, rating } = req.body;

      // Assuming you have a BlogRating model
      const blogRate = await blogRating.findOne({ where: { blogId, userId } });

      if (blogRate) {
        // Update the existing rating
        await blogRating.update({ rating }, { where: { blogId, userId } });
        return res.status(200).json({ message: "Rating updated successfully" });
      } else {
        // Create a new rating
        await blogRating.create({
          userId: userId,
          blogId: blogId,
          rating: rating,
        });
        return res.status(201).json({ message: "Rating created successfully" });
      }
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }

  static async acceptBlog(req, res) {
    try {
      const blogId = req.body.id;
      const blog = await Blog.findByPk(blogId);
      if (!blog) {
        return res.status(404).json({ message: "Blog not found" });
      }
      await blog.update(
        {
          status: "Processed",
        },
        {
          where: {
            id: blogId,
          },
        }
      );
      return res
        .status(200)
        .json({ message: "Update blog successfully", blog });
    } catch (error) {
      return res.status(500).json({ message: "Can not update!" });
    }
  }

  static async cancelBlog(req, res) {
    try {
      const blogId = req.body.id;
      const blog = await Blog.findByPk(blogId);
      if (!blog) {
        return res.status(404).json({ message: "Blog not found" });
      }
      await blog.update(
        {
          status: "No process",
        },
        {
          where: {
            id: blogId,
          },
        }
      );
      return res
        .status(200)
        .json({ message: "Update blog successfully", blog });
    } catch (error) {
      return res.status(500).json({ message: "Can not update!" });
    }
  }
}

exports.BlogController = BlogController;
