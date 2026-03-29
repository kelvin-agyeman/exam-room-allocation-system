import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
const app = express();
import morgan from "morgan";
import { connectDB } from "./db/connect.js";

//router imports
import examsRouter from "./routes/examsRouter.js";
import authRouter from "./routes/authRouter.js";
import studentRouter from "./routes/studentRouter.js";
import staffRouter from "./routes/staffRouter.js";
import adminRouter from "./routes/adminRouter.js";

//middleware imports
import { notFound } from "./middleware/notFound.js";
import { errorHandlerMiddleware } from "./middleware/errorHandler.js";

//cookie-parser
import cookieParser from "cookie-parser";
import {
  authenticateAdmin,
  authenticateStaff,
  authenticateStudent,
} from "./middleware/authMiddleware.js";

// security imports
// import helmet from "helmet";
// import mongoSanitize from "express-mongo-sanitize";

//path imports
import path from "path";

// Serve frontend build
const buildPath = path.join(process.cwd(), "Examlocator", "dist");
app.use(express.static(buildPath));

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(cookieParser());
app.use(express.json());
// app.use(helmet());
// app.use(mongoSanitize());

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/exams", examsRouter);
app.use("/api/v1/student", authenticateStudent, studentRouter);
app.use("/api/v1/staff", authenticateStaff, staffRouter);
app.use("/api/v1/admin", authenticateAdmin, adminRouter);

// Serve frontend for all non-API routes
app.use((req, res, next) => {
  // Skip API routes
  if (req.path.startsWith("/api")) return next();

  // Serve index.html
  res.sendFile(path.resolve(process.cwd(), "Examlocator/dist/index.html"), (err) => {
    if (err) {
      next(err);
    }
  });
});

app.use(notFound);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}...`);
    });
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

start();
