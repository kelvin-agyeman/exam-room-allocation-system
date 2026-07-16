import { readFile } from "fs/promises";
import { connectDB } from "../db/connect.js";
import dotenv from "dotenv";
dotenv.config();

import Student from "../models/studentModel.js";
try {
  await connectDB(process.env.MONGO_URL);

  const jsonStudents = JSON.parse(
    await readFile(new URL("./mockStudents.json", import.meta.url)),
  );

  await Student.deleteMany();
  await Student.create(jsonStudents);
  console.log("Success!!!");
  process.exit(0);
} catch (error) {
  console.log(error);
  process.exit(1);
}
