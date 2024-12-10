import { Analysis, Profile } from "@/components/mypage";

export default function Mypage() {
  return (
    <div className="w-full h-full flex flex-col items-center p-20 overscroll-none">
      <div className="w-full h-auto">
        <Profile />
      </div>
      <div className="w-full h-auto">
        <Analysis />
      </div>
    </div>
  )
}