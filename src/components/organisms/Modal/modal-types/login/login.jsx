/* eslint-disable react-hooks/exhaustive-deps */
import cookie from "hs-cookie";
import React, { useEffect } from "react";
import { MdRefresh } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { LoadCanvasTemplateNoReload, loadCaptchaEnginge, validateCaptcha } from 'react-simple-captcha';
import { decryptStr } from "../../../../../helpers/encryptDecrypt";
import useLoginHooks from "../../../../../hooks/useLoginHooks";
import {
  showModalLogin,
  showModalRegister
} from "../../../../../store/actions/changeState";
import { userLogin } from "../../../../../store/actions/fetchData/userState";
import { Button, LabelInputTextbox } from "../../../../atoms";
import HorizontalLineWithText from "../../../../atoms/Text/horizontal-line-with-text";
import { Checkbox, Textbox, TextboxLabel } from "../../../../molecules";

const FormLogin = () => {
  const showModalRegisterState = useSelector((state) => state.stateReducer);
  const dispatch = useDispatch();
  const { inputs, setInputs, handleEmail, handlePass, handleCheckboxChange, handleInputChange, rememberMe } = useLoginHooks();

  const inputsArr = [
    inputs?.email?.isValid,
    inputs?.password?.isValid,
    inputs?.captchaInput?.isValid
  ];
  useEffect(() => {
    loadCaptchaEnginge(6);
    // if (cookie?.get("morgateCookie")) {
    //   const storedEmail = localStorage.getItem("rememberedEmail");
    //   const storedPassword = JSON.parse(window.localStorage.getItem("rememberedPassword"));
    //   if (JSON?.parse?.(cookie?.get("morgateCookie"))?.rememberMe) {
    //     setInputs({
    //       ...inputs,
    //       email: {
    //         ...inputs.email,
    //         isValid: !!decryptStr(JSON?.parse?.(cookie?.get("morgateCookie"))?.email),
    //         value: decryptStr(JSON?.parse?.(cookie?.get("morgateCookie"))?.email)
    //       },
    //       password: {
    //         ...inputs.password,
    //         value: storedPassword
    //       }
    //     });
    //   }
    // };
  }, []);
    const isButtonDisabled = () => {
      if (showModalRegisterState.loading) {
        return true;
      }
      return !(inputs?.email?.value && inputs?.password?.value && inputs?.captchaInput?.value );
    };
  return (
    <div>
      <div className="mb-5">
        <Textbox
          label="Email"
          placeholder="your@email.com"
          typeInput="email"
          name="email"
          value={inputs.email.value}
          onChange={handleEmail}
          invalid={!inputs?.email?.isValid && inputs?.email?.value}
          invalidTxt={inputs?.email?.msgError}
        />
      </div>
      <div className="mb-5">
        <TextboxLabel
          label="Password"
          placeholder="Password"
          isPasswordV2={true}
          typeInput="password"
          name="password"
          value={inputs.password.value}
          onChange={handlePass}
          invalid={!inputs?.password?.isValid && inputs?.password?.value}
          warnText={inputs?.password?.msgError}
        />
      </div>
      <div className="mb-3">
        <LabelInputTextbox text="Kode" />
      </div>
      <div className="signup-login__captcha-wrap">
        <div className="self-center">
          <LoadCanvasTemplateNoReload />
        </div>
        <Textbox
          placeholder="Masukkan kode"
          typeInput="text"
          name="captchaInput"
          id="captchaInput"
          onChange={handleInputChange}
          invalid={!inputs?.captchaInput?.isValid}
          invalidTxt={inputs?.captchaInput?.msgError}
          rightBtn={true}
          rightBtnChild={<><MdRefresh /></>}
          rightBtnClick={() => {
            loadCaptchaEnginge(6);
            setInputs({
              ...inputs,
              captchaInput: { ...inputs.captchaInput, isValid: false, msgError: "" }
            })
            document.getElementById('captchaInput').value = "";
          }}
        />
      </div>
      <div className="flex justify-between ">
        <div className="">
          <Checkbox label="Ingat Saya" name="rememberMe" checked={inputs?.rememberMe?.value} onChange={handleCheckboxChange} />
        </div>
        <div>
          <Link
            to="/forgot-password"
            onClick={() => {
              dispatch(showModalLogin(false));
            }}
          >
            <p className="font-medium text-[#F87304] text-[14px]">
              Lupa Kata Sandi?
            </p>
          </Link>
        </div>
      </div>
      <div className="w-full my-4">
        <Button
          disabled={isButtonDisabled()}
          isLoading={showModalRegisterState.loading}
          buttonColor="blue"
          textColor="white"
          fullWidth={true}
          paddingSize={"padding-1"}
          onClick={() => {
            let user_captcha = document.getElementById('captchaInput').value;
            if (validateCaptcha(user_captcha) === true) {
              rememberMe(inputs.email.value);
              dispatch(userLogin(inputs));
            }
            else {
              setInputs({
                ...inputs,
                captchaInput: { ...inputs.captchaInput, isValid: false, msgError: "Kode salah" }
              })
              document.getElementById('captchaInput').value = "";
            }
          }}
        >
          Masuk
        </Button>
      </div>

      {/* <HorizontalLineWithText text="atau masuk dengan" />
      <div className="flex my-4 gap-4">
        <a className="w-full" href={`${process.env.REACT_APP_URL_SALES_REF_API}/api/facebook/login`} alt="facebook-google">
          <Button
            buttonColor="grayLight"
            textColor="black"
            fullWidth={true}
            paddingSize={"padding-1"}
          >
            <div className="flex justify-center">
              <img
                className="mx-1"
                src="/icons/facebook-button-login.svg"
                alt="fb-icon"
              />
              <div>Facebook</div>
            </div>
          </Button>
        </a>
        <a className="w-full" href={`${process.env.REACT_APP_URL_SALES_REF_API}/api/google/login`} alt="login-google">
          <Button
            buttonColor="grayLight"
            textColor="black"
            fullWidth={true}
            paddingSize={"padding-1"}
          >
            <div className="flex justify-center">
              <img
                className="mx-1"
                src="/icons/google-button-login.svg"
                alt="google-icon"
              />
              <div>Google</div>
            </div>
          </Button>
        </a>
      </div> */}

      <div className="flex place-content-center">
        <p className="font-medium text-[#101C3C] text-[14px] mr-2">
          Belum punya akun? <br />
        </p>
        <button
          onClick={() => {
            dispatch(
              showModalRegister(!showModalRegisterState.showModalRegister)
            );
            dispatch(showModalLogin(!showModalRegisterState.showModalLogin));
          }}
        >
          <p className="font-medium text-[#F87304] text-[14px]">Daftar</p>
        </button>
      </div>
    </div>
  );
};

export default FormLogin;
