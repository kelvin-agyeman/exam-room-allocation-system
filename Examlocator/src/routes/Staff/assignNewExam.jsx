import { Shield, ArrowLeft, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import customFetch from "../../utils/customFetch";
import { toast } from "react-toastify";
import { PROGRAMS, LEVELS } from "../../../../utils/constants";

export const Route = {
  component: AssignNewExamPage,
};

export function AssignNewExamPage() {
  const navigate = useNavigate();

  const examType = ["written", "computer-based"];

  const [roomAllocations, setRoomAllocations] = useState([
    {
      id: 1,
      startIndexNumber: "",
      endIndexNumber: "",
      roomAllocated: "",
      roomLocation: "",
    },
  ]);

  const createExamMutation = useMutation({
    mutationFn: async (data) => {
      const res = await customFetch.post("/staff/exams", data);
      return res.data;
    },
    onSuccess: () => {
      toast.success("Exam posted successfully");
      navigate({ to: "/staff/dashboard" });
    },
    onError: (error) => {
      const errorMessage =
        error?.response?.data?.msg ?? error?.response?.data?.error?.[0];
      toast.error(errorMessage);
    },
  });

  const handleRoomAllocationChange = (id, field, value) => {
    setRoomAllocations((prev) =>
      prev.map((row) => (row.id === id ? { ...row, [field]: value } : row)),
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);

    // ✅ Basic validation
    if (!data.courseCode || !data.courseTitle) {
      toast.error("Course details are required");
      return;
    }

    // ✅ Clean & validate room allocations
    const validRoomAllocations = roomAllocations
      .filter(
        (row) =>
          row.startIndexNumber &&
          row.endIndexNumber &&
          row.roomAllocated &&
          row.roomLocation,
      )
      .map((row) => ({
        startIndexNumber: Number(row.startIndexNumber),
        endIndexNumber: Number(row.endIndexNumber),
        roomAllocated: row.roomAllocated,
        roomLocation: row.roomLocation,
      }));

    if (validRoomAllocations.length === 0) {
      toast.error("Please fill at least one valid room allocation");
      return;
    }

    const payload = {
      ...data,
      level: data.level ? Number(data.level) : null,
      roomAllocations: validRoomAllocations,
    };

    createExamMutation.mutate(payload);
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
    if (roomAllocations.length > 1) {
      setRoomAllocations((prev) => prev.filter((row) => row.id !== id));
    }
  };

  const handleBack = () => {
    navigate({ to: "/staff/dashboard" });
  };

  return (
    <div className="assign-exam-page">
      <div className="assign-exam-header">
        <button className="back-btn" onClick={handleBack}>
          <ArrowLeft size={20} />
          Back
        </button>
        <div className="header-content">
          <Shield size={26} />
          <div className="header-text">
            <h1>Assign New Exam</h1>
            <p className="subtext">
              Create a new exam assignment with location details
            </p>
          </div>
        </div>
      </div>

      <div className="assign-exam-form-container">
        <form className="assign-exam-form" onSubmit={handleSubmit}>
          <div className="form-section">
            <h2>Course Information</h2>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="courseCode">Course Code</label>
                <input
                  type="text"
                  id="courseCode"
                  name="courseCode"
                  placeholder="e.g., CS 301"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="courseTitle">Course Title</label>
                <input
                  type="text"
                  id="courseTitle"
                  name="courseTitle"
                  placeholder="e.g., Data Structures and Algorithms"
                  required
                />
              </div>
            </div>
          </div>

          <div className="form-section">
            <h2>Schedule</h2>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="startDate">Start Date</label>
                <input type="date" id="startDate" name="startDate" required />
              </div>
              <div className="form-group">
                <label htmlFor="startTime">Start Time</label>
                <input type="time" id="startTime" name="startTime" required />
              </div>
              <div className="form-group">
                <label htmlFor="endTime">End Time</label>
                <input type="time" id="endTime" name="endTime" required />
              </div>
            </div>
          </div>

          <div className="form-section">
            <h2>Department & Program</h2>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="departmentCode">Department Code</label>
                <input
                  type="text"
                  id="departmentCode"
                  name="departmentCode"
                  placeholder="e.g., 012"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="program">Program</label>
                <select id="program" name="program" required>
                  <option value="">Select Program</option>
                  {Object.values(PROGRAMS).map((program) => (
                    <option key={program} value={program}>
                      {program}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="level">Level</label>
                <select id="level" name="level" required>
                  <option value="">Select Level</option>
                  {LEVELS.map((level) => (
                    <option key={level} value={level}>
                      {level}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="form-section">
            <h2>Exam Details</h2>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="examType">Exam Type</label>
                <select id="examType" name="examType" required>
                  <option value="">Select Exam Type</option>
                  {examType.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="form-section">
            <h2>Room Allocations</h2>
            <div className="room-allocations-table">
              <table className="allocation-table">
                <thead>
                  <tr>
                    <th>Start Index Number</th>
                    <th>End Index Number</th>
                    <th>Room Allocated</th>
                    <th>Room Location</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {roomAllocations.map((row) => (
                    <tr key={row.id}>
                      <td>
                        <input
                          type="number"
                          value={row.startIndexNumber}
                          onChange={(e) =>
                            handleRoomAllocationChange(
                              row.id,
                              "startIndexNumber",
                              e.target.value,
                            )
                          }
                          className="table-input"
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          value={row.endIndexNumber}
                          onChange={(e) =>
                            handleRoomAllocationChange(
                              row.id,
                              "endIndexNumber",
                              e.target.value,
                            )
                          }
                          className="table-input"
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
                          className="table-input"
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
                          className="table-input"
                        />
                      </td>
                      <td>
                        <div className="table-actions">
                          <button
                            type="button"
                            className="table-action-btn add-btn"
                            onClick={addRoomAllocation}
                          >
                            <Plus size={16} />
                          </button>
                          <button
                            type="button"
                            className="table-action-btn delete-btn"
                            onClick={() => removeRoomAllocation(row.id)}
                            disabled={
                              roomAllocations.length === 1 ||
                              createExamMutation.isPending
                            }
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

          <div className="form-actions">
            <button type="button" className="cancel-btn" onClick={handleBack}>
              Cancel
            </button>
            <button
              type="submit"
              className="submit-btn"
              disabled={createExamMutation.isPending}
            >
              {createExamMutation.isPending ? "Submitting..." : "Assign Exam"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
