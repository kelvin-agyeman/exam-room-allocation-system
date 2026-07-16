import { StatusCodes } from "http-status-codes";
import {
  registerStudentService,
  registerStaffService,
  registerAdminService,
  studentLoginService,
  staffLoginService,
  adminLoginService,
  forgotPasswordService,
  resetPasswordService,
} from "../services/auth/authService.js";

export const registerStudent = async (req, res) => {
  const result = await registerStudentService(req.body);

  if (result.error) {
    return res.status(result.status).json({ msg: result.msg });
  }
  res.status(result.status).json({ msg: result.msg });
};

export const registerStaff = async (req, res) => {
  const result = await registerStaffService(req.body);

  if (result.error) {
    return res.status(result.status).json({ msg: result.msg });
  }
  res.status(result.status).json({ msg: result.msg });
};

export const registerAdmin = async (req, res) => {
  const result = await registerAdminService(req.body);

  if (result.error) {
    return res.status(result.status).json({ msg: result.msg });
  }
  res.status(result.status).json({ msg: result.msg });
};

export const studentLogin = async (req, res) => {
  const result = await studentLoginService(req.body);

  if (result.error) {
    return res.status(result.status).json({ msg: result.msg });
  }

  const oneDay = 1000 * 60 * 60 * 24;
  res.cookie("token", result.token, {
    httpOnly: true,
    expires: new Date(Date.now() + oneDay),
    secure: process.env.NODE_ENV === "production",
  });

  res.status(result.status).json({ msg: result.msg });
};

export const staffLogin = async (req, res) => {
  const result = await staffLoginService(req.body);

  if (result.error) {
    return res.status(result.status).json({ msg: result.msg });
  }

  const oneDay = 1000 * 60 * 60 * 24;
  res.cookie("token", result.token, {
    httpOnly: true,
    expires: new Date(Date.now() + oneDay),
    secure: process.env.NODE_ENV === "production",
  });

  res.status(result.status).json({ msg: result.msg });
};

export const adminLogin = async (req, res) => {
  const result = await adminLoginService(req.body);

  if (result.error) {
    return res.status(result.status).json({ msg: result.msg });
  }

  const oneDay = 1000 * 60 * 60 * 24;
  res.cookie("token", result.token, {
    httpOnly: true,
    expires: new Date(Date.now() + oneDay),
    secure: process.env.NODE_ENV === "production",
  });

  res.status(result.status).json({ msg: result.msg });
};

export const forgotPassword = async (req, res) => {
  const origin = process.env.CLIENT_URL || "http://localhost:5000";
  const result = await forgotPasswordService(req.body.email, origin);

  if (result.error) {
    return res.status(result.status).json({ msg: result.msg });
  }
  res.status(result.status).json({ msg: result.msg });
};

export const resetPassword = async (req, res) => {
  const result = await resetPasswordService(req.body);

  if (result.error) {
    return res.status(result.status).json({ msg: result.msg });
  }
  res.status(result.status).json({ msg: result.msg });
};

export const logout = (req, res) => {
  res.cookie("token", "logout", {
    httpOnly: true,
    expires: new Date(Date.now()),
  });
  res.status(StatusCodes.OK).json({ msg: "user logged out!" });
};
