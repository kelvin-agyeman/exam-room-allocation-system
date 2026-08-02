import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { LEVELS, PROGRAMS } from "../utils/constants.js";

const StudentSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
    },

    lastName: {
      type: String,
    },

    email: {
      type: String,
      unique: true,
    },

    indexNumber: {
      type: Number,
      unique: [true, "Index number already exists"],
    },

    departmentCode: {
      type: String,
    },

    program: {
      type: String,
      enum: Object.values(PROGRAMS),
      required: true,
    },

    level: {
      type: Number,
      enum: Object.values(LEVELS),
    },

    password: {
      type: String,
    },

    passwordToken: {
      type: String,
    },

    passwordTokenExpirationDate: {
      type: String,
    },
  },
  { timestamps: true },
);

StudentSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

StudentSchema.methods.comparePassword = async function (candidatePassword) {
  const isMatch = await bcrypt.compare(candidatePassword, this.password);
  return isMatch;
};

StudentSchema.methods.toJSON = function () {
  let obj = this.toObject();
  delete obj.password;
  return obj;
};

export default mongoose.model("Student", StudentSchema);
