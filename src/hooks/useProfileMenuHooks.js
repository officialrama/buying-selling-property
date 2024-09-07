/* eslint-disable no-useless-escape */
import { useRef, useState } from "react";
import { alphaRegex, emailRegex, invalidStrRegex, nameRegex, passwordRegex, phoneNoRegisterRegex } from "../helpers/regex";
import moment from "moment";

const useProfileMenuHooks = () => {
  const [edit, setEdit] = useState({
    email: true,
    mobileNo: true,
    password: true,
  });
  const [pks, setPks] = useState({
    file: "",
    name: "",
    selected: false
  });
  const [inputs, setInputs] = useState({});
  const initiateState = (payload) => {
    for (const [key, value] of Object.entries(payload)) {
      setInputs((inputs) => ({ ...inputs, [key]: value }));
    }
  };
  const refSingleUpload = useRef(null);
  const resetSingleUpload = () => {
    refSingleUpload.current.value = null;
  };
  const handleEditChange = (name, value) => {
    setEdit({ ...edit, [name]: value });
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

  const handleAlphanumeric = (event) => {
    if (!event.target.value.length < 3) {
      event.persist();
      setInputs({
        ...inputs,
        [event.target.name]: { isValid: false, value: event.target.value },
      });
    } else {
      event.persist();
      setInputs({
        ...inputs,
        [event.target.name]: { isValid: true, value: event.target.value },
      });
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

  const handleNoRekening = (event) => {
    event.persist();
    if (event.target.value.length < 1) {
      setInputs(inputs => ({ ...inputs, [event.target.name]: { isValid: false, value: event.target.value.replace(/[^0-9]/gi, ''), msgError: "Nomor Rekening Tidak Boleh Kosong" } }));
    } else if((/[^0-9]/i).test(event.target.value)) {
      setInputs(inputs => ({ ...inputs, [event.target.name]: { isValid: false, value: event.target.value.replace(/[^0-9]/gi, ''), msgError: "Nomor Rekening Tidak Valid" } }));
    }else {
      setInputs(inputs => ({ ...inputs, [event.target.name]: { isValid: !!event.target.value.replace(/[^0-9]/gi, ''), value: event.target.value.replace(/[^0-9]/i, ''), msgError: "" } }));
    }
  };

  const handleAlpha = event => {
    event.persist();
    if (!alphaRegex.test(event.target.value) || event.target.value.length < 3) {
      setInputs({
        ...inputs,
        [event.target.name]: { isValid: false, value: event.target.value.replace(/[^a-z\  ]/i, '') },
      });
    } else if (invalidStrRegex.test(event.target.value)) {
      setInputs({
        ...inputs,
        [event.target.name]: { isValid: false, value: "" },
      });
    } else {
      setInputs({
        ...inputs,
        [event.target.name]: { isValid: true, value: event.target.value.replace(/[^a-z\  ]/i, '') },
      });
    }
  };

  const handleDob = (date, name) => {
    // console.log("handleDob : ", date);
    setInputs({
      ...inputs,
      [name]: { isValid: !!date, value: date },
    });
  };

  const handleNumber = event => {
    event.persist();
    if (event.target.name === "noPKS") {
      if (event.target.value < 1) {
        setInputs({
          ...inputs,
          [event.target.name]: { isValid: false, value: event.target.value.replace(/[^0-9]/i, ''), msgError: "Nomor PKS yang dimasukkan belum benar" },
        });
      } else {
        setInputs({
          ...inputs,
          [event.target.name]: { isValid: !!event.target.value.replace(/[^0-9]/i, ''), value: event.target.value.replace(/[^0-9]/i, ''), msgError: "Nomor PKS yang dimasukkan belum benar" },
        });
      }
    } else {
      setInputs({
        ...inputs,
        [event.target.name]: { isValid: !!event.target.value.replace(/[^0-9]/i, ''), value: event.target.value.replace(/[^0-9]/i, ''), msgError: "" },
      });
    }
  };

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

  const handleDateInputChange = (value, name, request) => {
    if(value !== null){
      setInputs(inputs => ({ ...inputs, [name]: { isValid: true, value: new Date(moment(value).format('YYYY/MM/DD')), msgError: "" } }));
      setInputs(inputs => ({ ...inputs, [request]: { isValid: true, value: moment(value).format('DD-MM-yyyy'), msgError: "" } }));
    } else {
      setInputs(inputs => ({ ...inputs, [name]: { isValid: false, value: null, msgError: "" } }));
      setInputs(inputs => ({ ...inputs, [request]: { isValid: false, value: null, msgError: "" } }));
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
    pks,
    setPks,
    refSingleUpload,
    resetSingleUpload,
    inputs,
    setInputs,
    initiateState,
    handleEditChange,
    handleInput,
    handleAlphanumeric,
    handleEmail,
    handlePass,
    handlePassConfirm,
    handleMobileNo,
    handleAlpha,
    handleDob,
    handleNumber,
    handleName,
    handleNoRekening,
    handleAltInput,
    handleDateInputChange
  };
};

export default useProfileMenuHooks;
