type boolType = "true" | "false" | "null";

export function IsLogin () {
  const isLoginSet = localStorage.getItem("isLogin");

  if (isLoginSet === "true") {
    return true;
  } else {
    return false;
  }
}

export function setIsLogin (bool: boolType) {
  try {
    localStorage.setItem("isLogin", bool);

    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
}

export function delIsLogin () {
  try {
    localStorage.removeItem("isLogin");

    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
}