module.exports = (sequelize, DataTypes) => {
  const TemplateComment = sequelize.define(
    "template_comment",
    {
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      total_vote: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0,
      },
    },
    {
      timeStamp: true,
    }
  );

  return TemplateComment;
};
