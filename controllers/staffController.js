import Staff from "../models/staffModel.js";
import { StatusCodes } from "http-status-codes";

export const getCurrentStaff = async (req, res) => {
  const staff = await Staff.findOne({ _id: req.user.userId });

  const staffWithoutPassword = staff.toJSON();

  const staffRes = { ...staffWithoutPassword, role: "staff" };

  res.status(StatusCodes.OK).json({ staff: staffRes });
};
