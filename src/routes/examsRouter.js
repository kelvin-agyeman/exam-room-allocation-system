import { Router } from "express";
const router = Router();
import { getAllExams } from "../controllers/examsController.js";
import { authenticateStudent } from "../middleware/authMiddleware.js";

router.route("/").get(authenticateStudent, getAllExams);

export default router;
