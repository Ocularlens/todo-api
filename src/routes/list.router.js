const BaseRouter = require("./base/base.router");

class ListRouter extends BaseRouter {
  constructor({ ListController, ValidationUtil, todoSchema }) {
    super();
    this.listController = ListController;
    this.validationUtil = ValidationUtil;
    this.todoSchema = todoSchema;

    this.registerRoutes();
  }

  registerRoutes() {
    this.router.get("/", this.listController.getAll);
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
