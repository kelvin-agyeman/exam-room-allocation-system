import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const StaffSchema = new mongoose.Schema({
  fullName: {
    type: String,
  },

  staffID: {
    type: String,
    unique: [true, "Staff ID already exists"],
  },

  password: {
    type: String,
  },
});

StaffSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

StaffSchema.methods.comparePassword = async function (candidatePassword) {
  const isMatch = await bcrypt.compare(candidatePassword, this.password);
  return isMatch;
};

StaffSchema.methods.toJSON = function () {
  let obj = this.toObject();
  delete obj.password;
  return obj;
};

export default mongoose.model("Staff", StaffSchema);
