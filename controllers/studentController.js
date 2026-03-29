import Student from "../models/studentModel.js";
import EditDetailsRequest from "../models/editDetailsRequestModel.js";
import { StatusCodes } from "http-status-codes";

export const getCurrentStudent = async (req, res) => {
  const student = await Student.findOne({ _id: req.user.userId });

  const studentWithoutPassword = student.toJSON();

  const studentRes = { ...studentWithoutPassword, role: "student" };

  res.status(StatusCodes.OK).json({ student: studentRes });
};

export const updateStudent = async (req, res) => {
  const { password, indexNumber, departmentCode, program, level } = req.body;

  if (password !== undefined) {
    return res
      .status(StatusCodes.FORBIDDEN)
      .json({ msg: "Password cannot be updated here" });
  }
  if (indexNumber !== undefined) {
    return res
      .status(StatusCodes.FORBIDDEN)
      .json({ msg: "Index number cannot be updated here" });
  }
  if (departmentCode !== undefined) {
    return res
      .status(StatusCodes.FORBIDDEN)
      .json({ msg: "Department code cannot be updated here" });
  }
  if (program !== undefined) {
    return res
      .status(StatusCodes.FORBIDDEN)
      .json({ msg: "Program cannot be updated here" });
  }
  if (level !== undefined) {
    return res
      .status(StatusCodes.FORBIDDEN)
      .json({ msg: "Level cannot be updated here" });
  }

  const updatedStudent = await Student.findByIdAndUpdate(
    req.user.userId,
    req.body,
    {
      new: true,
      runValidators: true,
    },
  );

  res
    .status(StatusCodes.OK)
    .json({ msg: "Student updated successfully", student: updatedStudent });
};

export const sendEditDetailsRequest = async (req, res) => {
  const { newIndexNumber, newDepartmentCode, newLevel, newProgram, reason } =
    req.body;

  const editDetailsRequest = await EditDetailsRequest.create({
    requestedBy: req.user.userId,
    newIndexNumber,
    newDepartmentCode,
    newProgram,
    newLevel,
    reason,
  });

  res.cookie("token", "logout", {
    httpOnly: true,
    expires: new Date(Date.now()),
  });

  res.status(StatusCodes.OK).json({
    msg: "Request sent successfully. You will be logged out until your request is approved.",
    editDetailsRequest,
  });
};
