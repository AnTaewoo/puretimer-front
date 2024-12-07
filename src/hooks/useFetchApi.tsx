type MethodType = "POST" | "GET" | "PUT" | "DELETE";

interface returnType {
  message: string;
  data?: any;
  status: number;
}


const useFetchApi = async (_data:any, apiDetail: string,method:MethodType) : Promise<returnType> => {
  try {
    const fetchData = {
      method: method,
      headers: {
        "Content-Type": "application/json",
      }
    }
    if (method !== "GET" && method !== "DELETE")
      fetchData["body"] = JSON.stringify({..._data})

    const response = await fetch("/api/"+apiDetail, fetchData);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return {message: "error" ,status: 500};
  }
}

export default useFetchApi