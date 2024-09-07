/* eslint-disable react-hooks/exhaustive-deps */
import cookie from "hs-cookie";
import React, { useEffect, useState } from "react";
import { Oval } from "react-loader-spinner";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { encryptStr, decryptStr } from "../../../../helpers/encryptDecrypt";
import useREPassHooks from "../../../../hooks/useREPassHooks";
import {
  activateAcc, chgPassConfirm, changePassSales
} from "../../../../store/actions/fetchData/userState";
import { Button, SmallLoading } from "../../../atoms";
import Textbox from "../../Input/textbox";


const FBNewPassword = ({ paramId, action, user }) => {
  const [queryParam] = useSearchParams();
  const state = useSelector((state) => state.stateReducer);
  const loginState = useSelector((state) => state.loginReducer);
  const dispatch = useDispatch();
  const morgateCookie = cookie.get("morgateCookie");
  const { inputs, handlePass, handlePassConfirm } = useREPassHooks();
  const [payload, setPayload] = useState({
    email: "",
    newPassword: "",
    retypeNewPassword: "",
  });
  const inputsArr = [
    inputs?.newPassword?.isValid,
    inputs?.retypeNewPassword?.isValid
  ];

  // useEffect(() => {
  //   if (window.location.pathname.includes("/activate")) {
  //     if (morgateCookie) {
  //       const cookieIsExist = morgateCookie && JSON.parse(morgateCookie);
  //       setPayload({
  //         ...payload,
  //         email: cookieIsExist.email,
  //       });
  //     }
  //     if (action === "activate") {
  //       dispatch(activateAcc(paramId, null, null, queryParam.get("user")));
  //     }
  //   }
  // }, []);

  useEffect(() => {
    setPayload({
      ...payload,
      email: loginState.emailResetPass,
    });
  }, [loginState]);

  useEffect(() => {

    let emailUser = "";

    if (window.location.pathname.includes("/activate")) {
      const urlEncoded = (window.location.href).replace("http://localhost:3000/", "http://172.17.0.186/");
      const email = decodeURIComponent(urlEncoded.substring(urlEncoded.lastIndexOf('/') + 1));
      emailUser = queryParam.get("user") || email ;
      // emailUser = encryptStr(decryptStr(loginState.emailResetPass)) || encryptStr(decryptStr(window.localStorage.getItem("emailResetPass")));
    } else {
      emailUser = encryptStr(loginState.emailResetPass) || encryptStr(window.localStorage.getItem("emailResetPass"))
    }


    setPayload({
      ...payload,
      email : emailUser,
      newPassword: encryptStr(inputs?.newPassword?.value),
      retypeNewPassword: encryptStr(inputs?.retypeNewPassword?.value),
    });
  }, [inputs]);

  const handleSendConfirm = () => {
    if (window.location.pathname.includes("/sales")) {
      dispatch(changePassSales(payload));
    } else {
      dispatch(chgPassConfirm(payload, user));
    }
  };

  return (
    <div>
      {loginState.loadingActivation ? (
        <Oval
          wrapperclassName="loader__oval"
          ariaLabel="loading-indicator"
          height={100}
          width={100}
          strokeWidth={5}
          color="#00529C"
          secondaryColor="#bbd7f0"
        />
      ) : (
        <div className="forgot-pass__form__bodyForm__formBase">
          <p className="forgot-pass__form__bodyForm__textStyle">
            Masukkan password baru Anda yang mudah diingat.
          </p>
          <div className="forgot-pass__form__bodyForm__emailInput">
            <Textbox
              label="Password Baru"
              placeholder="Password Baru"
              typeInput="password"
              isPassword={true}
              name="newPassword"
              value={inputs?.newPassword?.value}
              onChange={handlePass}
              invalid={!inputs?.newPassword?.isValid && inputs?.newPassword?.value}
              invalidTxt={inputs?.newPassword?.msgError}
              maxLength={40}
            />
          </div>
          <div className="forgot-pass__form__bodyForm__emailInput">
            <Textbox
              label="Konfirmasi Password Baru"
              placeholder="Konfirmasi Password Baru"
              typeInput="password"
              isPassword={true}
              name="retypeNewPassword"
              value={inputs?.retypeNewPassword?.value}
              onChange={handlePassConfirm}
              invalid={!inputs?.retypeNewPassword?.isValid && inputs?.retypeNewPassword?.value}
              invalidTxt={inputs?.retypeNewPassword?.msgError}
              maxLength={40}
            />
          </div>
          <Button
            buttonColor="blue"
            textColor="white"
            fullWidth={true}
            paddingSize={"padding-1"}
            onClick={handleSendConfirm}
            disabled={inputsArr.filter(Boolean).length !== 2}
          >
            {state.loading ? <SmallLoading /> : "Kirim"}
          </Button>
        </div>
      )}
    </div>
  );
};

export default FBNewPassword;
