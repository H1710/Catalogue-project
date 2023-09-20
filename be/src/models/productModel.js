module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define("product", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    styleGeneric: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  });

  return Product;
};
