import { Chart } from "react-google-charts";

interface PostType {
  "end_time": string,
  "real_time": string,
  "start_time": string,
  "subject": string,
  "user_uuid": string,
  "waste_time": string
  "email": string
}

export const options = {
  legend: {
    position: "bottom",
    alignment: "center",
    textStyle: {
      color: "#233238",
      fontSize: 14,
    },
  },
  pieHole: 0.4,
  is3D: false,
  pieSliceText: "none",
  slices: {
    0: { color: "#aa1a1a" },
    1: { color: "#1450aa" },
  },
};

export default function ChartView(data: PostType) {
  const timeToSeconds = (timeStr: string): number => {
    const [h, m, s] = timeStr.split(":").map(Number);
    return h * 3600 + m * 60 + s;
  };

  const realTimeSeconds = timeToSeconds(data.real_time);
  const wasteTimeSeconds = timeToSeconds(data.waste_time);
  
  const totalTimeSeconds = realTimeSeconds + wasteTimeSeconds;
  
  const realTimePercentage = (realTimeSeconds / totalTimeSeconds) * 100;
  const wasteTimePercentage = (wasteTimeSeconds / totalTimeSeconds) * 100;
  
  const chartData = [
    ["Task", "Percentage"],
    ["Waste Time", parseFloat(wasteTimePercentage.toFixed(2))],
    ["Real Time", parseFloat(realTimePercentage.toFixed(2))],
  ];
  
  return (
    <Chart
      chartType="PieChart"
      width="100%"
      height="100%"
      data={chartData}
      options={options}
    />
  );
}