type MethodType = "POST" | "GET" | "PUT" | "DELETE";

interface returnType {
  message: string;
  data?: any;
  status: number;
}


const useFetchApi = async (_data:any, apiDetail: string,method:MethodType, header:string = "application/json") : Promise<returnType> => {
  try {
    const fetchData: RequestInit = {
      method: method,
      headers: {},
    };
    if (header === "application/octet-stream") {
      fetchData.body = _data;
    } else {
      fetchData.headers = {
        "Content-Type": header,
      };
      if (method !== "GET" && method !== "DELETE") {
        fetchData.body = JSON.stringify({ ..._data });
      }
    }

    const response = await fetch("/api/" + apiDetail, fetchData);
    const data = await response.json();
    return data;
  } catch (error) {
    return {message: "error" ,status: 500};
  }
}

export default useFetchApi