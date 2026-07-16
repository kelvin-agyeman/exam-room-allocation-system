import dayjs from "dayjs";
import { StatusCodes } from "http-status-codes";
import Exam from "../../models/examsModel.js";

export const getAllExamsService = async (user, query) => {
  const { departmentCode, program, level, indexNumber } = user;
  const { search, examStatus, examType, view = "all" } = query;
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

  const stats = { upcoming: 0, ongoing: 0, completed: 0 };
  formattedExams.forEach((exam) => {
    stats[exam.examStatus]++;
  });

  return {
    error: false,
    status: StatusCodes.OK,
    data: { numOfPapers: formattedExams.length, stats, exams: formattedExams },
  };
};

export const createExamService = async (examData, userId) => {
  const courseCodeExists = await Exam.findOne({
    courseCode: examData.courseCode,
  });

  if (courseCodeExists) {
    return {
      error: true,
      status: StatusCodes.BAD_REQUEST,
      msg: `An exam with course code ${examData.courseCode} already exists for program ${courseCodeExists.program} and level ${courseCodeExists.level}`,
    };
  }

  const now = dayjs();
  const examDate = dayjs(examData.startDate).format("YYYY-MM-DD");
  const examStart = dayjs(`${examDate} ${examData.startTime}`);
  const examEnd = dayjs(`${examDate} ${examData.endTime}`);

  let computedStatus = "upcoming";
  if (now.isBefore(examStart)) {
    computedStatus = "upcoming";
  } else if (now.isBefore(examEnd)) {
    computedStatus = "ongoing";
  } else {
    computedStatus = "completed";
  }

  const newExamData = {
    ...examData,
    examStatus: computedStatus,
    createdBy: userId,
  };

  const exam = await Exam.create(newExamData);
  return {
    error: false,
    status: StatusCodes.CREATED,
    msg: "Exam posted successfully",
    data: { exam },
  };
};

export const getAllPostedExamsService = async (userId, query) => {
  const { search, view, examStatus, departmentCode, level, program, examType } =
    query;
  const now = dayjs();

  const queryObject = { createdBy: userId };

  if (search) {
    queryObject.$or = [
      { courseCode: { $regex: search, $options: "i" } },
      { courseTitle: { $regex: search, $options: "i" } },
    ];
  }

  if (departmentCode) queryObject.departmentCode = departmentCode;
  if (program) queryObject.program = program;
  if (level) queryObject.level = level;
  if (examType) queryObject.examType = examType;

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

  if (formattedExams.length === 0) {
    return {
      error: false,
      status: StatusCodes.OK,
      data: { msg: "No exams found" },
    };
  }

  const stats = { upcoming: 0, ongoing: 0, completed: 0 };
  formattedExams.forEach((exam) => {
    stats[exam.examStatus]++;
  });

  return {
    error: false,
    status: StatusCodes.OK,
    data: { numOfPapers: formattedExams.length, stats, exams: formattedExams },
  };
};

export const getSingleExamService = async (examId) => {
  const exam = await Exam.findById(examId);
  if (!exam) {
    return {
      error: true,
      status: StatusCodes.NOT_FOUND,
      msg: "Item not found",
    };
  }
  return { error: false, status: StatusCodes.OK, data: { exam } };
};

export const updatePostedExamService = async (examId, userId, updateData) => {
  const exam = await Exam.findOne({ _id: examId, createdBy: userId });

  if (!exam) {
    return {
      error: true,
      status: StatusCodes.NOT_FOUND,
      msg: "Exam not found",
    };
  }

  const updatedExam = await Exam.findByIdAndUpdate(examId, updateData, {
    new: true,
    runValidators: true,
  });

  return {
    error: false,
    status: StatusCodes.OK,
    msg: "Exam updated successfully",
    data: { exam: updatedExam },
  };
};

export const deletePostedExamService = async (examId) => {
  const exam = await Exam.findByIdAndDelete(examId);

  if (!exam) {
    return {
      error: true,
      status: StatusCodes.NOT_FOUND,
      msg: `No exam with id ${examId}`,
    };
  }

  return {
    error: false,
    status: StatusCodes.OK,
    msg: "exam deleted successfully",
    data: { exam },
  };
};
