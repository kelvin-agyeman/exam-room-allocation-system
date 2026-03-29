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
      staff: staffRes?.data?.staff || null,
      numOfPapers: postedExamsRes?.data?.numOfPapers || 0,
    };
  } catch (error) {
    // ❗ only redirect if truly unauthorized
    if (error?.response?.status === 401) {
      throw redirect({ to: "/staff/login" });
    }

    return {
      staff: null,
      numOfPapers: 0,
    };
  }
};

function StaffProfilePage() {
  const navigate = useNavigate();

  const { staff, numOfPapers } = useLoaderData({
    from: "/staff/profile",
  });

  const handleLogout = async () => {
    try {
      await customFetch.get("/auth/staff/logout");
      toast.success("Logged out successfully");
    } catch (error) {
      toast.error("Logout failed");
    } finally {
      navigate({ to: "/staff/login" });
    }
  };

  // ✅ SAFE initials
  const getInitials = (name) => {
    if (!name) return "NA";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  // ✅ SAFE role color
  const getRoleColor = (role) => {
    if (!role) return "#6B7280";

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
              style={{ backgroundColor: getRoleColor(staff?.role) }}
            >
              <span className="avatar-initials">
                {getInitials(staff?.fullName)}
              </span>

              <button className="avatar-camera-btn" title="Change Photo">
                <Camera size={14} />
              </button>
            </div>
          </div>

          <div className="profile-header-info">
            <h1 className="profile-name">{staff?.fullName || "No Name"}</h1>

            <span
              className="profile-role-badge"
              style={{ backgroundColor: getRoleColor(staff?.role) }}
            >
              {staff?.role || "N/A"}
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
                  <p className="field-value">{staff?.fullName || "N/A"}</p>
                </div>
              </div>

              <div className="profile-field">
                <div className="field-icon">
                  <Hash size={18} />
                </div>
                <div className="field-content">
                  <label>Staff ID</label>
                  <p className="field-value">{staff?.staffID || "N/A"}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="profile-stats-card">
            <h3>Quick Stats</h3>
            <div className="stats-grid">
              <div className="stat-box">
                <span className="stat-number">{numOfPapers || 0}</span>
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
