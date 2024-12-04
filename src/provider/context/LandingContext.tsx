import { createContext, useRef } from "react";

const LandingContext = createContext({
  scrollRef: [],
  handleScrollView: (index: number) => {},
});

export const LandingContextProvider = (props: any) => {
  const scrollRef = useRef([]);

  const handleScrollView = (index: number) => {
    if (scrollRef.current[index] && index != 0) {
      window.scrollTo({
        top:
          scrollRef.current[index].getBoundingClientRect().y +
          globalThis.scrollY,
        behavior: "smooth",
      });
    } else {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      }); // index == 0 인 경우 header height만큼 안올라가는 버그 예외처리
    }
  };

  return (
    <LandingContext.Provider
      value={{
        scrollRef: scrollRef,
        handleScrollView: handleScrollView,
      }}
    >
      {props.children}
    </LandingContext.Provider>
  );
};

export default LandingContext;
