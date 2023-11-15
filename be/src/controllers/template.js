const db = require("../models/index");
const uploadImage = require("../utils/uploadImage");

const Template = db.template;
const TemplatePage = db.template_page;
const TemplatePageDetail = db.templatePageDetail;
const User = db.user;

class TemplateController {
  static async createTemplate(req, res) {
    try {
      const { userId, tags, name, template } = req.body;
      const thumbnail = req.file;

      const templateData = await JSON.parse(template);
      console.log(templateData);
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
}

exports.TemplateController = TemplateController;
