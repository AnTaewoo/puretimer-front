import StudyForm from "@/components/study/StudyForm";
import Title from "@/components/ui/title/Title";

export default function Study() {
  return (
    <div className="w-full h-full p-20">
      <div className="w-full h-auto flex flex-col items-center justify-center border-slate-400 border-b-[1px] mb-10">
        <Title title="STUDY" />
        <p className="text-slate-400 text-xl font-bold mb-5">공부 시작 전, 주위에 핸드폰으로 감지될 수 있는 물체를 치워주세요</p>
      </div>
      <div className="w-full h-auto p-10">
        <StudyForm />
      </div>
    </div>
  )
}