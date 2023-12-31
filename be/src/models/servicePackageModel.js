module.exports = (sequelize, DataTypes) => {
  const ServicePackage = sequelize.define(
    "service_package",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      remain_day: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      classService: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      timestamps: false,
    }
  );

  return ServicePackage;
};
