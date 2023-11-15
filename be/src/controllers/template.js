const db = require("../models/index");
const uploadImage = require("../utils/uploadImage");
const seq = require("../db/dbConnection");
const Template = db.template;
const RatingTemplate = db.templateRating;
const TemplatePage = db.template_page;
const TemplatePageDetail = db.templatePageDetail;
const User = db.user;
const { Op, literal } = require("sequelize");
class TemplateController {
  static async createTemplate(req, res) {
    try {
      const { userId, tags, name, template } = req.body;
      const thumbnail = req.file;

      const templateData = await JSON.parse(template);
      const data = await uploadImage(thumbnail.filename, thumbnail.mimetype);
      const newTemplate = await Template.create({
        name: name,
        thumbnail: data.data.webContentLink,
        rating: 5,
        authorId: userId,
        userId: userId,
      });

      for (let i = 0; i < templateData.length; i++) {
        const templatePage = await TemplatePage.create({
          templateId: newTemplate.id,
        });
        console.log(template[i]);
        for (let j = 0; j < templateData[i].product_page_details.length; j++) {
          await TemplatePageDetail.create({
            name: templateData[i].product_page_details[j].name,
            type: templateData[i].product_page_details[j].type,
            height: templateData[i].product_page_details[j].height,
            width: templateData[i].product_page_details[j].width,
            rotate: templateData[i].product_page_details[j]?.rotate,
            text: templateData[i].product_page_details[j]?.text,
            top: templateData[i].product_page_details[j]?.top,
            left: templateData[i].product_page_details[j]?.left,
            z_index: templateData[i].product_page_details[j].z_index,
            color: templateData[i].product_page_details[j].color,
            image: templateData[i].product_page_details[j]?.image,
            templatePageId: templatePage.id,
          });
        }
      }

      return res
        .status(200)
        .send({ template: { components: template, id: newTemplate.id } });
    } catch (error) {
      console.log(error);
      return res.status(500).send({ message: "Something went wrong" });
    }
  }

  static async getAllTemplate(req, res) {
    try {
      const template = await Template.findAll({
        include: [
          {
            model: TemplatePage,
            include: [TemplatePageDetail],
          },
        ],
      });
      res.status(200).send({ data: template });
    } catch (error) {
      res.status(500).send({ message: "Something went wrong" });
    }
  }

  static async getTemplateProcessing(req, res) {
    try {
      const status = req.params.status;
      console.log(status);

      const templates = await Template.findAll({
        where: {
          status: status,
        },
      });

      res.status(200).json({
        templates: templates,
      });
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: "Something went wrong" });
    }
  }

  static async searchTemplateByName(req, res) {
    try {
      const name = req.params.name;
      console.log(name);

      const templates = await Template.findAll({
        where: literal(`name LIKE '%${name}%'`),
      });

      res.status(200).json({
        templates: templates,
      });
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: "Something went wrong" });
    }
  }

  static async getTemplate(req, res) {
    try {
      const templateId = req.params.templateId;
      const template = await Template.findByPk(templateId, {
        include: [
          {
            model: TemplatePage,
            include: TemplatePageDetail,
          },
          {
            model: User,
            attributes: ["name"],
          },
        ],
      });
      res.status(200).send({ data: template });
    } catch (error) {
      res.status(500).send({ message: "Something went wrong" });
    }
  }

  static async acceptTemplate(req, res) {
    try {
      const { templateId } = req.body;
      const template = await Template.findByPk(templateId);

      if (!template) {
        return res.status(404).json({ message: "Template not found" });
      }

      await template.update({
        status: "Accepted",
      });

      return res
        .status(200)
        .json({ message: "Update template successfully", template });
    } catch (error) {
      console.error(error);
      res.status(400).send({ message: "Something went wrong." });
    }
  }

  static async deniedTemplate(req, res) {
    try {
      const { templateId } = req.body;
      const template = await Template.findByPk(templateId);

      if (!template) {
        return res.status(404).json({ message: "Template not found" });
      }

      await template.update({
        status: "Cancelled",
      });

      return res
        .status(200)
        .json({ message: "Update template successfully", template });
    } catch (error) {
      console.error(error);
      res.status(400).send({ message: "Something went wrong." });
    }
  }

  static async getAcceptedTemplate(req, res) {
    try {
      let page = req.query.page;
      if (!page) {
        page = 1;
      }
      let sort = req.query.sort;
      if (sort == "") {
        sort = "asc";
      }
      const limit = 10;
      const offset = (page - 1) * limit;
      const templates = await Template.findAll({
        include: [
          {
            model: RatingTemplate,
            attributes: [],
          },
        ],
        attributes: [
          "id",
          "name",
          "thumbnail",
          "createdAt",
          "status",
          [seq.fn("AVG", seq.col("template_ratings.rating")), "avgRating"],
        ],
        where: {
          status: "Accepted",
        },
        offset: (page - 1) * limit,
        limit: limit,
        subQuery: false,
      });

      res.status(200).json({
        templates: templates,
      });
    } catch (error) {
      console.error(error);
      res.status(400).send({ message: "Something went wrong." });
    }
  }

  static async ratingTemplate(req, res) {
    try {
      const { templateId, userId, rating } = req.body;

      // Assuming you have a RatingTemplate model
      const templateRate = await RatingTemplate.findOne({
        where: { templateId, userId },
      });

      if (templateRate) {
        // Update the existing rating
        await templateRate.update({ rating });
        return res.status(200).json({ message: "Rating updated successfully" });
      } else {
        // Create a new rating
        await RatingTemplate.create({
          userId: userId,
          templateId: templateId,
          rating: rating,
        });
        return res.status(201).json({ message: "Rating created successfully" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
}

exports.TemplateController = TemplateController;
