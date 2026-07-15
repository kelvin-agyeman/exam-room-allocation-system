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
import helmet from "helmet";

//path imports
import { dirname } from "path";
import { fileURLToPath } from "url";
import path from "path";

import YAML from "yamljs";
import swaggerUI from "swagger-ui-express";

const swaggerDocument = YAML.load("./docs/swagger.yaml");

const __dirname = dirname(fileURLToPath(import.meta.url));

app.use(express.static(path.resolve(__dirname, "./client/dist")));

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(cookieParser());
app.use(express.json());
app.use(helmet());
app.set("trust proxy", 1);

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/exams", examsRouter);
app.use("/api/v1/student", authenticateStudent, studentRouter);
app.use("/api/v1/staff", authenticateStaff, staffRouter);
app.use("/api/v1/admin", authenticateAdmin, adminRouter);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use((req, res, next) => {
  if (req.path.startsWith("/api")) return next();
  res.sendFile(path.resolve(__dirname, "./client/dist", "index.html"));
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
