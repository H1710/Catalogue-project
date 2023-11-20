module.exports = (sequelize, DataTypes) => {
  const Template = sequelize.define(
    "template",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      thumbnail: {
        type: DataTypes.TEXT("long"),
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "Processing",
      },
      classService: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
    },
    {
      timeStamp: true,
    }
  );

  return Template;
};
