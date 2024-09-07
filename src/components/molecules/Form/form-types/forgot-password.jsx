import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import useREPassHooks from "../../../../hooks/useREPassHooks";
import { resetStateLogin } from "../../../../store/actions/changeState";
import {
  emailResetPass,
  forgotPassInputEmail,
} from "../../../../store/actions/fetchData/userState";
import { Button, SmallLoading } from "../../../atoms";
import Textbox from "../../Input/textbox";

const FBForgotPassword = () => {
  const state = useSelector((state) => state.stateReducer);
  const loginState = useSelector((state) => state.loginReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { inputs, handleEmail } = useREPassHooks();
  const inputsArr = [
    inputs?.email?.isValid
  ]

  useEffect(() => {
    if (loginState.redirect) {
      dispatch(emailResetPass(inputs?.email?.value));
      window.localStorage.setItem("emailResetPass", inputs?.email?.value);
      return navigate("/forgot-password/otp");
    }
    return () => {
      dispatch(resetStateLogin());
    };
  }, [dispatch, loginState.redirect, navigate, inputs?.email?.value]);

  return (
    <div>
      <div className="forgot-pass__form__bodyForm__formBase">
        <p className="forgot-pass__form__bodyForm__textStyle">
          Masukkan e-mail yang terdaftar. Kami akan mengirimkan kode verifikasi
          untuk atur ulang kata sandi.
        </p>
        <div className="forgot-pass__form__bodyForm__emailInput">
          <Textbox
            placeholder="your@email.com"
            typeInput="email"
            name="email"
            value={inputs?.email?.value}
            onChange={handleEmail}
            invalid={!inputs?.email?.isValid && inputs?.email?.value}
            invalidTxt={inputs?.email?.msgError}
          />
        </div>
        <Button
          buttonColor="blue"
          textColor="white"
          fullWidth={true}
          paddingSize={"padding-1"}
          disabled={inputsArr.filter(Boolean).length !== 1}
          onClick={() => dispatch(forgotPassInputEmail(inputs))}
        >
          {state.loading ? <SmallLoading /> : "Kirim"}
        </Button>
      </div>
    </div>
  );
};

export default FBForgotPassword;
