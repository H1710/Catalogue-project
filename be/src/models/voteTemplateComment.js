module.exports = (sequelize, DataTypes) => {
  const VoteTemplateComment = sequelize.define("vote_template_comment", {
    vote: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  });

  return VoteTemplateComment;
};
