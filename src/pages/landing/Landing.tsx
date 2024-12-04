import { useContext } from "react";
import {LandingContext} from "@/provider/context";
import { Main, Overview, About } from "@/components/landing";

export default function Landing() {
  const landingCtx = useContext(LandingContext);
  const ElementList = [
    { title: "Main", element: <Main />, bgColor: "bg-[#0E002D]" },
    { title: "Overview", element: <Overview />, bgColor: "bg-[#0E002D]" },
    { title: "About", element: <About />, bgColor: "bg-[#0E002D]" },
  ];

  return (
    <div className=" w-full overflow-hidden">
      {ElementList.map((value, index) => (
        <div
          ref={(e) => (landingCtx.scrollRef.current[index] = e)}
          key={index}
          className={`w-full h-full ${value.bgColor}`}
        >
          {value.element}
        </div>
      ))}
    </div>
  );
}
