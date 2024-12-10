import { createBrowserRouter } from "react-router-dom";
import LandingLayout from "@/layouts/LandingLayout";
import Landing from "@/pages/landing/Landing";
import AuthLayout from "@/layouts/AuthLayout";
import Signin from "@/pages/signin/Signin";
import Signup from "@/pages/signup/Signup";
import DashBoardLayout from "@/layouts/DashBoardLayout";
import DashBoard from "@/pages/dashboard/DashBoard";
import Study from "@/pages/study/Study";
import Detect from "@/pages/study/Detect";
import Setting from "@/pages/setting/Setting";
import Mypage from "@/pages/mypage/Mypage";

export const router = createBrowserRouter([
  {
    path: "",
    element: <LandingLayout />,
    children: [{ path: "", element: <Landing /> }],
  },
  {
    path: "auth",
    element: <AuthLayout />,
    children: [
      { path: "signin", element: <Signin /> },
      { path: "signup", element: <Signup /> },
    ],
  },
  {
    path: "dashboard",
    element: <DashBoardLayout />,
    children: [
      { path: "", element: <DashBoard /> }, 
      { path: "study/detect", element: <Detect /> }, 
      { path: "study", element: <Study /> }, 
      { path: "mypage", element: <Mypage /> },
      { path: "settings", element: <Setting /> },
    ],
  }
]);
