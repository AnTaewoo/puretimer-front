import CryptoJS from "crypto-js";

const useCryptoValue = async (data:string): Promise<string> => {
  try {
    const hash = CryptoJS.SHA256(data).toString(CryptoJS.enc.Hex).slice(0, 8);
    return hash;
  } catch (e: any) {
    console.log("CryptoJS >>>>> code: " + e.code + " / message: " + e.message);
    return "";
  }
};

export default useCryptoValue;