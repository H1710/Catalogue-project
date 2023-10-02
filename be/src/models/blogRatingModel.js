module.exports = (sequelize, DataTypes) => {
  const BlogRating = sequelize.define("blog_rating", {
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });

  return BlogRating;
};
