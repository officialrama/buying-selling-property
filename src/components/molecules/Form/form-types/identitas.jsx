/* eslint-disable react-hooks/exhaustive-deps */
import cookie from "hs-cookie";
import { useEffect, useState } from "react";
import { Oval } from "react-loader-spinner";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useSearchParams } from "react-router-dom";
import { encryptStr } from "../../../../helpers/encryptDecrypt";
import useIdentitasHooks from "../../../../hooks/useIdentitasHooks";
import { areacodeConst } from "../../../../static/areacodeConst";
import { editIDVerifyUUID, updateEditProfile } from "../../../../store/actions/fetchData/superAdminState";
import { Button, SmallLoading, Toggle } from "../../../atoms";
import { TextboxDropdown, TextboxLabel } from "../../../molecules";
import _ from "lodash-contrib";

const Identitas = () => {
  const { inputs, setInputs, edit, handleEditChange,handleEditPassword, handleEmail, handlePass, handlePassConfirm, handleMobileNo, handleAltInput } = useIdentitasHooks();
  const state = useSelector((state) => state.stateReducer);
  const loginState = useSelector((state) => state.loginReducer);
  const saState = useSelector((state) => state.superAdminReducer);
  const morgateCookie = cookie.get("morgateCookie");
  const { id } = useParams();
  const [queryParam] = useSearchParams();
  const dispatch = useDispatch();
  const [disableBtn, setDisableBtn] = useState(true);
  let bodyReq;
  let emailParam = queryParam.get("email");
  //  console.log("[DEBUG] payload : ", inputs);
  //  console.log("Edit : ", edit);

  const inputsArr = [
    inputs?.email?.isValid,
    inputs?.mobileNo?.isValid,
    inputs?.password?.isValid,
    inputs?.confirmPassword?.isValid
  ];

  useEffect(() => {
    // if (morgateCookie) {
    //   dispatch(editIDVerifyUUID({
    //     body: {
    //       email: _.isJSON(cookie.get("morgateCookie")) ? JSON?.parse?.(cookie.get("morgateCookie"))?.email : "",
    //       ticketId: encryptStr(id)
    //     }
    //   }));
    // } else {
    //   window.location.href = "/";
    // }

    if (emailParam !== "") {
      dispatch(editIDVerifyUUID({
        body: {
          email: emailParam,
          ticketId: encryptStr(id)
        }
      }));
    } else {
      window.location.href = "/";
    }
  }, []);


  bodyReq = {
    email: _.isJSON(cookie.get("morgateCookie")) ? JSON?.parse?.(cookie.get("morgateCookie"))?.email : emailParam, 
    ticketId: encryptStr(id),
    newEmail: encryptStr(inputs?.email?.value),
    newMobileNo: encryptStr(inputs?.mobileNoArea?.value?.value + "|" + inputs?.mobileNo?.value?.replace(/^((62)|(0))/g, "")),
    newPassword: encryptStr(inputs?.password?.value),
    confirmPassword: encryptStr(inputs?.password?.value)
  }

  useEffect(() => {
    if ((Object.values(edit)).filter(Boolean).length === 0) {
      setDisableBtn(true);
    } else if ((Object.values(edit)).filter(Boolean).length === 1 && inputsArr.filter(Boolean).length < 1) {
      setDisableBtn(true);
    } else if ((Object.values(edit)).filter(Boolean).length === 2 && inputsArr.filter(Boolean).length < 2) {
      setDisableBtn(true);
    } else if ((Object.values(edit)).filter(Boolean).length === 3 && inputsArr.filter(Boolean).length < 3) {
      setDisableBtn(true);
    } else if ((Object.values(edit)).filter(Boolean).length === 4 && inputsArr.filter(Boolean).length < 4) {
      setDisableBtn(true);
    } else {
      setDisableBtn(false);
    }
  }, [inputsArr, edit]);

  useEffect(() => {
    window.onbeforeunload = function () {
      window.location.href = "/"
    };
  }, []);

  return (
    <div>
      {loginState.loadingActivation ? (
        <div className="forgot-pass__form__bodyForm__formBase">
          <div className="forgot-pass__form__bodyForm__doneChangePass__wrapper">
            <Oval
              wrapperclassName="loader__oval"
              ariaLabel="loading-indicator"
              height={100}
              width={100}
              strokeWidth={5}
              color="#00529C"
              secondaryColor="#bbd7f0"
            />
          </div>
        </div>
      ) : saState.fail ? (
        <div className="forgot-pass__form__bodyForm__formBase">
          <div className="forgot-pass__form__bodyForm__doneChangePass__wrapper">
            <div className="forgot-pass__form__bodyForm__doneChangePass__circle">
              <img src="https://storage.googleapis.com/artifacts.concrete-plasma-244309.appspot.com/homespot/popupFailed/icon-park_error.png" alt="icon-park_failed" />
            </div>
            <div className="forgot-pass__form__bodyForm__doneChangePass__textWrap">
              <p className="forgot-pass__form__bodyForm__doneChangePass__title">{saState.titleFail}</p>
              <p className="forgot-pass__form__bodyForm__doneChangePass__desc">{saState.msgFail}</p>
            </div>
            <div className="w-[70%]">
              <Button buttonColor="blue" textColor="white" fullWidth={true} paddingSize={"padding-1"} onClick={() => window.location.href = "/"}>
                Kembali ke halaman utama
              </Button>
            </div>
          </div>
        </div>
      ) : saState.success ? (
        <div className="forgot-pass__form__bodyForm__formBase">
          <div className="forgot-pass__form__bodyForm__doneChangePass__wrapper">
            <div className="forgot-pass__form__bodyForm__doneChangePass__circle">
              <img src="https://storage.googleapis.com/artifacts.concrete-plasma-244309.appspot.com/homespot/popupSuccess/icon-park_success.svg" alt="icon-park_success" />
            </div>
            <div className="forgot-pass__form__bodyForm__doneChangePass__textWrap">
              <p className="forgot-pass__form__bodyForm__doneChangePass__title">{saState.titleSuccess}</p>
              <p className="forgot-pass__form__bodyForm__doneChangePass__desc">{saState.msgSuccess}</p>
            </div>
            <div className="w-[70%]">
              <Button buttonColor="blue" textColor="white" fullWidth={true} paddingSize={"padding-1"} onClick={() => window.location.href = "/"}>
                Kembali ke halaman utama
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div className="forgot-pass__form__bodyForm__formBase">
          <div className="mb-6 grid grid-cols-5 gap-4">
            <div className="col-span-4">
              <TextboxLabel
                className="w-12"
                disabled={!edit.email}
                topLabel="Email"
                placeholder="Email"
                name="email"
                value={inputs?.email?.value}
                onChange={handleEmail}
                warnText={inputs?.email?.msgError}
              />
            </div>
            <div className="col-span-1">
              <Toggle title={"email"} checked={edit.email} action={(e) => {
                handleEditChange("email", e.target.checked);
                setInputs({
                  ...inputs,
                  email: { isValid: false, value: "", msgError: "" }
                });
              }} />
            </div>
          </div>
          <div className="mb-6 grid grid-cols-5 gap-4">
            <div className="col-span-4">
              <TextboxDropdown
                label="No Handphone"
                value={inputs?.mobileNoArea?.value}
                valueInput={inputs?.mobileNo?.value}
                name="mobileNo"
                onValueChange={handleMobileNo}
                onChange={(value) => {
                  handleAltInput(value, "mobileNoArea");
                }}
                data={areacodeConst}
                maxLength={13}
                invalid={!inputs?.mobileNo?.isValid && inputs?.mobileNo?.value}
                invalidTxt={inputs?.mobileNo?.msgError}
                disabled={!edit.mobileNo}
                showOptions={true}
              />
            </div>
            <div className="col-span-1">
              <Toggle title={"handphone"} checked={edit.mobileNo} action={(e) => {
                handleEditChange("mobileNo", e.target.checked);
                setInputs({
                  ...inputs,
                  mobileNo: { isValid: false, value: "", msgError: "" }
                });
              }} />
            </div>
          </div>
          <div className="mb-6 grid grid-cols-5 gap-4 auto-cols-max">
            <div className="col-span-4">
              <TextboxLabel
                disabled={!edit.password}
                topLabel="Kata Sandi"
                placeholder="Kata Sandi"
                name="password"
                typeInput="password"
                isPassword={true}
                value={inputs?.password?.value}
                onChange={handlePass}
                warnText={inputs?.password?.msgError}
              />
            </div>
            <div className="col-span-1">
              <Toggle title={"password"} checked={edit.password} action={(e) => {
                handleEditPassword(e.target.checked);
                setInputs({
                  ...inputs,
                  password: { isValid: false, value: "", msgError: "" },
                  confirmPassword : { isValid: false, value: "", msgError: "" }
                });
              }} />
            </div>
          </div>

          <div className="mb-6 grid grid-cols-5 gap-4 auto-cols-max">
            <div className="col-span-4">
              <TextboxLabel
                disabled={!edit.confirmPassword}
                topLabel="Konfirmasi Kata Sandi"
                placeholder="Konfirmasi Ubah Kata Sandi"
                typeInput="password"
                isPassword={true}
                value={inputs?.confirmPassword?.value}
                name="confirmPassword"
                onChange={handlePassConfirm}
                warnText={inputs?.confirmPassword?.msgError}
              />
            </div>
          </div>

          <Button
            buttonColor="blue"
            textColor="white"
            fullWidth={true}
            paddingSize={"padding-1"}
            onClick={() => dispatch(updateEditProfile({ body: bodyReq, toggle: edit }))}
            disabled={disableBtn}
          >
            {state.loading ? <SmallLoading /> : "Simpan"}
          </Button>
        </div>
      )}
    </div>
  );
};

export default Identitas;
