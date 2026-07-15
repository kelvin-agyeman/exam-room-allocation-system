import {
  Outlet,
  useRouterState,
  useRouter,
  Link,
  useNavigate,
} from "@tanstack/react-router";
import Loading from "../../components/Loading";
import {
  Users,
  LayoutDashboard,
  FileText,
  LogOut,
  GraduationCap,
} from "lucide-react";
import logo from "../../assets/logo.png";
import customFetch from "../../utils/customFetch";
import { toast } from "react-toastify";

export const Route = {
  component: AdminRootLayout,
};

export function AdminRootLayout() {
  const router = useRouter();
  const currentPath = router.state.location.pathname;

  const isAuthPage = currentPath === "/admin/login"; // 👈 ADD THIS

  const navigate = useNavigate();

  const navItems = [
    {
      path: "/admin/dashboard",
      label: "Dashboard",
      icon: LayoutDashboard,
    },
    { path: "/admin/students", label: "Students", icon: GraduationCap },
    { path: "/admin/staff", label: "Staff", icon: Users },
    { path: "/admin/requestApproval", label: "Requests", icon: FileText },
  ];

  const isPageLoading = useRouterState({
    select: (state) => state.isLoading,
  });

  const handleLogout = async () => {
    navigate({ to: "/admin/login" });
    await customFetch.get("/auth/admin/logout");
    toast.success("Logging out...");
  };

  return (
    <div className="stud-root-layout">
      {!isAuthPage && (
        <nav className="admin-navbar">
          <div className="admin-nav-brand">
            <img src={logo} alt="logo" className="admin-nav-logo" />
            <span>Admin Portal</span>
          </div>

          <div className="admin-nav-links">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPath === item.path;

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`admin-nav-link ${isActive ? "active" : ""}`}
                >
                  <Icon size={18} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>

          <div className="admin-nav-profile">
            <button className="profile-logout-btn" onClick={handleLogout}>
              <LogOut size={16} />
              Logout
            </button>
          </div>
        </nav>
      )}

      <div>{isPageLoading ? <Loading /> : <Outlet />}</div>
    </div>
  );
}
