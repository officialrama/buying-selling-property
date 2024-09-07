import { useState } from 'react';
import { emailRegex, otpRegex, passwordRegex } from '../helpers/regex';

const useREPassHooks = () => {
  const [inputs, setInputs] = useState({});
  const [errorMsg, setErrorMsg] = useState('')

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

  const handleOtp = (name, value) => {
    setErrorMsg('')
    if (!otpRegex.test(value.replace(/[^0-9]/i, ''))) {
      setInputs({
        ...inputs,
        [name]: { isValid: false, value: value.replace(/[^0-9]/i, '') },
      });
    } else {
      setInputs({
        ...inputs,
        [name]: { isValid: true, value: value.replace(/[^0-9]/i, '') },
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
    } else if (inputs?.retypeNewPassword?.value !== event.target.value) {
      setInputs({
        ...inputs,
        [event.target.name]: { isValid: true, value: event.target.value, msgError: "" },
        retypeNewPassword: { isValid: false, value: inputs?.retypeNewPassword?.value, msgError: "Password tidak cocok" },
      });
    } else if (inputs?.retypeNewPassword?.value === event.target.value) {
      setInputs({
        ...inputs,
        [event.target.name]: { isValid: true, value: event.target.value, msgError: "" },
        retypeNewPassword: { isValid: true, value: inputs?.retypeNewPassword?.value, msgError: "" },
      });
    } else {
      setInputs({
        ...inputs,
        [event.target.name]: { isValid: true, value: event.target.value, msgError: "" },
      });
    }
  };

  const handlePassConfirm = event => {
    event.persist();
    if (inputs?.newPassword?.value !== (event?.target?.value)) {
      setInputs({
        ...inputs,
        [event.target.name]: { isValid: false, value: event.target.value, msgError: "Password tidak cocok" },
      });
    } else if (!passwordRegex.test(event.target.value)) {
      setInputs({
        ...inputs,
        [event.target.name]: { isValid: false, value: event.target.value, msgError: "Password minimal berjumlah 8 karakter, harus memiliki huruf besar, huruf kecil, angka dan simbol spesial" },
      });
    } else {
      setInputs({
        ...inputs,
        [event.target.name]: { isValid: true, value: event.target.value },
      });
    }
  };

  return {
    inputs,
    setInputs,
    errorMsg,
    setErrorMsg,
    handleEmail,
    handleOtp,
    handlePass,
    handlePassConfirm
  };
};

export default useREPassHooks;