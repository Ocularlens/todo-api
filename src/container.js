const { createContainer } = require("awilix");
const initDatabase = require("./models");
const initRepository = require("./repositories");
const initControllers = require("./controllers");
const initRoutes = require("./routes");
const initUtil = require("./utils");
const initSchemas = require("./schema");

const container = createContainer();

const setUp = () => {
  const { models, dbConnection } = initDatabase();
  const repos = initRepository();
  const controllers = initControllers();
  const routes = initRoutes();
  const utils = initUtil();
  const schemas = initSchemas();
  container.register({ ...models });
  container.register({ ...repos });
  container.register({ ...routes });
  container.register({ ...controllers });
  container.register({ ...utils });
  container.register({ ...schemas });
  container.register({ database: dbConnection });
};

module.exports = { setUp, container };
