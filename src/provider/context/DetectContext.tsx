import { IsDetect, IsLogin } from "@/hooks/useLocalStorage";
import { createContext, SetStateAction, useEffect, useState } from "react";

interface DetectData {
  uuid: string;
  start_time: string;
  end_time: string;
  waste_time: string;
  subject: string,
}

const DetectContext = createContext({
  detectData : {
    uuid: "",
    start_time: "",
    end_time: "",
    waste_time: "",
    subject: "",
  },
  setDetectData: (value: SetStateAction<DetectData>) => {},
  getDetectData: () => {},
});

export const DetectContextProvider = (props: any) => {
  const uuid = IsLogin();
  const [detectData, setDetectData] = useState<DetectData>({
    uuid: "",
    start_time: "",
    end_time: "",
    waste_time: "",
    subject: "",
  });

  const getDetectData = async () => {
    const data = IsDetect();
    if (data) {
      setDetectData(data);
    }
  }  

  useEffect(() => {
    if (uuid) {
      getDetectData();
    }
  }, []);

  return (
    <DetectContext.Provider
      value={{
        detectData: detectData,
        setDetectData: setDetectData,
        getDetectData: getDetectData,
      }}
    >
      {props.children}
    </DetectContext.Provider>
  );
};

export default DetectContext;