const db = require("../models/index");

const Template = db.template;
const TemplatePage = db.template_page;
const TemplatePageDetail = db.templatePageDetail;

class TemplateController {
  static async createTemplate(req, res) {
    try {
      const data = req.body;
      const template = await Template.create({
        name: "UnKnow",
        rating: 5.0,
        styleGeneric: data.info.styleGeneric,
      });

      for (let i = 0; i < data.info.pages.length; i++) {
        const templatePage = await TemplatePage.create({
          templateId: template.dataValues.id,
        });

        for (let j = 0; j < data.info.pages[i].length; j++) {
          // console.log(data.info.pages[i][j]);
          await TemplatePageDetail.create({
            textInput: data.info.pages[i][j].textInput,
            imageInput: data.info.pages[i][j].imageInput,
            containerStyle: data.info.pages[i][j].containerStyle,
            inputStyle: data.info.pages[i][j].inputStyle,
            imageStyle: data.info.pages[i][j].imageStyle,
            defaultContent: data.info.pages[i][j].defaultContent,
            maxLength: data.info.pages[i][j].maxLength,
            isOneLine: data.info.pages[i][j].isOneLine,
            templatePageId: templatePage.dataValues.id,
          });
        }
      }

      res.status(200).send({ template: template });
    } catch (error) {
      res.status(500).send({ message: "Something went wrong" });
    }
  }
  static async getTemplate(req, res) {
    try {
      const id = req.params.id;
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
}

exports.TemplateController = TemplateController;
