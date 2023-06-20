const { asClass } = require("awilix");
const ListRouter = require("./list.router");

const initControllers = () => {
  return {
    ListRouter: asClass(ListRouter),
  };
};

module.exports = initControllers;
