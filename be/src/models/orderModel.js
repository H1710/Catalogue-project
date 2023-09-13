module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define("order", {
    purchase_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
  });

  return Order;
};
