import { CircleUserRound } from "lucide-react"
import ChartView from "@/components/ui/chart/ChartView"

interface PostType {
  "end_time": string,
  "real_time": string,
  "start_time": string,
  "subject": string,
  "user_uuid": string,
  "waste_time": string
  "email": string
}

export default function Post(data: PostType) {
  return (
    <li className="w-full max-w-[470px] h-auto">
      <div className="h-[50px] w-full border-b-[1px] justify-between items-center border-slate-400 flex px-2 ">
        <div className="w-auto h-full gap-5 flex items-center p-1">
          <CircleUserRound className="h-full w-auto object-cover" />
          <p className="text-2xl font-bold leading-none">{data.email}</p>
        </div>
        <div className="w-auto h-full flex items-center">
          <p className="text-xl font-semibold leading-none text-slate-400">{data.subject}</p>
        </div>
      </div>
      <div className="w-full h-[400px] border-slate-400 border-b-[1px]">
        <ChartView {...data} />
      </div>
      <div className="w-full h-auto border-slate-400 border-b-[1px] p-5">
        <p className=" text-2xl font-semibold text-slate-900">공부한 시간 : <span>{data.real_time}</span></p>
        <p className=" text-2xl font-semibold text-slate-900 mb-10">낭비한 시간 : <span>{data.waste_time}</span></p>
      </div>
    </li>
  )
}