import { delIsLogin } from "@/hooks/useLocalStorage";
import { BookOpenIcon, HomeIcon, LogOutIcon, Settings2Icon, User2Icon } from "lucide-react";
import { Link, useNavigate, } from "react-router-dom";

interface AsideList {
  title: string;
  icon: JSX.Element;
  onClick: () => void, 
}

export function ASide() {
  const nav = useNavigate();

  const asideList: AsideList[] = [
    {
      title: 'Home',
      icon: <HomeIcon />,
      onClick: () => {
        nav("/dashboard")
      }, 
    },
    {
      title: 'Study',
      icon: <BookOpenIcon />,
      onClick: () => {
        nav("/dashboard/study")
      }, 
    },
    {
      title: 'Mypage',
      icon: <User2Icon />,
      onClick: () => {
        nav("/dashboard/mypage")
      }, 
    },
    {
      title: 'Settings',
      icon: <Settings2Icon />,
      onClick: () => {nav("/dashboard/settings")}
    },
    {
      title: 'Logout',
      icon: <LogOutIcon />,
      onClick: () => {
        if ( confirm("정말 로그아웃 하시겠습니까?") === true ) {
          delIsLogin();
          return nav("/");
        } else {
          return;
        }
      },
    },
  ];

  return (
    <div className="h-auto w-full p-5 bg-white">
      <li className="list-none w-auto h-auto my-5">
        <Link to="/" className="flex items-center h-full w-full text-2xl text-gray-800 hover:bg-gray-100 p-5 gap-5">
          <p className="font-bold text-2xl text-[#2563eb]">PureTimer</p>
        </Link>
      </li>
      {asideList.map((item, index) => (
        <li className=" list-none w-full h-16" key={index}>
          <button onClick={item.onClick} className="flex items-center w-full h-full p-5 gap-6 text-2xl text-gray-800 hover:bg-gray-100 hover:font-semibold" >
            {item.icon}
            <p>{item.title}</p>
          </button>
        </li>
      ))}
    </div>
  );
}
