module.exports = (sequelize, DataTypes) => {
  const ProductPageDetail = sequelize.define(
    "product_page_detail",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      type: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      height: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      width: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      top: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      left: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      z_index: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      color: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      rotate: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      image: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      timestamps: false,
    }
  );

  return ProductPageDetail;
};
