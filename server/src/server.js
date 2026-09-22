import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
const app = express();
import morgan from "morgan";
import { connectDB } from "./config/dbConfig.js";

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
import helmet from "helmet";
import cors from "cors";

//path imports
import { dirname } from "path";
import { fileURLToPath } from "url";
import path from "path";

import YAML from "yamljs";
import swaggerUI from "swagger-ui-express";

const __dirname = dirname(fileURLToPath(import.meta.url));

const swaggerDocument = YAML.load(path.join(__dirname, "docs", "swagger.yaml"));


if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

const allowedOrigins = ["http://localhost:5173"];

if (process.env.CLIENT_URL) {
  allowedOrigins.push(process.env.CLIENT_URL);
}

app.use(cookieParser());
app.use(express.json());
app.use(helmet());
app.set("trust proxy", 1);

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  }),
);

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/exams", examsRouter);
app.use("/api/v1/student", authenticateStudent, studentRouter);
app.use("/api/v1/staff", authenticateStaff, staffRouter);
app.use("/api/v1/admin", authenticateAdmin, adminRouter);

// Initialize Swagger UI
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument));

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
