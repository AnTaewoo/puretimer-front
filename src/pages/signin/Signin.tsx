import { SigninTitle, SigninForm } from "@/components/signin";
import NavToBack from "@/components/ui/auth/NavToBack";
import AuthFooter from "@/components/ui/footer/AuthFooter";

export default function Signin() {
  return (
    <div className="w-full h-full flex flex-col">
      <NavToBack />
      <div className="bg-[#f2f4f7] w-full h-full grow flex justify-center items-center p-10 gap-28">
        <SigninTitle />
        <SigninForm />
      </div>
      <div className=" w-full grow">
        <AuthFooter  />
      </div>
    </div>
  );
}