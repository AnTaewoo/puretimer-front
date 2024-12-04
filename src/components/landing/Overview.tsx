import testImage from "@/assets/landing/test-detect.png";

export default function Overview() {
  return (
    <div className="  w-full max-w-7xl mx-auto py-36">
      <div className=" w-full mb-5">
        <p className=" text-slate-50 text-5xl font-extrabold text-center leading-[80px] font-sans">
          AI detects Distractions and Automatically
          <br />
          Pauses the Timer when you’re not Studying
        </p>
        <p className="text-slate-300 text-xl font-extrabold text-center leading-[80px] font-sans break-words">
          YOLO와 OpenCV를 통해 노트북 카메라로 실시간 활동을 감지하고 분석하여,
          집중한 공부 시간만 정확하게 측정할 수 있도록 돕습니다.
        </p>
      </div>
      <div className="w-full">
        <img
          src={testImage}
          alt="test-detect-img"
          className="w-full h-full object-contain"
        />
      </div>
    </div>
  );
}
