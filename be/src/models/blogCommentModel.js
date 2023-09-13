module.exports = (sequelize, DataTypes) => {
  const BlogComment = sequelize.define("blog_comment", {
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  });

  return BlogComment;
};
