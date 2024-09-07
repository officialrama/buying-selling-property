/* eslint-disable react-hooks/exhaustive-deps */
import cookie from "hs-cookie";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useLocation, useSearchParams } from "react-router-dom";
import { FSSpinner } from "../components/molecules";
import { Chatting, Modal, NavHeader } from "../components/organisms";
import { decryptStr, encryptStr, encryptStrFe } from "../helpers/encryptDecrypt";
import {
  showChat,
  showFailedRegLogin,
  showSelectQuestion,
  showSuccessReg
} from "../store/actions/changeModalState";
import {
  showModalLogin,
  showModalRegister
} from "../store/actions/changeState";

const RootPages = () => {
  const state = useSelector((state) => state.stateReducer);
  const stateModal = useSelector((state) => state.modalReducer);
  const stateLogin = useSelector((state) => state.loginReducer);
  const saState = useSelector((state) => state.superAdminReducer);
  const dispatch = useDispatch();
  const location = useLocation();
  useEffect(() => {
    dispatch(showModalRegister(false));
    dispatch(showModalLogin(false));
    window.document.dispatchEvent(
      new Event("DOMContentLoaded", { bubbles: true, cancelable: true })
    );
  }, []);
  const [queryParam] = useSearchParams();
  const getUserStatus = cookie.get("morgateCookie");
  const morgateCookie = getUserStatus && JSON.parse(getUserStatus);
  const [popupTimeoutSess, setPopupTimeoutSess] = useState(false);

  useEffect(() => {
    if (queryParam.get("email") && queryParam.get("name") && queryParam.get("jwt")) {
      const currentUrl = window.location.href.toString();
      const getJwt = JSON.parse((decodeURI(currentUrl).split("&")[2]).substr(4)).responseData[0].toString();
      const encryptJwt = encryptStr(decryptStr(getJwt));
      cookie.set('morgateCookie', JSON.stringify({
        email: encryptStr(queryParam.get("email")),
        emailView: encryptStrFe(queryParam.get("email")),
        userType: "visitor",
        isLoggedIn: true,
        name: queryParam.get("name")
      }), {path: "/"});
      cookie.set("jwt", encryptJwt, {path: "/"});
      window.location.href = "/";
    }
    if (queryParam.get("action") === "signup") {
      dispatch(showModalRegister(true));
    }
  }, [queryParam.toString()]);

  useEffect(() => {
    if (decryptStr(window.localStorage.getItem("timeout")) === "true") {
      setPopupTimeoutSess(true);
    }
  }, [localStorage.getItem("timeout")]);

  return (
    <div>
      {state.fsLoading && <FSSpinner />}
      {state.showModalRegister === true ? (
        <Modal
          closeModal={() => {
            dispatch(showModalRegister(!state.showModalRegister));
          }}
          modalTypes="signup"
          title=""
        />
      ) : (
        <div></div>
      )}
      {state.showModalLogin === true ? (
        <Modal
          closeModal={() => {
            dispatch(showModalLogin(!state.showModalLogin));
          }}
          modalTypes="login"
          title="Masuk"
        />
      ) : (
        <div></div>
      )}
      {stateLogin.successReg === true ? (
        <Modal
          closeModal={() => {
            dispatch(showSuccessReg(!stateLogin.successReg));
          }}
          modalTypes="successReg"
          title=""
        />
      ) : (
        <div></div>
      )}
    {saState.successInputRegister === true ? (
        <Modal
          modalTypes="successInputRegister"
        />
      ) : (
        <div></div>
      )}
      {stateLogin.failed.state === true && (
        <Modal
          closeModal={() => {
            dispatch(showFailedRegLogin(false, "", ""));
          }}
          modalTypes="modalSF"
          title=""
          titleBody={stateLogin.failed.title}
          descBody={stateLogin.failed.msg}
        />
      )}
      {stateModal.showSelectQuestion === true ? (
        <Modal
          closeModal={() => {
            dispatch(showSelectQuestion(!stateModal.showSelectQuestion));
          }}
          modalTypes="selectQuestion"
          title="Chat Developer"
        />
      ) : (
        <div></div>
      )}
      {stateModal.showChat === true && (
        <Chatting
          closeChat={() => {
            dispatch(showChat(!stateModal.showChat));
          }}
        />
      )}
      {popupTimeoutSess && (
        <Modal
          modalTypes="modalSF"
          title=""
          titleBody="Gagal"
          descBody="Sesi habis, silahkan masuk lagi"
          closeModal={() => {
            window.localStorage.clear();
            setPopupTimeoutSess(false);
          }}
        />
      )}
      {!location.pathname.includes("/admin") && !location.pathname.includes("/sales-dashboard") && !location.pathname.includes("/project-sales") && !location.pathname.includes("/kpr-sales")  && !location.pathname.includes("/payment") && !location.pathname.includes("/payment-succes") && !location.pathname.includes("/payment-fail") && !location.pathname.includes("/maintenance") && !location.pathname.includes("/signup-using-socmed") ? (
        <NavHeader
          onClickLogin={() => {
            dispatch(showModalLogin(!state.showModalLogin));
          }}
        />
      ) : ""}
      <Outlet />
    </div>
  );
};

export default RootPages;
