import {
  Hash,
  GraduationCap,
  User,
  Search,
  Filter,
  ChevronDown,
  Calendar,
  Clock,
  MapPin,
  Building2,
} from "lucide-react";
import { useState, useEffect, useRef } from "react";
import customFetch from "../../utils/customFetch";
import {
  redirect,
  useLoaderData,
  useSearch,
  useNavigate,
} from "@tanstack/react-router";
import dayjs from "dayjs";
import { EXAM_STATUS } from "../../../../utils/constants";

export const loader = async () => {
  try {
    const [studentRes, examsRes] = await Promise.all([
      customFetch.get("/student/current"),
      customFetch.get("/exams"),
    ]);
    return {
      student: studentRes.data.student,
      exams: examsRes.data.exams,
      stats: examsRes.data.stats,
      numOfPapers: examsRes.data.numOfPapers,
    };
  } catch (error) {
    throw redirect({ to: "/student/login" });
  }
};

export function StudDashboardPage() {
  const { student, exams, stats, numOfPapers } = useLoaderData({
    from: "/student/dashboard",
  });

  const navigate = useNavigate();
  const search = useSearch({ from: "/student/dashboard" });

  const examStatusOptions = ["All Exams", ...Object.values(EXAM_STATUS)];

  const [selected, setSelected] = useState(search.examStatus || "All Exams");
  const [searchTerm, setSearchTerm] = useState(search.search || "");
  const [filteredExams, setFilteredExams] = useState(exams);
  const [open, setOpen] = useState(false);

  // Ref to debounce search input
  const searchTimeout = useRef(null);

  // Filter exams locally (optional, for instant feedback)
  useEffect(() => {
    let result = [...exams];

    // Filter by examStatus
    if (selected !== "All Exams") {
      result = result.filter(
        (exam) => exam.examStatus.toLowerCase() === selected.toLowerCase(),
      );
    }

    // Filter by search term
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

  // Handle search input change (live submit to server via URL search)
  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (searchTimeout.current) clearTimeout(searchTimeout.current);
    searchTimeout.current = setTimeout(() => {
      navigate({
        to: "/student/dashboard",
        search: (prev) => ({ ...prev, search: value }),
      });
    }, 300); // 300ms debounce
  };

  // Handle filter dropdown selection
  const handleFilter = (status) => {
    setSelected(status);
    setOpen(false);
    navigate({
      to: "/student/dashboard",
      search: (prev) => ({ ...prev, examStatus: status }),
    });
  };

  return (
    <div className="stud-dashboard-page">
      {/* HEADER */}
      <div className="dashheader">
        <h1>{`Welcome back, ${student.firstName} ${student.lastName}!`}</h1>
        <p className="headersubtext">
          Here's your exam schedule and locations.
        </p>

        <div className="userinfor">
          <div className="infos">
            <Hash size={18} /> {student.indexNumber}
          </div>
          <div className="infos">
            <GraduationCap size={18} /> {student.program}
          </div>
          <div className="infos">
            <User size={18} /> {`${student.firstName} ${student.lastName}`}
          </div>
        </div>
      </div>

      {/* EXAM INFO */}
      <div className="examinfo">
        <div className="examinfoS">
          <p className="toptxt1">{stats.upcoming}</p>
          <p className="btntxt">Upcoming Exams</p>
        </div>

        <div className="examinfoS">
          <p className="toptxt2">{stats.ongoing}</p>
          <p className="btntxt">Ongoing Exams</p>
        </div>

        <div className="examinfoS">
          <p className="toptxt3">{stats.completed}</p>
          <p className="btntxt">Completed Exams</p>
        </div>
      </div>

      {/* MAIN */}
      <div className="main">
        {/* FILTER */}
        <div className="filter">
          <div className="search">
            <Search size={18} className="search-icon" />

            <input
              type="text"
              placeholder="Search exams..."
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>

          <div className="exam-filter" onClick={() => setOpen(!open)}>
            <Filter size={16} className="icon" />

            <span className="selected">{selected}</span>

            <ChevronDown
              size={16}
              className={`chevron ${open ? "rotate" : ""}`}
            />

            {open && (
              <div className="dropdown">
                {examStatusOptions.map((status) => (
                  <div
                    key={status}
                    className={`dropdown-item ${selected === status ? "active" : ""}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelected(status);
                      setOpen(false);
                    }}
                    style={{ textTransform: "capitalize" }}
                  >
                    {status}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* CONTENT */}
        {exams.length > 0 ? (
          <div className="exam-cards-container">
            {filteredExams.map((exam) => {
              const formattedDate = dayjs(exam.startDate).format("MMM D, YYYY");

              return (
                <div key={exam._id} className={`exam-card ${exam.examStatus}`}>
                  <div className="exam-card-content">
                    <div className="exam-card-left">
                      <div className="course-code">{exam.courseCode}</div>
                      <h3 className="exam-title">{exam.courseTitle}</h3>
                      <div className="exam-details">
                        <div className="exam-detail-item">
                          <Calendar size={16} />
                          <span>{formattedDate}</span>
                        </div>
                        <div className="exam-detail-item">
                          <Clock size={16} />
                          <span>
                            {exam.startTime} - {exam.endTime}
                          </span>
                        </div>
                        <div className="exam-location">
                          <div className="exam-detail-item">
                            <MapPin size={16} />
                            <span className="exam-location-text">
                              {exam.roomAllocated}
                            </span>
                          </div>
                          <div className="exam-detail-item">
                            <Building2 size={16} />
                            <span className="exam-location-text">
                              {exam.roomLocation}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="exam-card-right">
                      <div className={`exam-status ${exam.examStatus}`}>
                        {exam.examStatus}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <h1>No Exam to display...</h1>
        )}
      </div>
    </div>
  );
}
