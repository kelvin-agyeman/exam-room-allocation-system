import { body } from "express-validator";
import { LEVELS, PROGRAMS } from "../utils/constants.js";

export const registerStudentSchema = [
  body("firstName").trim().notEmpty().withMessage("First name is required"),
  body("lastName").trim().notEmpty().withMessage("Last name is required"),
  body("indexNumber")
    .trim()
    .notEmpty()
    .withMessage("Index number is required")
    .isInt({ min: 1000000, max: 9999999 })
    .withMessage("Index number must be a 7-digit number"),
  body("departmentCode")
    .trim()
    .notEmpty()
    .withMessage("Department code is required")
    .isLength({ min: 3, max: 3 })
    .withMessage("Department code must be 3 digits")
    .isNumeric()
    .withMessage("Department code must contain only digits"),
  body("program")
    .optional()
    .notEmpty()
    .withMessage("program is required")
    .isIn(Object.values(PROGRAMS))
    .withMessage("Program does not exist"),
  body("level")
    .trim()
    .notEmpty()
    .withMessage("level is required")
    .isIn(Object.values(LEVELS))
    .withMessage("Level does not exist"),
  body("email")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Please enter valid email"),
  body("password")
    .trim()
    .notEmpty()
    .withMessage("Password is required")
    .isStrongPassword()
    .withMessage(
      "Password must be at least 8 characters long and include uppercase, lowercase, a number, and a special character.",
    ),
];

export const registerStaffSchema = [
  body("fullName").trim().notEmpty().withMessage("Full name is required"),
  body("staffID")
    .trim()
    .notEmpty()
    .withMessage("Staff ID is required")
    .isAlphanumeric()
    .withMessage("Staff ID must contain only letters and numbers"),
  body("password")
    .trim()
    .notEmpty()
    .withMessage("Password is required")
    .isStrongPassword()
    .withMessage(
      "Password must be at least 8 characters long and include uppercase, lowercase, a number, and a special character.",
    ),
];

export const loginStudentSchema = [
  body("indexNumber")
    .trim()
    .notEmpty()
    .withMessage("Index number is required")
    .isLength({ min: 7, max: 7 })
    .withMessage("Index number must be 7 digits")
    .isNumeric()
    .withMessage("Index number must contain only digits"),
  body("password")
    .trim()
    .notEmpty()
    .withMessage("Password is required")
    .isStrongPassword()
    .withMessage(
      "Password must be at least 8 characters long and include uppercase, lowercase, a number, and a special character.",
    ),
];

export const loginStaffSchema = [
  body("staffID")
    .trim()
    .notEmpty()
    .withMessage("Staff ID is required")
    .isAlphanumeric()
    .withMessage("Staff ID must contain only letters and numbers"),
  body("password")
    .trim()
    .notEmpty()
    .withMessage("Password is required")
    .isStrongPassword()
    .withMessage(
      "Password must be at least 8 characters long and include uppercase, lowercase, a number, and a special character.",
    ),
];

export const registerLoginAdminSchema = [
  body("username").trim().notEmpty().withMessage("Username is required"),
  body("password")
    .trim()
    .notEmpty()
    .withMessage("Password is required")
    .isStrongPassword()
    .withMessage(
      "Password must be at least 8 characters long and include uppercase, lowercase, a number, and a special character.",
    ),
];
