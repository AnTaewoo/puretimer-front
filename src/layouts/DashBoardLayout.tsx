import { ASide } from "@/components/ui/aside/ASide";
import { Outlet } from "react-router-dom";

export default function DashBoardLayout() {
  return (
    <div className="w-screen h-auto flex">
      <div className="w-1/5 h-full max-w-96">
        <ASide />
      </div>
      <div className="w-4/5 h-full">
        <Outlet />
      </div>
    </div>
  );
}
