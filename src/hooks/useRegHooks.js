import { useState } from "react";
import { emailRegex, nameRegex, passwordRegex, phoneNoRegisterRegex } from "../helpers/regex";

const useRegHooks = () => {
  const [inputs, setInputs] = useState({
    email: {
      isValid: false,
      value: "",
    },
    mobileNo: {
      isValid: false,
      value: "",
    },
    fullName: {
      isValid: false,
      value: "",
    },
    password: {
      isValid: false,
      value: "",
    },
    confirmPassword: {
      isValid: false,
      value: "",
    },
    agreeTnC: false,
  });

  const handleName = event => {
    event.persist();
    if (!nameRegex.test(event.target.value)) {
      setInputs({
        ...inputs,
        [event.target.name]: { isValid: false, value: event.target.value, msgError: "Nama Lengkap yang dimasukkan belum benar" },
      });
    } else {
      setInputs({
        ...inputs,
        [event.target.name]: { isValid: true, value: event.target.value, msgError: "" },
      });
    }
  };

  const handleInputChange = (event) => {
    event.persist();
    if (
      event.target.name === "password" ||
      event.target.name === "confirmPassword"
    ) {
      if (!passwordRegex.test(event.target.value)) {
        setInputs((inputs) => ({
          ...inputs,
          [event.target.name]: {
            isValid: event.target.value,
            value: event.target.value,
          },
        }));
      } else {
        setInputs((inputs) => ({
          ...inputs,
          [event.target.name]: {
            isValid: false,
          },
        }));
      }
    }

    setInputs((inputs) => ({
      ...inputs,
      [event.target.name]: {
        ...inputs[event.target.name],
        value: event.target.value,
      },
    }));
  };

  const initiateState = (payload) => {
    for (const [key, value] of Object.entries(payload)) {
      setInputs((inputs) => ({ ...inputs, [key]: value }));
    }
  };

  const handleAltInput = (value, name) => {
    setInputs({
      ...inputs,
      [name]: { isValid: !!value, value: value },
    });
  };

  const handleAgreeTnC = (event) => {
    event.persist();
    setInputs({
      ...inputs,
      [event.target.name]: {
        isValid: !!event.target.checked,
        value: event.target.checked,
      },
    });
  };

  const handleEmail = (event) => {
    event.persist();
    setInputs((inputs) => ({
      ...inputs,
      [event.target.name]: event.target.value,
    }));
    if (!emailRegex.test(event.target.value)) {
      setInputs({
        ...inputs,
        [event.target.name]: {
          isValid: false,
          value: event.target.value,
          msgError: "Email yang dimasukkan belum sesuai",
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

  const handlePass = (event) => {
    event.persist();
    setInputs((inputs) => ({
      ...inputs,
      [event.target.name]: event.target.value,
    }));
    if (!passwordRegex.test(event.target.value)) {
      setInputs({
        ...inputs,
        [event.target.name]: {
          isValid: false,
          value: event.target.value,
          msgError:
            "Password minimal berjumlah 8 karakter, harus memiliki huruf besar, huruf kecil, angka dan simbol spesial",
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

  const handlePassConfirm = (event) => {
    event.persist();
    if (inputs.password.value !== event.target.value) {
      setInputs({
        ...inputs,
        [event.target.name]: {
          isValid: false,
          value: event.target.value,
          msgError: "Password tidak cocok",
        },
      });
    } else if (!passwordRegex.test(event.target.value)) {
      setInputs({
        ...inputs,
        [event.target.name]: {
          isValid: false,
          value: event.target.value,
          msgError:
            "Password minimal berjumlah 8 karakter, harus memiliki huruf besar, huruf kecil, angka dan simbol spesial",
        },
      });
    } else {
      setInputs({
        ...inputs,
        [event.target.name]: { isValid: true, value: event.target.value },
      });
    }
  };

  const handleMobileNo = (event) => {
    event.persist();
    if (!phoneNoRegisterRegex.test(event.target.value)) {
      setInputs({
        ...inputs,
        [event.target.name]: {
          isValid: false,
          value: event.target.value.replace(/[^0-9]/gi, ""),
          msgError: "No Handphone yang dimasukkan belum benar",
        },
      });
    } else {
      setInputs({
        ...inputs,
        [event.target.name]: {
          isValid: true,
          value: event.target.value.replace(/[^0-9]/gi, ""),
          msgError: "",
        },
      });
    }
  };

  return {
    inputs,
    setInputs,
    handleInputChange,
    handleName,
    handleAltInput,
    handleAgreeTnC,
    initiateState,
    handleEmail,
    handlePass,
    handlePassConfirm,
    handleMobileNo,
  };
};

export default useRegHooks;
