module.exports = (sequelize, DataTypes) => {
  const Template = sequelize.define(
    "template",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      thumbnail: {
        type: DataTypes.TEXT,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "Processing",
      },
    },
    {
      timeStamp: true,
    }
  );

  return Template;
};
