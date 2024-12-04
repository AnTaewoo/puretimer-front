type MethodType = "POST" | "GET" | "PUT" | "DELETE";

interface returnType {
  message: string;
  data?: any;
  status: number;
}

const useFetchApi = async (_data:any, apiDetail: string,method:MethodType, api:string) : Promise<returnType> => {
  try {
    const response = await fetch(api+apiDetail, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({..._data}),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return {message: "error" ,status: 500};
  }
}

export default useFetchApi