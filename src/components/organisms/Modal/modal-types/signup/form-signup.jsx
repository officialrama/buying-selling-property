/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import useRegHooks from "../../../../../hooks/useRegHooks";
import { areacodeConst } from "../../../../../static/areacodeConst";
import { showModalLogin, showModalRegister } from "../../../../../store/actions/changeState";
import { userReg } from "../../../../../store/actions/fetchData/userState";
import { Button, SmallLoading } from "../../../../atoms";
import { Checkbox, Textbox, TextboxDropdown, TextboxLabel } from "../../../../molecules";
import { checkEmailRegister } from "../../../../../store/actions/fetchData/uploadFile";
import { emailRegex } from "../../../../../helpers/regex";

const FormSignup = () => {
  const showModalRegisterState = useSelector((state) => state.stateReducer);
  const dispatch = useDispatch();
  const { inputs, setInputs, initiateState, handleName, handleAltInput, handleAgreeTnC, handlePass, handlePassConfirm, handleMobileNo } = useRegHooks();
  const inputsArr = [
    inputs?.fullName?.isValid,
    inputs?.email?.isValid,
    inputs?.mobileNo?.isValid,
    inputs?.password?.isValid,
    inputs?.confirmPassword?.isValid,
    inputs?.agreeTnC?.isValid,
  ];
  useEffect(() => {
    initiateState({
      mobileNoArea: {
        value: areacodeConst.filter((e) => e.value === "+62")[0]
      }
    })
  }, [])

  const [itemChekEmail, setItemChekEmail] = useState();


  useEffect(() => {
    dispatch(
      checkEmailRegister(inputs, setItemChekEmail)
    )
  }, [inputs?.email?.value]);
  

  const handleEmailRegist = (event) => {
    if (!emailRegex.test(event.target.value)) {
      setInputs({
        ...inputs,
        [event.target.name]: {
          isValid: false,
          value: event.target.value,
          msgError: "Email salah atau tidak sesuai. Cek dan coba lagi, ya!",
        },
      });
    } else if (itemChekEmail?.data?.responseCode !== "00") {
      setInputs({
        ...inputs,
        [event.target.name]: {
          isValid: false,
          value: event.target.value,
          msgError: "Email sudah terdaftar",
        },
      });
    } else {
      setInputs({
        ...inputs,
        [event.target.name]: {
          isValid: true,
          value: event.target.value,
          msgError: "",
        },
      });
    }
  };
  
  const inputPassArr = {
    length: inputs?.password?.value.length >= 8 ? true : false,
    mixedCase: /(?=.*[a-z])(?=.*[A-Z])/.test(inputs?.password?.value),
    specialCharacter: /^(?=.*[^a-zA-Z0-9])/.test(inputs?.password?.value)
}

  const containerRef = useRef(null);

  const scrollToBottom = () => {
    if (containerRef.current) {
      containerRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
  };

  return (
    <div ref={containerRef}>
      <div className="flex items-center justify-center -mt-2">
      <p className="text-[#292929] text-2xl font-bold">Daftar Akun Homespot</p>
      </div>
      <div className="signup-login__form-wrap" >
        <div className="flex flex-col gap-2 mb-3">
        <p className="text-xs font-semibold text-[#292929] flex flex-row">Nama Lengkap<p className="text-[#E84040]">*</p></p> 
          <TextboxLabel
            placeholder="Masukkan Nama Lengkap"
            typeInput="text"
            name="fullName"
            value={inputs?.fullName?.value}
            onChange={handleName}
            invalid={!inputs?.fullName?.isValid && inputs?.fullName?.value}
            warnText={inputs?.fullName?.msgError}
          />
        </div>
        <div className="flex flex-col gap-2 mb-3">
        <p className="text-xs font-semibold text-[#292929] flex flex-row">Email<p className="text-[#E84040]">*</p></p> 
          <TextboxLabel
            placeholder="Masukkan Email"
            typeInput="text"  
            name="email"
            value={inputs?.email?.value}
            onChange={(e) => handleEmailRegist(e)}
            invalid={!inputs?.email?.isValid && inputs?.email?.value}
            warnText={inputs?.email?.msgError}
          />
        </div>
        <div className="flex flex-col gap-2 mb-3">
        <p className="text-xs font-semibold text-[#292929] flex flex-row">Nomor HP<p className="text-[#E84040]">*</p></p> 
          <TextboxDropdown
            value={inputs?.mobileNoArea?.value}
            valueInput={inputs?.mobileNo?.value}
            name="mobileNo"
            placeholder='Masukkan Nomor HP'
            onValueChange={handleMobileNo}
            onChange={(value) => {
              handleAltInput(value, "mobileNoArea");
            }}
            data={areacodeConst}
            maxLength={13}
            invalid={!inputs?.mobileNo?.isValid && inputs?.mobileNo?.value}
            invalidTxt={inputs?.mobileNo?.msgError}
          />
        </div>
        <div className="flex flex-col gap-2 mb-3">
        <p className="text-xs font-semibold text-[#292929] flex flex-row">Password<p className="text-[#E84040]">*</p></p> 
          <TextboxLabel
            placeholder="Masukkan Password"
            typeInput="password"
            isPasswordV2={true}
            name="password"
            value={inputs?.password?.value}
            onChange={handlePass}
            onBlur={scrollToBottom}
            invalid={!inputs?.password?.isValid && inputs?.password?.value}
          />
        </div>
        <div className="text-gray-600 mb-3">
         <span className={`${inputs?.password?.value && !inputs?.password?.isValid ? 'text-[#E84040]' : 'text-[#777777]'} font-medium text-[12px]`}>Password harus berisi:</span>
          <div className="flex flex-col gap-1">
          <div className="flex flex-row gap-1">
            <img src={`${inputPassArr.length === true ? '/icons/small-icons/Check_Circle_Password_active.svg' : "/icons/small-icons/Check_Circle_Password.svg"}`} alt="icon" />
         <span className="font-medium text-[12px] text-[#777777]">8 Karakter</span>
          </div>
          <div className="flex flex-row gap-1">
            <img src={`${inputPassArr.mixedCase === true ? '/icons/small-icons/Check_Circle_Password_active.svg' : "/icons/small-icons/Check_Circle_Password.svg"}`} alt="icon" />
         <span className="font-medium text-[12px] text-[#777777]">1 huruf kapital dan angka</span>
          </div>
        <div className="flex flex-row gap-1">
            <img src={`${inputPassArr.specialCharacter === true ? '/icons/small-icons/Check_Circle_Password_active.svg' : "/icons/small-icons/Check_Circle_Password.svg"}`} alt="icon" />
         <span className="font-medium text-[12px] text-[#777777]">1 simbol spesial (contoh: !@#$%^&*-_)</span>
          </div>
            </div>
                </div>
        <div className="flex flex-col gap-2 mb-3">
        <p className="text-xs font-semibold text-[#292929] flex flex-row">Konfirmasi Password<p className="text-[#E84040]">*</p></p> 
          <TextboxLabel
            placeholder="Konfirmasi Password"
            typeInput="password"
            isPasswordV2={true}
            name="confirmPassword"
            value={inputs?.confirmPassword?.value}
            onChange={handlePassConfirm}
            invalid={
              !inputs?.confirmPassword?.isValid &&
              inputs?.confirmPassword?.value
            }
            warnText={inputs?.confirmPassword?.msgError}
          />
        </div>
        <Checkbox
          label={ <label className="text-xs">Dengan ini saya menyetujui <a href="/terms-and-conditions" style={{color: "blue"}}>Syarat dan Ketentuan</a> yang berlaku sesuai <a href='/privacy-policy' style={{color: "blue"}}>Kebijakan Privasi</a> Homespot serta memberikan otorisasi kepada kami untuk meneruskan data kepada partner bank.</label>}
          name="agreeTnC"
          checked={inputs?.agreeTnC?.value}
          onChange={handleAgreeTnC}
        />
      </div>
      <div>
        <div className="w-full mb-6">
          <button
            className="font-semibold mt-4 h-14 p-4 text-[#ffff] bg-[#1078CA] w-full rounded-lg disabled:bg-[#EAEBEB] disabled:text-[#B5B6B6]"
            disabled={inputsArr.filter(Boolean).length !== 6 && Object.values(inputPassArr).filter(Boolean).length !== 3}
            onClick={() => dispatch(userReg(inputs))}
          >
            {showModalRegisterState.loading ? (
              <SmallLoading />
            ) : (
              "Daftar Sekarang"
            )}
          </button>
        </div>
        <div className="flex place-content-center">
          <p className="font-medium text-[#101C3C] text-[14px] mr-2">
            Sudah punya akun? <br />
          </p>
          <button
            onClick={
              showModalRegisterState.loading
                ? () => {}
                : () => {
                    dispatch(
                      showModalRegister(
                        !showModalRegisterState.showModalRegister
                      )
                    );
                    dispatch(
                      showModalLogin(!showModalRegisterState.showModalLogin)
                    );
                  }
            }
          >
            <p
              className={`font-medium ${
                showModalRegisterState.loading
                  ? "text-[#667085]"
                  : "text-[#1078CA]"
              } text-[14px]`}
            >
              Masuk
            </p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default FormSignup;
