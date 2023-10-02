module.exports = (sequelize, DataTypes) => {
  const Role = sequelize.define(
    "role",
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
      classService: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      timeStamp: true,
    }
  );

  return Role;
};
