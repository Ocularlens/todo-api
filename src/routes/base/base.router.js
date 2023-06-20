const { Router } = require("express");

class BaseRouter {
  constructor() {
    this.router = Router();
  }
}

module.exports = BaseRouter;
