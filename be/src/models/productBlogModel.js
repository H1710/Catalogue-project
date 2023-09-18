module.exports = (sequelize, DataTypes) => {
  const ProductBlog = sequelize.define(
    "product_blog",
    {},
    {
      timestamps: false,
    }
  );

  return ProductBlog;
};
