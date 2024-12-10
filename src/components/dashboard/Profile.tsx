import { UserContext } from "@/provider/context";
import { UserCircle2Icon } from "lucide-react";
import { useContext } from "react";



export default function Profile() {
  const userData = useContext(UserContext).userData;
  return (
    <div className="flex flex-col p-10">
      <div className="w-full h-auto flex gap-5 mb-10">
        <UserCircle2Icon className="w-16 h-16"/>
        <div className="w-full h-full flex flex-col justify-center gap-1">
          <p className="text[#8e8e8e] opacity-30 leading-none">user</p>
          <p className="text-[#262626] text-lg leading-none">{userData.email}</p>
        </div>
      </div>
      <div className="w-full h-auto mb-5">
        <p className="text[#8e8e8e] opacity-30 leading-none mb-2">Updated: {userData.updated}</p>
        <p className="text[#8e8e8e] opacity-30 leading-none">© 2024 Puretimer from Atw</p>
      </div>
    </div>
  );
}
