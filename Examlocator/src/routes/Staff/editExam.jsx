import { Shield, ArrowLeft, Save, Plus, Trash2 } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "@tanstack/react-router";
import { useMutation } from "@tanstack/react-query";
import customFetch from "../../utils/customFetch";
import { toast } from "react-toastify";
import { PROGRAMS, LEVELS } from "../../../../utils/constants";

export const Route = {
  component: EditExamPage,
};

export function EditExamPage() {
  const navigate = useNavigate();
  const { examId } = useParams({ from: "/staff/editExam/$examId" });

  const examType = ["written", "computer-based"];

  const [formData, setFormData] = useState({
    courseCode: "",
    courseTitle: "",
    startDate: "",
    startTime: "",
    endTime: "",
    departmentCode: "",
    program: "",
    level: "",
    examType: "",
  });

  // ✅ ALWAYS SAFE DEFAULT (prevents crash)
  const [roomAllocations, setRoomAllocations] = useState([
    {
      id: 1,
      startIndexNumber: "",
      endIndexNumber: "",
      roomAllocated: "",
      roomLocation: "",
    },
  ]);

  const [isLoadingExam, setIsLoadingExam] = useState(true);

  useEffect(() => {
    const fetchExam = async () => {
      try {
        const res = await customFetch.get(`/staff/exams/${examId}`);
        const exam = res?.data?.exam;

        if (!exam) {
          toast.error("Exam not found");
          navigate({ to: "/staff/dashboard" });
          return;
        }

        setFormData({
          courseCode: exam.courseCode || "",
          courseTitle: exam.courseTitle || "",
          startDate: exam.startDate?.split("T")[0] || "",
          startTime: exam.startTime || "",
          endTime: exam.endTime || "",
          departmentCode: exam.departmentCode || "",
          program: exam.program || "",
          level: exam.level ? String(exam.level) : "",
          examType: exam.examType || "",
        });

        // ✅ SAFE room allocations
        if (exam.roomAllocations && exam.roomAllocations.length > 0) {
          setRoomAllocations(
            exam.roomAllocations.map((row, index) => ({
              id: index + 1,
              startIndexNumber: row.startIndexNumber
                ? String(row.startIndexNumber)
                : "",
              endIndexNumber: row.endIndexNumber
                ? String(row.endIndexNumber)
                : "",
              roomAllocated: row.roomAllocated || "",
              roomLocation: row.roomLocation || "",
            })),
          );
        }
      } catch (error) {
        toast.error("Failed to load exam");
        navigate({ to: "/staff/dashboard" });
      } finally {
        setIsLoadingExam(false);
      }
    };

    fetchExam();
  }, [examId, navigate]);

  const updateExamMutation = useMutation({
    mutationFn: async (data) => {
      const res = await customFetch.patch(`/staff/exams/${examId}`, data);
      return res.data;
    },
    onSuccess: () => {
      toast.success("Exam updated successfully");
      navigate({ to: "/staff/dashboard" });
    },
    onError: (error) => {
      const errorMessage =
        error?.response?.data?.msg ??
        error?.response?.data?.error?.[0] ??
        "Failed to update exam";
      toast.error(errorMessage);
    },
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRoomAllocationChange = (id, field, value) => {
    setRoomAllocations((prev) =>
      prev.map((row) => (row.id === id ? { ...row, [field]: value } : row)),
    );
  };

  const addRoomAllocation = () => {
    const newId =
      roomAllocations.length > 0
        ? Math.max(...roomAllocations.map((r) => r.id)) + 1
        : 1;

    setRoomAllocations((prev) => [
      ...prev,
      {
        id: newId,
        startIndexNumber: "",
        endIndexNumber: "",
        roomAllocated: "",
        roomLocation: "",
      },
    ]);
  };

  const removeRoomAllocation = (id) => {
    if (roomAllocations.length === 1) return; // ✅ prevent empty array
    setRoomAllocations((prev) => prev.filter((row) => row.id !== id));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      ...formData,
      level: Number(formData.level),
      roomAllocations: roomAllocations.map((row) => ({
        startIndexNumber: Number(row.startIndexNumber),
        endIndexNumber: Number(row.endIndexNumber),
        roomAllocated: row.roomAllocated,
        roomLocation: row.roomLocation,
      })),
    };

    updateExamMutation.mutate(payload);
  };

  const handleBack = () => {
    navigate({ to: "/staff/dashboard" });
  };

  // ✅ LOADING STATE (prevents UI crash)
  if (isLoadingExam) {
    return <div className="assign-exam-page">Loading...</div>;
  }

  return (
    <div className="assign-exam-page">
      {/* Header */}
      <div className="assign-exam-header">
        <button className="back-btn" onClick={handleBack}>
          <ArrowLeft size={20} />
          Back
        </button>
        <div className="header-content">
          <Shield size={26} />
          <div className="header-text">
            <h1>Edit Exam</h1>
            <p className="subtext">
              Modify exam assignment and location details
            </p>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="assign-exam-form-container">
        <form className="assign-exam-form" onSubmit={handleSubmit}>
          <div className="form-section">
            <h2>Course Information</h2>
            <div className="form-row">
              <div className="form-group">
                <label>Course Code</label>
                <input
                  type="text"
                  name="courseCode"
                  value={formData.courseCode}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Course Title</label>
                <input
                  type="text"
                  name="courseTitle"
                  value={formData.courseTitle}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
          </div>

          {/* Room Allocations */}
          <div className="form-section">
            <h2>Room Allocations</h2>

            <div className="room-allocations-table">
              <table className="allocation-table">
                <tbody>
                  {roomAllocations.map((row) => (
                    <tr key={row.id}>
                      <td>
                        <input
                          type="text"
                          value={row.startIndexNumber}
                          onChange={(e) =>
                            handleRoomAllocationChange(
                              row.id,
                              "startIndexNumber",
                              e.target.value,
                            )
                          }
                        />
                      </td>

                      <td>
                        <input
                          type="text"
                          value={row.endIndexNumber}
                          onChange={(e) =>
                            handleRoomAllocationChange(
                              row.id,
                              "endIndexNumber",
                              e.target.value,
                            )
                          }
                        />
                      </td>

                      <td>
                        <input
                          type="text"
                          value={row.roomAllocated}
                          onChange={(e) =>
                            handleRoomAllocationChange(
                              row.id,
                              "roomAllocated",
                              e.target.value,
                            )
                          }
                        />
                      </td>

                      <td>
                        <input
                          type="text"
                          value={row.roomLocation}
                          onChange={(e) =>
                            handleRoomAllocationChange(
                              row.id,
                              "roomLocation",
                              e.target.value,
                            )
                          }
                        />
                      </td>

                      <td>
                        <button type="button" onClick={addRoomAllocation}>
                          <Plus size={16} />
                        </button>

                        <button
                          type="button"
                          onClick={() => removeRoomAllocation(row.id)}
                        >
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="form-actions">
            <button type="button" onClick={handleBack}>
              Cancel
            </button>

            <button type="submit" disabled={updateExamMutation.isPending}>
              {updateExamMutation.isPending ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
