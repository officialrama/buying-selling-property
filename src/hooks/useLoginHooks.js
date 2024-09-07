import { useState } from 'react';
import { emailRegex, passwordRegex } from '../helpers/regex';

const useLoginHooks = () => {
  const [inputs, setInputs] = useState({
    email: { isValid: false, value: localStorage?.rememberedEmail ? localStorage?.rememberedEmail : "" },
    password: { isValid: false, value: localStorage?.rememberedPassword ? localStorage?.rememberedPassword : "" },
    rememberMe: { value: localStorage?.rememberedMe ? localStorage?.rememberedMe : false }
  });

  const rememberMe = (email, password) => {
    if (inputs.rememberMe.value) {
      localStorage.setItem("rememberedEmail", email);
      localStorage.setItem("rememberedPassword", inputs?.password?.value);
      localStorage.setItem("rememberedMe", inputs?.rememberMe?.value);
    } else {
      localStorage.removeItem("rememberedEmail");
      localStorage.removeItem("rememberedPassword");
      localStorage.removeItem("rememberedMe");
    }
  };
  const handleEmail = event => {
    event.persist();
    setInputs(inputs => ({ ...inputs, [event.target.name]: event.target.value }));
    if (!emailRegex.test(event.target.value)) {
      setInputs({
        ...inputs,
        [event.target.name]: { isValid: false, value: event.target.value, msgError: "Email yang dimasukkan belum sesuai" },
      });
    } else {
      setInputs({
        ...inputs,
        [event.target.name]: { isValid: true, value: event.target.value },
      });
    }
  };

  const handlePass = event => {
    event.persist();
    setInputs(inputs => ({ ...inputs, [event.target.name]: event.target.value }));
    if (!passwordRegex.test(event.target.value)) {
      setInputs({
        ...inputs,
        [event.target.name]: { isValid: false, value: event.target.value, msgError: "Password minimal berjumlah 8 karakter, harus memiliki huruf besar, huruf kecil, angka dan simbol spesial" },
      });
    } else {
      setInputs({
        ...inputs,
        [event.target.name]: { isValid: true, value: event.target.value, msgError: "" },
      });
    }
  };

  const handleCheckboxChange = event => {
    event.persist();
    setInputs({
      ...inputs,
      [event.target.name]: { value: event.target.checked },
    });
  };

  const handleInputChange = event => {
    event.persist();
    const msgEmptyByName = (name) => {
      switch (name) {
        case "captchaInput":
          return "Captcha tidak boleh kosong";
        default:
          break;
      }
    }
    if (event.target.value.length < 1) {
      setInputs({
        ...inputs,
        [event.target.name]: { isValid: false, value: event.target.value, msgError: msgEmptyByName(event.target.name) },
      });
    } else {
      setInputs({
        ...inputs,
        [event.target.name]: { isValid: !!event.target.value, value: event.target.value, msgError: "" },
      });
    }
  };

  return {
    inputs,
    setInputs,
    handleEmail,
    handlePass,
    handleCheckboxChange,
    handleInputChange,
    rememberMe
  };
};

export default useLoginHooks;