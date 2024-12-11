import useFetchApi from "@/hooks/useFetchApi";
import { useContext, useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/shadcn/button";
import { delIsDetect } from "@/hooks/useLocalStorage";
import DetectContext from "@/provider/context/DetectContext";
import { UserContext } from "@/provider/context";
import { useNavigate } from "react-router-dom";
import { useAlert } from "@/hooks/useAlert";

export default function DetectForm() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const timeoutRef = useRef<number | null>(null); // Frame sending timeout
  const intervalRef = useRef<number | null>(null); // Timer interval
  const wasteIntervalRef = useRef<number | null>(null); // Waste time interval

  const [timer, setTimer] = useState(0); // Timer in seconds
  const [wasteTimer, setWasteTimer] = useState(0); // Waste timer in seconds
  const [isPaused, setIsPaused] = useState(false); // Pause state
  const [isPhone, setIsPhone] = useState(false);
  const [isPauseByPhone, setIsPauseByPhone] = useState(false);

  const detectCtx = useContext(DetectContext);
  const userCtx = useContext(UserContext);
  const nav = useNavigate();

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600).toString().padStart(2, "0");
    const m = Math.floor((seconds % 3600) / 60).toString().padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${h}:${m}:${s}`;
  };

  const onPause = () => {
    setIsPaused(true);

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    if (!wasteIntervalRef.current) {
      wasteIntervalRef.current = window.setInterval(() => {
        setWasteTimer((prev) => prev + 1);
      }, 1000);
    }
  };

  const onResume = () => {
    setIsPaused(false)

    if (wasteIntervalRef.current) {
      clearInterval(wasteIntervalRef.current);
      wasteIntervalRef.current = null;
    }
    if (!intervalRef.current) {
      intervalRef.current = window.setInterval(() => {
        setTimer((prev) => prev + 1);
      }, 1000);
    }
  };

  const onStop = () => {
    // Stop timers
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (wasteIntervalRef.current) clearInterval(wasteIntervalRef.current);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    // Stop webcam
    if (videoRef.current) {
      videoRef.current.pause();
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach((track) => track.stop());
      videoRef.current.srcObject = null;
    }

    const _data = detectCtx.detectData;
    const now = new Date();

    const formatDateTime = (date: Date): string => {
      const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
      const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    
      const dayName = days[date.getUTCDay()]; // 요일 약칭
      const day = String(date.getUTCDate()).padStart(2, "0"); // 날짜
      const monthName = months[date.getUTCMonth()]; // 월 약칭
      const year = date.getUTCFullYear(); // 연도
      const hours = String(date.getUTCHours()).padStart(2, "0"); // 24시간제
      const minutes = String(date.getUTCMinutes()).padStart(2, "0"); // 분
      const seconds = String(date.getUTCSeconds()).padStart(2, "0"); // 초
      const timeZone = "KST"; // 시간대
    
      return `${dayName}, ${day} ${monthName} ${year} ${hours}:${minutes}:${seconds} ${timeZone}`;
    };
    
    
    const formattedDateTime = formatDateTime(now);

    // Return session data
    const sessionData = {
      uuid: _data.uuid,
      email: userCtx.userData.email,
      subject: _data.subject,
      start_time: _data.start_time,
      end_time: formattedDateTime,
      waste_time: formatTime(wasteTimer),
    };

    const deleteAccount = async (_data) => {
      const result = await useFetchApi(_data, "detect/upload", "POST");
  
      if (result.status === 200) {
        nav("/dashboard/mypage");
        return useAlert("공부 저장이 완료되었습니다", false);
      } else if (result.status === 404) {
        return useAlert("공부 저장에 실패했습니다", true);
      } else {
        return useAlert("알 수 없는 오류가 발생했습니다.", true);
      }
    }

    deleteAccount(sessionData);

    delIsDetect();
    detectCtx.setDetectData({
      uuid: "",
      start_time: "",
      end_time: "",
      waste_time: "",
      subject: "",
    });

  };

  useEffect(() => {
    const startWebcam = async () => {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }

      const sendFrames = async () => {
        const canvas = document.createElement("canvas");
        canvas.width = 640;
        canvas.height = 640;

        if (videoRef.current) {
          const ctx = canvas.getContext("2d");
          if (ctx) {
            ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
            canvas.toBlob(async (blob) => {
              const response = await useFetchApi(blob, "detect/detect", "POST", "application/octet-stream");
              const { num_objects, confidences } = response.data;
              const isPhone = num_objects > 0 && confidences.some((confidence: number) => confidence > 0.5);

              console.log(response.data)

              const handlePauseLogic = (_isPhone: boolean) => {
                if (_isPhone) {
                  setIsPhone(true)
                  onPause();
                } else if (_isPhone && !isPaused) {
                  setIsPauseByPhone(true);
                  setIsPhone(true)
                  onPause();
                } else if (!_isPhone && isPauseByPhone) {
                  setIsPauseByPhone(false);
                  setIsPhone(false)
                  onResume();
                } else {
                  setIsPauseByPhone(false);
                  setIsPhone(false)
                }
              };

              handlePauseLogic(isPhone);
            });
          }
        }

        timeoutRef.current = window.setTimeout(sendFrames, 1000);
      };

      intervalRef.current = window.setInterval(() => {
        setTimer((prev) => prev + 1);
      }, 1000);

      sendFrames();
    };

    startWebcam();

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <div>
      <div className="w-full h-[450px] border-[6px] rounded-[12px] overflow-hidden" style={{
        borderColor: !isPhone ? (!isPaused ? "#1e3a8a" : "#9e8712") : "#911a1a"
      }} >
        <video ref={videoRef} className="w-full h-full rounded-[6px] object-cover" />
      </div>
      <div className="w-full h-auto px-5 py-3 flex justify-between">
        <div className="w-auto h-full flex flex-col">
          <p className="text-4xl font-extrabold text-[#3F3E55] mr-2 leading-none">
            {formatTime(timer)}
          </p>
          <p className="text-2xl font-bold text-[#F58B8B] leading-none">
            {formatTime(wasteTimer)}
          </p>
        </div>
        <div className="w-auto h-full flex items-end gap-4">
          {!isPhone && <>
            {isPaused ? (
              <Button onClick={onResume} className="bg-green-600 hover:bg-green-700 text-white">
                RESUME
              </Button>
            ) : (
              <Button onClick={onPause} className="bg-yellow-600 hover:bg-yellow-700 text-white">
                PAUSE
              </Button>
            )}
          </>}
          <Button onClick={onStop} className="bg-red-600 hover:bg-red-700 text-white">
            STOP
          </Button>
        </div>
      </div>
    </div>
  );
}
// import useFetchApi from "@/hooks/useFetchApi";
// import { useEffect, useRef, useState } from "react";
// import { Button } from "@/components/ui/shadcn/button";

// export default function DetectForm() {
//   const videoRef = useRef<HTMLVideoElement | null>(null);
//   const timeoutRef = useRef<number | null>(null); // Frame sending timeout
//   const intervalRef = useRef<number | null>(null); // Timer interval
//   const wasteIntervalRef = useRef<number | null>(null); // Waste time interval

//   const [detected, setDetected] = useState({ num_objects: 0, confidences: [], isPhone: false });
//   const [timer, setTimer] = useState(0); // Timer in seconds
//   const [wasteTimer, setWasteTimer] = useState(0); // Waste timer in seconds
//   const [isPaused, setIsPaused] = useState(false); // Pause state
//   const [isPausedByPhone, setIsPausedByPhone] = useState(false); // Pause state

//   const formatTime = (seconds: number) => {
//     const h = Math.floor(seconds / 3600).toString().padStart(2, "0");
//     const m = Math.floor((seconds % 3600) / 60).toString().padStart(2, "0");
//     const s = (seconds % 60).toString().padStart(2, "0");
//     return `${h}:${m}:${s}`;
//   };

//   const onPause = () => {
//     if (!isPaused) {
//       setIsPaused(true);

//       if (intervalRef.current) {
//         clearInterval(intervalRef.current);
//         intervalRef.current = null;
//       }
//       if (!wasteIntervalRef.current) {
//         wasteIntervalRef.current = window.setInterval(() => {
//           setWasteTimer((prev) => prev + 1);
//         }, 1000);
//       }
//     }
//   };

//   const onResume = () => {
//     if (isPaused) {
//       setIsPaused(false);

//       if (wasteIntervalRef.current) {
//         clearInterval(wasteIntervalRef.current);
//         wasteIntervalRef.current = null;
//       }
//       if (!intervalRef.current) {
//         intervalRef.current = window.setInterval(() => {
//           setTimer((prev) => prev + 1);
//         }, 1000);
//       }
//     }
//   };

      // const onStop = () => {
      //   // Stop timers
      //   if (intervalRef.current) clearInterval(intervalRef.current);
      //   if (wasteIntervalRef.current) clearInterval(wasteIntervalRef.current);
      //   if (timeoutRef.current) clearTimeout(timeoutRef.current);

      //   // Stop webcam
      //   if (videoRef.current) {
      //     videoRef.current.pause();
      //     const stream = videoRef.current.srcObject as MediaStream;
      //     stream.getTracks().forEach((track) => track.stop());
      //     videoRef.current.srcObject = null;
      //   }

      //   // Return session data
      //   const sessionData = {
      //     subject: "Subject Name", // Replace with actual subject
      //     startTime: new Date().toLocaleString(),
      //     endTime: new Date().toLocaleString(),
      //     activeTime: formatTime(timer),
      //     wastedTime: formatTime(wasteTimer),
      //   };
      //   console.log("Session Data:", sessionData);
      // };

//   useEffect(() => {
//     const startWebcam = async () => {
//       const stream = await navigator.mediaDevices.getUserMedia({ video: true });

//       if (videoRef.current) {
//         videoRef.current.srcObject = stream;
//         videoRef.current.play();
//       }

//       const sendFrames = async () => {
//         const canvas = document.createElement("canvas");
//         canvas.width = 640;
//         canvas.height = 640;

//         if (videoRef.current) {
//           const ctx = canvas.getContext("2d");
//           if (ctx) {
//             ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
//             canvas.toBlob(async (blob) => {
//               const response = await useFetchApi(blob, "detect/detect", "POST", "application/octet-stream");
//               const {num_objects , confidences} = response.data;
//               let isPhone = false;

//               if (num_objects > 0) {
//                 const phoneConf = confidences.some((confidence: number) => confidence > 0.6);
//                 if (phoneConf) {
//                   isPhone = true;
//                 } 
//               }
//               setDetected({ num_objects, confidences, isPhone });

//               if (isPhone) onPause();
//             });
//           }
//         }
//       }

//       intervalRef.current = window.setInterval(() => {
//         setTimer((prev) => prev + 1);
//       }, 1000);
      
//       sendFrames();

//       console.log("isPaused:", isPaused, "wasteTimer:", wasteTimer, "timer:", timer, "detected", detected);
//       timeoutRef.current = window.setTimeout(sendFrames, 1000);
//     }

//     startWebcam();

//     return () => {
//       onStop();
//     };
//   }, []);

//   // Detect pause condition when num_phone changes
//   useEffect(() => {
//     if (!detected.isPhone) {
//       onPause();
//     }
//   }, [detected.isPhone]);

//   return (
//     <div>
//       <div className="w-full h-[450px] border-[6px] rounded-[12px] border-blue-900 overflow-hidden">
//         <video ref={videoRef} className="w-full h-full rounded-[6px] object-cover" />
//       </div>
//       <div className="w-full h-auto px-5 py-3 flex justify-between">
//         <div className="w-auto h-full flex flex-col">
//           <p className="text-4xl font-extrabold text-[#3F3E55] mr-2 leading-none">
//             Active: {formatTime(timer)}
//           </p>
//           <p className="text-2xl font-bold text-[#F58B8B] leading-none">
//             Wasted: {formatTime(wasteTimer)}
//           </p>
//         </div>
//         <div className="w-auto h-full flex items-end gap-4">
//           {isPaused ? (
//             <Button onClick={onResume} className="bg-green-600 hover:bg-green-700 text-white">
//               RESUME
//             </Button>
//           ) : (
//             <Button onClick={onPause} className="bg-yellow-600 hover:bg-yellow-700 text-white">
//               PAUSE
//             </Button>
//           )}
//           <Button onClick={onStop} className="bg-red-600 hover:bg-red-700 text-white">
//             STOP
//           </Button>
//         </div>
//       </div>
//     </div>
//   );
// }

// // import useFetchApi from "@/hooks/useFetchApi";
// // import { useEffect, useRef, useState } from "react";
// // import { Button } from "@/components/ui/shadcn/button";

// // export default function DetectForm() {
// //   const videoRef = useRef<HTMLVideoElement | null>(null);
// //   const [detected, setDetected] = useState({ num_objects: 0, confidences: [] });
// //   const timeoutRef = useRef<number | null>(null); // Frame sending timeout
// //   const intervalRef = useRef<number | null>(null); // Timer interval
// //   const [timer, setTimer] = useState(0); // Timer in seconds

// //   const formatTime = (seconds: number) => {
// //     const h = Math.floor(seconds / 3600).toString().padStart(2, "0");
// //     const m = Math.floor((seconds % 3600) / 60).toString().padStart(2, "0");
// //     const s = (seconds % 60).toString().padStart(2, "0");
// //     return `${h}:${m}:${s}`;
// //   };

// //   const onStop = () => {
// //     if (videoRef.current) {
// //       videoRef.current.pause();
// //       const stream = videoRef.current.srcObject as MediaStream;
// //       stream.getTracks().forEach((track) => track.stop());
// //       videoRef.current.srcObject = null;
// //     }

// //     // Stop frame sending
// //     if (timeoutRef.current !== null) {
// //       clearTimeout(timeoutRef.current);
// //       timeoutRef.current = null;
// //     }

// //     // Stop timer
// //     if (intervalRef.current !== null) {
// //       clearInterval(intervalRef.current);
// //       intervalRef.current = null;
// //     }
// //   };

// //   useEffect(() => {
// //     const startWebcam = async () => {
// //       const stream = await navigator.mediaDevices.getUserMedia({ video: true });
// //       if (videoRef.current) {
// //         videoRef.current.srcObject = stream;
// //         videoRef.current.play();
// //       }

// //       const sendFrames = async () => {
// //         const canvas = document.createElement("canvas");
// //         canvas.width = 640;
// //         canvas.height = 640;

// //         if (videoRef.current) {
// //           const ctx = canvas.getContext("2d");
// //           if (ctx) {
// //             ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
// //             canvas.toBlob(async (blob) => {
// //               const response = await useFetchApi(blob, "detect/detect", "POST", "application/octet-stream");
// //               setDetected(response.data);
// //             });
// //           }
// //         }

// //         // Schedule next frame
// //         timeoutRef.current = window.setTimeout(sendFrames, 1000);
// //       };

// //       // Start timer
// //       intervalRef.current = window.setInterval(() => {
// //         setTimer((prevTimer) => prevTimer + 10);
// //       }, 1000);

// //       sendFrames();
// //     };
// //     startWebcam();
// //     return () => {
// //       onStop();
// //     };
// //   }, []);

// //   console.log(timer);

// //   return (
// //     <div>
// //       <div className="w-full h-[450px] border-[6px] rounded-[12px] border-blue-900 overflow-hidden">
// //         <video ref={videoRef} className="w-full h-full rounded-[6px] object-cover" />
// //       </div>
// //       <div className="w-full h-auto px-5 py-3 flex justify-between">
// //         <div className="w-auto h-full flex items-end">
// //           <p className=" text-4xl font-extrabold text-[#3F3E55] mr-2 leading-none">
// //             {formatTime(timer)}
// //           </p>
// //         </div>
// //         <div className="w-auto h-full flex items-end">
// //           <Button
// //             type="button"
// //             className="w-48 h-full bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-600 transition-colors rounded-xl text-slate-50 text-xl font-bold"
// //             onClick={onStop}
// //           >
// //             STOP
// //           </Button>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }