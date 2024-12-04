// Components
import LandingFooter from "@/components/ui/footer/LandingFooter";
import LandingHeader from "@/components/ui/header/LandingHeader";

import { Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <>
      <div className="w-screen h-28 backdrop-blur-sm bg-[rgba(20,20,20,0.05)] fixed top-0 left-0 right-0 px-16 z-[9999]">
        <LandingHeader />
      </div>
      <div className="w-screen flex flex-col items-center">
        <Outlet />
      </div>
      <div className="w-screen h-[355px]">
        <LandingFooter />
      </div>
    </>
  );
}
