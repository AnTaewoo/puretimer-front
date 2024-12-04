import { createContext, SetStateAction, useState } from "react";

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
});

export const UserContextProvider = (props: any) => {
  const [userData, setUserData] = useState<UserData>({
    uuid: "",
    email: "",
    password: "",
    created: "",
    updated: "",
  });

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
