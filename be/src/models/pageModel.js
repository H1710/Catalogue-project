module.exports = (sequelize, DataTypes) => {
  const Page = sequelize.define(
    "page",
    {},
    {
      timestamps: false,
    }
  );

  return Page;
};
