import React, { useEffect, useState } from "react";
import OtpInput from "react-otp-input";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import useREPassHooks from "../../../../hooks/useREPassHooks";
import { resetStateLogin } from "../../../../store/actions/changeState";
import {
  ResetOTP,
  emailResetPass,
  valOtp,
  valOtpSales
} from "../../../../store/actions/fetchData/userState";
import { Button, SmallLoading } from "../../../atoms";
import { useSearchParams } from "react-router-dom";


const FBOtp = () => {
  const [queryParam] = useSearchParams();
  const user = window.location.pathname.split('/')
  const userEmail = user?.[3] ? user[3].replace("user=", '') : undefined;
  const state = useSelector((state) => state.stateReducer);
  const loginState = useSelector((state) => state.loginReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { inputs, handleOtp, errorMsg, setErrorMsg } = useREPassHooks();
  const [timer, setTimer] = useState(60); 
  const [canResend, setCanResend] = useState(false);

  const inputsArr = [
    inputs?.otp?.isValid,
    errorMsg === ''
  ]

  useEffect(() => {
    if (timer > 0) {
      const countdown = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
      return () => clearInterval(countdown);
    } else {
      setCanResend(true);
    }
  }, [timer]);

  useEffect(() => {
    dispatch(emailResetPass(loginState.emailResetPass));
    if (loginState.redirect) {
      return navigate("/forgot-password/new-password");
    }
    return () => {
      dispatch(resetStateLogin());
    };
  }, [dispatch, loginState.emailResetPass, loginState.redirect, navigate]);

  const handleSendOtp = () => {
    if (window.location.pathname.includes("/visitor")){
      dispatch(valOtp(inputs?.otp?.value, decodeURIComponent(userEmail).replace(/\s/g, ''),2, setErrorMsg));
    } else if (window.location.pathname.includes("/sales")){
      const urlEncoded = (window.location.href).replace("http://localhost:3000/", "https://homespotstaging.bitcorp.id/");
      const email = decodeURIComponent(urlEncoded.substring(urlEncoded.lastIndexOf('/') + 1));
      dispatch(valOtpSales(inputs?.otp?.value, email));
    } else if (window.location.pathname.includes("/user")){
      dispatch(valOtp(inputs?.otp?.value, decodeURI(queryParam.get("user")).replace(/\s/g, ''),1));
    }else {
      dispatch(valOtp(inputs?.otp?.value, window.localStorage.getItem("emailResetPass"),0, setErrorMsg));
    }
  };
  const handleResendOtp = () => {
    dispatch(ResetOTP(decodeURIComponent(userEmail)));
    setTimer(60);
    setCanResend(false);
  };

  return (
    <div>
      <div className="forgot-pass__form__bodyForm__formBase">
        <p className="forgot-pass__form__bodyForm__textStyle justify-center items-center">
        Kode OTP sudah dikirimkan ke emailmu. Cek dan masukkan kode OTP di sini, ya.
        </p>
        <div className="pb-16 pt-7 justify-center items-center">
          <OtpInput
            value={inputs?.otp?.value}
            onChange={otp => handleOtp("otp", otp)}
            numInputs={5}
            containerStyle="forgot-pass__form__bodyForm__authCodeCont"
            inputStyle={`forgot-pass__form__bodyForm__authCodeInput ${errorMsg === '' ? "border-[#B5B6B6]" : "border-[#E84040]"}`}
            shouldAutoFocus={true}
            isInputNum={true}
          />
          <p className="pt-1 text-xs text-[#E84040] justify-center text-center items-center">{errorMsg}</p>
        </div>
        <p className="text-[#292929] font-bold text-lg "> {`${String(Math.floor(timer / 60)).padStart(2, '0')}:${String(timer % 60).padStart(2, '0')}`}</p>
        <p className="text-[#666666] font-medium text-base flex flex-row pb-6">Tidak Menerima OTP? <p className={`font-bold cursor-pointer ml-[2px] ${!canResend ? "text-[#B5B6B6]" : "text-[#292929]"}`} onClick={handleResendOtp}> Kirim Ulang</p></p>
          <button
          className="font-semibold mt-4 h-14 p-4 text-[#ffff] bg-[#1078CA] w-full rounded-lg disabled:bg-[#EAEBEB] disabled:text-[#B5B6B6]"
          onClick={() => handleSendOtp()}
          disabled={inputsArr.filter(Boolean).length !== 2}
        >
          {state.loading ? <SmallLoading /> : "Kirim"}
        </button>
      </div>
    </div>
  );
};

export default FBOtp;
