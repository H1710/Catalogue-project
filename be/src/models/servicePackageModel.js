module.exports = (sequelize, DataTypes) => {
  const ServicePackage = sequelize.define("service_package", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    remain_day: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
  });

  return ServicePackage;
};
