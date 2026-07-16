import { body } from "express-validator";
import { LEVELS, PROGRAMS } from "../utils/constants.js";

export const updateStudentSchema = [
  body("firstName")
    .trim()
    .optional()
    .notEmpty()
    .withMessage("First name is required"),
  body("lastName")
    .trim()
    .optional()
    .notEmpty()
    .withMessage("Last name is required"),
  body("email")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Please enter valid email"),
];

export const editStudentDetailsSchema = [
  body("newIndexNumber")
    .trim()
    .optional()
    .isInt({ min: 1000000, max: 9999999 })
    .withMessage("Index number must be a 7-digit number"),
  body("newDepartmentCode")
    .trim()
    .optional()
    .isLength({ min: 3, max: 3 })
    .withMessage("Department code must be 3 digits")
    .isNumeric()
    .withMessage("Department code must contain only digits"),
  body("newProgram")
    .optional()
    .notEmpty()
    .withMessage("program is required")
    .isIn(Object.values(PROGRAMS))
    .withMessage("Program does not exist"),
  body("newLevel")
    .trim()
    .optional()
    .isIn(Object.values(LEVELS))
    .withMessage("Level does not exist"),
  body("reason")
    .trim()
    .notEmpty()
    .withMessage("Reason for edit request is required"),
];
