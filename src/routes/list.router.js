const BaseRouter = require("./base/base.router");

class ListRouter extends BaseRouter {
  constructor({ ListController, ValidationUtil, todoSchema, todoQuerySchema }) {
    super();
    this.listController = ListController;
    this.validationUtil = ValidationUtil;
    this.todoSchema = todoSchema;
    this.todoQuerySchema = todoQuerySchema;
    this.registerRoutes();
  }

  registerRoutes() {
    this.router.get(
      "/",
      this.validationUtil.validateQuery(this.todoQuerySchema),
      this.listController.getAll
    );
    this.router.post(
      "/",
      this.validationUtil.validate(this.todoSchema),
      this.listController.addTodo
    );
    this.router.put(
      "/:id",
      this.validationUtil.validate(this.todoSchema),
      this.listController.updateTodo
    );
    this.router.get("/:id", this.listController.getTodo);
    this.router.delete("/:id", this.listController.deleteTodo);
  }
}

module.exports = ListRouter;
