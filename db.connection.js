const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
    "Stopper",
    "User",
    "7$ZmJYYQ<zF1(GSb",
    {
      host: "34.88.151.159",
      dialect: "mysql",
      port: 3306,
      logging: console.log,
    },
);

module.exports = sequelize