import { BookOpenIcon, HomeIcon, LogOutIcon, Settings2Icon, User2Icon } from "lucide-react";
import { Link, useParams } from "react-router-dom";

interface AsideList {
  title: string;
  icon: JSX.Element;
  link: string;
}

const asideList: AsideList[] = [
  {
    title: 'Home',
    icon: <HomeIcon />,
    link: '/dashboard',
  },
  {
    title: 'Study',
    icon: <BookOpenIcon />,
    link: '/dashboard/study',
  },
  {
    title: 'Mypage',
    icon: <User2Icon />,
    link: '/dashboard/mypage',
  },
  {
    title: 'Settings',
    icon: <Settings2Icon />,
    link: '/dashboard/settings',
  },
  {
    title: 'Logout',
    icon: <LogOutIcon />,
    link: '',
  },
];

export function ASide() {
  const {path} = useParams()
  
  return (
    <div className="h-auto w-full p-5 bg-white">
      <li className="list-none w-auto h-auto my-5">
        <Link to="/" className="flex items-center h-full w-full text-2xl text-gray-800 hover:bg-gray-100 p-5 gap-5">
          <p className="font-bold text-2xl text-[#2563eb]">PureTimer</p>
        </Link>
      </li>
      {asideList.map((item, index) => (
        <li className=" list-none w-full h-16" key={index}>
          <Link to={item.link} className="flex items-center w-full h-full p-5 gap-6 text-2xl text-gray-800 hover:bg-gray-100 hover:font-semibold" style={{
            fontWeight: path === item.link ? 'bold' : 'normal',
          }}>
            {item.icon}
            <p>{item.title}</p>
          </Link>
        </li>
      ))}
    </div>
  );
}
