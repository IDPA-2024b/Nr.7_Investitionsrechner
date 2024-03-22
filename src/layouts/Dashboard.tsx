import { Outlet } from "react-router-dom";

export function DashboardLayout() {
  return (
    <div>
      <p>Dashboard Layout</p>
      <Outlet />
    </div>
  );
}
