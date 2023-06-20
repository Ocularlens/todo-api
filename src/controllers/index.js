const ListController = require("./list.controller");
const { asClass } = require("awilix");

const initControllers = () => {
  return {
    ListController: asClass(ListController),
  };
};

module.exports = initControllers;
