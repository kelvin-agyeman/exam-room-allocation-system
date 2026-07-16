import mongoose from "mongoose";
import { EXAM_STATUS, LEVELS, PROGRAMS } from "../utils/constants.js";

const ExamSchema = new mongoose.Schema(
  {
    courseCode: {
      type: String,
    },

    courseTitle: {
      type: String,
    },

    roomAllocations: [
      {
        startIndexNumber: {
          type: Number,
        },
        endIndexNumber: {
          type: Number,
        },
        roomAllocated: {
          type: String,
        },
        roomLocation: {
          type: String,
        },
      },
    ],

    startDate: {
      type: Date,
    },

    startTime: {
      type: String,
    },

    endTime: {
      type: String,
    },

    departmentCode: {
      type: String,
    },

    program: {
      type: String,
      enum: Object.values(PROGRAMS),
    },

    level: {
      type: Number,
      enum: Object.values(LEVELS),
    },

    view: {
      type: String,
      enum: ["today", "all"],
    },

    examType: {
      type: String,
      enum: ["written", "computer-based"],
    },

    examStatus: {
      type: String,
      enum: Object.values(EXAM_STATUS),
    },

    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "Staff",
    },
  },
  { timestamps: true },
);

export default mongoose.model("Exam", ExamSchema);
