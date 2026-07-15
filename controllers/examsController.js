import {
  getAllExamsService,
  createExamService,
  getAllPostedExamsService,
  getSingleExamService,
  updatePostedExamService,
  deletePostedExamService,
} from "../services/exams/examsService.js";

export const getAllExams = async (req, res) => {
  const result = await getAllExamsService(req.user, req.query);

  if (result.error) {
    return res.status(result.status).json({ msg: result.msg });
  }

  return res.status(result.status).json(result.data);
};

export const createExam = async (req, res) => {
  const result = await createExamService(req.body, req.user.userId);

  if (result.error) {
    return res.status(result.status).json({ msg: result.msg });
  }

  return res
    .status(result.status)
    .json({ msg: result.msg, exam: result.data.exam });
};

export const getAllPostedExams = async (req, res) => {
  const result = await getAllPostedExamsService(req.user.userId, req.query);

  if (result.error) {
    return res.status(result.status).json({ msg: result.msg });
  }

  // If there are no exams, the service returns data.msg
  if (result.data.msg) {
    return res.status(result.status).json({ msg: result.data.msg });
  }

  return res.status(result.status).json(result.data);
};

export const getSingleExam = async (req, res) => {
  const result = await getSingleExamService(req.params.id);

  if (result.error) {
    return res.status(result.status).json({ msg: result.msg });
  }

  return res.status(result.status).json({ exam: result.data.exam });
};

export const updatePostedExam = async (req, res) => {
  const result = await updatePostedExamService(
    req.params.id,
    req.user.userId,
    req.body,
  );

  if (result.error) {
    return res.status(result.status).json({ msg: result.msg });
  }

  return res
    .status(result.status)
    .json({ msg: result.msg, exam: result.data.exam });
};

export const deletePostedExam = async (req, res) => {
  const result = await deletePostedExamService(req.params.id);

  if (result.error) {
    return res.status(result.status).json({ msg: result.msg });
  }

  return res
    .status(result.status)
    .json({ msg: result.msg, exam: result.data.exam });
};
