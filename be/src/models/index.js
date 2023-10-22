const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../db/dbConnection");

const db = {};

db.sequelize = sequelize;
db.user = require("./userModel")(sequelize, DataTypes);
db.servicePackage = require("./servicePackageModel")(sequelize, DataTypes);

db.blogComment = require("./blogCommentModel")(sequelize, DataTypes);
db.blogRating = require("./blogRatingModel")(sequelize, DataTypes);
db.blog = require("./blogModel")(sequelize, DataTypes);
db.voteBlogComment = require("./voteBlogCommentModel")(sequelize, DataTypes);

db.product = require("./productModel")(sequelize, DataTypes);
db.productPageDetail = require("./productPageDetailModel")(
  sequelize,
  DataTypes
);

db.templateRating = require("./templateRatingModel")(sequelize, DataTypes);
db.templateComment = require("./templateCommentModel")(sequelize, DataTypes);
db.template = require("./templateModel")(sequelize, DataTypes);
db.voteTemplateComment = require("./voteTemplateComment")(sequelize, DataTypes);

db.templatePageDetail = require("./templatePageDetailModel")(
  sequelize,
  DataTypes
);
db.notification = require("./notificationModel")(sequelize, DataTypes);
db.role = require("./roleModel")(sequelize, DataTypes);
db.tag = require("./tagModel")(sequelize, DataTypes);

db.sequelize.sync({ force: false }).then(() => {
  console.log("Re-sync success");
});

// Relations

db.role.hasMany(db.user);
db.user.belongsTo(db.role, {
  foreignKey: "roleId",
});

const order = require("./orderModel")(sequelize, DataTypes);
db.order = order;
db.user.hasMany(db.order);
db.order.belongsTo(db.user);
db.servicePackage.hasMany(db.order);
db.order.belongsTo(db.servicePackage);

db.user.belongsTo(db.servicePackage);
db.servicePackage.hasMany(db.user);

db.template.belongsTo(db.servicePackage);
db.servicePackage.hasMany(db.template);

db.user.hasMany(db.blog);
db.blog.belongsTo(db.user, {
  foreignKey: "userId",
});

db.user.hasMany(db.template);
db.template.belongsTo(db.user, {
  foreignKey: "authorId",
});

db.user.hasMany(db.blogComment);
db.blogComment.belongsTo(db.user, {
  foreignKey: "userId",
});

db.blog.hasMany(db.blogComment);
db.blogComment.belongsTo(db.blog, {
  foreignKey: "blogId",
});

db.blogComment.belongsTo(db.blogComment, {
  foreignKey: "replyCommentId",
});
db.blogComment.hasMany(db.blogComment, {
  foreignKey: "replyCommentId",
});

db.blogComment.belongsToMany(db.user, {
  through: db.voteBlogComment,
});
db.user.belongsToMany(db.blogComment, {
  through: db.voteBlogComment,
});

db.user.hasMany(db.blogRating);
db.blogRating.belongsTo(db.user, {
  foreignKey: "userId",
});

db.blog.hasMany(db.blogRating);
db.blogRating.belongsTo(db.blog);

db.user.hasMany(db.templateComment);
db.templateComment.belongsTo(db.user, {
  foreignKey: "userId",
});

db.template.hasMany(db.templateComment);
db.templateComment.belongsTo(db.template, {
  foreignKey: "templateId",
});

db.templateComment.belongsToMany(db.user, {
  through: db.voteTemplateComment,
});
db.user.belongsToMany(db.templateComment, {
  through: db.voteTemplateComment,
});

db.templateComment.belongsTo(db.templateComment, {
  foreignKey: "replyCommentId",
  useJunctionTable: false,
});
db.templateComment.hasMany(db.templateComment, {
  foreignKey: "replyCommentId",
  useJunctionTable: false,
});

db.user.hasMany(db.templateRating);
db.templateRating.belongsTo(db.user, {
  foreignKey: "userId",
});

db.template.hasMany(db.templateRating);
db.templateRating.belongsTo(db.template, {
  foreignKey: "templateId",
});

db.template.belongsToMany(db.tag, { through: "teamplate_tag" });
db.tag.belongsToMany(db.template, { through: "teamplate_tag" });

db.blog.belongsToMany(db.tag, { through: "blog_tag" });
db.tag.belongsToMany(db.blog, { through: "blog_tag" });

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
