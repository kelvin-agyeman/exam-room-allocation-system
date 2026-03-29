import { StatusCodes } from "http-status-codes";
import Student from "../models/studentModel.js";
import Staff from "../models/staffModel.js";
import Admin from "../models/adminModel.js";
import EditDetailsRequest from "../models/editDetailsRequestModel.js";
import { createJWT } from "../utils/tokenUtils.js";
import { sendResetPasswordEmail } from "../utils/sendResetPasswordEmail.js";
import { createHashToken } from "../utils/createHash.js";
import crypto from "crypto";

export const registerStudent = async (req, res) => {
  const { indexNumber } = req.body;

  const studentAlreadyExists = await Student.findOne({ indexNumber });

  if (studentAlreadyExists) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "Index number already exists" });
  }

  const student = await Student.create(req.body);

  res.status(StatusCodes.CREATED).json({ msg: "student created" });
};

export const registerStaff = async (req, res) => {
  const { staffID } = req.body;

  const staffAlreadyExists = await Staff.findOne({ staffID });

  if (staffAlreadyExists) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "Staff ID already exists" });
  }

  const staff = await Staff.create(req.body);

  res.status(StatusCodes.CREATED).json({ msg: "staff created" });
};

export const registerAdmin = async (req, res) => {
  const { username } = req.body;

  const adminAlreadyExists = await Admin.findOne({ username });

  if (adminAlreadyExists) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "Username already exists" });
  }

  const admin = await Admin.create(req.body);

  res.status(StatusCodes.CREATED).json({ msg: "admin created" });
};

export const studentLogin = async (req, res) => {
  const { indexNumber, password } = req.body;

  const student = await Student.findOne({ indexNumber });

  if (!student) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ msg: "invalid credentials" });
  }

  const isPasswordCorrect = await student.comparePassword(password);

  if (!isPasswordCorrect) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ msg: "invalid credentials" });
  }

  const pendingRequest = await EditDetailsRequest.findOne({
    requestedBy: student._id,
    status: "pending",
  });

  if (pendingRequest) {
    return res.status(StatusCodes.FORBIDDEN).json({
      msg: "Your details correction request is still under review. Please wait for admin approval.",
    });
  }

  const payload = {
    userId: student._id,
    indexNumber: student.indexNumber,
    departmentCode: student.departmentCode,
    program: student.program,
    level: student.level,
    role: "student",
  };

  const token = createJWT(payload);

  const oneDay = 1000 * 60 * 60 * 24;

  res.cookie("token", token, {
    httpOnly: true,
    expires: new Date(Date.now() + oneDay),
    secure: process.env.NODE_ENV === "production",
  });

  res.status(StatusCodes.OK).json({ msg: "Student login successful" });
};

export const staffLogin = async (req, res) => {
  const { staffID, password } = req.body;

  const staff = await Staff.findOne({ staffID });

  if (!staff) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ msg: "invalid credentials" });
  }

  const isPasswordCorrect = await staff.comparePassword(password);

  if (!isPasswordCorrect) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ msg: "invalid credentials" });
  }

  const payload = {
    userId: staff._id,
    staffID: staff.staffID,
    role: "staff",
  };

  const token = createJWT(payload);

  const oneDay = 1000 * 60 * 60 * 24;

  res.cookie("token", token, {
    httpOnly: true,
    expires: new Date(Date.now() + oneDay),
    secure: process.env.NODE_ENV === "production",
  });

  res.status(StatusCodes.OK).json({ msg: "Staff login successful" });
};

export const adminLogin = async (req, res) => {
  const { username, password } = req.body;

  const admin = await Admin.findOne({ username });

  if (!admin) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ msg: "invalid credentials" });
  }

  const isPasswordCorrect = await admin.comparePassword(password);

  if (!isPasswordCorrect) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ msg: "invalid credentials" });
  }

  const payload = {
    userId: admin._id,
    username: admin.username,
    role: "admin",
  };

  const token = createJWT(payload);

  const oneDay = 1000 * 60 * 60 * 24;

  res.cookie("token", token, {
    httpOnly: true,
    expires: new Date(Date.now() + oneDay),
    secure: process.env.NODE_ENV === "production",
  });

  res.status(StatusCodes.OK).json({ msg: "Admin login successful" });
};

export const forgotPassword = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "Please provide valid email" });
  }

  const student = await Student.findOne({ email });

  if (student) {
    const passwordToken = crypto.randomBytes(70).toString("hex");
    // send email
    const origin = "http://localhost:5173";

    await sendResetPasswordEmail({
      name: student.firstName,
      email: student.email,
      token: passwordToken,
      origin,
    });

    const tenMinutes = 1000 * 60 * 10;
    const passwordTokenExpirationDate = new Date(Date.now() + tenMinutes);

    student.passwordToken = createHashToken(passwordToken);
    student.passwordTokenExpirationDate = passwordTokenExpirationDate;

    await student.save();
  }

  res
    .status(StatusCodes.OK)
    .json({ msg: "Please check your email for reset password link" });
};

export const resetPassword = async (req, res) => {
  const { token, email, password } = req.body;

  if (!token || !email || !password) {
    return res
      .status(400)
      .json({ msg: "Please provide token, email and password" });
  }

  const student = await Student.findOne({ email });

  if (!student) {
    return res.status(400).json({ msg: "Invalid credentials" });
  }

  const currentDate = new Date();

  const hashedToken = createHashToken(token);

  if (
    student.passwordToken !== hashedToken ||
    student.passwordTokenExpirationDate < currentDate
  ) {
    return res.status(400).json({ msg: "Invalid or expired token" });
  }

  student.password = password;
  student.passwordToken = null;
  student.passwordTokenExpirationDate = null;

  await student.save();

  res.status(StatusCodes.OK).json({ msg: "Password reset successful" });
};

export const logout = (req, res) => {
  res.cookie("token", "logout", {
    httpOnly: true,
    expires: new Date(Date.now()),
  });
  res.status(StatusCodes.OK).json({ msg: "user logged out!" });
};
