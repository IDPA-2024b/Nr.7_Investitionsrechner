import { Outlet } from "react-router-dom";

export function DefaultLayout() {
  return (
    <div>
      <p>Default Layout</p>
      <Outlet />
    </div>
  );
}
