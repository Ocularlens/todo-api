const Joi = require("joi");

module.exports = Joi.object({
  page: Joi.string().required(),
  size: Joi.string().required(),
});
