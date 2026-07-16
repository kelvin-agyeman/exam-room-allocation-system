import { StatusCodes } from "http-status-codes";
import Admin from "../../models/adminModel.js";
import Staff from "../../models/staffModel.js";
import Student from "../../models/studentModel.js";
import EditDetailsRequest from "../../models/editDetailsRequestModel.js";

export const getCurrentAdminService = async (userId) => {
  const admin = await Admin.findOne({ _id: userId });

  if (!admin) {
    return {
      error: true,
      status: StatusCodes.NOT_FOUND,
      msg: "Admin not found",
    };
  }

  const adminWithoutPassword = admin.toJSON();
  const adminRes = { ...adminWithoutPassword, role: "admin" };

  return { error: false, status: StatusCodes.OK, data: { admin: adminRes } };
};

export const getAllStaffService = async () => {
  const staff = await Staff.find({});

  const staffWithoutPassword = staff.map((member) => {
    return member.toJSON();
  });

  const totalStaff = await Staff.countDocuments();

  return {
    error: false,
    status: StatusCodes.OK,
    data: { totalStaff, staff: staffWithoutPassword },
  };
};

export const getAllStudentsService = async () => {
  const students = await Student.find({});

  const studentsWithoutPassword = students.map((student) => {
    return student.toJSON();
  });

  const totalStudents = await Student.countDocuments();

  return {
    error: false,
    status: StatusCodes.OK,
    data: { totalStudents, students: studentsWithoutPassword },
  };
};

export const updateStaffService = async (staffId, updateData) => {
  const { staffID, password, fullName } = updateData;
  const staff = await Staff.findById(staffId);

  if (!staff) {
    return {
      error: true,
      status: StatusCodes.NOT_FOUND,
      msg: "Staff not found",
    };
  }

  if (staffID) staff.staffID = staffID;
  if (password) staff.password = password; // implement reset password instead of direct update
  if (fullName) staff.fullName = fullName;

  await staff.save();

  return {
    error: false,
    status: StatusCodes.OK,
    msg: "Staff updated successfully",
    data: { staff },
  };
};

export const deleteStaffService = async (staffId) => {
  const staff = await Staff.findByIdAndDelete(staffId);

  if (!staff) {
    return {
      error: true,
      status: StatusCodes.NOT_FOUND,
      msg: `No staff with id ${staffId}`,
    };
  }

  return {
    error: false,
    status: StatusCodes.OK,
    msg: "Staff deleted successfully",
    data: { staff },
  };
};

export const deleteStudentService = async (studentId) => {
  const student = await Student.findByIdAndDelete(studentId);

  if (!student) {
    return {
      error: true,
      status: StatusCodes.NOT_FOUND,
      msg: `No student with id ${studentId}`,
    };
  }

  return {
    error: false,
    status: StatusCodes.OK,
    msg: "Student deleted successfully",
    data: { student },
  };
};

export const getSingleStudentService = async (studentId) => {
  const student = await Student.findById(studentId);

  if (!student) {
    return {
      error: true,
      status: StatusCodes.NOT_FOUND,
      msg: "Student not found",
    };
  }

  return { error: false, status: StatusCodes.OK, data: { student } };
};

export const getSingleStaffService = async (staffId) => {
  const staff = await Staff.findById(staffId);

  if (!staff) {
    return {
      error: true,
      status: StatusCodes.NOT_FOUND,
      msg: "Staff not found",
    };
  }

  return { error: false, status: StatusCodes.OK, data: { staff } };
};

export const approveEditDetailsRequestService = async (requestId) => {
  const editDetailsRequest = await EditDetailsRequest.findById(requestId);

  if (!editDetailsRequest || editDetailsRequest.status !== "pending") {
    return {
      error: true,
      status: StatusCodes.NOT_FOUND,
      msg: "No pending edit details request found",
    };
  }

  const student = await Student.findById(editDetailsRequest.requestedBy);

  if (!student) {
    return {
      error: true,
      status: StatusCodes.NOT_FOUND,
      msg: "Student not found",
    };
  }

  student.indexNumber =
    editDetailsRequest.newIndexNumber || student.indexNumber;
  student.departmentCode =
    editDetailsRequest.newDepartmentCode || student.departmentCode;
  student.program = editDetailsRequest.newProgram || student.program;
  student.level = editDetailsRequest.newLevel || student.level;

  await student.save();

  editDetailsRequest.status = "approved";
  editDetailsRequest.reviewedAt = new Date();

  await editDetailsRequest.save();

  return {
    error: false,
    status: StatusCodes.OK,
    msg: "Edit details request approved successfully",
    data: { student },
  };
};

export const getAllEditDetailsRequestsService = async (query) => {
  const { status } = query;
  const queryObject = {};

  if (status) {
    queryObject.status = status;
  }

  const requests = await EditDetailsRequest.find(queryObject);

  return {
    error: false,
    status: StatusCodes.OK,
    data: { totalRequests: requests.length, requests },
  };
};

export const getSingleEditRequestService = async (requestId) => {
  const editRequest = await EditDetailsRequest.findById(requestId);

  if (!editRequest) {
    return {
      error: true,
      status: StatusCodes.NOT_FOUND,
      msg: "Edit request not found",
    };
  }

  return { error: false, status: StatusCodes.OK, data: { editRequest } };
};
