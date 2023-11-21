const db = require("../models/index");
const uploadImage = require("../utils/uploadImage");
const seq = require("../db/dbConnection");
const { Op, literal } = require("sequelize");
const cloudinary = require("../utils/cloudinary");

const Template = db.template;
const RatingTemplate = db.templateRating;
const TemplatePage = db.template_page;
const TemplatePageDetail = db.templatePageDetail;
const User = db.user;

class TemplateController {
  static async createTemplate(req, res) {
    try {
      const { userId, tags, name, template } = req.body;
      const thumbnail = req.file;

      const templateData = await JSON.parse(template);
      const result = await cloudinary.uploader.upload(thumbnail.path, {
        public_id: thumbnail.originalname,
        resource_type: "auto",
        folder: "noto",
        use_filename: true,
        unique_filename: false,
      });
      const newTemplate = await Template.create({
        name: name,
        thumbnail: result.url,
        authorId: userId,
        userId: userId,
      });

      for (let i = 0; i < templateData.length; i++) {
        const templatePage = await TemplatePage.create({
          templateId: newTemplate.id,
        });
        for (let j = 0; j < templateData[i].product_page_details.length; j++) {
          await TemplatePageDetail.create({
            name: templateData[i].product_page_details[j].name,
            type: templateData[i].product_page_details[j].type,
            height: templateData[i].product_page_details[j].height,
            width: templateData[i].product_page_details[j].width,
            rotate: templateData[i].product_page_details[j]?.rotate,
            text: templateData[i].product_page_details[j]?.text,
            fontSize: templateData[i].product_page_details[j]?.fontSize,
            fontWeight: templateData[i].product_page_details[j]?.fontWeight,
            fontFamily: templateData[i].product_page_details[j]?.fontFamily,
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

  static async getTemplateByStatus(req, res) {
    try {
      const status = req.params.status;

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

  static async getProcessingTemplate(req, res) {
    try {
      const templates = await Template.findAll({
        where: {
          status: "Processing",
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
      const { templateId, userId } = req.params;
      const template = await Template.findByPk(templateId, {
        include: [
          {
            model: RatingTemplate,
            attributes: [],
          },
          {
            model: User,
            attributes: ["name"],
          },
          {
            model: TemplatePage,
            include: TemplatePageDetail,
          },
        ],
        attributes: [
          "id",
          "name",
          "classService",
          [seq.fn("AVG", seq.col("template_ratings.rating")), "avgRating"],
        ],
        group: [
          "id",
          "name",
          "classService",
          "template.id",
          "template_pages.id",
          "template_pages.template_page_details.id",
        ],
      });
      const currentRating = await RatingTemplate.findOne({
        where: {
          userId: userId,
          templateId: templateId,
        },
      });
      res.status(200).send({ data: template, currentRating });
    } catch (error) {
      console.log(error);
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
        attributes: [
          "id",
          "name",
          "thumbnail",
          "createdAt",
          "status",
          "classService",
        ],
        where: {
          status: "Accepted",
        },
        offset: (page - 1) * limit,
        limit: limit,
        subQuery: false,
      });

      res.status(200).json(templates);
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
  static async updateService(req, res) {
    const templateId = req.params.id;
    const classService = req.body.info.classService;
    try {
      const template = await Template.findByPk(templateId);

      if (!template) {
        return res.status(404).json({ message: "Template not found" });
      }

      await template.update({ classService });

      res.status(200).json({ message: "Update class service successfully" });
    } catch (error) {
      console.error("Error updating template:", error);
      res.status(500).json({ message: "Something went wrong" });
    }
  }
}

exports.TemplateController = TemplateController;
