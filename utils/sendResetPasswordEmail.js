import nodemailer from "nodemailer";
import { resetPasswordEmailHTML } from "./constants.js";
import * as dotenv from "dotenv";
dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.APP_PASSWORD,
  },
});

export const sendResetPasswordEmail = async ({
  name,
  email,
  token,
  origin,
}) => {
  const resetURL = `${origin}/student/reset-password?token=${token}&email=${email}`;

  await transporter.sendMail({
    from: {
      name: "Exam Room Allocation Portal",
      address: process.env.EMAIL_USER,
    },
    to: email,
    subject: "Password Reset",
    html: resetPasswordEmailHTML({ name, resetURL }),
  });
};
