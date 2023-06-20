const BaseRouter = require("./base/base.router");

class ListRouter extends BaseRouter {
  constructor({ ListController, ValidationMiddleware, todoSchema, todoQuerySchema }) {
    super();
    this.listController = ListController;
    this.validationMiddleware = ValidationMiddleware;
    this.todoSchema = todoSchema;
    this.todoQuerySchema = todoQuerySchema;
    this.registerRoutes();
  }

  registerRoutes() {
    this.router.get(
      "/",
      this.validationMiddleware.validateQuery(this.todoQuerySchema),
      this.listController.getAll
    );
    this.router.post(
      "/",
      this.validationMiddleware.validate(this.todoSchema),
      this.listController.addTodo
    );
    this.router.put(
      "/:id",
      this.validationMiddleware.validate(this.todoSchema),
      this.listController.updateTodo
    );
    this.router.get("/:id", this.listController.getTodo);
    this.router.delete("/:id", this.listController.deleteTodo);
  }
}

module.exports = ListRouter;
