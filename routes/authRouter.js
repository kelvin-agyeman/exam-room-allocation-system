import { Router } from "express";
const router = Router();
import {
  registerStudent,
  registerStaff,
  registerAdmin,
  studentLogin,
  staffLogin,
  adminLogin,
  logout,
  forgotPassword,
  resetPassword,
} from "../controllers/authController.js";
import rateLimiter from "express-rate-limit";
import { validate } from "../middleware/validationMiddleware.js";
import {
  registerStudentSchema,
  registerStaffSchema,
  loginStudentSchema,
  loginStaffSchema,
  registerLoginAdminSchema,
} from "../validators/authValidator.js";
import { authenticateAdmin } from "../middleware/authMiddleware.js";

const apiLimiter = rateLimiter({
  windowMs: 1000 * 60 * 15,
  max: 15,
  message: {
    msg: "IP rate limit exceeded, retry in 15 minutes",
  },
});

const forgotPasswordAPILimiter = rateLimiter({
  windowMs: 1000 * 60 * 10,
  max: 5,
  message: {
    msg: "Too many password reset requests, please try again later",
  },
});

router
  .route("/register")
  .post(apiLimiter, validate(registerStudentSchema), registerStudent);
router
  .route("/staff/register")
  .post(authenticateAdmin, validate(registerStaffSchema), registerStaff);
router
  .route("/admin/register")
  .post(apiLimiter, validate(registerLoginAdminSchema), registerAdmin);
router
  .route("/login")
  .post(apiLimiter, validate(loginStudentSchema), studentLogin);
router
  .route("/staff/login")
  .post(apiLimiter, validate(loginStaffSchema), staffLogin);
router
  .route("/admin/login")
  .post(apiLimiter, validate(registerLoginAdminSchema), adminLogin);
router.route("/logout").get(logout);
router.route("/staff/logout").get(logout);
router.route("/admin/logout").get(logout);
router.route("/forgot-password").post(forgotPasswordAPILimiter, forgotPassword);
router.route("/reset-password").post(resetPassword);

export default router;
