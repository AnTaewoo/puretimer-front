import { Button } from "@/components/ui/shadcn/button";
import { Input } from "@/components/ui/shadcn/input";
import useCryptoValue from "@/hooks/useCryptoValue";
import useFetchApi from "@/hooks/useFetchApi";
import { setIsLogin } from "@/hooks/useLogin";
import { UserContext } from "@/provider/context";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

interface InputProps {
  type: string;
  placeholder: string;
  id: string;
  required: boolean;
}

interface DataType {
  email: string,
  password: string,
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
]


export default function SigninForm() {
  const {register, handleSubmit} = useForm();
  const nav = useNavigate();
  const setUserData = useContext(UserContext).setUserData;

  const onSubmit = async (data: any) => {
    const isSignup: boolean = signin(data)
    data["password"] = await useCryptoValue(data.password);

    if (isSignup) {
      const result = await useFetchApi({...data},"login","POST","http://127.0.0.1:5000/");

      if (result.status === 200) {
        setIsLogin(result.data.uuid);
        setUserData(result.data);
        
        nav('/dashboard');
        return;
      } else if (result.status === 404) {
        alert("이메일 또는 비밀번호가 올바르지 않습니다"); 
      } else {
        alert("알 수 없는 오류로 로그인에 실패했습니다.");
      }
    } else {
      return;
    }
  }

  const signin  = ({email,password}: DataType): boolean => {
    const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      const regexPassword = /^.{8,20}$/;
  
      const isValidEmail = regexEmail.test(email);
      const isValidPassword = regexPassword.test(password);
  
      switch (true) {
        case !isValidEmail:
          alert("이메일 형식이 올바르지 않습니다.");
          break;
        case !isValidPassword:
          alert("비밀번호는 영문, 숫자를 포함한 8자 이상 20자 이하로 입력해주세요.");
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
        <Button type="submit" className="w-full h-full bg-[#2563eb] hover:bg-[#1d4ed8] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2563eb] transition-colors rounded-xl text-slate-50 text-xl font-bold">로그인</Button>
      </div>
      <div className="h-10 flex items-center w-full">
        <hr className="border-gray border-2 w-full"/>
      </div>
      <div className="flex h-14">
        <Link to="/auth/signup" className="w-full h-full bg-[#3b5998] hover:bg-[#2f477a] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#3b5998] transition-colors rounded-xl text-slate-50 text-xl font-bold items-center flex justify-center">새 계정 만들기</Link>
      </div>
    </div>
  </form>)
}