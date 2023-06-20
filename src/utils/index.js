const ValidationUtil = require("./validation.util");
const { asClass } = require("awilix");

const initUtil = () => {
  return {
    ValidationUtil: asClass(ValidationUtil),
  };
};

module.exports = initUtil;
