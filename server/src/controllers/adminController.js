import {
  getCurrentAdminService,
  getAllStaffService,
  getAllStudentsService,
  updateStaffService,
  deleteStaffService,
  deleteStudentService,
  getSingleStudentService,
  getSingleStaffService,
  approveEditDetailsRequestService,
  getAllEditDetailsRequestsService,
  getSingleEditRequestService,
} from "../services/admin/adminService.js";

export const getCurrentAdmin = async (req, res) => {
  const result = await getCurrentAdminService(req.user.userId);

  if (result.error) {
    return res.status(result.status).json({ msg: result.msg });
  }
  return res.status(result.status).json(result.data);
};

export const getAllStaff = async (req, res) => {
  const result = await getAllStaffService();

  if (result.error) {
    return res.status(result.status).json({ msg: result.msg });
  }
  return res.status(result.status).json(result.data);
};

export const getAllStudents = async (req, res) => {
  const result = await getAllStudentsService();

  if (result.error) {
    return res.status(result.status).json({ msg: result.msg });
  }
  return res.status(result.status).json(result.data);
};

export const updateStaff = async (req, res) => {
  const result = await updateStaffService(req.params.id, req.body);

  if (result.error) {
    return res.status(result.status).json({ msg: result.msg });
  }
  return res
    .status(result.status)
    .json({ msg: result.msg, staff: result.data.staff });
};

export const deleteStaff = async (req, res) => {
  const result = await deleteStaffService(req.params.id);

  if (result.error) {
    return res.status(result.status).json({ msg: result.msg });
  }
  return res
    .status(result.status)
    .json({ msg: result.msg, staff: result.data.staff });
};

export const deleteStudent = async (req, res) => {
  const result = await deleteStudentService(req.params.id);

  if (result.error) {
    return res.status(result.status).json({ msg: result.msg });
  }
  return res
    .status(result.status)
    .json({ msg: result.msg, student: result.data.student });
};

export const getSingleStudent = async (req, res) => {
  const result = await getSingleStudentService(req.params.id);

  if (result.error) {
    return res.status(result.status).json({ msg: result.msg });
  }
  return res.status(result.status).json({ student: result.data.student });
};

export const getSingleStaff = async (req, res) => {
  const result = await getSingleStaffService(req.params.id);

  if (result.error) {
    return res.status(result.status).json({ msg: result.msg });
  }
  return res.status(result.status).json({ staff: result.data.staff });
};

export const approveEditDetailsRequest = async (req, res) => {
  const result = await approveEditDetailsRequestService(req.params.id);

  if (result.error) {
    return res.status(result.status).json({ msg: result.msg });
  }
  return res
    .status(result.status)
    .json({ msg: result.msg, student: result.data.student });
};

export const getAllEditDetailsRequests = async (req, res) => {
  const result = await getAllEditDetailsRequestsService(req.query);

  if (result.error) {
    return res.status(result.status).json({ msg: result.msg });
  }
  return res.status(result.status).json(result.data);
};

export const getSingleEditRequest = async (req, res) => {
  const result = await getSingleEditRequestService(req.params.id);

  if (result.error) {
    return res.status(result.status).json({ msg: result.msg });
  }
  return res
    .status(result.status)
    .json({ editRequest: result.data.editRequest });
};
