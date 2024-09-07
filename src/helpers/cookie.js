import { decryptStr, encryptStr } from "./encryptDecrypt";
import cookie from "hs-cookie";

export function saveJwtCookie(encCookie, isRemembered, expiredAt = 0) {
//   const timestamp = new Date().getTime();
//   document.cookie = `jwt=${encryptStr(decryptStr(encCookie))}; expires=${isRemembered ? new Date(timestamp + (1000 * 60 * 60)).toUTCString() : ""}; path=/`;
  let expires = 365;
  if(expiredAt) {
    expires = new Date(expiredAt)
  }
  cookie.set("jwt", encryptStr(decryptStr(encCookie)), {expires, path:"/"})
}
