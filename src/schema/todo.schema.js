const Joi = require("joi");

module.exports = Joi.object({
  content: Joi.string().required(),
});
