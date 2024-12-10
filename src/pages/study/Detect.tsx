import DetectForm from "@/components/study/DetectForm";
import DetectContext from "@/provider/context/DetectContext"
import { useContext } from "react"

export default function Detect () {
  const detectData = useContext(DetectContext).detectData;

  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <div className="w-full h-auto max-w-[700px] text-2xl font-bold text-[#3F3E55]">
        <p className="ml-5 mb-1">{detectData.subject}</p>
        <DetectForm />
      </div>
    </div>
  )
}