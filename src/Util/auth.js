import Cookies from "js-cookie";
import { loginUserList } from "../Constant/loginUserList";
import CryptoJS from "crypto-js";
export const groupListObj = {
  smt: "SMD(smt)",
  eol: "SMD(eol)",
  switch: "ASS'Y(switch)",
  keyset: "ASS'Y(keyset)",
  guest: "GUEST",
};
export const auth = (() => {
  const token = Cookies.get("mobase_auth_token");
  if (token) {
    const bytes = CryptoJS.AES.decrypt(token, "mobase_secret");
    const decrypted = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    const { id, password, role } = decrypted;
    if (!id || !password) return { success: false };
    const isUserExist = loginUserList.find((i) => i.id === id);
    if (!isUserExist) {
      return { success: false };
    }
    const isPasswordCorrect = isUserExist.password === password;
    if (!isPasswordCorrect) {
      return { success: false };
    }
    return { success: true, role };
  } else {
    return { success: false, no_login: true };
  }
})();
export const isGuest = auth.role === "guest";
export const Logout = () => {
  Cookies.set("mobase_auth_id", "");
  Cookies.set("mobase_auth_token", "");
  alert("Logout Successfully");
  window.location.reload();
};
