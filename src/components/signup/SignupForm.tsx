import { Link, useNavigate } from "react-router-dom";
import { Button } from "../ui/shadcn/button";
import { Input } from "../ui/shadcn/input";
import { useForm } from "react-hook-form"
import useCryptoValue from "@/hooks/useCryptoValue";
import useFetchApi from "@/hooks/useFetchApi";

interface InputProps {
  type: string;
  placeholder: string;
  id: string;
  required: boolean;
}

interface DataType {
  email: string,
  password: string,
  currentPassword: string
}

const InputList: InputProps[] = [
  {
    type: "email",
    placeholder: "Email",
    id: "email",
    required: true,
  },
  {
    type: "password",
    placeholder: "Password",
    id: "password",
    required: true,
  },
  {
    type: "password",
    placeholder: "Current Password",
    id: "currentPassword",
    required: false,
  }
]

export default function SignupForm() {
  const {register, handleSubmit} = useForm();
  const nav = useNavigate();

  const onSubmit = async (data: any) => {
    const isSignup: boolean = signup(data)
    data["password"] = await useCryptoValue(data.password);

    if (isSignup) {
      const result = await useFetchApi({...data},"create","POST","http://127.0.0.1:5000/");
      
      if (result.status === 200) {
        alert("회원가입 성공!");
        nav('/auth/signin');
        return;
      } else if (result.status === 404) {
        alert("이미 존재하는 이메일입니다.");
        return;
      } else {
        alert("알 수 없는 오류로 회원가입에 실패했습니다.");
        return;
      }
    } else {
      return;
    }
  }
  
  const signup = ({email,password,currentPassword}: DataType): boolean => {
    const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      const regexPassword = /^.{8,20}$/;
      const regexCurrentPassword = password === currentPassword;
  
      const isValidEmail = regexEmail.test(email);
      const isValidPassword = regexPassword.test(password);
      const isValidCurrentPassword = regexCurrentPassword;
  
      switch (true) {
        case !isValidEmail:
          alert("이메일 형식이 올바르지 않습니다.");
          break;
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
  <form className="w-full max-w-xl rounded-xl shadow-2xl p-5" onSubmit={handleSubmit(onSubmit)}>
    <div className="space-y-4">
      {InputList.map((input, index) => (
        <div key={index} className="flex h-14">
          <Input type={input.type} placeholder={input.placeholder} className="w-full h-full font-bold rounded-xl pl-5 !text-lg placeholder:text-slate-400 focus:border-[#2563eb] focus:border-2" required={input.required} {...register(input.id)} />
        </div>
      ))}
      <div className="flex h-14">
        <Button type="submit" className="w-full h-full bg-[#2563eb] hover:bg-[#1d4ed8] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2563eb] transition-colors rounded-xl text-slate-50 text-xl font-bold">회원가입</Button>
      </div>
      <div className="h-10 flex items-center w-full">
        <hr className="border-gray border-2 w-full"/>
      </div>
      <div className="flex h-14">
        <Link to="/auth/signin" className="w-full h-full bg-[#3b5998] hover:bg-[#2f477a] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#3b5998] transition-colors rounded-xl text-slate-50 text-xl font-bold items-center flex justify-center">로그인으로 돌아가기</Link>
      </div>
    </div>
  </form>
  );
}