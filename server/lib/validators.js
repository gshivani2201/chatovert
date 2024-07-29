import { body, validationResult, check, param, query } from "express-validator";

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
  check("avatar", "Please upload Avatar").notEmpty(),
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

const addMemberValidator = () => [
  body("chatId", "Please enter chat id").notEmpty(),
  body("members")
    .notEmpty()
    .withMessage("Please enter members")
    .isArray({ min: 1, max: 97 })
    .withMessage("Members must be 1-97"),
];

const removeMemberValidator = () => [
  body("chatId", "Please enter chat id").notEmpty(),
  body("userId", "Please enter user id").notEmpty(),
];

const sendAttachmentsValidator = () => [
  body("chatId", "Please enter chat id").notEmpty(),
  check("files")
    .notEmpty()
    .withMessage("Please upload attachments")
    .isArray({ min: 1, max: 5 })
    .withMessage("Members must be 1-5"),
];

const chatIdValidator = () => [param("id", "Please enter chat id").notEmpty()];

const renameChatValidator = () => [
  param("id", "Please enter chat id").notEmpty(),
  body("name", "Please enter name").notEmpty(),
];

const sendRequestValidator = () => [
  body("userId", "Please enter user id").notEmpty(),
];

const acceptRequestValidator = () => [
  body("requestId", "Please enter request id").notEmpty(),
  body("accept")
    .notEmpty()
    .withMessage("Please add accept")
    .isBoolean()
    .withMessage("Accept must be a boolean"),
];

const adminLoginValidator = () => [
  body("secretKey", "Please enter secret key").notEmpty(),
];

export {
  registerValidator,
  validationHandler,
  loginValidator,
  newGroupValidator,
  addMemberValidator,
  removeMemberValidator,
  sendAttachmentsValidator,
  chatIdValidator,
  renameChatValidator,
  sendRequestValidator,
  acceptRequestValidator,
  adminLoginValidator,
};
