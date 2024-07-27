import { body, validationResult, check } from "express-validator";

import { ErrorHandler } from "../utils/utility.js";

const validationHandler = (req, res, next) => {
  const errors = validationResult(req);

  const errorMessages = errors
    .array()
    .map((err) => err.msg)
    .join(", ");

  if (errors.isEmpty()) return next();
  else next(new ErrorHandler(errorMessages, 400));
};

const registerValidator = () => [
  body("name", "Please enter name").notEmpty(),
  body("username", "Please enter username").notEmpty(),
  body("password", "Please enter password").notEmpty(),
  body("bio", "Please enter bio").notEmpty(),
  check("avatar", "Please uploade Avatar").notEmpty(),
];

const loginValidator = () => [
  body("username", "Please enter username").notEmpty(),
  body("password", "Please enter password").notEmpty(),
];

const newGroupValidator = () => [
  body("name", "Please enter name").notEmpty(),
  body("members")
    .notEmpty()
    .withMessage("Please enter members")
    .isArray({ min: 2, max: 100 })
    .withMessage("Members must be 2-100"),
];

// const loginValidator = () => [
//   body("username", "Please enter username").notEmpty(),
//   body("password", "Please enter password").notEmpty(),
// ];

export {
  registerValidator,
  validationHandler,
  loginValidator,
  newGroupValidator,
};
