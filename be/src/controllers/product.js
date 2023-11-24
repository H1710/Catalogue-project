const db = require("../models/index");

const User = db.user;
const Product = db.product;
const ProductPage = db.product_page;
const ProductPageDetail = db.productPageDetail;
const Template = db.template;
const TemplatePage = db.template_page;
const TemplatePageDetail = db.templatePageDetail;

class ProductController {
  static async createBlankProduct(req, res) {
    try {
      const { userId } = req.body;

      const template = {
        template_pages: [
          {
            template_page_details: [
              {
                name: "main_frame",
                type: "rect",
                id: Math.floor(Math.random() * 100 + 1),
                height: 418,
                width: 600,
                z_index: 1,
                color: "#fff",
                image: "",
              },
            ],
          },
        ],
      };
      const newProduct = await Product.create({
        name: "product-test",
        thumbnail:
          "https://variety.com/wp-content/uploads/2023/07/Tom-and-Jerry-Singapore-series-poster.jpg",
        userId: userId,
      });
      for (let i = 0; i < template.template_pages.length; i++) {
        const productPage = await ProductPage.create({
          productId: newProduct.id,
        });
        for (
          let j = 0;
          j < template.template_pages[i].template_page_details.length;
          j++
        ) {
          await ProductPageDetail.create({
            name: template.template_pages[i].template_page_details[j].name,
            type: template.template_pages[i].template_page_details[j].type,
            height: template.template_pages[i].template_page_details[j].height,
            width: template.template_pages[i].template_page_details[j].width,
            top: template.template_pages[i].template_page_details[j]?.top,
            left: template.template_pages[i].template_page_details[j]?.left,
            z_index:
              template.template_pages[i].template_page_details[j].z_index,
            color: template.template_pages[i].template_page_details[j].color,
            image: template.template_pages[i].template_page_details[j]?.image,
            productPageId: productPage.id,
          });
        }
      }

      return res.status(200).send({ message: "Create success" });
    } catch (error) {
      return res.status(500).send({ message: "Something went wrong" });
    }
  }

  static async getProductByUser(req, res) {
    try {
      const { userId } = req.params;
      const user = await User.findByPk(userId, {
        include: [
          {
            model: Product,
          },
        ],
      });
      // console.log(user.products);
      return res.status(200).send({ products: user.products });
    } catch (error) {
      return res.status(500).send({ message: "Something went wrong" });
    }
  }

  static async getProductById(req, res) {
    try {
      const { productId } = req.params;
      const product = await Product.findByPk(productId, {
        include: [
          {
            model: ProductPage,
            include: ProductPageDetail,
          },
        ],
      });
      res.status(200).send({ product: product });
    } catch (error) {
      res.status(500).send({ message: "Something went wrong" });
    }
  }

  static async saveProduct(req, res) {
    try {
      const data = req.body;
      const productId = data.product_page[0].productId;

      const listPage = await ProductPage.findAll({
        where: {
          productId: productId,
        },
      });

      for (let page of listPage) {
        await ProductPageDetail.destroy({
          where: {
            productPageId: page.dataValues.id,
          },
        });
      }

      await ProductPage.destroy({
        where: {
          productId: productId,
        },
      });
      for (let page of data.product_page) {
        const newPage = await ProductPage.create({
          productId: productId,
        });
        const pageId = newPage.id;
        for (let detail of page.product_page_details) {
          await ProductPageDetail.create({
            name: detail.name,
            type: detail.type,
            height: detail.height,
            width: detail.width,
            top: detail?.top,
            left: detail?.left,
            z_index: detail.z_index,
            rotate: detail?.rotate,
            text: detail?.text,
            fontSize: detail?.fontSize,
            fontWeight: detail?.fontWeight,
            fontFamily: detail?.fontFamily,
            color: detail.color,
            image: detail?.image,
            productPageId: pageId,
          });
        }
      }
      if (data.thumbnail) {
        const product = await Product.findByPk(productId);
        product.thumbnail = data.thumbnail;
        await product.save();
      }

      res.status(200).send({ message: "Success" });

      // console.log(data);
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: "Something went wrong" });
    }
  }

  static async saveProductName(req, res) {
    try {
      const { productId, newName } = req.body;

      const product = await Product.findByPk(productId);

      if (!product) {
        return res.status(404).send({ message: "Product not found" });
      }

      product.name = newName;
      await product.save();

      return res.status(200).send({ message: "Save name success" });
    } catch (err) {
      return res.status(500).send({ message: "Something went wrong" });
    }
  }

  static async cloneTemplate(req, res) {
    try {
      const { templateId, userId } = req.body;
      const template = await Template.findByPk(templateId, {
        include: [
          {
            model: TemplatePage,
            include: TemplatePageDetail,
          },
        ],
      });
      const templateData = template.dataValues;
      const newProduct = await Product.create({
        name: templateData.name,
        thumbnail: templateData.thumbnail,
        userId: userId,
      });

      for (let i = 0; i < templateData.template_pages.length; i++) {
        const productPage = await ProductPage.create({
          productId: newProduct.id,
        });
        for (
          let j = 0;
          j < templateData.template_pages[i].template_page_details.length;
          j++
        ) {
          await ProductPageDetail.create({
            name: templateData.template_pages[i].template_page_details[j].name,
            type: templateData.template_pages[i].template_page_details[j].type,
            height:
              templateData.template_pages[i].template_page_details[j].height,
            width:
              templateData.template_pages[i].template_page_details[j].width,
            rotate:
              templateData.template_pages[i].template_page_details[j]?.rotate,
            text: templateData.template_pages[i].template_page_details[j]?.text,
            top: templateData.template_pages[i].template_page_details[j]?.top,
            left: templateData.template_pages[i].template_page_details[j]?.left,
            fontSize:
              templateData.template_pages[i].template_page_details[j]?.fontSize,
            fontWeight:
              templateData.template_pages[i].template_page_details[j]
                ?.fontWeight,
            fontFamily:
              templateData.template_pages[i].template_page_details[j]
                ?.fontFamily,
            z_index:
              templateData.template_pages[i].template_page_details[j].z_index,
            color:
              templateData.template_pages[i].template_page_details[j].color,
            image:
              templateData.template_pages[i].template_page_details[j]?.image,
            productPageId: productPage.id,
          });
        }
      }
      return res.status(200).send({productId: newProduct.id, message: "Clone template success" });
    } catch (error) {
      console.log(error);
      return res.status(500).send({ message: "Something went wrong" });
    }
  }
}
exports.ProductController = ProductController;
