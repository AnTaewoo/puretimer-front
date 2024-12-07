import SettingForm from "@/components/setting/SettingForm";
import Title from "@/components/ui/title/Title";

export default function Setting() {
  return (
    <div className="w-full h-full flex flex-col overscroll-none p-10">
      <Title title="Setting" />
      <div className="w-full max-w-[700px] mx-auto">
        <SettingForm />
      </div>
    </div>
  )
}