import useFetchApi from "@/hooks/useFetchApi";
import { IsLogin } from "@/hooks/useLocalStorage";
import { createContext, SetStateAction, useEffect, useState } from "react";

interface UserData {
  uuid: string;
  email: string;
  password: string;
  created: string;
  updated: string;
}

const UserContext = createContext({
  userData : {
    uuid: "",
    email: "",
    password: "",
    created: "",
    updated: "",
  },
  setUserData: (value: SetStateAction<UserData>) => {},
  getUserData: () => {},
});

export const UserContextProvider = (props: any) => {
  const [userData, setUserData] = useState<UserData>({
    uuid: "",
    email: "",
    password: "",
    created: "",
    updated: "",
  });

  const uuid = IsLogin();
  const getUserData = async () => {
    const response = await useFetchApi({}, "user/read/"+uuid, "GET");
    setUserData(response.data);
  }

  useEffect(() => {
    if (uuid) {
      getUserData();
    }
  }, []);

  return (
    <UserContext.Provider
      value={{
        userData: userData,
        setUserData: setUserData,
        getUserData: getUserData,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContext;
