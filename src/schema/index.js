const { asValue } = require("awilix");
const todoSchema = require("./todo.schema");
const todoQuerySchema = require("./todoQuery.schema");

const initSchemas = () => {
  return {
    todoSchema: asValue(todoSchema),
    todoQuerySchema: asValue(todoQuerySchema),
  };
};

module.exports = initSchemas;
