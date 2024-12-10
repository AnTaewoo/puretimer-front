import { Input } from "@/components/ui/shadcn/input";
import { FormEventHandler, useContext, useRef } from "react";
import { Button } from "../ui/shadcn/button";
import { useAlert } from "@/hooks/useAlert";
import { setIsDetect } from "@/hooks/useLocalStorage";
import { UserContext } from "@/provider/context";
import DetectContext from "@/provider/context/DetectContext";
import { useNavigate } from "react-router-dom";

export default function StudyForm() {
  const inputRef =  useRef<HTMLInputElement | null>(null);
  const uuid = useContext(UserContext).userData.uuid;
  const setDetectData = useContext(DetectContext).setDetectData;
  const nav = useNavigate();

  const onSubmit = (e: HTMLFormElement) => {
    e.preventDefault();
    const subject = inputRef.current?.value.trim();

    if (!subject) {
      useAlert("공백은 입력할 수 없습니다.", true);
    } else {
      const now = new Date();

      const formatDateTime = (date: Date): string => {
        const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      
        const dayName = days[date.getUTCDay()]; // 요일 약칭
        const day = String(date.getUTCDate()).padStart(2, "0"); // 날짜
        const monthName = months[date.getUTCMonth()]; // 월 약칭
        const year = date.getUTCFullYear(); // 연도
        const hours = String(date.getUTCHours()).padStart(2, "0"); // 24시간제
        const minutes = String(date.getUTCMinutes()).padStart(2, "0"); // 분
        const seconds = String(date.getUTCSeconds()).padStart(2, "0"); // 초
        const timeZone = "KST"; // 시간대
      
        return `${dayName}, ${day} ${monthName} ${year} ${hours}:${minutes}:${seconds} ${timeZone}`;
      };
      
      
      const formattedDateTime = formatDateTime(now);

      const newDetectData = {
        uuid: uuid,
        start_time: formattedDateTime,
        end_time: "",
        waste_time: "",
        subject: subject,
      };
      setDetectData(newDetectData);
      setIsDetect(newDetectData);

      nav("/dashboard/study/detect");
    }
  }

  return (
    <form onSubmit={onSubmit} className="w-full h-full mx-auto flex flex-col items-center">
      <div className="w-full h-full mb-20">
        <Input type="text" placeholder="과목을 입력해 주세요." className="w-full h-full max-w-[600px] mx-auto font-bold rounded-xl p-5 !text-xl placeholder:text-slate-400 focus:border-[#2563eb] focus:border-2" required={true} ref={inputRef} />
      </div>
      <div className="w-full h-auto max-w-[700px] mx-auto">
        <Button type="submit" className="w-full h-full bg-[#2563eb] hover:bg-[#1d4ed8] p-5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2563eb] transition-colors rounded-xl text-slate-50 text-xl font-bold">공부 시작하기</Button>
      </div>
    </form>
  )
}