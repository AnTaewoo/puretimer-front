type emailType = string | "null";

interface DetectData {
  uuid?: string;
  subject: string;
  start_time: string;
  end_time: string;
  waste_time: string;
}

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

export function IsDetect () {
  const isDetectSet = localStorage.getItem("isDetect");
  const detectData = JSON.parse(isDetectSet);

  if (isDetectSet) {
    return detectData;
  } else {
    return false;
  }
}

export function setIsDetect (detectData: DetectData) {
  try {
    localStorage.setItem("isDetect", JSON.stringify(detectData));

    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
}

export function delIsDetect () {
  try {
    localStorage.removeItem("isDetect");

    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
}