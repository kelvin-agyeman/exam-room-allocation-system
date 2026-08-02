import { Router } from "express";
import { getCurrentStaff } from "../controllers/staffController.js";
import {
  getAllPostedExams,
  getSingleExam,
  createExam,
  updatePostedExam,
  deletePostedExam,
} from "../controllers/examsController.js";
import {
  validate,
  validateIdParam,
} from "../middleware/validationMiddleware.js";
import { examSchema, updateExamSchema } from "../validators/examsValidator.js";
const router = Router();

router.route("/current").get(getCurrentStaff);
router
  .route("/exams")
  .get(getAllPostedExams)
  .post(validate(examSchema), createExam);
router
  .route("/exams/:id")
  .get(validateIdParam, getSingleExam)
  .patch(validateIdParam, validate(updateExamSchema), updatePostedExam)
  .delete(validateIdParam, deletePostedExam);

export default router;
