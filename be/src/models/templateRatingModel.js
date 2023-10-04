module.exports = (sequelize, DataTypes) => {
  const TemplateComment = sequelize.define(
    "template_comment",
    {
      date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      vote: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    },
    {
      timeStamp: true,
    }
  );

  return TemplateComment;
};
