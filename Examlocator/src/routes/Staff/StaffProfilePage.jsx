import { User, Hash, Camera, LogOut } from "lucide-react";
import { redirect, useLoaderData, useNavigate } from "@tanstack/react-router";
import customFetch from "../../utils/customFetch";
import { toast } from "react-toastify";

export const loader = async () => {
  try {
    const [staffRes, postedExamsRes] = await Promise.all([
      customFetch.get("/staff/current"),
      customFetch.get("/staff/exams"),
    ]);
    return {
      staff: staffRes.data.staff,
      numOfPapers: postedExamsRes.data.numOfPapers,
    };
  } catch (error) {
    throw redirect({ to: "/staff/dashboard" });
  }
};

function StaffProfilePage() {
  const navigate = useNavigate();

  const { staff, numOfPapers } = useLoaderData({
    from: "/staff/profile",
  });

  const handleLogout = async () => {
    navigate({ to: "/staff/login" });
    await customFetch.get("/auth/staff/logout");
    toast.success("Logging out...");
  };

  const getInitials = (name) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  const getRoleColor = (role) => {
    switch (role.toLowerCase()) {
      case "student":
        return "#2A6F68";
      case "staff":
        return "#4A72A6";
      case "admin":
        return "#8B5CF6";
      default:
        return "#6B7280";
    }
  };

  return (
    <div className="profile-page">
      <div className="profile-container">
        {/* Header Section */}
        <div className="profile-header-section">
          <div className="staff-profile-cover"></div>
          <div className="profile-avatar-wrapper">
            <div
              className="profile-avatar"
              style={{ backgroundColor: getRoleColor(staff.role) }}
            >
              <span className="avatar-initials">
                {getInitials(staff.fullName)}
              </span>
              <button className="avatar-camera-btn" title="Change Photo">
                <Camera size={14} />
              </button>
            </div>
          </div>
          <div className="profile-header-info">
            <h1 className="profile-name">{staff.fullName}</h1>
            <span
              className="profile-role-badge"
              style={{ backgroundColor: getRoleColor(staff.role) }}
            >
              {staff.role}
            </span>
          </div>
        </div>

        {/* Main Content */}
        <div className="profile-content">
          {/* Info Card */}
          <div className="profile-info-card">
            <div className="profile-card-header">
              <h2>Personal Information</h2>

              <div className="profile-action-btns">
                <button className="profile-logout-btn" onClick={handleLogout}>
                  <LogOut size={16} />
                  Logout
                </button>
              </div>
            </div>

            <div className="profile-fields">
              <div className="profile-field">
                <div className="field-icon">
                  <User size={18} />
                </div>
                <div className="field-content">
                  <label>Full Name</label>
                  <p className="field-value">{staff.fullName}</p>
                </div>
              </div>

              <div className="profile-field">
                <div className="field-icon">
                  <Hash size={18} />
                </div>
                <div className="field-content">
                  <label>Staff ID</label>
                  <p className="field-value">{staff.staffID}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="profile-stats-card">
            <h3>Quick Stats</h3>
            <div className="stats-grid">
              <div className="stat-box">
                <span className="stat-number">{numOfPapers}</span>
                <span className="stat-label">Total Exams Created</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StaffProfilePage;
