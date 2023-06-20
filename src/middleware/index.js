const ValidationMiddleware = require("./validation.middleware");
const { asClass } = require("awilix");

const initUtil = () => {
  return {
    ValidationMiddleware: asClass(ValidationMiddleware),
  };
};

module.exports = initUtil;
