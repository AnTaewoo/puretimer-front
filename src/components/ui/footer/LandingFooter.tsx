import LandingContext from "@/provider/context/LandingContext";
import linkedinLogo from "@/assets/footer/linkedin-logo.png";
import instagramLogo from "@/assets/footer/instagram-logo.png";
import xLogo from "@/assets/footer/x-logo.png";
import logo from "@/assets/landing/icon-invert.png";

import { Link } from "react-router-dom";
import { useContext } from "react";

export default function LandingFooter() {
  const scrollRef = useContext(LandingContext).scrollRef;

  const informationList = [
    "An Taewoo",
    "Email : atw13730@gmail.com",
    "Call : 82+ 10-6218-1373",
  ];

  const linkList = [
    {
      to: "https://www.linkedin.com/in/taewoo-an-32469a31b/",
      img: linkedinLogo,
    },
    { to: "https://www.instagram.com/taewoo_an", img: instagramLogo },
    { to: "/", img: xLogo },
  ];

  // const [isModalOn, setIsModalOn] = useState(false);

  // const onModal = () => {
  //   setIsModalOn(!isModalOn);
  // };

  // const changeLang = (lang) => {
  //   i18n.changeLanguage(lang);
  //   setIsModalOn(false);
  // };
  return (
    <div
      ref={(e) => (scrollRef.current[3] = e)}
      className="relative w-full h-full px-16 mx-auto bg-[#2d2d2d] flex justify-center"
    >
      <div className="absolute self-center top-[-50px] flex justify-between items-center w-[1160px] px-[50px] py-[27px] rounded-[10px] bg-[#1C1C1C]">
        <div className="flex flex-col gap-2">
          <p className="text-white font-poppins text-2xl font-medium">
            Need more information?
          </p>
          <p className="text-white text-center font-open-sans text-lg font-normal">
            If needed, write to us, and we will do our best to respond.
          </p>
        </div>

        <a
          href="mailto:atw13730@gmail.com"
          target="_blank"
          className="flex justify-center items-center w-[162px] h-[60px] px-[8px] py-[18px] rounded-[10px] bg-white text-[#262626] font-inter text-xl font-semibold transition-all ease-in-out duration-200 hover:scale-105"
        >
          CONTACT
        </a>
      </div>
      <div className="flex justify-between w-full pt-[100px] pr-[40px]">
        <div className="text-white">
          <img
            src={logo}
            alt="logo"
            className="w-[50px] h-[50px] object-contain mb-[17px]"
          />
          <p className="opacity-60 mb-[16px] text-lg font-open-sans">
            Pure Timer
          </p>
          <ul className="list-disc ml-[18px] text-sm font-poppins font-medium">
            {informationList.map((value, index) => (
              <li key={index}>{value}</li>
            ))}
          </ul>
        </div>

        <div className="text-white">
          <p className="text-2xl font-poppins font-medium mb-[20px]">
            Connect with us
          </p>
          <div className="flex gap-[16px]">
            {linkList.map((value, index) => (
              <Link
                to={value.to}
                key={index}
                className="w-[40px] h-[40px] rounded-full bg-white flex-shrink-0"
              >
                <img
                  src={value.img}
                  alt="logo"
                  className="w-full h-full object-cover"
                />
              </Link>
            ))}
          </div>

          {/* <div className="relative mt-[50px] text-[#e6e6e6] text-lg">
            <button
              onClick={() => onModal()}
              className="bg-transparent border-0 text-white opacity-60 text-lg underline cursor-pointer"
            >
              {i18n.language == "kr" && "Korean"}
              {i18n.language == "en" && "English"}
            </button>
            {isModalOn && (
              <div className="absolute top-0 right-0 flex flex-col items-center gap-[20px] p-[20px] bg-black transform translate-x-[50%] translate-y-[-40%]">
                <button
                  onClick={() => changeLang("kr")}
                  className="flex items-center gap-[20px] bg-transparent border-0 cursor-pointer"
                >
                  <img src={krImage} alt="logo" className="w-[40px] h-[40px]" />
                  <p className="text-white font-semibold text-base">Korean</p>
                </button>
                <button
                  onClick={() => changeLang("en")}
                  className="flex items-center gap-[20px] bg-transparent border-0 cursor-pointer"
                >
                  <img src={enImage} alt="logo" className="w-[40px] h-[40px]" />
                  <p className="text-white font-semibold text-base">English</p>
                </button>
              </div>
            )}
          </div> */}
        </div>
      </div>
    </div>
  );
}
