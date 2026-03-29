import {
  Users,
  Search,
  Plus,
  Edit,
  Trash2,
  Mail,
  Calendar,
  Shield,
  X,
} from "lucide-react";
import { useState } from "react";
import { useNavigate, redirect, useLoaderData } from "@tanstack/react-router";
import { useMutation } from "@tanstack/react-query";
import customFetch from "../../utils/customFetch";
import { toast } from "react-toastify";

export const Route = {
  component: AdminStaffPage,
};

export const loader = async () => {
  try {
    const staffRes = await customFetch.get("/admin/all-staff");
    return {
      staff: staffRes.data.staff,
      totalStaff: staffRes.data.totalStaff,
    };
  } catch (error) {
    throw redirect({ to: "/admin/dashboard" });
  }
};

export function AdminStaffPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const [deletingStaff, setDeletingStaff] = useState(null);
  const [editingStaff, setEditingStaff] = useState(null);

  const [editForm, setEditForm] = useState({
    fullName: "",
    staffId: "",
  });

  const navigate = useNavigate();

  const { staff, totalStaff } = useLoaderData({
    from: "/admin/staff",
  });

  /* ================= MUTATIONS ================= */

  const signUpMutation = useMutation({
    mutationFn: async (data) => {
      const res = await customFetch.post("/auth/staff/register", data);
      return res.data;
    },
    onSuccess: () => {
      toast.success("Staff Registration successful");
      setIsAddModalOpen(false);
      navigate({ to: "/admin/staff" });
    },
    onError: (error) => {
      const errorMessage =
        error?.response?.data?.msg ?? error?.response?.data?.error?.[0];
      toast.error(errorMessage);
    },
  });

  const editMutation = useMutation({
    mutationFn: async ({ staffId, data }) => {
      const res = await customFetch.patch(`/admin/staff/${staffId}`, data);
      return res.data;
    },
    onSuccess: () => {
      toast.success("Staff updated successfully");
      setIsEditModalOpen(false);
      navigate({ to: "/admin/staff" });
    },
    onError: (error) => {
      const errorMessage =
        error?.response?.data?.msg ?? error?.response?.data?.error?.[0];
      toast.error(errorMessage);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (staffId) => {
      const res = await customFetch.delete(`/admin/staff/${staffId}`);
      return res.data;
    },
    onSuccess: () => {
      toast.success("Staff deleted successfully");
      setIsDeleteModalOpen(false);
      navigate({ to: "/admin/staff" });
    },
    onError: (error) => {
      const errorMessage =
        error?.response?.data?.msg ?? error?.response?.data?.error?.[0];
      toast.error(errorMessage);
    },
  });

  /* ================= HANDLERS ================= */

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    signUpMutation.mutate(data);
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();

    editMutation.mutate({
      staffId: editingStaff._id,
      data: {
        fullName: editForm.fullName,
        staffID: editForm.staffId,
      },
    });
  };

  const handleDeleteConfirm = () => {
    deleteMutation.mutate(deletingStaff._id);
  };

  const openAddModal = () => {
    setIsAddModalOpen(true);
  };

  const closeAddModal = () => {
    setIsAddModalOpen(false);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setEditingStaff(null);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setDeletingStaff(null);
  };

  /* ================= SEARCH ================= */

  const filteredStaff = staff.filter((member) => {
    const query = searchQuery.toLowerCase();
    return (
      member.fullName.toLowerCase().includes(query) ||
      member.staffID.toLowerCase().includes(query)
    );
  });

  /* ================= UI ================= */

  return (
    <div className="admin-staff-page">
      {/* Header */}
      <div className="admin-header">
        <Shield size={26} />
        <div className="headercontent">
          <h1>Staff Management</h1>
          <p className="subtext">
            Manage staff accounts and monitor activities
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
              <h3>{totalStaff}</h3>
              <p>Total Staff</p>
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
                placeholder="Search staff..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <button className="add-student-btn" onClick={openAddModal}>
            <Plus size={18} />
            Register Staff
          </button>
        </div>

        {/* Staff Table */}
        <div className="content-section">
          <div className="section-header">
            <h2>All Staff</h2>
            <span className="student-count">{totalStaff} staff members</span>
          </div>

          <div className="students-table-container">
            <table className="students-table">
              <thead>
                <tr>
                  <th>Full Name</th>
                  <th>Staff ID</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {filteredStaff.map((member) => (
                  <tr key={member._id}>
                    <td>
                      <div className="student-info">
                        <div className="staff-avatar">
                          {member.fullName
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </div>
                        <div className="student-details">
                          <p className="student-name">{member.fullName}</p>
                        </div>
                      </div>
                    </td>

                    <td>
                      <span className="staff-id">{member.staffID}</span>
                    </td>

                    <td>
                      <div className="action-buttons">
                        <button
                          className="action-btn"
                          title="Edit"
                          onClick={() => {
                            setEditingStaff(member);
                            setEditForm({
                              fullName: member.fullName,
                              staffId: member.staffID,
                            });
                            setIsEditModalOpen(true);
                          }}
                        >
                          <Edit size={16} />
                        </button>

                        <button
                          className="action-btn delete-btn"
                          title="Delete"
                          onClick={() => {
                            setDeletingStaff(member);
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
      </div>

      {/* ================= ADD MODAL ================= */}
      {isAddModalOpen && (
        <div className="modal-overlay" onClick={closeAddModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Register Staff</h2>
              <button className="modal-close-btn" onClick={closeAddModal}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="modal-form">
              <div className="modal-form-row">
                <div className="modal-form-group">
                  <label>Full Name</label>
                  <input
                    name="fullName"
                    placeholder="Enter your full name"
                    required
                  />
                </div>
                <div className="modal-form-group">
                  <label>Staff ID</label>
                  <input name="staffID" placeholder="e.g abc123" required />
                </div>
              </div>

              <div className="modal-form-row">
                <div className="modal-form-group">
                  <label>Password</label>
                  <input
                    name="password"
                    placeholder="Enter your password"
                    required
                  />
                </div>
              </div>

              <div className="modal-actions">
                <button
                  type="button"
                  className="modal-cancel-btn"
                  onClick={closeAddModal}
                >
                  Cancel
                </button>
                <button type="submit" className="modal-save-btn">
                  Register Staff
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= EDIT MODAL ================= */}
      {isEditModalOpen && (
        <div className="modal-overlay" onClick={closeEditModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Edit Staff</h2>
              <button className="modal-close-btn" onClick={closeEditModal}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleEditSubmit} className="modal-form">
              <div className="modal-form-row">
                <div className="modal-form-group">
                  <label>Full Name</label>
                  <input
                    value={editForm.fullName}
                    onChange={(e) =>
                      setEditForm({
                        ...editForm,
                        fullName: e.target.value,
                      })
                    }
                    required
                  />
                </div>

                <div className="modal-form-group">
                  <label>Staff ID</label>
                  <input
                    value={editForm.staffId}
                    onChange={(e) =>
                      setEditForm({
                        ...editForm,
                        staffId: e.target.value,
                      })
                    }
                    required
                  />
                </div>
              </div>

              <div className="modal-actions">
                <button
                  type="button"
                  className="modal-cancel-btn"
                  onClick={closeEditModal}
                >
                  Cancel
                </button>
                <button type="submit" className="modal-save-btn">
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= DELETE MODAL ================= */}
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
                <strong>{deletingStaff?.fullName}</strong>?
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
                Delete Staff
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
