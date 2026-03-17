import dayjs from "dayjs";
import Exam from "../models/examsModel.js";
import { StatusCodes } from "http-status-codes";

export const getAllExams = async (req, res) => {
  const { departmentCode, program, level, indexNumber } = req.user;
  const { search, examStatus, examType } = req.query;

  const now = dayjs();

  const queryObject = {
    departmentCode,
    program,
    level,
    roomAllocations: {
      $elemMatch: {
        startIndexNumber: { $lte: indexNumber },
        endIndexNumber: { $gte: indexNumber },
      },
    },
  };

  if (search) {
    queryObject.$or = [
      { courseCode: { $regex: search, $options: "i" } },
      { courseTitle: { $regex: search, $options: "i" } },
    ];
  }

  if (examType) {
    queryObject.examType = examType;
  }

  const view = req.query.view || "all";

  if (view === "today") {
    queryObject.startDate = {
      $gte: now.startOf("day").toDate(),
      $lte: now.endOf("day").toDate(),
    };
  }

  let exams = await Exam.find(queryObject).sort("startDate startTime");

  const formattedExams = exams
    .map((exam) => {
      const allocation = exam.roomAllocations.find(
        (room) =>
          indexNumber >= room.startIndexNumber &&
          indexNumber <= room.endIndexNumber,
      );

      const examDate = dayjs(exam.startDate).format("YYYY-MM-DD");
      const examStart = dayjs(`${examDate} ${exam.startTime}`);
      const examEnd = dayjs(`${examDate} ${exam.endTime}`);

      let computedStatus = "upcoming";

      if (now.isBefore(examStart)) {
        computedStatus = "upcoming";
      } else if (now.isBefore(examEnd)) {
        computedStatus = "ongoing";
      } else {
        computedStatus = "completed";
      }

      return {
        examId: exam._id,
        courseCode: exam.courseCode,
        courseTitle: exam.courseTitle,
        program: exam.program,
        roomAllocated: allocation ? allocation.roomAllocated : "not assigned",
        roomLocation: allocation ? allocation.roomLocation : "not assigned",
        startDate: exam.startDate,
        startTime: exam.startTime,
        endTime: exam.endTime,
        examType: exam.examType,
        examStatus: computedStatus,
      };
    })
    .filter((exam) => (examStatus ? exam.examStatus === examStatus : true));

  const numOfPapers = formattedExams.length;

  const stats = {
    upcoming: 0,
    ongoing: 0,
    completed: 0,
  };

  formattedExams.forEach((exam) => {
    stats[exam.examStatus]++;
  });

  return res
    .status(StatusCodes.OK)
    .json({ numOfPapers, stats, exams: formattedExams });
};

export const createExam = async (req, res) => {
  const courseCodeExists = await Exam.findOne({
    courseCode: req.body.courseCode,
  });

  if (courseCodeExists) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      msg: `An exam with course code, ${req.body.courseCode}, already exists for program, ${courseCodeExists.program}, and level ${courseCodeExists.level}`,
    });
  }

  req.body.createdBy = req.user.userId;

  const exam = await Exam.create(req.body);

  res
    .status(StatusCodes.CREATED)
    .json({ msg: "Exam posted successfully", exam });
};

export const getAllPostedExams = async (req, res) => {
  const { search, view, examStatus, departmentCode, level, program, examType } =
    req.query;

  const now = dayjs();

  const queryObject = {
    createdBy: req.user.userId,
  };

  if (search) {
    queryObject.$or = [
      { courseCode: { $regex: search, $options: "i" } },
      { courseTitle: { $regex: search, $options: "i" } },
    ];
  }

  if (departmentCode) {
    queryObject.departmentCode = departmentCode;
  }

  if (program) {
    queryObject.program = program;
  }

  if (level) {
    queryObject.level = level;
  }

  if (examType) {
    queryObject.examType = examType;
  }

  if (view === "today") {
    queryObject.startDate = {
      $gte: now.startOf("day").toDate(),
      $lte: now.endOf("day").toDate(),
    };
  }

  let exams = await Exam.find(queryObject).sort("startDate startTime");

  const formattedExams = exams
    .map((exam) => {
      const examDate = dayjs(exam.startDate).format("YYYY-MM-DD");
      const examStart = dayjs(`${examDate} ${exam.startTime}`);
      const examEnd = dayjs(`${examDate} ${exam.endTime}`);
      const completedAt = examEnd.add(1, "hour");

      let computedStatus = "upcoming";
      if (now.isAfter(examStart) && now.isBefore(examEnd))
        computedStatus = "ongoing";
      else if (now.isAfter(completedAt)) computedStatus = "completed";

      return { ...exam.toObject(), examStatus: computedStatus };
    })
    .filter((exam) => (examStatus ? exam.examStatus === examStatus : true));

  const numOfPapers = formattedExams.length;
  if (numOfPapers === 0) {
    return res.status(StatusCodes.OK).json({ msg: "No exams found" });
  }

  return res
    .status(StatusCodes.OK)
    .json({ numOfPapers, exams: formattedExams });
};

export const getSingleExam = async (req, res) => {
  const { id } = req.params;

  const exam = await Exam.findById(id);

  if (!exam) {
    return res.status(StatusCodes.NOT_FOUND).json({ msg: "Item not found" });
  }

  res.status(StatusCodes.OK).json({ exam });
};

export const updatePostedExam = async (req, res) => {
  const { id } = req.params;

  const exam = await Exam.findOne({
    _id: id,
    createdBy: req.user.userId,
  });

  if (!exam) {
    return res.status(StatusCodes.NOT_FOUND).json({
      msg: "Exam not found",
    });
  }

  const updatedExam = await Exam.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });

  res
    .status(StatusCodes.OK)
    .json({ msg: "Exam updated successfully", exam: updatedExam });
};

export const deletePostedExam = async (req, res) => {
  const { id } = req.params;

  const exam = await Exam.findByIdAndDelete(id);

  if (!exam) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ msg: `No exam with id ${id}` });
  }

  res.status(StatusCodes.OK).json({ msg: "exam deleted successfully", exam });
};
