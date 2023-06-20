class ValidationMiddleware {
  constructor() {}

  validate(schema) {
    return (req, res, next) => {
      const { error } = schema.validate(req.body, { abortEarly: false });

      if (error) {
        const { details } = error;
        const message = details.map((i) => i.message).join(",");
        console.log(error);
        return res
          .status(422)
          .json({ message: "VALIDATION_ERROR", errors: message });
      }

      return next();
    };
  }

  validateQuery(schema) {
    return (req, res, next) => {
      const { error } = schema.validate(req.query, { abortEarly: false });

      if (error) {
        const { details } = error;
        const message = details
          .map((i) => i.message + "in query parameters")
          .join(",");
        console.log(error);
        return res
          .status(422)
          .json({ message: "VALIDATION_ERROR", errors: message });
      }

      return next();
    };
  }
}

module.exports = ValidationMiddleware;
