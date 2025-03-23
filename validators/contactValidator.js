const { body } = require("express-validator");

// Contact validation rules (Used for POST & PUT)
const contactValidationRules = () => [
  body("firstName").notEmpty().withMessage("First name is required"),
  body("lastName").notEmpty().withMessage("Last name is required"),
  body("email").isEmail().withMessage("Invalid email format"),
  body("favoriteColor").optional().isString().withMessage("Favorite color must be a string"),
  body("birthday").optional().isISO8601().withMessage("Invalid date format (YYYY-MM-DD)")
];

module.exports = { contactValidationRules };
