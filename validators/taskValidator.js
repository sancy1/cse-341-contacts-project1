const { body } = require("express-validator");

// Task validation rules (Used for POST & PUT)
const taskValidationRules = () => [
  body("title").notEmpty().withMessage("Title is required"),
  body("description").optional().isString().withMessage("Description must be a string"),
  body("completed").optional().isBoolean().withMessage("Completed must be a boolean"),
];

module.exports = { taskValidationRules };