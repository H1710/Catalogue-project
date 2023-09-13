module.exports = (sequelize, DataTypes) => {
  const Feedback = sequelize.define("feedback", {
    rate: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });

  return Feedback;
};
