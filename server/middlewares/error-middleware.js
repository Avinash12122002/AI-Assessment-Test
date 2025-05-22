const { ZodError } = require("zod");

const errorMiddleware = (err, req, res, next) => {
  // Handle Zod validation errors
  if (err instanceof ZodError) {
    const formatted = err.errors.map((e) => ({
      field: e.path.join("."),
      message: e.message,
    }));
    return res.status(422).json({
      message: "Validation Failed",
      errors: formatted,
    });
  }

  // Default error handling
  const status = err.status || 500;
  const message = err.message || "Internal Server Error";

  return res.status(status).json({ message });
};

module.exports = errorMiddleware;
