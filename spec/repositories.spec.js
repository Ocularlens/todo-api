const { setUp, container } = require("../src/container");

describe("Repositories", function () {
  beforeAll(async () => {
    setUp();
    const database = container.resolve("database");
    await database.sync();
  });

  describe("ListRepository", function () {
    describe("positive scenario", function () {
      let todoId;

      beforeEach(async () => {
        let ListRepository = container.resolve("ListRepository");
        let todo = await ListRepository.insertOne({ content: "Test Data 1" });
        todoId = todo.id;
      });

      it("should initialize ListRepository", function () {
        const ListRepository = container.resolve("ListRepository");
        expect(Object.keys(ListRepository)).toContain("model");
        expect(typeof ListRepository.model).toEqual("function");
      });

      it("should add a new todo", async () => {
        const ListRepository = container.resolve("ListRepository");
        const todo = await ListRepository.insertOne({ content: "Test Data 1" });
        expect(Object.keys(todo)).toContain("dataValues");
      });

      it("should paginate todos", async () => {
        const ListRepository = container.resolve("ListRepository");
        const todos = await ListRepository.paginate(1, 10);
        expect(Object.keys(todos)).toContain("data");
        expect(Object.keys(todos)).toContain("total");
        expect(Object.keys(todos)).toContain("maxPage");
        expect(Object.keys(todos)).toContain("page");
      });

      it("should get todo using id", async () => {
        const ListRepository = container.resolve("ListRepository");
        const todo = await ListRepository.findById(todoId);
        expect(Object.keys(todo)).toContain("dataValues");
        expect(todo.id).toEqual(todoId);
      });

      it("should update todo using id", async () => {
        const ListRepository = container.resolve("ListRepository");
        const content = "testing only";
        const todo = await ListRepository.updateById(todoId, { content });
        expect(Object.keys(todo)).toContain("dataValues");
        expect(todo.id).toEqual(todoId);
        expect(todo.content).toEqual(content);
      });

      it("should delete todo using id", async () => {
        let ListRepository = container.resolve("ListRepository");
        let todo = await ListRepository.insertOne({ content: "Test Data 1" });
        todoId = todo.id;

        todo = await ListRepository.deleteById(todoId);
        expect(todo).toEqual(true);
      });
    });

    describe("negative scenario", function () {
      let deletedid;
      beforeAll(async () => {
        let ListRepository = container.resolve("ListRepository");
        let todo = await ListRepository.insertOne({ content: "Test Data 1" });
        deletedid = todo.id;
        await ListRepository.deleteById(deletedid);
      });

      it("should return false findById", async () => {
        let ListRepository = container.resolve("ListRepository");
        let todo = await ListRepository.findById(deletedid);
        expect(todo).toEqual(false);
      });

      it("should return false updateById", async () => {
        let ListRepository = container.resolve("ListRepository");
        let todo = await ListRepository.updateById(deletedid, {
          content: "test",
        });
        expect(todo).toEqual(false);
      });

      it("should return false deleteById", async () => {
        let ListRepository = container.resolve("ListRepository");
        let todo = await ListRepository.deleteById(deletedid);
        expect(todo).toEqual(false);
      });
    });
  });
});
