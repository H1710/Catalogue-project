const db = require("../models/index");

const Template = db.template;
const TemplatePage = db.template_page;
const TemplatePageDetail = db.templatePageDetail;
const User = db.user;

class TemplateController {
  static async createTemplate(req, res) {
    try {
      const { data } = req.body;
      const { userId } = data;
      console.log(userId);
      const newTemplate = await Template.create({
        name: "product-test",
        thumbnail:
          "https://variety.com/wp-content/uploads/2023/07/Tom-and-Jerry-Singapore-series-poster.jpg",
        rating: 5,
        authorId: userId,
        userId: userId,
      });

      const { template } = data;
      for (let i = 0; i < template.length; i++) {
        const templatePage = await TemplatePage.create({
          templateId: newTemplate.id,
        });
        for (let j = 0; j < template[i].product_page_details.length; j++) {
          await TemplatePageDetail.create({
            name: template[i].product_page_details[j].name,
            type: template[i].product_page_details[j].type,
            height: template[i].product_page_details[j].height,
            width: template[i].product_page_details[j].width,
            top: template[i].product_page_details[j]?.top,
            left: template[i].product_page_details[j]?.left,
            z_index: template[i].product_page_details[j].z_index,
            color: template[i].product_page_details[j].color,
            image: template[i].product_page_details[j]?.image,
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
