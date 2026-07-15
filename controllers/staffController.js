import { getCurrentStaffService } from "../services/staff/staffService.js";

export const getCurrentStaff = async (req, res) => {
  const result = await getCurrentStaffService(req.user.userId);

  if (result.error) {
    return res.status(result.status).json({ msg: result.msg });
  }

  res.status(result.status).json(result.data);
};
