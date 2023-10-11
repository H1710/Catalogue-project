const db = require("../models/index");
const seq = require("../db/dbConnection");
const uploadImage = require("../utils/uploadImage");
const { clouddebugger } = require("googleapis/build/src/apis/clouddebugger");
const Blog = db.blog;
const User = db.user;
const blogRating = db.blogRating;
const voteBlogComment = db.voteBlogComment;

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

  static async getAllBlog(req, res) {
    try {
      let page = req.query.page;
      if (page == '') {
        page = 1;
      }
      let sort = req.query.sort;
      if (sort == '') {
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

  static async searchBlogByTitleByName(req, res) {
    try {
      const title = req.query.title;
      const name = req.query.name;
      let page = req.query.page;
      const limit = 4;
      const offset = (page - 1) * limit;
      if (page == '') {
        page = 1;
      }
      if (title == '' && name == '') {
        res.status(500).json({ message: "Can not find blog without title or template's name. " });
      }
      if (title != '' && name == '') {
        const blogsByTitle = await seq.query('SELECT b.id, b.title, b.content, b.thumbnail, b.status, b.createdAt, b.updatedAt, b.userId, avg(br.rating) as avgRating '
          + 'FROM catalogue_project.blog_ratings as br right join catalogue_project.blogs as b '
          + 'on br.blogId = b.id '
          + 'where b.title like ? '
          + 'group by b.id, b.title, b.content, b.thumbnail, b.status, b.createdAt, b.updatedAt, b.userId limit ? offset ?',
          { replacements: ['%' + title + '%', limit, offset], type: seq.QueryTypes.SELECT }
        );
        res.status(200).json({ blogsByTitle });
      }
      if (title == '' && name != '') {
        const blogsByName = await seq.query('select b.id, b.title, b.content, b.thumbnail, b.status, b.createdAt, b.updatedAt, b.userId, avg(br.rating) as avgRating '
          + 'from catalogue_project.blogs b '
          + 'join catalogue_project.product_blog pb on b.id = pb.blogId '
          + 'join catalogue_project.templates t on pb.templateId = t.id '
          + 'LEFT JOIN catalogue_project.blog_ratings br ON b.id = br.blogId '
          + 'where t.name like ? '
          + 'group by b.id, b.title, b.content, b.thumbnail, b.status, b.createdAt, b.updatedAt, b.userId limit ? offset ?',
          { replacements: ['%' + name + '%', limit, offset], type: seq.QueryTypes.SELECT });
        res.status(200).json({ blogsByName });
      }
      if (title != '' && name != '') {
        const blogsByTitleAndName = await seq.query('select b.id, b.title, b.content, b.thumbnail, b.status, b.createdAt, b.updatedAt, b.userId, avg(br.rating) as avgRating '
          + 'from catalogue_project.blogs b '
          + 'join catalogue_project.product_blog pb on b.id = pb.blogId '
          + 'join catalogue_project.templates t on pb.templateId = t.id '
          + 'LEFT JOIN catalogue_project.blog_ratings br ON b.id = br.blogId '
          + 'where t.name like ? and b.title like ? '
          + 'group by b.id, b.title, b.content, b.thumbnail, b.status, b.createdAt, b.updatedAt, b.userId limit ? offset ?',
          { replacements: ['%' + name + '%', '%' + title + '%', limit, offset], type: seq.QueryTypes.SELECT });
        res.status(200).json({ blogsByTitleAndName });
      }

    } catch (error) {
      console.error(error);
      res.status(400).send({ message: "Something went wrong." });
    }
  }

  static async voteBlogCmt(req, res) {
    try {
      const userId = req.body.userId;
      const commentId = req.body.commentId;
      const voteType = req.body.voteType;
      if (!userId || !commentId || !voteType) {
        res.status(400).json({ message: "Missing required parameters." });
      }
      const comment = await blogComment.findByPk(commentId);
      if (!comment) {
        res.status(400).json({ message: "Comment not found." });
      }
      const existingVote = await voteBlogComment.findOne({
        where: {
          userId: userId,
          blogCommentId: commentId
        }
      })
      if (existingVote) {
        if (existingVote.vote == voteType) {
          res.status(200).json({ message: "You've already voted" })
        } else {
          existingVote.vote = voteType;
          await existingVote.save();
        }
      } else {
        await voteBlogComment.create({
          userId: userId,
          blogCommentId: commentId,
          vote: voteType
        });
      }
      const totalVote = await seq.query('select blogCommentId, sum(vote) as total_vote '
        + 'from catalogue_project.vote_blog_comments '
        + 'where blogCommentId = ? '
        + 'group by blogCommentId',
        { replacements: [commentId], type: seq.QueryTypes.SELECT });
      res.status(200).json({ totalVote });
    } catch (error) {
      console.error(error);
      res.status(400).send({ message: "Something went wrong." });
    }
  }


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
      console.log(blogRate)
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

  static async filterBlog(req, res) {
    let { rating, sortDate, page } = req.query;

    // Kiểm tra nếu người dùng nhập "date" hoặc "endate" để xác định cột sắp xếp và giá trị mặc định

    if (!rating) {
      return res.status(400).json({ message: "Missing required parameter 'rating'" });
    }

    if (!page) page = 1 // Sử dụng trang mặc định là 1 nếu không có giá trị page
    if (!sortDate) sortDate = "descDate"
    const limit = 4;
    const offset = (page - 1) * limit;

    try {
      const ratingBlogs = await seq.query(
        'SELECT ' +
        'b.id, b.title, b.content, b.thumbnail, b.status, b.userId, b.createdAt, b.updatedAt, AVG(br.rating) as avgRating ' +
        'FROM catalogue_project.blogs AS b ' +
        'JOIN catalogue_project.blog_ratings AS br ' +
        'ON b.id = br.blogId ' +
        'GROUP BY b.id, b.title, b.content, b.thumbnail, b.status, b.userId, b.createdAt, b.updatedAt ' +
        'Having AVG(br.rating) >= ?' +
        'ORDER BY b.createdAt' + ' ' + (sortDate === 'descDate' ? 'DESC' : 'ASC') + ' ' +
        'LIMIT ? OFFSET ?',
        {
          replacements: [rating, limit, offset],
          type: seq.QueryTypes.SELECT,
        }
      );

      res.status(200).json({ ratingBlogs });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "An error occurred while fetching ratingBlogs" });
    }
  }


}

exports.BlogController = BlogController;
