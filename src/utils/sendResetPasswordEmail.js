import { sendEmail } from "./sendEmail.js";
import { resetPasswordEmailHTML } from "./constants.js";

export const sendResetPasswordEmail = async ({
  name,
  email,
  token,
  origin,
}) => {
  const resetURL = `${origin}/student/reset-password?token=${token}&email=${email}`;

  return sendEmail({
    to: email,
    subject: "Reset Password",
    html: resetPasswordEmailHTML({ name, resetURL }),
  });
};
