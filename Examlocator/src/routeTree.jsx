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

// Pages
import { StudIndexPage } from "./routes/Student/index";
import {
  StudDashboardPage,
  loader as studentDashboardLoader,
} from "./routes/Student/dashboard";
import { StudSignupPage } from "./routes/Student/signUp";

import { StaffdashboardPage } from "./routes/Staff/adminDashboard";

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

// Parent (/Staff)
const staffRootRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/staff",
  component: StaffRootLayout,
});

// "/student" → "/student/login"
const studRedirectRoute = new Route({
  getParentRoute: () => studRootRoute,
  path: "/",
  component: () => <Navigate to="login" replace />,
});
// "/staff" → "/staff/login"
const staffRedirectRoute = new Route({
  getParentRoute: () => staffRootRoute,
  path: "/",
  component: () => <Navigate to="login" replace />,
});

// "/student/login"
const studLoginRoute = new Route({
  getParentRoute: () => studRootRoute,
  path: "login",
  component: StudIndexPage,
});

// "/staff/staffDashboard"
const staffdashboardRoute = new Route({
  getParentRoute: () => staffRootRoute,
  path: "staffdashboard",
  component: StaffdashboardPage,
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
  ]),
  staffRootRoute.addChildren([staffRedirectRoute, staffdashboardRoute]),
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
