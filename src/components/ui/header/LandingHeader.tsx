import logo from "@/assets/landing/icon-invert.png";
import { Button } from "@/components/ui/shadcn/button";
import LandingContext from "@/provider/context/LandingContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

interface ListType {
  to?: string;
  img?: string;
  title?: string;
}

const list: ListType[] = [
  { title: "main", img: logo },
  { title: "Overview" },
  { title: "About" },
  { title: "Contact" },
];

const LandingHeader = () => {
  const handleScrollView = useContext(LandingContext).handleScrollView;
  const nav = useNavigate();

  return (
    <div className="py-6 h-full w-full flex justify-between">
      <div className="h-full flex gap-10">
        {list.map((value, index) => (
          <Button
            className="h-full hover:scale-105 transition-all p-0 m-0"
            variant="ghost"
            key={index}
            onClick={() => handleScrollView(index)}
          >
            {index == 0 && (
              <img
                src={value.img}
                alt="logo"
                className="h-full w-full object-cover"
              />
            )}
            {index !== 0 && (
              <p className=" text-white font-bold text-base">{value.title}</p>
            )}
          </Button>
        ))}
      </div>
      <div className="h-full items-center flex">
        <Button
          className=" text-white hover:bg-white hover:text-black rounded-full hover:scale-105 h-10 w-20"
          variant="ghost"
          onClick={() => nav("/auth/signin")}
        >
          <p className="font-bold text-center">Sign In</p>
        </Button>
      </div>
    </div>
  );
};

export default LandingHeader;
