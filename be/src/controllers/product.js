const db = require("../models/index");

const User = db.user;
const Product = db.product;
const ProductPage = db.product_page;
const ProductPageDetail = db.productPageDetail;

class ProductController {
  static async createProduct(req, res) {
    try {
      const { data } = req.body;
      const newProduct = await Product.create({
        name: "product-test",
        thumbnail:
          "https://variety.com/wp-content/uploads/2023/07/Tom-and-Jerry-Singapore-series-poster.jpg",
        userId: data.userId,
      });

      const { product } = data;
      for (let i = 0; i < product.length; i++) {
        const productPage = await ProductPage.create({
          productId: newProduct.id,
        });
        for (let j = 0; j < product[i].length; j++) {
          await ProductPageDetail.create({
            name: product[i][j].name,
            type: product[i][j].type,
            height: product[i][j].height,
            width: product[i][j].width,
            top: product[i][j]?.top,
            left: product[i][j]?.left,
            z_index: product[i][j].z_index,
            color: product[i][j].color,
            image: product[i][j]?.image,
            productPageId: productPage.id,
          });
        }
      }

      return res
        .status(200)
        .send({ product: { components: product, id: newProduct.id } });
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
      for (let page of data.product_page) {
        const product_page = await ProductPage.findOne({
          where: {
            id: page.id,
            productId: productId,
          },
        });
        let pageId;
        if (!product_page) {
          const newPage = await ProductPage.create({
            productId: productId,
          });
          console.log("2  " + newPage);
          pageId = newPage.id;
        } else {
          console.log(product_page);
          pageId = product_page.id;
          console.log("1  " + product_page.id);
        }
        // console.log(pageId);
        for (let detail of page.product_page_details) {
          let product_page_detail = await ProductPageDetail.findOne({
            where: {
              id: detail.id,
              productPageId: pageId,
            },
          });
          if (!product_page_detail) {
            console.log(detail);

            await ProductPageDetail.create({
              name: detail.name,
              type: detail.type,
              height: detail.height,
              width: detail.width,
              top: detail?.top,
              left: detail?.left,
              z_index: detail.z_index,
              color: detail.color,
              image: detail?.image,
              productPageId: pageId,
            });
          } else {
            product_page_detail.name = detail.name;
            product_page_detail.type = detail.type;
            product_page_detail.height = detail.height;
            product_page_detail.width = detail.width;
            product_page_detail.top = detail?.top;
            product_page_detail.left = detail?.left;
            product_page_detail.z_index = detail.z_index;
            product_page_detail.color = detail.color;
            product_page_detail.image = detail?.image;
            await product_page_detail.save();
          }
        }
      }
      res.status(200).send({ message: "Success" });

      // console.log(data);
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: "Something went wrong" });
    }
  }

  static async cloneTemplate(req, res) {
    try {
      const { template, userId } = req.body;
      console.log(req.body);
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
      return res.status(200).send({ message: "Success" });
    } catch (error) {
      console.log(error);
      return res.status(500).send({ message: "Something went wrong" });
    }
  }
}
exports.ProductController = ProductController;
