const { asClass } = require("awilix");
const ListRepository = require("./list.repository");

const initRepository = () => {
  return {
    ListRepository: asClass(ListRepository),
  };
};

module.exports = initRepository;
