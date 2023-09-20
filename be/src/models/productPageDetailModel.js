module.exports = (sequelize, DataTypes) => {
  const ProductPageDetail = sequelize.define(
    "product_page_detail",
    {
      textInput: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      imageInput: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      containerStyle: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      inputStyle: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      maxLength: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      isOneLine: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
    },
    {
      timestamps: false,
    }
  );

  return ProductPageDetail;
};
