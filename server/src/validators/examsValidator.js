import { body } from "express-validator";
import {
  LEVELS,
  EXAM_STATUS,
  PROGRAMS,
  COLLEGE_OF_SCIENCE_ROOMS,
  COMPUTER_LABS,
} from "../utils/constants.js";

export const examSchema = [
  body("courseCode").trim().notEmpty().withMessage("Course code is required"),
  body("courseTitle").trim().notEmpty().withMessage("Course title is required"),
  body("roomAllocations")
    .isArray({ min: 1 })
    .withMessage("At least one room allocation is required"),
  body("roomAllocations.*.startIndexNumber")
    .trim()
    .notEmpty()
    .withMessage("Start index number is required")
    .isInt({ min: 1000000, max: 9999999 })
    .withMessage("Start index number must be a 7-digit number"),
  body("roomAllocations.*.endIndexNumber")
    .trim()
    .notEmpty()
    .withMessage("End index number is required")
    .isInt({ min: 1000000, max: 9999999 })
    .withMessage("End index number must be a 7-digit number"),
  body("roomAllocations.*.roomAllocated")
    .trim()
    .notEmpty()
    .withMessage("Room allocated is required")
    .custom((value, { req }) => {
      const { examType } = req.body;

      let validRooms;

      if (examType === "written") {
        validRooms = Object.values(COLLEGE_OF_SCIENCE_ROOMS);
      } else {
        validRooms = Object.values(COMPUTER_LABS);
      }

      if (!validRooms.includes(value)) {
        throw new Error(`Invalid room "${value}" for ${examType} exam`);
      }

      return true;
    }),
  body("roomAllocations.*.roomLocation")
    .trim()
    .notEmpty()
    .withMessage("Room location is required"),
  body("startDate")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Start date is required")
    .isDate()
    .withMessage("Start date must be in the format YYYY-MM-DD"),
  body("startTime")
    .trim()
    .notEmpty()
    .withMessage("Start time is required")
    .isTime()
    .withMessage("Start time must be in valid 24-hour format HH:MM"),
  body("endTime")
    .trim()
    .notEmpty()
    .withMessage("End time is required")
    .isTime()
    .withMessage("End time must be in valid 24-hour format HH:MM"),
  body("departmentCode")
    .trim()
    .notEmpty()
    .withMessage("Department code is required")
    .isLength({ min: 3, max: 3 })
    .withMessage("Department code must be 3 digits")
    .isNumeric()
    .withMessage("Department code must contain only digits"),
  body("program")
    .notEmpty()
    .withMessage("program is required")
    .isIn(Object.values(PROGRAMS))
    .withMessage("Program does not exist"),
  body("level")
    .notEmpty()
    .withMessage("level is required")
    .isIn(Object.values(LEVELS))
    .withMessage("Level does not exist"),
  body("examType")
    .notEmpty()
    .withMessage("Exam type is required")
    .isIn(["written", "computer-based"])
    .withMessage("Exam type does not exist"),
  body("examStatus")
    .optional()
    .isIn(Object.values(EXAM_STATUS))
    .withMessage("Invalid exam status"),
];

export const updateExamSchema = [
  body("courseCode")
    .trim()
    .optional()
    .notEmpty()
    .withMessage("Course code is required"),
  body("courseTitle")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Course title is required"),
  body("roomAllocations")
    .optional()
    .isArray({ min: 1 })
    .withMessage("At least one room allocation is required"),
  body("roomAllocations.*.startIndexNumber")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Start index number is required")
    .isInt({ min: 1000000, max: 9999999 })
    .withMessage("Start index number must be a 7-digit number"),
  body("roomAllocations.*.endIndexNumber")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("End index number is required")
    .isInt({ min: 1000000, max: 9999999 })
    .withMessage("End index number must be a 7-digit number"),
  body("roomAllocations.*.roomAllocated")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Room allocated is required")
    .custom((value, { req }) => {
      const { examType } = req.body;

      let validRooms;

      if (examType === "written") {
        validRooms = Object.values(COLLEGE_OF_SCIENCE_ROOMS);
      } else {
        validRooms = Object.values(COMPUTER_LABS);
      }

      if (!validRooms.includes(value)) {
        throw new Error(`Invalid room ${value} for ${examType} exam`);
      }

      return true;
    }),
  body("roomAllocations.*.roomLocation")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Room location is required"),
  body("startDate")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Start date is required")
    .isDate()
    .withMessage("Start date must be in the format YYYY-MM-DD"),
  body("startTime")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Start time is required")
    .isTime()
    .withMessage("Start time must be in valid 24-hour format HH:MM"),
  body("endTime")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("End time is required")
    .isTime()
    .withMessage("End time must be in valid 24-hour format HH:MM"),
  body("departmentCode")
    .optional()
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
    .optional()
    .notEmpty()
    .withMessage("level is required")
    .isIn(Object.values(LEVELS))
    .withMessage("Level does not exist"),
  body("examType")
    .optional()
    .notEmpty()
    .withMessage("Exam type is required")
    .isIn(["written", "computer-based"])
    .withMessage("Exam type does not exist"),
  body("examStatus")
    .optional()
    .isIn(Object.values(EXAM_STATUS))
    .withMessage("Invalid exam status"),
];
