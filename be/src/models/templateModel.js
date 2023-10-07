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
    },
    {
      timeStamp: true,
    }
  );

  return Template;
};
