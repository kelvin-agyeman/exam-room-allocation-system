import { StatusCodes } from "http-status-codes";
import Student from "../../models/studentModel.js";
import EditDetailsRequest from "../../models/editDetailsRequestModel.js";

export const getCurrentStudentService = async (userId) => {
  const student = await Student.findOne({ _id: userId });

  if (!student) {
    return {
      error: true,
      status: StatusCodes.NOT_FOUND,
      msg: "Student not found",
    };
  }

  const studentWithoutPassword = student.toJSON();
  const studentRes = { ...studentWithoutPassword, role: "student" };

  return {
    error: false,
    status: StatusCodes.OK,
    data: { student: studentRes },
  };
};

export const updateStudentService = async (userId, updateData) => {
  const { password, indexNumber, departmentCode, program, level } = updateData;

  // Validation checks
  if (password !== undefined) {
    return {
      error: true,
      status: StatusCodes.FORBIDDEN,
      msg: "Password cannot be updated here",
    };
  }
  if (indexNumber !== undefined) {
    return {
      error: true,
      status: StatusCodes.FORBIDDEN,
      msg: "Index number cannot be updated here",
    };
  }
  if (departmentCode !== undefined) {
    return {
      error: true,
      status: StatusCodes.FORBIDDEN,
      msg: "Department code cannot be updated here",
    };
  }
  if (program !== undefined) {
    return {
      error: true,
      status: StatusCodes.FORBIDDEN,
      msg: "Program cannot be updated here",
    };
  }
  if (level !== undefined) {
    return {
      error: true,
      status: StatusCodes.FORBIDDEN,
      msg: "Level cannot be updated here",
    };
  }

  const updatedStudent = await Student.findByIdAndUpdate(userId, updateData, {
    new: true,
    runValidators: true,
  });

  return {
    error: false,
    status: StatusCodes.OK,
    msg: "Student updated successfully",
    data: { student: updatedStudent },
  };
};

export const sendEditDetailsRequestService = async (userId, requestData) => {
  const { newIndexNumber, newDepartmentCode, newLevel, newProgram, reason } =
    requestData;

  const editDetailsRequest = await EditDetailsRequest.create({
    requestedBy: userId,
    newIndexNumber,
    newDepartmentCode,
    newProgram,
    newLevel,
    reason,
  });

  return {
    error: false,
    status: StatusCodes.OK,
    msg: "Request sent successfully. You will be logged out until your request is approved.",
    data: { editDetailsRequest },
  };
};
