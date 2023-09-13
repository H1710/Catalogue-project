module.exports = (sequelize, DataTypes) => {
  const PageDetail = sequelize.define("page_detail", {
    location: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image_url: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  });

  return PageDetail;
};
