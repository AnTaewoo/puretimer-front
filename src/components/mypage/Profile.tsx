import useDate from "@/hooks/useDate";
import { UserContext } from "@/provider/context";
import { CircleUserRound } from "lucide-react";
import { useContext } from "react"

export default function Profile() {
  const userData = useContext(UserContext).userData;

  return <div className="w-full h-auto flex flex-col items-center border-b-[1px] border-slate-400">
    <CircleUserRound className=" w-24 h-24 object-cover mb-3" />
    <p className="text-xl font-semibold text-slate-900 mb-5">{userData.email}</p>
    <p className="text-slate-400 opacity-40 leading-none mb-1">생성일 : {useDate(userData.created)}</p>
    <p className="text-slate-400 opacity-40 leading-none mb-5">수정일 : {useDate(userData.updated)}</p>
  </div>
}