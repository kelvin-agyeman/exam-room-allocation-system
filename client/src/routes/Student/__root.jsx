import { Outlet, useRouterState } from "@tanstack/react-router";
import Loading from "../../components/Loading";

export const Route = {
  component: StudRootLayout,
};

export function StudRootLayout() {
  const isPageLoading = useRouterState({
    select: (state) => state.isLoading,
  });
  return (
    <div className="stud-root-layout">
      {isPageLoading ? <Loading /> : <Outlet />}
    </div>
  );
}
