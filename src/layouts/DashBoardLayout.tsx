import { ASide } from "@/components/ui/aside/ASide";
import { IsLogin } from "@/hooks/useLogin";
import { UserContext } from "@/provider/context";
import { useContext, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

export default function DashBoardLayout() {
  const userData = useContext(UserContext).userData;
  const nav = useNavigate();

  useEffect(() => {
    if (!IsLogin()) {
      alert("로그인이 필요합니다.");
      nav("/auth/signin");
    } else {
      return;
    }
  }, [userData]);

  return (
    <div className="w-screen h-auto flex">
      <div className="w-1/5 h-full min-w-52 border-r-[1px] border-[#DBDBDB] bg-[#FAFAFA]">
        <ASide />
      </div>
      <div className="w-4/5 h-full">
        <Outlet />
      </div>
    </div>
  );
}