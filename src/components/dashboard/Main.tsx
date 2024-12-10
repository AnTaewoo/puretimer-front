import useFetchApi from "@/hooks/useFetchApi";
import { IsLogin } from "@/hooks/useLocalStorage";
import { useEffect, useState } from "react";
import Post from "./_components/Post";

interface PostType {
  "end_time": string,
  "real_time": string,
  "start_time": string,
  "subject": string,
  "user_uuid": string,
  "waste_time": string
  "email": string
}

export default function Main() {
  const [postData, setPostData]= useState(null);
  const uuid = IsLogin();
  
  useEffect(() => {
    const getPostData = async () => {
      const response = await useFetchApi({}, "detect/read", "GET");
      if (response.status === 200)
        if (response.data)
          setPostData(response.data.reverse());
    }
    if (uuid) {
      getPostData();
    }
  }, []);

  return (
    <ul className="w-full flex flex-col p-20 items-center grow">
      {postData && 
      <>
        {postData.map((data: PostType, index: number) => (
          <Post key={index} {...data} />
        ))}
      </>}
      {!postData && <p className="text-[#8e8e8e] text-2xl opacity-50">Not Yet Post Data</p>}
    </ul>
  )
}