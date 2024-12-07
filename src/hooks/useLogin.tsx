type emailType = string | "null";

export function IsLogin () {
  const isLoginSet = localStorage.getItem("isLogin");

  if (isLoginSet) {
    return isLoginSet;
  } else {
    return false;
  }
}

export function setIsLogin (uuid: emailType) {
  try {
    localStorage.setItem("isLogin", uuid);

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