import { StatusCodes } from "http-status-codes";
import crypto from "crypto";
import Student from "../../models/studentModel.js";
import Staff from "../../models/staffModel.js";
import Admin from "../../models/adminModel.js";
import EditDetailsRequest from "../../models/editDetailsRequestModel.js";
import { createJWT } from "../../utils/tokenUtils.js";
import { sendResetPasswordEmail } from "../../utils/sendResetPasswordEmail.js";
import { createHashToken } from "../../utils/createHash.js";

export const registerStudentService = async (studentData) => {
  const { indexNumber } = studentData;
  const studentAlreadyExists = await Student.findOne({ indexNumber });

  if (studentAlreadyExists) {
    return {
      error: true,
      status: StatusCodes.BAD_REQUEST,
      msg: "Index number already exists",
    };
  }

  await Student.create(studentData);
  return { error: false, status: StatusCodes.CREATED, msg: "student created" };
};

export const registerStaffService = async (staffData) => {
  const { staffID } = staffData;
  const staffAlreadyExists = await Staff.findOne({ staffID });

  if (staffAlreadyExists) {
    return {
      error: true,
      status: StatusCodes.BAD_REQUEST,
      msg: "Staff ID already exists",
    };
  }

  await Staff.create(staffData);
  return { error: false, status: StatusCodes.CREATED, msg: "staff created" };
};

export const registerAdminService = async (adminData) => {
  const { username } = adminData;
  const adminAlreadyExists = await Admin.findOne({ username });

  if (adminAlreadyExists) {
    return {
      error: true,
      status: StatusCodes.BAD_REQUEST,
      msg: "Username already exists",
    };
  }

  await Admin.create(adminData);
  return { error: false, status: StatusCodes.CREATED, msg: "admin created" };
};

export const studentLoginService = async (credentials) => {
  const { indexNumber, password } = credentials;
  const student = await Student.findOne({ indexNumber });

  if (!student) {
    return {
      error: true,
      status: StatusCodes.UNAUTHORIZED,
      msg: "invalid credentials",
    };
  }

  const isPasswordCorrect = await student.comparePassword(password);
  if (!isPasswordCorrect) {
    return {
      error: true,
      status: StatusCodes.UNAUTHORIZED,
      msg: "invalid credentials",
    };
  }

  const pendingRequest = await EditDetailsRequest.findOne({
    requestedBy: student._id,
    status: "pending",
  });

  if (pendingRequest) {
    return {
      error: true,
      status: StatusCodes.FORBIDDEN,
      msg: "Your details correction request is still under review. Please wait for admin approval.",
    };
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
  return {
    error: false,
    status: StatusCodes.OK,
    msg: "Student login successful",
    token,
  };
};

export const staffLoginService = async (credentials) => {
  const { staffID, password } = credentials;
  const staff = await Staff.findOne({ staffID });

  if (!staff) {
    return {
      error: true,
      status: StatusCodes.UNAUTHORIZED,
      msg: "invalid credentials",
    };
  }

  const isPasswordCorrect = await staff.comparePassword(password);
  if (!isPasswordCorrect) {
    return {
      error: true,
      status: StatusCodes.UNAUTHORIZED,
      msg: "invalid credentials",
    };
  }

  const payload = {
    userId: staff._id,
    staffID: staff.staffID,
    role: "staff",
  };

  const token = createJWT(payload);
  return {
    error: false,
    status: StatusCodes.OK,
    msg: "Staff login successful",
    token,
  };
};

export const adminLoginService = async (credentials) => {
  const { username, password } = credentials;
  const admin = await Admin.findOne({ username });

  if (!admin) {
    return {
      error: true,
      status: StatusCodes.UNAUTHORIZED,
      msg: "invalid credentials",
    };
  }

  const isPasswordCorrect = await admin.comparePassword(password);
  if (!isPasswordCorrect) {
    return {
      error: true,
      status: StatusCodes.UNAUTHORIZED,
      msg: "invalid credentials",
    };
  }

  const payload = {
    userId: admin._id,
    username: admin.username,
    role: "admin",
  };

  const token = createJWT(payload);
  return {
    error: false,
    status: StatusCodes.OK,
    msg: "Admin login successful",
    token,
  };
};

export const forgotPasswordService = async (email, origin) => {
  if (!email) {
    return {
      error: true,
      status: StatusCodes.BAD_REQUEST,
      msg: "Please provide valid email",
    };
  }

  const student = await Student.findOne({ email });

  if (student) {
    const passwordToken = crypto.randomBytes(70).toString("hex");

    await sendResetPasswordEmail({
      name: student.firstName,
      email: student.email,
      token: passwordToken,
      origin,
    });

    const tenMinutes = 1000 * 60 * 10;
    student.passwordToken = createHashToken(passwordToken);
    student.passwordTokenExpirationDate = new Date(Date.now() + tenMinutes);

    await student.save();
  }

  // Always return OK even if student isn't found to prevent email enumeration
  return {
    error: false,
    status: StatusCodes.OK,
    msg: "Please check your email for reset password link",
  };
};

export const resetPasswordService = async (resetData) => {
  const { token, email, password } = resetData;

  if (!token || !email || !password) {
    return {
      error: true,
      status: StatusCodes.BAD_REQUEST,
      msg: "Please provide token, email and password",
    };
  }

  const student = await Student.findOne({ email });
  if (!student) {
    return {
      error: true,
      status: StatusCodes.BAD_REQUEST,
      msg: "Invalid credentials",
    };
  }

  const currentDate = new Date();
  const hashedToken = createHashToken(token);

  if (
    student.passwordToken !== hashedToken ||
    student.passwordTokenExpirationDate < currentDate
  ) {
    return {
      error: true,
      status: StatusCodes.BAD_REQUEST,
      msg: "Invalid or expired token",
    };
  }

  student.password = password;
  student.passwordToken = null;
  student.passwordTokenExpirationDate = null;
  await student.save();

  return {
    error: false,
    status: StatusCodes.OK,
    msg: "Password reset successful",
  };
};
