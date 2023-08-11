const { setUp, container } = require("./container");
const cors = require("cors");
const bodyParser = require("body-parser");
const { PORT, NODE_ENV } = require("./config/config");

const express = require("express");

class Server {
  constructor() {
    this.server = express();
    this.config();
  }

  config() {
    this.server.use(cors());
    this.server.use(bodyParser.json());
    this.routes();
  }

  routes() {
    const listRoutes = container.resolve("ListRouter");
    this.server.use("/list", listRoutes.router);
  }

  async start() {
    const database = container.resolve("database");
    const isDev = NODE_ENV === "development" ? true : false;
    await database.sync({ alter: isDev });
    this.server.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  }
}

const startServer = async () => {
  setUp();
  const server = new Server();
  await server.start();
};

startServer();

module.exports = startServer;
