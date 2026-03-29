import {
  Shield,
  Search,
  Plus,
  MapPin,
  Calendar,
  Clock,
  Edit2,
  Trash2,
  User,
} from "lucide-react";
import { useState, useEffect, useRef } from "react";
import customFetch from "../../utils/customFetch";
import {
  redirect,
  useLoaderData,
  useSearch,
  useNavigate,
  useRouter,
  Link,
} from "@tanstack/react-router";
import { useMutation } from "@tanstack/react-query";
import dayjs from "dayjs";
import { toast } from "react-toastify";

export const Route = {
  component: StaffdashboardPage,
};

export const loader = async () => {
  try {
    const [staffRes, postedExamsRes] = await Promise.all([
      customFetch.get("/staff/current"),
      customFetch.get("/staff/exams"),
    ]);
    return {
      staff: staffRes.data.staff,
      postedExams: postedExamsRes.data.exams,
      stats: postedExamsRes.data.stats,
      numOfPapers: postedExamsRes.data.numOfPapers,
    };
  } catch (error) {
    throw redirect({ to: "/staff/login" });
  }
};

export function StaffdashboardPage() {
  const [showModal, setShowModal] = useState(false);
  const [selectedExamId, setSelectedExamId] = useState(null);

  const { staff, postedExams, stats, numOfPapers } = useLoaderData({
    from: "/staff/dashboard",
  });

  // ✅ LOCAL STATE (SOURCE OF TRUTH)
  const [exams, setExams] = useState(postedExams);

  const navigate = useNavigate();
  const search = useSearch({ from: "/staff/dashboard" });

  const [selected, setSelected] = useState(search.examStatus || "All Exams");
  const [searchTerm, setSearchTerm] = useState(search.search || "");
  const [filteredExams, setFilteredExams] = useState(exams);

  const searchTimeout = useRef(null);

  // ✅ FILTER USING LOCAL exams STATE
  useEffect(() => {
    let result = [...exams];

    if (selected !== "All Exams") {
      result = result.filter(
        (exam) => exam.examStatus.toLowerCase() === selected.toLowerCase(),
      );
    }

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        (exam) =>
          exam.courseTitle.toLowerCase().includes(term) ||
          exam.courseCode.toLowerCase().includes(term),
      );
    }

    setFilteredExams(result);
  }, [exams, selected, searchTerm]);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (searchTimeout.current) clearTimeout(searchTimeout.current);
    searchTimeout.current = setTimeout(() => {
      navigate({
        to: "/staff/dashboard",
        search: (prev) => ({ ...prev, search: value }),
      });
    }, 3000);
  };

  const deleteExamMutation = useMutation({
    mutationFn: async (id) => {
      const res = await customFetch.delete(`/staff/exams/${id}`);
      return res.data;
    },
    onSuccess: () => {
      toast.success("Exam deleted successfully");

      // ✅ REMOVE FROM UI IMMEDIATELY
      setExams((prev) => prev.filter((exam) => exam._id !== selectedExamId));

      setShowModal(false);
    },
    onError: (error) => {
      const msg = error?.response?.data?.msg ?? "Failed to delete exam";
      toast.error(msg);
    },
  });

  const confirmDelete = () => {
    deleteExamMutation.mutate(selectedExamId);
  };

  const router = useRouter();
  const currentPath = router.state.location.pathname;

  const isAuthPage = currentPath === "/staff/login";

  return (
    <div className="staff-dashboard">
      <div className="student-nav-brand">
        {!isAuthPage && (
          <Link
            to="/staff/profile"
            className="student-profile-btn"
            title="Profile"
          >
            <User size={20} />
          </Link>
        )}
      </div>
      <div className="staff-header">
        <Shield size={26} />
        <div className="headercontent">
          <h1>Exam Location Assignment</h1>
          <p className="subtext">
            Assign and manage exam rooms and locations for all courses
          </p>
        </div>
      </div>

      <div className="main-content">
        <div className="exam-controls">
          <div className="search-box">
            <Search size={18} className="search-icon" />
            <input
              type="text"
              placeholder="Search courses, rooms, buildings..."
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
          <button
            className="assign-exam-btn"
            onClick={() => navigate({ to: "/staff/assignNewExam" })}
          >
            <Plus size={18} />
            Assign New Exam
          </button>
        </div>

        <div className="exam-stats">
          <div className="stat-item">
            <MapPin size={16} />
            <span className="stat-value">{numOfPapers}</span>
            <span className="stat-label">Total</span>
          </div>
          <div className="stat-item stat-upcoming">
            <Calendar size={16} />
            <span className="stat-value">{stats.upcoming}</span>
            <span className="stat-label">Upcoming</span>
          </div>
          <div className="stat-item stat-ongoing">
            <Clock size={16} />
            <span className="stat-value">{stats.ongoing}</span>
            <span className="stat-label">Ongoing</span>
          </div>
          <div className="stat-item stat-completed">
            <Calendar size={16} />
            <span className="stat-value">{stats.completed}</span>
            <span className="stat-label">Completed</span>
          </div>
        </div>

        <div className="exam-table-container">
          <table className="exam-table">
            <thead>
              <tr>
                <th>Course</th>
                <th>Date & Time</th>
                <th>Room</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredExams.map((exam) => {
                const formattedDate = dayjs(exam.startDate).format(
                  "MMM D, YYYY",
                );

                return (
                  <tr key={exam._id}>
                    <td>
                      <div className="course-info">
                        <span className="course-codes">{exam.courseCode}</span>
                        <span className="course-name">{exam.courseTitle}</span>
                      </div>
                    </td>
                    <td>
                      <div className="datetime-info">
                        <span className="exam-date">{formattedDate}</span>
                        <span className="exam-time">{`${exam.startTime} - ${exam.endTime}`}</span>
                      </div>
                    </td>
                    <td>{exam.roomAllocations[0].roomLocation}</td>
                    <td>
                      <span
                        className={`status-badge status-${exam.examStatus}`}
                        style={{ textTransform: "uppercase" }}
                      >
                        {exam.examStatus}
                      </span>
                    </td>
                    <td>
                      <div className="action-buttons">
                        <button
                          className="action-btn edit-btn"
                          onClick={() =>
                            navigate({
                              to: "/staff/editExam/$examId",
                              params: { examId: exam._id },
                            })
                          }
                        >
                          <Edit2 size={16} />
                        </button>
                        <button
                          className="action-btn delete-btn"
                          onClick={() => {
                            setSelectedExamId(exam._id);
                            setShowModal(true);
                          }}
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal modal-content">
            <h3>Delete Exam</h3>
            <p style={{ marginTop: "-0.5rem" }}>
              Are you sure you want to delete this exam?
            </p>

            <div>
              <button
                className="modal-cancel-btn"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>

              <button
                className="modal-delete-btn"
                onClick={confirmDelete}
                disabled={deleteExamMutation.isPending}
              >
                {deleteExamMutation.isPending ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
