import { Outlet } from "react-router-dom";

export default function AuthLayout() {
  return (
    <div className="w-screen h-screen overscroll-none">
      <Outlet />
    </div>
  );
}
