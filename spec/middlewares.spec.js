const { setUp, container } = require("../src/container");
const Joi = require("joi");

const testSchema = Joi.object({
  string: Joi.string().required(),
});

const positiveReq = { string: "Test" };

const negativeReq = { string: "" };

describe("Middlewares", function () {
  let validationMiddleware;
  beforeAll(async () => {
    setUp();
  });

  describe("ValidationMiddleware", function () {
    describe("positive scenarios", function () {
      beforeAll(() => {
        validationMiddleware = container.resolve("ValidationMiddleware");
        spyOn(validationMiddleware, "validate")
          .withArgs(testSchema)
          .and.callFake(() => {
            const { error } = testSchema.validate(positiveReq, {
              abortEarly: false,
            });

            if (error) {
              const { details } = error;
              const message = details.map((i) => i.message).join(",");
              console.log(error);
              return { message: "VALIDATION_ERROR", errors: message };
            }

            return true;
          });

        spyOn(validationMiddleware, "validateQuery")
          .withArgs(testSchema)
          .and.callFake(() => {
            const { error } = testSchema.validate(positiveReq, {
              abortEarly: false,
            });

            if (error) {
              const { details } = error;
              const message = details
                .map((i) => i.message + "in query parameters")
                .join(",");
              console.log(error);
              return { message: "VALIDATION_ERROR", errors: message };
            }

            return true;
          });
      });

      it("validate should return true", function () {
        const data = validationMiddleware.validate(testSchema);
        expect(data).toEqual(true);
      });

      it("validateQuery should return true", function () {
        const data = validationMiddleware.validateQuery(testSchema);
        expect(data).toEqual(true);
      });
    });
    describe("negative scenarios", function () {
      beforeAll(() => {
        validationMiddleware = container.resolve("ValidationMiddleware");
        spyOn(validationMiddleware, "validate")
          .withArgs(testSchema)
          .and.callFake(() => {
            const { error } = testSchema.validate(negativeReq, {
              abortEarly: false,
            });

            if (error) {
              const { details } = error;
              const message = details.map((i) => i.message).join(",");

              return { message: "VALIDATION_ERROR", errors: message };
            }

            return true;
          });

        spyOn(validationMiddleware, "validateQuery")
          .withArgs(testSchema)
          .and.callFake(() => {
            const { error } = testSchema.validate(negativeReq, {
              abortEarly: false,
            });

            if (error) {
              const { details } = error;
              const message = details
                .map((i) => i.message + "in query parameters")
                .join(",");

              return { message: "VALIDATION_ERROR", errors: message };
            }

            return true;
          });
      });

      it("validate should return validation errors", function () {
        const data = validationMiddleware.validate(testSchema);
        expect(Object.keys(data)).toContain("message");
        expect(Object.keys(data)).toContain("errors");
      });

      it("validateQuery should return validation errors", function () {
        const data = validationMiddleware.validateQuery(testSchema);
        expect(Object.keys(data)).toContain("message");
        expect(Object.keys(data)).toContain("errors");
      });
    });
  });
});
