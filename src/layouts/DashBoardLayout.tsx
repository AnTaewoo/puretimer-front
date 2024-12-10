import { ASide } from "@/components/ui/aside/ASide";
import { useAlert } from "@/hooks/useAlert";
import { IsLogin } from "@/hooks/useLocalStorage";
import { UserContext } from "@/provider/context";
import DetectContext from "@/provider/context/DetectContext";
import { useContext, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

export default function DashBoardLayout() {
  const userData = useContext(UserContext).userData;
  const detectData = useContext(DetectContext).detectData;
  const nav = useNavigate();

  const currentPath = window.location.pathname;
  const isDetect = (detectData.subject !== "") && (detectData.start_time !== undefined);
  const isOutDetect = (currentPath !== "/dashboard/study/detect") && isDetect;
  
  useEffect(() => {
    if (isOutDetect) {
      useAlert("학습 중에는 다른 페이지로 이동할 수 없습니다.", true);
      nav("/dashboard/study/detect");
    } else {
      return;
    }
  }, [currentPath]);
  


  useEffect(() => {
    if (!IsLogin()) {
      useAlert("로그인이 필요합니다.", true);
      nav("/auth/signin");
    } else {
      return;
    }
  }, [userData]);

  return (
    <div className="w-screen h-screen flex relative">
      <div className="fixed top-0 left-0 w-1/5 h-full min-w-52 border-r-[1px] border-[#DBDBDB] bg-[#FAFAFA]">
        <ASide />
      </div>
      <div className="min-w-52 w-1/5 h-full"></div>
      <div className="w-4/5 h-full">
        <Outlet />
      </div>
    </div>
  );
}