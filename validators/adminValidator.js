import { body } from "express-validator";

export const updateStaffSchema = [
  body("fullName")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Full name is required"),
  body("staffID")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Staff ID is required")
    .isAlphanumeric()
    .withMessage("Staff ID must contain only letters and numbers"),
  body("password")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Password is required")
    .isStrongPassword()
    .withMessage(
      "Password must be at least 8 characters long and include uppercase, lowercase, a number, and a specivalidate",
    ),
];
