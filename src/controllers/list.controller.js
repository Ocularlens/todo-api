const { CACHE_TIME } = require("../config/config");

class ListController {
  constructor({ ListRepository, redisUtil }) {
    this.listRepository = ListRepository;
    this.getAll = this.getAll.bind(this);
    this.addTodo = this.addTodo.bind(this);
    this.getTodo = this.getTodo.bind(this);
    this.updateTodo = this.updateTodo.bind(this);
    this.deleteTodo = this.deleteTodo.bind(this);
    this.redisUtil = redisUtil;
  }

  async getAll(req, res, next) {
    try {
      const { page, size } = req.query;
      const result = await this.listRepository.paginate(+page - 1, +size);

      const response = { message: "Todos", result };

      this.redisUtil.setex(
        req.originalUrl,
        CACHE_TIME,
        JSON.stringify(response)
      );

      return res.json(response);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  async addTodo(req, res, next) {
    try {
      const { content } = req.body;
      console.log(content);
      const todo = await this.listRepository.insertOne({ content });

      return res.json({ message: "Todo added successfully" });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  async updateTodo(req, res, next) {
    try {
      const { content } = req.body;
      const { id } = req.params;

      const todo = await this.listRepository.updateById(id, { content });

      if (!todo) {
        return res.status(404).json({ message: "Todo not found" });
      }

      return res.json({ message: "Todo updated successfully", todo });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  async deleteTodo(req, res, next) {
    try {
      const { id } = req.params;

      const todo = await this.listRepository.deleteById(id);

      if (!todo) {
        return res.status(404).json({ message: "Todo not found" });
      }

      return res.json({ message: "Todo deleted" });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  async getTodo(req, res, next) {
    try {
      const { id } = req.params;

      const todo = await this.listRepository.findById(id);

      if (!todo) {
        return res.status(404).json({ message: "Todo not found" });
      }

      const response = { message: "Todo fetched", todo };

      this.redisUtil.setex(
        req.originalUrl,
        CACHE_TIME,
        JSON.stringify(response)
      );

      return res.json(response);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
}

module.exports = ListController;
