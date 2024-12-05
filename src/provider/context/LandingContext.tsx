import { createContext, useRef } from "react";


interface LandingContextType {
  scrollRef: React.RefObject<HTMLDivElement[]>; // useRef 타입 정의
  handleScrollView: (index: number) => void;
}

// 초기값은 null로 설정
const LandingContext = createContext<LandingContextType>({
  scrollRef: { current: [] },
  handleScrollView: () => {},
});

export const LandingContextProvider = (props: any) => {
  const scrollRef = useRef<HTMLDivElement[] | null>([]);

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
