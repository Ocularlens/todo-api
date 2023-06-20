const { asValue } = require("awilix");
const todoSchema = require("./todo.schema");

const initSchemas = () => {
  return {
    todoSchema: asValue(todoSchema),
  };
};

module.exports = initSchemas;
