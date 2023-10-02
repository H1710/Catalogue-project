module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define(
    "order",
    {},
    {
      timestamps: true,
    }
  );

  return Order;
};
