import { Router } from "express";
import {
  getCurrentAdmin,
  getAllStaff,
  getAllStudents,
  updateStaff,
  deleteStaff,
  deleteStudent,
  getSingleStaff,
  getSingleStudent,
  approveEditDetailsRequest,
  getAllEditDetailsRequests,
  getSingleEditRequest,
} from "../controllers/adminController.js";
const router = Router();
import {
  validateIdParam,
  validate,
} from "../middleware/validationMiddleware.js";
import { updateStaffSchema } from "../validators/adminValidator.js";

router.route("/current").get(getCurrentAdmin);
router.route("/all-staff").get(getAllStaff);
router.route("/all-students").get(getAllStudents);
router.route("/edit-requests").get(getAllEditDetailsRequests);
router.route("/edit-requests/:id").get(validateIdParam, getSingleEditRequest);
router
  .route("/edit-requests/approve/:id")
  .patch(validateIdParam, approveEditDetailsRequest);
router
  .route("/staff/:id")
  .get(validateIdParam, getSingleStaff)
  .patch(validateIdParam, validate(updateStaffSchema), updateStaff)
  .delete(validateIdParam, deleteStaff);
router
  .route("/student/:id")
  .get(validateIdParam, getSingleStudent)
  .delete(validateIdParam, deleteStudent);

export default router;
