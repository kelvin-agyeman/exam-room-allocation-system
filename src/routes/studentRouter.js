import { Router } from "express";
import {
  getCurrentStudent,
  updateStudent,
  sendEditDetailsRequest,
} from "../controllers/studentController.js";
const router = Router();
import { validate } from "../middleware/validationMiddleware.js";
import {
  editStudentDetailsSchema,
  updateStudentSchema,
} from "../validators/studentValidator.js";

router.route("/current").get(getCurrentStudent);
router
  .route("/update-student")
  .patch(validate(updateStudentSchema), updateStudent);
router
  .route("/request-edit")
  .post(validate(editStudentDetailsSchema), sendEditDetailsRequest);

export default router;
