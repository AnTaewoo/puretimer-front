import { Main, Profile } from "@/components/dashboard";

export default function DashBoard() {
  return (
  <div className="w-full h-full flex overscroll-none">
    <div className="w-auto h-auto grow bg-[#FAFAFA] border-r-[1px] border-[#DBDBDB]">
      <Main />
    </div>
    <div className="w-10 h-auto">
      <Profile  />
    </div>
  </div>
  )
}