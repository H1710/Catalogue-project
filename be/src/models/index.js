const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../db/dbConnection");

const db = {};

db.sequelize = sequelize;
db.user = require("./userModel")(sequelize, DataTypes);
db.servicePackage = require("./servicePackageModel")(sequelize, DataTypes);
db.blogComment = require("./blogCommentModel")(sequelize, DataTypes);
db.blog = require("./blogModel")(sequelize, DataTypes);
db.product = require("./productModel")(sequelize, DataTypes);
db.pageDetail = require("./pageDetailModel")(sequelize, DataTypes);
db.feedback = require("./feedbackModel")(sequelize, DataTypes);
db.template = require("./templateModel")(sequelize, DataTypes);
db.page = require("./pageModel")(sequelize, DataTypes);

db.sequelize.sync({ force: false }).then(() => {
  console.log("Re-sync success");
});

// Relations

const order = require("./orderModel")(sequelize, DataTypes);
db.user.belongsToMany(db.servicePackage, { through: order });
db.servicePackage.belongsToMany(db.user, { through: order });

db.user.hasMany(db.blogComment);
db.blogComment.belongsTo(db.user);

db.blog.hasMany(db.blogComment);
db.blogComment.belongsTo(db.blog);

db.user.hasMany(db.blog);
db.blog.belongsTo(db.user);

db.user.hasMany(db.feedback);
db.feedback.belongsTo(db.user);
db.template.hasMany(db.feedback);
db.feedback.belongsTo(db.template);

db.template.belongsToMany(db.blog, { through: "product_blog" });
db.blog.belongsToMany(db.template, { through: "product_blog" });

db.user.hasMany(db.product);
db.product.belongsTo(db.user);
db.template.hasMany(db.product);
db.product.belongsTo(db.template);

db.product.belongsToMany(db.page, {
  through: "product_page",
});
db.page.belongsToMany(db.product, {
  through: "product_page",
});
db.page.hasMany(db.pageDetail);
db.pageDetail.belongsTo(db.page);

module.exports = db;
