import { Users, Search, Trash2, Mail, Shield, X } from "lucide-react";
import { useState } from "react";
import { useNavigate, redirect, useLoaderData } from "@tanstack/react-router";
import { useMutation } from "@tanstack/react-query";
import customFetch from "../../utils/customFetch";
import { toast } from "react-toastify";

export const Route = {
  component: AdminStudPage,
};

export const loader = async () => {
  try {
    const studentRes = await customFetch.get("/admin/all-students");

    return {
      students: studentRes.data.students || [], // ✅ FIX
      totalStudents: studentRes.data.totalStudents || 0,
    };
  } catch (error) {
    throw redirect({ to: "/admin/dashboard" });
  }
};

export function AdminStudPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deletingStudent, setDeletingStudent] = useState(null);

  const navigate = useNavigate();

  const { students, totalStudents } = useLoaderData({
    from: "/admin/students",
  });

  /* ================= MUTATIONS ================= */

  const deleteMutation = useMutation({
    mutationFn: async (studentId) => {
      const res = await customFetch.delete(`/admin/student/${studentId}`);
      return res.data;
    },
    onSuccess: () => {
      toast.success("Student deleted successfully");
      setIsDeleteModalOpen(false);
      navigate({ to: "/admin/students" });
    },
    onError: (error) => {
      const errorMessage =
        error?.response?.data?.msg ?? error?.response?.data?.error?.[0];
      toast.error(errorMessage);
    },
  });

  /* ================= HANDLERS ================= */

  const handleDeleteConfirm = () => {
    if (!deletingStudent) return;
    deleteMutation.mutate(deletingStudent._id);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setDeletingStudent(null); // ✅ FIX
  };

  /* ================= SEARCH ================= */

  const filteredStudents = (students || []).filter((member) => {
    const query = searchQuery.toLowerCase();

    return (
      member.firstName?.toLowerCase().includes(query) ||
      member.lastName?.toLowerCase().includes(query) ||
      String(member.indexNumber).toLowerCase().includes(query) // ✅ FIX
    );
  });

  /* ================= UI ================= */

  return (
    <div className="admin-staff-page">
      {/* Header */}
      <div className="admin-header">
        <Shield size={26} />
        <div className="headercontent">
          <h1>Student Management</h1>
          <p className="subtext">
            Manage student accounts and monitor activities
          </p>
        </div>
      </div>

      <div className="main-content">
        {/* Stats Grid */}
        <div className="stats-grid">
          <div className="stat-card primary">
            <div className="stat-icon">
              <Users size={24} />
            </div>
            <div className="stat-content">
              <h3>{totalStudents}</h3>
              <p>Total Students</p>
            </div>
          </div>
        </div>

        {/* Action Bar */}
        <div className="action-bar">
          <div className="search-filter-group">
            <div className="search-box">
              <Search size={18} />
              <input
                type="text"
                placeholder="Search students..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="content-section">
          <div className="section-header">
            <h2>All Students</h2>
            <span className="student-count">{totalStudents} students</span>
          </div>

          <div className="students-table-container">
            <table className="students-table">
              <thead>
                <tr>
                  <th>Full Name</th>
                  <th>Index Number</th>
                  <th>Email</th>
                  <th>Department Code</th>
                  <th>Level</th>
                  <th>Program</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {filteredStudents.map((student) => (
                  <tr key={student._id}>
                    <td>
                      <div className="student-info">
                        <div className="staff-avatar">
                          {student.firstName?.[0]}
                          {student.lastName?.[0]}
                        </div>
                        <div className="student-details">
                          <p className="student-name">
                            {student.firstName} {student.lastName}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td>
                      <span className="staff-id">{student.indexNumber}</span>
                    </td>

                    <td>
                      <span className="student-name">{student.email}</span>
                    </td>

                    <td>
                      <span className="student-name">
                        {student.departmentCode}
                      </span>
                    </td>

                    <td>
                      <span className="student-name">{student.level}</span>
                    </td>

                    <td>
                      <span className="student-name">{student.program}</span>
                    </td>

                    <td>
                      <div className="action-buttons">
                        <button
                          className="action-btn delete-btn"
                          title="Delete"
                          onClick={() => {
                            setDeletingStudent(student); // ✅ FIX
                            setIsDeleteModalOpen(true);
                          }}
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Info Cards */}
        <div className="info-cards-grid">
          <div className="info-card">
            <div className="info-icon email">
              <Mail size={20} />
            </div>
            <div className="info-content">
              <h4>Bulk Email</h4>
              <p>Send announcements to all students</p>
            </div>
          </div>
        </div>
      </div>

      {/* DELETE MODAL */}
      {isDeleteModalOpen && (
        <div className="modal-overlay" onClick={closeDeleteModal}>
          <div
            className="modal-content delete-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header">
              <h2>Confirm Delete</h2>
              <button className="modal-close-btn" onClick={closeDeleteModal}>
                <X size={20} />
              </button>
            </div>

            <div className="delete-modal-body">
              <p className="delete-message">
                Are you sure you want to delete{" "}
                <strong>
                  {deletingStudent
                    ? `${deletingStudent.firstName} ${deletingStudent.lastName}`
                    : ""}
                </strong>
                ?
              </p>
              <p className="delete-warning">This action cannot be undone.</p>
            </div>

            <div className="modal-actions">
              <button
                type="button"
                className="modal-cancel-btn"
                onClick={closeDeleteModal}
              >
                Cancel
              </button>
              <button
                type="button"
                className="modal-delete-btn"
                onClick={handleDeleteConfirm}
              >
                Delete Student
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
