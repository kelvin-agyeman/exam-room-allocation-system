import { useState } from "react";
import {
  User,
  Mail,
  Hash,
  GraduationCap,
  School,
  Edit2,
  Check,
  X,
  Camera,
  LogOut,
  BookOpen,
} from "lucide-react";
import { redirect, useLoaderData, useNavigate } from "@tanstack/react-router";
import { useMutation } from "@tanstack/react-query";
import customFetch from "../../utils/customFetch";
import { LEVELS, PROGRAMS } from "../../../../utils/constants";
import { toast } from "react-toastify";

export const loader = async () => {
  try {
    const [studentRes, examsRes] = await Promise.all([
      customFetch.get("/student/current"),
      customFetch.get("/exams"),
    ]);

    return {
      student: studentRes?.data?.student || null,
      stats: examsRes?.data?.stats || { completed: 0, upcoming: 0 },
    };
  } catch (error) {
    throw redirect({ to: "/student/dashboard" });
  }
};

function StudentProfilePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const { student, stats } = useLoaderData({
    from: "/student/profile",
  });

  // Defensive check if student data is missing
  if (!student) {
    return <div className="loading">Loading student data...</div>;
  }

  const [formData, setFormData] = useState({
    newIndexNumber: student.indexNumber || "",
    newDepartmentCode: student.departmentCode || "",
    newLevel: student.level || "",
    newProgram: student.program || "",
    reason: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const editRequestMutation = useMutation({
    mutationFn: async (data) => {
      const res = await customFetch.post("/student/request-edit", data);
      return res.data;
    },
    onSuccess: (data) => {
      toast.success(data.msg);
      setIsModalOpen(false);
    },
    onError: (error) => {
      const errorMessage =
        error?.response?.data?.msg ??
        error?.response?.data?.error?.[0] ??
        "Request failed";
      toast.error(errorMessage);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      ...formData,
      newIndexNumber: Number(formData.newIndexNumber),
      newLevel: Number(formData.newLevel),
    };
    editRequestMutation.mutate(data);
  };

  const handleLogout = async () => {
    await customFetch.get("/auth/logout");
    toast.success("Logging out...");
    navigate({ to: "/student/login" });
  };

  const getInitials = (name) =>
    name
      ? name
          .split(" ")
          .map((n) => n[0])
          .join("")
          .toUpperCase()
      : "";

  const getRoleColor = (role) => {
    switch (role?.toLowerCase()) {
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
          <div className="profile-cover"></div>
          <div className="profile-avatar-wrapper">
            <div
              className="profile-avatar"
              style={{ backgroundColor: getRoleColor(student.role) }}
            >
              <span className="avatar-initials">
                {getInitials(student.firstName)}
                {getInitials(student.lastName)}
              </span>
              <button className="avatar-camera-btn" title="Change Photo">
                <Camera size={14} />
              </button>
            </div>
          </div>
          <div className="profile-header-info">
            <h1 className="profile-name">{`${student.firstName} ${student.lastName}`}</h1>
            <span
              className="profile-role-badge"
              style={{ backgroundColor: getRoleColor(student.role) }}
            >
              {student.role}
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
                <button
                  className="profile-edit-btn"
                  onClick={() => setIsModalOpen(true)}
                >
                  <Edit2 size={16} />
                  Send Edit Request
                </button>
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
                  <p className="field-value">{`${student.firstName} ${student.lastName}`}</p>
                </div>
              </div>

              <div className="profile-field">
                <div className="field-icon">
                  <Mail size={18} />
                </div>
                <div className="field-content">
                  <label>Email Address</label>
                  <p className="field-value">{student.email}</p>
                </div>
              </div>

              <div className="profile-field">
                <div className="field-icon">
                  <Hash size={18} />
                </div>
                <div className="field-content">
                  <label>Index Number</label>
                  <p className="field-value">{student.indexNumber}</p>
                </div>
              </div>

              <div className="profile-field">
                <div className="field-icon">
                  <GraduationCap size={18} />
                </div>
                <div className="field-content">
                  <label>Department</label>
                  <p className="field-value">{student.departmentCode}</p>
                </div>
              </div>

              <div className="profile-field">
                <div className="field-icon">
                  <BookOpen size={18} />
                </div>
                <div className="field-content">
                  <label>Program</label>
                  <p className="field-value">{student.program}</p>
                </div>
              </div>

              <div className="profile-field">
                <div className="field-icon">
                  <School size={18} />
                </div>
                <div className="field-content">
                  <label>Level</label>
                  <p className="field-value">{student.level}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="profile-stats-card">
            <h3>Quick Stats</h3>
            <div className="stats-grid">
              <div className="stat-box">
                <span className="stat-number">{stats.completed}</span>
                <span className="stat-label">Exams Taken</span>
              </div>
              <div className="stat-box">
                <span className="stat-number">{stats.upcoming}</span>
                <span className="stat-label">Upcoming</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* MODAL */}
      {isModalOpen && (
        <div className="profile-modal-overlay">
          <form className="profile-modal" onSubmit={handleSubmit}>
            <div className="profile-modal-header">
              <h2>Send Edit Request</h2>
              <button type="button" onClick={() => setIsModalOpen(false)}>
                <X size={18} />
              </button>
            </div>

            <div className="profile-modal-body">
              <div className="modal-field">
                <label>Index Number</label>
                <input
                  name="newIndexNumber"
                  value={formData.newIndexNumber}
                  onChange={handleChange}
                />
              </div>

              <div className="modal-field">
                <label>Department Code</label>
                <input
                  name="newDepartmentCode"
                  value={formData.newDepartmentCode}
                  onChange={handleChange}
                />
              </div>

              <div className="modal-field">
                <label>Level</label>
                <select
                  name="newLevel"
                  value={formData.newLevel}
                  onChange={handleChange}
                >
                  <option value="">Select level</option>
                  {LEVELS.map((level) => (
                    <option value={level} key={level}>
                      {level}
                    </option>
                  ))}
                </select>
              </div>

              <div className="modal-field">
                <label>Program</label>
                <select
                  name="newProgram"
                  value={formData.newProgram}
                  onChange={handleChange}
                >
                  <option value="">Select program</option>
                  {Object.values(PROGRAMS).map((program) => (
                    <option value={program} key={program}>
                      {program}
                    </option>
                  ))}
                </select>
              </div>

              <div className="modal-field">
                <label>Reason</label>
                <textarea
                  name="reason"
                  value={formData.reason}
                  onChange={handleChange}
                  placeholder="Enter reason..."
                  rows="3"
                />
              </div>
            </div>

            <div className="profile-modal-actions">
              <button type="submit" className="profile-save-btn">
                <Check size={16} /> Send Request
              </button>
              <button
                type="button"
                className="profile-cancel-btn"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default StudentProfilePage;
