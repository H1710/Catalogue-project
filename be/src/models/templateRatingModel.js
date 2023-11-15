module.exports = (sequelize, DataTypes) => {
  const TemplateRating = sequelize.define("template_rating", {
    rating: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false,
    },
  });

  return TemplateRating;
};
