import { ArrowLeftIcon } from "lucide-react";
import { Link } from "react-router-dom";

export default function NavToBack() {
  return (
  <div className="bg-[#f2f4f7] w-full h-auto ">
    <Link to="/" className="w-auto h-auto cursor-pointer flex items-center group ">
      <ArrowLeftIcon className="w-8 h-8 m-5 mr-2 group-hover:text-black text-slate-400 transition-colors" />
      <p className="text-3xl font-bold leading-none translate-y-[2px] group-hover:text-black text-slate-400 transition-colors">BACK</p>
    </Link>
  </div>)
}