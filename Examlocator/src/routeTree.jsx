import {
  RootRoute,
  Route,
  Router,
  RouterProvider,
  Navigate,
} from "@tanstack/react-router";

// Layouts
import { RootLayout } from "./routes/__root";
import { StudRootLayout } from "./routes/Student/__root";
import { StaffRootLayout } from "./routes/Staff/__root";
import { AdminRootLayout } from "./routes/Admin/__root";

// Pages
import { StudIndexPage } from "./routes/Student/index";
import {
  StudDashboardPage,
  loader as studentDashboardLoader,
} from "./routes/Student/dashboard";
import { StudSignupPage } from "./routes/Student/signUp";
import { loader as studentProfilePageLoader } from "./routes/Student/StudentProfilePage";

import {
  StaffdashboardPage,
  loader as staffDashboardLoader,
} from "./routes/Staff/staffDashboard";
import { StaffLoginPage } from "./routes/Staff/staffLogin";
import { AssignNewExamPage } from "./routes/Staff/assignNewExam";
import { EditExamPage } from "./routes/Staff/editExam";
import { loader as staffProfilePageLoader } from "./routes/Staff/StaffProfilePage";
import { loader as adminStudentLoader } from "./routes/Admin/adminStud";

import { AdminDashboardPage } from "./routes/Admin/adminDashboard";
import { AdminStudPage } from "./routes/Admin/adminStud";
import {
  AdminStaffPage,
  loader as adminStaffLoader,
} from "./routes/Admin/adminStaff";

import { RequestApprovalPage } from "./routes/Admin/requestApproval";

import { AdminLogin } from "./routes/Admin/adminLogin";
import StudentProfilePage from "./routes/Student/StudentProfilePage";
import StaffProfilePage from "./routes/Staff/StaffProfilePage";
import { loader as editRequestsLoader } from "./routes/Admin/requestApproval";
import { loader as adminDashboardLoader } from "./routes/Admin/adminDashboard";
// ---------------------
// ROOT ROUTE
// ----------------------
const rootRoute = new RootRoute({
  component: RootLayout,
});

// ----------------------
// ROOT INDEX REDIRECT
// ----------------------
// "/" → "/student"
const rootRedirectRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/",
  component: () => <Navigate to="/student" replace />,
});

// ----------------------
// STUDENT ROUTES
// ----------------------

// Parent (/student)
const studRootRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/student",
  component: StudRootLayout,
});

// "/student" → "/student/login"
const studRedirectRoute = new Route({
  getParentRoute: () => studRootRoute,
  path: "/",
  component: () => <Navigate to="login" replace />,
});

// "/student/login"
const studLoginRoute = new Route({
  getParentRoute: () => studRootRoute,
  path: "login",
  component: StudIndexPage,
});

const studDashboardRoute = new Route({
  getParentRoute: () => studRootRoute,
  path: "dashboard",
  component: StudDashboardPage,
  loader: studentDashboardLoader,
  validateSearch: (search) => ({
    examStatus: search.examStatus ?? "",
    search: search.search ?? "",
  }),
});

const studSignupRoute = new Route({
  getParentRoute: () => studRootRoute,
  path: "signup",
  component: StudSignupPage,
});

const studProfileRoute = new Route({
  getParentRoute: () => studRootRoute,
  path: "profile",
  component: StudentProfilePage,
  loader: studentProfilePageLoader,
});

// Parent (/Staff)
const staffRootRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/staff",
  component: StaffRootLayout,
});

// "/staff" → "/staff/login"
const staffRedirectRoute = new Route({
  getParentRoute: () => staffRootRoute,
  path: "/",
  component: () => <Navigate to="login" replace />,
});

const staffLoginRoute = new Route({
  getParentRoute: () => staffRootRoute,
  path: "login",
  component: StaffLoginPage,
});

// "/staff/staffDashboard"
const staffdashboardRoute = new Route({
  getParentRoute: () => staffRootRoute,
  path: "dashboard",
  component: StaffdashboardPage,
  loader: staffDashboardLoader,
  validateSearch: (search) => ({
    examStatus: search.examStatus ?? "",
    search: search.search ?? "",
  }),
});

const staffProfileRoute = new Route({
  getParentRoute: () => staffRootRoute,
  path: "profile",
  component: StaffProfilePage,
  loader: staffProfilePageLoader,
});

// "/staff/assignNewExam"
const assignNewExamRoute = new Route({
  getParentRoute: () => staffRootRoute,
  path: "assignNewExam",
  component: AssignNewExamPage,
});

// "/staff/editExam"
const editExamRoute = new Route({
  getParentRoute: () => staffRootRoute,
  path: "editExam/$examId",
  component: EditExamPage,
});

const adminRootRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/admin",
  component: AdminRootLayout,
});

const adminRedirectRoute = new Route({
  getParentRoute: () => adminRootRoute,
  path: "/",
  component: () => <Navigate to="login" replace />,
});

const adminLoginRoute = new Route({
  getParentRoute: () => adminRootRoute,
  path: "login",
  component: AdminLogin,
});

// "/admin/adminDashboard"
const adminDashboardRoute = new Route({
  getParentRoute: () => adminRootRoute,
  path: "dashboard",
  component: AdminDashboardPage,
  loader: adminDashboardLoader,
});

// "/admin/students"
const adminStudRoute = new Route({
  getParentRoute: () => adminRootRoute,
  path: "students",
  component: AdminStudPage,
  loader: adminStudentLoader,
});

// "/admin/staff"
const adminStaffRoute = new Route({
  getParentRoute: () => adminRootRoute,
  path: "staff",
  component: AdminStaffPage,
  loader: adminStaffLoader,
});

const requestApprovalRoute = new Route({
  getParentRoute: () => adminRootRoute,
  path: "requestApproval",
  component: RequestApprovalPage,
  loader: editRequestsLoader,
});

const adminProfileRoute = new Route({
  getParentRoute: () => adminRootRoute,
  path: "profile",
});

// ----------------------
// ROUTE TREE
// ----------------------
export const routeTree = rootRoute.addChildren([
  rootRedirectRoute,
  studRootRoute.addChildren([
    studRedirectRoute,
    studLoginRoute,
    studDashboardRoute,
    studSignupRoute,
    studProfileRoute,
  ]),
  staffRootRoute.addChildren([
    staffRedirectRoute,
    staffLoginRoute,
    staffdashboardRoute,
    assignNewExamRoute,
    editExamRoute,
    staffProfileRoute,
  ]),
  adminRootRoute.addChildren([
    adminRedirectRoute,
    adminLoginRoute,
    adminDashboardRoute,
    adminStudRoute,
    adminStaffRoute,
    requestApprovalRoute,
    adminProfileRoute,
  ]),
]);

// ----------------------
// ROUTER
// ----------------------
export const router = new Router({
  routeTree,
});

export function AppRouter() {
  return <RouterProvider router={router} />;
}
