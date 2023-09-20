module.exports = (sequelize, DataTypes) => {
  const TemplatePageDetail = sequelize.define(
    "template_page_detail",
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
        allowNull: true,
      },
      imageStyle: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      defaultContent: {
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

  return TemplatePageDetail;
};
