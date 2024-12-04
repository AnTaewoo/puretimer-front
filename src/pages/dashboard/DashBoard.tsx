import { ASide, Main, Mypage } from "@/components/dashboard";

export default function DashBoard() {
  return (
  <div className="w-full h-full flex overscroll-none">
    <div className="">
      <ASide />
    </div>
    <div>
      <Main />
    </div>
    <div>
      <Mypage  />
    </div>
    
</div>)
}