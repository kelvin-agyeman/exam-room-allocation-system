import Admin from "../models/adminModel.js";
import Staff from "../models/staffModel.js";
import Student from "../models/studentModel.js";
import EditDetailsRequest from "../models/editDetailsRequestModel.js";
import { StatusCodes } from "http-status-codes";

export const getCurrentAdmin = async (req, res) => {
  const admin = await Admin.findOne({ _id: req.user.userId });

  const adminWithoutPassword = admin.toJSON();

  const adminRes = { ...adminWithoutPassword, role: "admin" };

  res.status(StatusCodes.OK).json({ admin: adminRes });
};

export const getAllStaff = async (req, res) => {
  const staff = await Staff.find({});

  const staffWithoutPassword = staff.map((member) => {
    return member.toJSON();
  });

  const totalStaff = await Staff.countDocuments();

  res.status(StatusCodes.OK).json({
    totalStaff,
    staff: staffWithoutPassword,
  });
};

export const getAllStudents = async (req, res) => {
  const students = await Student.find({});

  const studentsWithoutPassword = students.map((student) => {
    return student.toJSON();
  });

  const totalStudents = await Student.countDocuments();

  res
    .status(StatusCodes.OK)
    .json({ totalStudents, students: studentsWithoutPassword });
};

export const updateStaff = async (req, res) => {
  const { id } = req.params;
  const { staffID, password, fullName } = req.body;

  const staff = await Staff.findById(id);
  if (!staff) {
    return res.status(StatusCodes.NOT_FOUND).json({ msg: "Staff not found" });
  }

  if (staffID) staff.staffID = staffID;
  if (password) staff.password = password; //implement reset password instead of direct update
  if (fullName) staff.fullName = fullName;

  await staff.save();

  res.status(StatusCodes.OK).json({
    msg: "Staff updated successfully",
    staff,
  });
};

export const deleteStaff = async (req, res) => {
  const { id } = req.params;

  const staff = await Staff.findByIdAndDelete(id);

  if (!staff) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ msg: `No staff with id ${id}` });
  }

  res.status(StatusCodes.OK).json({ msg: "Staff deleted successfully", staff });
};

export const deleteStudent = async (req, res) => {
  const { id } = req.params;

  const student = await Student.findByIdAndDelete(id);

  if (!student) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ msg: `No student with id ${id}` });
  }

  res
    .status(StatusCodes.OK)
    .json({ msg: "Student deleted successfully", student });
};

export const getSingleStudent = async (req, res) => {
  const { id } = req.params;

  const student = await Student.findById(id);

  if (!student) {
    return res.status(StatusCodes.NOT_FOUND).json({ msg: "Student not found" });
  }

  res.status(StatusCodes.OK).json({ student });
};

export const getSingleStaff = async (req, res) => {
  const { id } = req.params;

  const staff = await Staff.findById(id);

  if (!staff) {
    return res.status(StatusCodes.NOT_FOUND).json({ msg: "Staff not found" });
  }

  res.status(StatusCodes.OK).json({ staff });
};

export const approveEditDetailsRequest = async (req, res) => {
  const { id } = req.params;

  const editDetailsRequest = await EditDetailsRequest.findById(id);

  if (!editDetailsRequest || editDetailsRequest.status !== "pending") {
    return res.status(StatusCodes.NOT_FOUND).json({
      msg: "No pending edit details request found",
    });
  }

  const student = await Student.findById(editDetailsRequest.requestedBy);

  if (!student) {
    return res.status(StatusCodes.NOT_FOUND).json({
      msg: "Student not found",
    });
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

  res.status(StatusCodes.OK).json({
    msg: "Edit details request approved successfully",
    student,
  });
};

export const getAllEditDetailsRequests = async (req, res) => {
  const { status } = req.query;

  const queryObject = {};

  if (status) {
    queryObject.status = status;
  }

  const requests = await EditDetailsRequest.find(queryObject);


  res.status(StatusCodes.OK).json({ totalRequests: requests.length, requests });
};

export const getSingleEditRequest = async (req, res) => {
  const { id } = req.params;

  const editRequest = await EditDetailsRequest.findById(id);

  if (!editRequest) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ msg: "Edit request not found" });
  }

  res.status(StatusCodes.OK).json({ editRequest });
};
