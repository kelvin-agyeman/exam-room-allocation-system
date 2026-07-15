import { useState, useEffect } from "react";
import {
  CheckCircle,
  XCircle,
  User,
  Clock,
  Search,
  Filter,
  FileText,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import customFetch from "../../utils/customFetch";
import { redirect, useLoaderData, useNavigate } from "@tanstack/react-router";
import { toast } from "react-toastify";

export const Route = {
  component: RequestApprovalPage,
};

export const loader = async () => {
  try {
    const [adminRes, editRequestsRes] = await Promise.all([
      customFetch.get("/admin/current"),
      customFetch.get("/admin/edit-requests"),
    ]);

    return {
      admin: adminRes?.data?.admin ?? null,
      editRequests: editRequestsRes?.data?.requests ?? [],
    };
  } catch (error) {
    throw redirect({ to: "/admin/login" });
  }
};

export function RequestApprovalPage() {
  const { editRequests } = useLoaderData({
    from: "/admin/requestApproval",
  });
  const navigate = useNavigate();

  const [requestsWithStudents, setRequestsWithStudents] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [expandedRequest, setExpandedRequest] = useState(null);

  // Fetch student info for each request
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const updated = await Promise.all(
          editRequests.map(async (req) => {
            try {
              const res = await customFetch.get(
                `/admin/student/${req.requestedBy}`,
              );
              return { ...req, student: res?.data?.student ?? null };
            } catch {
              return { ...req, student: null };
            }
          }),
        );
        setRequestsWithStudents(updated);
      } catch (err) {
        console.error(err);
      }
    };

    fetchStudents();
  }, [editRequests]);

  // Compute stats dynamically
  const stats = {
    total: requestsWithStudents.length,
    pending: requestsWithStudents.filter((r) => r.status === "pending").length,
    approved: requestsWithStudents.filter((r) => r.status === "approved")
      .length,
    rejected: requestsWithStudents.filter((r) => r.status === "rejected")
      .length,
  };

  // Filter requests by search and status
  const filteredRequests = requestsWithStudents.filter((req) => {
    const matchesStatus = filterStatus === "all" || req.status === filterStatus;
    const student = req.student;
    const matchesSearch =
      !searchQuery ||
      student?.firstName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student?.lastName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student?.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      String(student?.indexNumber || "").includes(searchQuery);
    return matchesStatus && matchesSearch;
  });

  // Badge colors for statuses
  const getStatusBadge = (status) => {
    const styles = {
      pending: { background: "#FEF3C7", color: "#D97706" },
      approved: { background: "#D1FAE5", color: "#059669" },
      rejected: { background: "#FEE2E2", color: "#DC2626" },
    };
    return styles[status] || styles.pending;
  };

  const toggleExpand = (id) => {
    setExpandedRequest(expandedRequest === id ? null : id);
  };

  const formatDate = (date) => new Date(date).toLocaleDateString();

  const handleApprove = async (id) => {
    try {
      await customFetch.patch(`/admin/edit-requests/approve/${id}`);
      toast.success("Request Approved");
      navigate({ to: "/admin/requestApproval" }); // reload page
    } catch (err) {
      toast.error("Failed to approve request");
      console.error(err);
    }
  };

  const handleReject = async (id) => {
    try {
      await customFetch.patch(`/admin/edit-requests/reject/${id}`);
      toast.success("Request Rejected");
      navigate({ to: "/admin/requestApproval" }); // reload page
    } catch (err) {
      toast.error("Failed to reject request");
      console.error(err);
    }
  };

  return (
    <div className="admin-request-page">
      {/* HEADER */}
      <div className="admin-request-header">
        <div className="header-title-section">
          <FileText size={28} className="header-icon" />
          <div>
            <h1>Edit Request Approvals</h1>
            <p>Review and manage profile edit requests from users</p>
          </div>
        </div>
      </div>

      {/* STATS */}
      <div className="request-stats-grid">
        <div className="request-stat-card total">
          <div className="stat-icon">
            <FileText size={20} />
          </div>
          <div className="stat-info">
            <span className="stat-value">{stats.total}</span>
            <span className="stat-label">Total Requests</span>
          </div>
        </div>
        <div className="request-stat-card pending">
          <div className="stat-icon">
            <Clock size={20} />
          </div>
          <div className="stat-info">
            <span className="stat-value">{stats.pending}</span>
            <span className="stat-label">Pending</span>
          </div>
        </div>
        <div className="request-stat-card approved">
          <div className="stat-icon">
            <CheckCircle size={20} />
          </div>
          <div className="stat-info">
            <span className="stat-value">{stats.approved}</span>
            <span className="stat-label">Approved</span>
          </div>
        </div>
        <div className="request-stat-card rejected">
          <div className="stat-icon">
            <XCircle size={20} />
          </div>
          <div className="stat-info">
            <span className="stat-value">{stats.rejected}</span>
            <span className="stat-label">Rejected</span>
          </div>
        </div>
      </div>

      {/* FILTERS */}
      <div className="request-filters">
        <div className="request-search-box">
          <Search size={18} />
          <input
            type="text"
            placeholder="Search by name, email, or ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="request-filter-dropdown">
          <Filter size={18} />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
      </div>

      {/* REQUEST LIST */}
      <div className="requests-container">
        {filteredRequests.length === 0 ? (
          <div className="no-requests">
            <FileText size={48} />
            <p>No requests found</p>
          </div>
        ) : (
          filteredRequests.map((request) => {
            const student = request.student;
            return (
              <div
                key={request._id}
                className={`request-card ${request.status}`}
              >
                <div
                  className="request-card-header"
                  onClick={() => toggleExpand(request._id)}
                >
                  <div className="request-user-info">
                    <div className="request-avatar">
                      <User size={20} />
                    </div>
                    <div className="request-details">
                      <h3>
                        {student
                          ? `${student.firstName} ${student.lastName}`
                          : "Unknown Student"}
                      </h3>
                      <p className="request-meta">
                        Index Number: {student?.indexNumber} • {student?.email}
                      </p>
                    </div>
                  </div>
                  <div className="request-status-section">
                    <span
                      className="request-status-badge"
                      style={getStatusBadge(request.status)}
                    >
                      {request.status}
                    </span>
                    <span className="request-date">
                      {formatDate(request.createdAt)}
                    </span>
                    <button className="expand-btn">
                      {expandedRequest === request._id ? (
                        <ChevronUp size={20} />
                      ) : (
                        <ChevronDown size={20} />
                      )}
                    </button>
                  </div>
                </div>

                {expandedRequest === request._id && (
                  <div className="request-card-body">
                    <div className="request-reason">
                      <strong>Reason:</strong>
                      <p>{request.reason}</p>
                    </div>
                    <div className="changes-comparison">
                      <h4>Requested Changes:</h4>
                      <div className="changes-table">
                        <div className="changes-header">
                          <span>Field</span>
                          <span>New Value</span>
                        </div>
                        <div className="change-row">
                          <span>Index Number</span>
                          <span>{request.newIndexNumber}</span>
                        </div>
                        <div className="change-row">
                          <span>Department Code</span>
                          <span>{request.newDepartmentCode}</span>
                        </div>
                        <div className="change-row">
                          <span>Level</span>
                          <span>{request.newLevel}</span>
                        </div>
                        <div className="change-row">
                          <span>Program</span>
                          <span>{request.newProgram}</span>
                        </div>
                      </div>
                    </div>

                    {request.status === "pending" && (
                      <div className="request-actions">
                        <button
                          className="approve-btn"
                          onClick={() => handleApprove(request._id)}
                        >
                          <CheckCircle size={18} /> Approve
                        </button>
                        <button
                          className="reject-btn"
                          onClick={() => handleReject(request._id)}
                        >
                          <XCircle size={18} /> Reject
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
