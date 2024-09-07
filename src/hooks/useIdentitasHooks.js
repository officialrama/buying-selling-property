/* eslint-disable no-useless-escape */
import { useRef, useState } from "react";
import { alphaRegex, emailRegex, invalidStrRegex, nameRegex, passwordRegex, phoneNoRegisterRegex } from "../helpers/regex";
import { areacodeConst } from "../static/areacodeConst"; 

const useIdentitasHooks = () => {
  const [edit, setEdit] = useState({
    email: false,
    mobileNo: false,
    password: false,
    confirmPassword: false,
  });

  const initiateState = {
    email: { value: "", isValid: false },
    mobileNo: {
      value: "",
      isValid: false,
    },
    password: {
      value: "",
      isValid: false,
    },
    confirmPassword: {
      value: "",
      isValid: false,
    },
    mobileNoArea: {
      value: areacodeConst.filter((e) => e.value === "+62")[0]
    }
  };


  const [inputs, setInputs] = useState(initiateState);
  // const initiateState = (payload) => {
  //   for (const [key, value] of Object.entries(payload)) {
  //     setInputs((inputs) => ({ ...inputs, [key]: value }));
  //   }
  // };

  const handleEditChange = (name, value) => {
    setEdit({ ...edit, [name]: value });
  };

  const handleEditPassword = (value) => {
    setEdit({ ...edit, password: value, confirmPassword: value });
  };

  const handleInput = (event) => {
    event.persist();
    setInputs({
      ...inputs,
      [event.target.name]: {
        isValid: !!event.target.value,
        value: event.target.value,
      },
    });
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
        [event.target.name]: { isValid: true, value: event.target.value, msgError: "" },
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

  const handlePassConfirm = event => {
    event.persist();
    if (inputs.password.value !== (event.target.value)) {
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

  const handleMobileNo = (event) => {
    event.persist();
    if (!phoneNoRegisterRegex.test(event.target.value)) {
      setInputs({
        ...inputs,
        [event.target.name]: {
          isValid: false,
          value: event.target.value.replace(/[^0-9]/i, ""),
          msgError: "No Handphone yang dimasukkan belum benar",
        },
      });
    } else {
      setInputs({
        ...inputs,
        [event.target.name]: {
          isValid: true,
          value: event.target.value.replace(/[^0-9]/i, ""),
          msgError: "",
        },
      });
    }
  };

  const handleAltInput = (value, name) => {
    const msgErrorbyName = (name) => {
      switch (name) {
        case "startRangePrice":
          return "Harga Mulai Properti Kosong";
        case "endRangePrice":
          return "Harga Akhir Properti Kosong";
        default:
          return "";
      }
    }
    const msgErrorMinLength = (name) => {
      switch (name) {
        case "startRangePrice":
          return "Harga Mulai Properti kurang dari 7 digit";
        case "endRangePrice":
          return "Harga Akhir Properti kurang dari 7 digit";
        default:
          return "";
      }
    }
    if (name === "startRangePrice" || name === "endRangePrice") {
      if (value.length < 1) {
        setInputs({ ...inputs, [name]: { isValid: false, value: value, msgError: msgErrorbyName(name) } });
      } else if (value.length < 7) {
        setInputs({ ...inputs, [name]: { isValid: false, value: value, msgError: msgErrorMinLength(name) } });
      } else {
        setInputs({ ...inputs, [name]: { isValid: !!value, value: value, msgError: "" } });
      }
    } else {
      setInputs({ ...inputs, [name]: { isValid: !!value, value: value, msgError: "" } });
    }

  };

  return {
    edit,
    inputs,
    setInputs,
    initiateState,
    handleEditChange,
    handleEditPassword,
    handleInput,
    handleEmail,
    handlePass,
    handlePassConfirm,
    handleMobileNo,
    handleAltInput
  };
};

export default useIdentitasHooks;
