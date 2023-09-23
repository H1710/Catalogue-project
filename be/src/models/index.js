const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../db/dbConnection");

const db = {};

db.sequelize = sequelize;
db.user = require("./userModel")(sequelize, DataTypes);
db.servicePackage = require("./servicePackageModel")(sequelize, DataTypes);
db.blogComment = require("./blogCommentModel")(sequelize, DataTypes);
db.blog = require("./blogModel")(sequelize, DataTypes);
db.product = require("./productModel")(sequelize, DataTypes);
db.productPageDetail = require("./productPageDetailModel")(
  sequelize,
  DataTypes
);
db.feedback = require("./feedbackModel")(sequelize, DataTypes);
db.template = require("./templateModel")(sequelize, DataTypes);
db.templatePageDetail = require("./templatePageDetailModel")(
  sequelize,
  DataTypes
);
db.notification = require("./notificationModel")(sequelize, DataTypes);

db.sequelize.sync({ force: false }).then(() => {
  console.log("Re-sync success");
});

// Relations

const order = require("./orderModel")(sequelize, DataTypes);
db.order = order;
db.user.belongsToMany(db.servicePackage, { through: order });
db.servicePackage.belongsToMany(db.user, { through: order });

db.user.hasMany(db.blog);
db.blog.belongsTo(db.user, {
  foreignKey: "userId",
});

db.user.hasMany(db.blogComment);
db.blogComment.belongsTo(db.user, {
  foreignKey: "userId",
});

db.blog.hasMany(db.blogComment);
db.blogComment.belongsTo(db.blog, {
  foreignKey: "blogId",
});

db.user.hasMany(db.feedback);
db.feedback.belongsTo(db.user, {
  foreignKey: "userId",
});

db.template.hasMany(db.feedback);
db.feedback.belongsTo(db.template, {
  foreignKey: "templateId",
});

db.template.belongsToMany(db.blog, { through: "product_blog" });
db.blog.belongsToMany(db.template, { through: "product_blog" });

db.user.hasMany(db.product);
db.product.belongsTo(db.user, {
  foreignKey: "userId",
});

db.template.hasMany(db.product);
db.product.belongsTo(db.template, {
  foreignKey: "templateId",
});

const template_page = sequelize.define(
  "template_page",
  {},
  {
    timestamps: false,
  }
);
db.template_page = template_page;

db.template.hasMany(db.template_page);
db.template_page.belongsTo(db.template, {
  foreignKey: "templateId",
});

db.template_page.hasMany(db.templatePageDetail);
db.templatePageDetail.belongsTo(db.template_page, {
  foreignKey: "templatePageId",
});

const product_page = sequelize.define(
  "product_page",
  {},
  {
    timestamps: false,
  }
);
db.product_page = product_page;

db.product.hasMany(db.product_page);
db.product_page.belongsTo(db.product, {
  foreignKey: "productId",
});

db.product_page.hasMany(db.productPageDetail);
db.productPageDetail.belongsTo(db.product_page, {
  foreignKey: "productPageId",
});

db.user.hasMany(db.notification);
db.notification.belongsTo(db.user, {
  foreignKey: "userId",
});

module.exports = db;
