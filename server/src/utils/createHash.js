import crypto from "crypto";

export const createHashToken = (string) => {
  return crypto.createHash("sha256").update(string).digest("hex");
};
