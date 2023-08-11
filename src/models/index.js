const _ = require('lodash');
const fs = require('fs');
const { asValue } = require("awilix");
const { Sequelize, DataTypes } = require("sequelize");
const {
  MYSQL_DATABASE,
  MYSQL_HOST,
  MYSQL_USERNAME,
  MYSQL_PASSWORD,
  MYSQL_PORT,
  NODE_ENV,
} = require("../config/config");

const loadModels = (sequelize) => {
  const files = fs.readdirSync(__dirname);
  const selectedModels = {};

  files.forEach(file => {
    if (file === 'index.js') return;

    const model = require(`./${file}`);
    const modelName = _.capitalize(file.split('.')[0])+_.capitalize(file.split('.')[1]);
    selectedModels[modelName] = asValue(model(sequelize, DataTypes));
  });

  return selectedModels;
}

module.exports = () => {
  try {
    const dbConnection = new Sequelize({
      host: MYSQL_HOST,
      port: MYSQL_PORT,
      dialect: "mysql",
      username: MYSQL_USERNAME,
      password: MYSQL_PASSWORD,
      database: MYSQL_DATABASE,
      logging: NODE_ENV !== "testing" ? true : false,
    });

    // init models
    const models = loadModels(dbConnection);

    return { models, dbConnection: asValue(dbConnection) };
  } catch (error) {
    console.log(error);
    console.log("Database connection error");
  }
};
