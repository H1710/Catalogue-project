module.exports = (sequelize, DataTypes) => {
  const Template = sequelize.define(
    "template",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      rating: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      styleGeneric: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      voted: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    },
    {
      timeStamp: true,
    }
  );

  return Template;
};
