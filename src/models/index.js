const ListModel = require("./list.model");
const { asValue } = require("awilix");
const { Sequelize } = require("sequelize");
const {
  MYSQL_DATABASE,
  MYSQL_HOST,
  MYSQL_USERNAME,
  MYSQL_PASSWORD,
  MYSQL_PORT,
} = require("../config/config");

module.exports = () => {
  try {
    const dbConnection = new Sequelize({
      host: MYSQL_HOST,
      port: MYSQL_PORT,
      dialect: "mysql",
      username: MYSQL_USERNAME,
      password: MYSQL_PASSWORD,
      database: MYSQL_DATABASE,
    });

    // init models
    const models = {
      ListModel: asValue(ListModel(dbConnection)),
    };
    return { models, dbConnection: asValue(dbConnection) };
  } catch (error) {
    console.log(error);
    console.log("Database connection error");
  }
};
