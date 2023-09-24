const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize("test", "root", "giao2403", {
  host: "localhost",
  dialect: "mysql",
  operatorsAliases: false,

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

module.exports = sequelize;
