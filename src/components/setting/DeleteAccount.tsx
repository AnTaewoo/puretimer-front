import { useAlert } from "@/hooks/useAlert";
import { Button } from "../ui/shadcn/button";
import useFetchApi from "@/hooks/useFetchApi";
import { useContext } from "react";
import { UserContext } from "@/provider/context";
import { useNavigate } from "react-router-dom";
import { delIsLogin } from "@/hooks/useLocalStorage";

export default function DeleteAccount() {
  const nav = useNavigate()

  const uuid = useContext(UserContext).userData.uuid;
  const onClick = async () => {
    if (confirm("정말 회원을 탈퇴하시겠습니까?")) {
    return deleteAccount()
    } else {
      return;
    }
  }

  const deleteAccount = async () => {
    const result = await useFetchApi({}, "user/delete/"+uuid, "DELETE");

    if (result.status === 200) {
      nav("/");
      delIsLogin();
      return useAlert("회원 탈퇴가 완료되었습니다.", false);
    } else if (result.status === 404) {
      return useAlert("회원 탈퇴에 실패했습니다.", true);
    } else {
      return useAlert("알 수 없는 오류로 회원 탈퇴에 실패했습니다.", true);
    }
  }

  return (
  <div className="w-full h-14 flex justify-center items-center">
    <Button type="button" className="w-48 h-full bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-600 transition-colors rounded-xl text-slate-50 text-xl font-bold" onClick={onClick}>회원 탈퇴</Button>
  </div>
)
}