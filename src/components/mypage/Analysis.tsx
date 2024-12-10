import useFetchApi from "@/hooks/useFetchApi";
import { IsLogin } from "@/hooks/useLocalStorage";
import { useEffect, useState } from "react";
import ChartView from "./_componentns/ChartView";

export default function Analysis() {
  const [postData, setPostData] = useState({
    data: [],
    type: "bar",
  });
  const uuid = IsLogin();

  const formatStartTime = (timeStr: string): string => {
    const date = new Date(timeStr);
    
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    
    const weekdays = ["일", "월", "화", "수", "목", "금", "토"];
    const weekday = weekdays[date.getDay()];
    
    return `${year}년 ${month}월 ${day}일 (${weekday})`;
  };
  
  const convertTimeToMinutes = (timeStr: string): number => {
    const [hours, minutes, seconds] = timeStr.split(":").map(Number);
    return hours * 60 + minutes + seconds / 60;
  };
  
  const processDataForChart = (data: Array<any>) => {
    const chartData = data.map((item) => {
      const startTimeFormatted = formatStartTime(item.start_time);
      const realTimeInMinutes = convertTimeToMinutes(item.real_time);
      const wasteTimeInMinutes = convertTimeToMinutes(item.waste_time);
  
      return {
        subject: item.subject,
        TIME: startTimeFormatted,
        realTime: realTimeInMinutes,
        wasteTime: wasteTimeInMinutes,
      };
    });
  
    return chartData;
  };

  const setValueChange = (value) => {
    setPostData({
      data: postData.data,
      type: value,
    })
  }

  useEffect(() => {
    const getPostData = async () => {
      const response = await useFetchApi({}, "detect/read/"+uuid, "GET");
      if (response.status === 200)
        if (response.data)
          setPostData({
            data: processDataForChart(response.data.reverse()),
            type: postData.type,
          }
        );
    }
    if (uuid) {
      getPostData();
    }
  }, []);

  return (
    <div className="w-full h-auto flex flex-col items-center p-10">
      {!postData ? <p className="text-[#8e8e8e] text-2xl opacity-50">Not Yet Post Data</p> : (
        <div className="w-full h-auto p-10">
          <div className="w-full flex justify-end items-center">
            <SelectContainer onValueChange={setValueChange} />
          </div>
          <ChartView {...postData} />
        </div>
      )}
    </div>
  )
}

const SelectContainer = ({ onValueChange }) => {
  return (
    <div className="w-full max-w-sm min-w-[200px] mb-10">      
      <div className="relative">
        <select
            className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded pl-3 pr-8 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-400 shadow-sm focus:shadow-md appearance-none cursor-pointer" onChange={(e) => onValueChange(e.target.value)} defaultChecked>
            <option value="bar">BAR Chart</option>
            <option value="linear">LINEAR Chart</option>
            <option value="tooltip">TOOLTIP Chart</option>
        </select>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.2" stroke="currentColor" className="h-5 w-5 ml-1 absolute top-2.5 right-2.5 text-slate-700">
          <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 15 12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9" />
        </svg>
      </div>
    </div>
  )
}