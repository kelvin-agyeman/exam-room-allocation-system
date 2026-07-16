import { StatusCodes } from "http-status-codes";
import { verifyJWT } from "../utils/tokenUtils.js";

export const authenticateStudent = async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ msg: "authentication invalid" });
  }

  try {
    const decodedStudent = verifyJWT(token);

    if (decodedStudent.role !== "student") {
      return res
        .status(StatusCodes.FORBIDDEN)
        .json({ msg: "Student access only" });
    }

    const { userId, indexNumber, departmentCode, program, level } =
      decodedStudent;
    req.user = {
      userId,
      indexNumber,
      departmentCode,
      program,
      level,
    };

    next();
  } catch (error) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ msg: "authentication invalid" });
  }
};

export const authenticateStaff = async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ msg: "authentication invalid" });
  }

  try {
    const decodedStaff = verifyJWT(token);

    if (decodedStaff.role !== "staff") {
      return res
        .status(StatusCodes.FORBIDDEN)
        .json({ msg: "Staff access only" });
    }

    const { userId, staffID } = decodedStaff;
    req.user = {
      userId,
      staffID,
    };
    next();
  } catch (error) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ msg: "authentication invalid" });
  }
};

export const authenticateAdmin = async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ msg: "authentication invalid" });
  }

  try {
    const decodedAdmin = verifyJWT(token);

    if (decodedAdmin.role !== "admin") {
      return res
        .status(StatusCodes.FORBIDDEN)
        .json({ msg: "Admin access only" });
    }

    const { userId, username } = decodedAdmin;
    req.user = {
      userId,
      username,
    };
    next();
  } catch (error) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ msg: "authentication invalid" });
  }
};
