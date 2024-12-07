import { Main, Profile } from "@/components/dashboard";

export default function DashBoard() {
  return (
  <div className="w-full h-full flex overscroll-none">
    <div className="w-2/3 h-auto grow">
      <Main />
    </div>
    <div className="w-1/3 min-w-80 h-full">
      <Profile  />
    </div>
  </div>
  )
}