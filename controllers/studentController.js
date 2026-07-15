import {
  getCurrentStudentService,
  updateStudentService,
  sendEditDetailsRequestService,
} from "../services/student/studentService.js";

export const getCurrentStudent = async (req, res) => {
  const result = await getCurrentStudentService(req.user.userId);

  if (result.error) {
    return res.status(result.status).json({ msg: result.msg });
  }

  res.status(result.status).json(result.data);
};

export const updateStudent = async (req, res) => {
  const result = await updateStudentService(req.user.userId, req.body);

  if (result.error) {
    return res.status(result.status).json({ msg: result.msg });
  }

  res
    .status(result.status)
    .json({ msg: result.msg, student: result.data.student });
};

export const sendEditDetailsRequest = async (req, res) => {
  const result = await sendEditDetailsRequestService(req.user.userId, req.body);

  if (result.error) {
    return res.status(result.status).json({ msg: result.msg });
  }

  res.cookie("token", "logout", {
    httpOnly: true,
    expires: new Date(Date.now()),
  });

  res.status(result.status).json({
    msg: result.msg,
    editDetailsRequest: result.data.editDetailsRequest,
  });
};
