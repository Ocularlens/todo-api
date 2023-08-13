const { createContainer } = require("awilix");
const initDatabase = require("./models");
const initRepository = require("./repositories");
const initControllers = require("./controllers");
const initRoutes = require("./routes");
const initMiddleware = require("./middleware");
const initSchemas = require("./schema");
const initUtils = require("./utils");

const container = createContainer();

const setUp = () => {
  const { models, dbConnection } = initDatabase();
  const repos = initRepository();
  const controllers = initControllers();
  const routes = initRoutes();
  const middlewares = initMiddleware();
  const schemas = initSchemas();
  const utils = initUtils();
  container.register({ ...models });
  container.register({ ...utils });
  container.register({ ...repos });
  container.register({ ...routes });
  container.register({ ...controllers });
  container.register({ ...middlewares });
  container.register({ ...schemas });
  container.register({ database: dbConnection });
};

module.exports = { setUp, container };
