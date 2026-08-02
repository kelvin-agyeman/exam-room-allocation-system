import mongoose from "mongoose";
import { LEVELS, PROGRAMS } from "../utils/constants.js";

const EditDetailsRequestSchema = new mongoose.Schema(
  {
    requestedBy: {
      type: mongoose.Types.ObjectId,
      ref: "Student",
      required: true,
    },

    newIndexNumber: {
      type: Number,
    },

    newDepartmentCode: {
      type: String,
    },

    newLevel: {
      type: Number,
      enum: Object.values(LEVELS),
    },

    newProgram: {
      type: String,
      enum: Object.values(PROGRAMS),
    },

    reason: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      enum: ["pending", "approved"],
      default: "pending",
    },
  },
  { timestamps: true },
);

export default mongoose.model("EditDetailsRequest", EditDetailsRequestSchema);
