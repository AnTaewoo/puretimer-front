import useFetchApi from "@/hooks/useFetchApi";
import { createContext, SetStateAction, useEffect, useState, Dispatch } from "react";

interface UserData {
  uuid: string;
  email: string;
  password: string;
  created: string;
  updated: string;
}

const api = "http://127.0.0.1:5000/";

const UserContext = createContext({
  userData : {
    uuid: "",
    email: "",
    password: "",
    created: "",
    updated: "",
  },
  setUserData: (value: SetStateAction<UserData>) => {},
});

export const UserContextProvider = (props: any) => {
  const [userData, setUserData] = useState<UserData>({
    uuid: "",
    email: "",
    password: "",
    created: "",
    updated: "",
  });

  useEffect(() => {
    const uuid = localStorage.getItem("isLogin");

    const getUserData = async () => {
      const response = await useFetchApi({}, "read/"+uuid, "GET", api);
      setUserData(response.data);
    }
    if (uuid) {
      getUserData();
    }
  }, []);

  return (
    <UserContext.Provider
      value={{
        userData: userData,
        setUserData: setUserData
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContext;
