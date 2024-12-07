import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/shadcn/input";
import { Button } from "@/components/ui/shadcn/button";
import useCryptoValue from "@/hooks/useCryptoValue";
import useFetchApi from "@/hooks/useFetchApi";
import { useContext } from "react";
import { UserContext } from "@/provider/context";

interface InputProps {
  type: string;
  placeholder: string;
  id: string;
  required: boolean;
}

interface DataType {
  uuid?: string;
  password: string;
  currentPassword: string;
}

const InputList: InputProps[] = [
  {
    type: "string",
    placeholder: "New Password",
    id: "password",
    required: true,
  },
  {
    type: "password",
    placeholder: "Check New Password",
    id: "currentPassword",
    required: true,
  },
]

export default function SettingForm() {
  const { register, handleSubmit } = useForm();
  const userData = useContext(UserContext).userData;

  const onSubmit = async (data: DataType) => {
    const isUpdate: boolean = updatePw(data)
    data["password"] = await useCryptoValue(data.password);
    data["uuid"] = userData.uuid;

    if (isUpdate) {
      const result = await useFetchApi({...data},"update","PUT");

      console.log(result)
      if (result.status === 200) {
        alert("비밀번호가 변경되었습니다.");
        return;
      } else if (result.status === 404) {
        alert("비밀번호가 올바르지 않습니다"); 
      } else {
        alert("알 수 없는 오류로 로그인에 실패했습니다.");
      }
    } else {
      return;
    }
  }

  const updatePw  = ({password, currentPassword}: DataType): boolean => {
    const regexPassword = /^.{8,20}$/;

    const isValidPassword = regexPassword.test(password);
    const isValidCurrentPassword = password === currentPassword;

    console.log(password, currentPassword);

    switch (true) {
      case !isValidPassword:
        alert("비밀번호는 영문, 숫자를 포함한 8자 이상 20자 이하로 입력해주세요.");
        break;
      case !isValidCurrentPassword:
        alert("비밀번호가 일치하지 않습니다.");
        break;
      default:
        return true;
    }
    return false;
  }

  return (
  <form className="w-full rounded-xl shadow-2xl p-5" onSubmit={handleSubmit(onSubmit)}>
    <div className="space-y-4">
    {InputList.map((input, index) => (
        <div key={index} className="flex h-14">
          <Input type={input.type} placeholder={input.placeholder} className="w-full h-full font-bold rounded-xl pl-5 !text-lg placeholder:text-slate-400 focus:border-[#2563eb] focus:border-2" required={input.required} {...register(input.id)} />
        </div>
      ))}
      <div className="flex h-14">
        <Button type="submit" className="w-full h-full bg-[#2563eb] hover:bg-[#1d4ed8] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2563eb] transition-colors rounded-xl text-slate-50 text-xl font-bold">비밀번호 변경</Button>
      </div>
    </div>
  </form>)
}