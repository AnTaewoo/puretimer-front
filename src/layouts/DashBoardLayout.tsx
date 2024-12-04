import { Outlet } from "react-router-dom";

export default function DashBoardLayout() {
  return (
    <div className="w-screen h-screen">
      <Outlet />
    </div>
  );
}
