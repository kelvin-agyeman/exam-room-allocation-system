import Staff from "../../models/staffModel.js";
import { StatusCodes } from "http-status-codes";

export const getCurrentStaffService = async (userId) => {
  const staff = await Staff.findOne({ _id: userId });

  if (!staff) {
    return {
      error: true,
      status: StatusCodes.NOT_FOUND,
      msg: "Staff not found",
    };
  }

  const staffWithoutPassword = staff.toJSON();
  const staffRes = { ...staffWithoutPassword, role: "staff" };

  return {
    error: false,
    status: StatusCodes.OK,
    data: { staff: staffRes },
  };
};
