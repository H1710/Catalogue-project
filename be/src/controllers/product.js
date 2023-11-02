const db = require("../models/index");

const Product = db.product;
const ProductPage = db.product_page;
const ProductPageDetail = db.productPageDetail;

class ProductController {
  static async createTemplate(req, res) {
    try {
      const { data } = req.body;
      console.log(data);
      const Product = await Product.create({
        name: "UnKnow",
      });

      // for (let i = 0; i < data.info.pages.length; i++) {
      //   const templatePage = await TemplatePage.create({
      //     templateId: template.dataValues.id,
      //   });

      //   for (let j = 0; j < data.info.pages[i].length; j++) {
      //     // console.log(data.info.pages[i][j]);
      //     await TemplatePageDetail.create({
      //       textInput: data.info.pages[i][j].textInput,
      //       imageInput: data.info.pages[i][j].imageInput,
      //       containerStyle: data.info.pages[i][j].containerStyle,
      //       inputStyle: data.info.pages[i][j].inputStyle,
      //       imageStyle: data.info.pages[i][j].imageStyle,
      //       defaultContent: data.info.pages[i][j].defaultContent,
      //       maxLength: data.info.pages[i][j].maxLength,
      //       isOneLine: data.info.pages[i][j].isOneLine,
      //       templatePageId: templatePage.dataValues.id,
      //     });
      //   }
      // }

      // res.status(200).send({ template: template });
    } catch (error) {
      res.status(500).send({ message: "Something went wrong" });
    }
  }
}
exports.ProductController = ProductController;
