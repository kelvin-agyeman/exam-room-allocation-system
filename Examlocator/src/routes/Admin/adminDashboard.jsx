import { Users, LayoutDashboard } from "lucide-react";
import customFetch from "../../utils/customFetch";
import { redirect, useLoaderData } from "@tanstack/react-router";

export const Route = {
  component: AdminDashboardPage,
};

export const loader = async () => {
  try {
    const [studentRes, staffRes] = await Promise.all([
      customFetch.get("/admin/all-students"),
      customFetch.get("/admin/all-staff"),
    ]);

    return {
      totalStudents: studentRes.data.totalStudents,
      totalStaff: staffRes.data.totalStaff,
    };
  } catch (error) {
    throw redirect({ to: "/admin/login" });
  }
};

export function AdminDashboardPage() {
  const { totalStaff, totalStudents } = useLoaderData({
    from: "/admin/dashboard",
  });

  return (
    <div className="admin-dashboard-page">
      {/* Header */}
      <div className="admin-header">
        <LayoutDashboard size={26} />
        <div className="headercontent">
          <h1>Admin Dashboard</h1>
          <p className="subtext">System overview and management center</p>
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
              <h3>{totalStaff + totalStudents}</h3>
              <p>Total Users</p>
              <div className="stat-breakdown">
                <span className="staff-count">{totalStaff} Staff</span>
                <span className="student-count">{totalStudents} Students</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
