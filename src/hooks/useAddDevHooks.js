/* eslint-disable no-useless-escape */
import moment from "moment";
import { useState } from "react";
import { addressRegex, emailRegex, nameRegex, notNamePeopleRegex, phoneNoRegex, rekeningNoRegex } from "../helpers/regex";

const useAddDevHooks = () => {
  const [inputs, setInputs] = useState({});

  const handleInputChange = (event) => {
    event.persist();
    setInputs((inputs) => ({
      ...inputs,
      [event.target.name]: { isValid: !!event.target.value, value: event.target.value }
    }));
  };

  const initiateState = (payload) => {
    for (const [key, value] of Object.entries(payload)) {
      setInputs((inputs) => ({ ...inputs, [key]: value }));
    }
  };

  const handleTiering = (nameField, value) => {
    setInputs((inputs) => ({
      ...inputs,
      [nameField]: {isValid: !!value?.value, event: value?.value, value:{name : value?.value}, msgError: !!value?.value ? 'Invalid Tiering' : ''},
  }));
  };

  const handleName = event => {
    event.persist();
    const msgErrorbyName = (name) => {
      switch (name) {
        case "name":
          return "Nama Developer tidak valid";
        case "picDeveloper":
          return "PIC Developer tidak valid";
        case "groupName":
            return "Group Project tidak valid";
        default:
          return "";
      }
    }
    if (!nameRegex.test(event.target.value) || event.target.value.length < 1) {
      setInputs(inputs => ({ ...inputs, [event.target.name]: { isValid: false, value: event.target.value.replace(/[^a-zA-Z0-9,. ]/g, ""), msgError: msgErrorbyName(event.target.name) } }));
    } else if ((/[^a-zA-Z0-9,. ]/g).test(event.target.value)) {
      setInputs(inputs => ({ ...inputs, [event.target.name]: { isValid: false, msgError: msgErrorbyName(event.target.name) } }));
    } else {
      setInputs(inputs => ({ ...inputs, [event.target.name]: { isValid: true, value: event.target.value.replace(/[^a-zA-Z0-9,. ]/g, ""), msgError: "" } }));
    }
  };

  const handleAddress = event => {
    event.persist();
    const msgErrorbyName = (name) => {
      switch (name) {
        case "address":
          return "Alamat tidak valid";
        default:
          return "";
      }
    }
    if (!addressRegex.test(event.target.value) || event.target.value.length < 1) {
      setInputs(inputs => ({ ...inputs, [event.target.name]: { isValid: false, value: event.target.value.replace(/[^a-zA-Z0-9,./ ]/g, ""), msgError: msgErrorbyName(event.target.name) } }));
    } else if ((/[^a-zA-Z0-9,./ ]/g).test(event.target.value)) {
      setInputs(inputs => ({ ...inputs, [event.target.name]: { isValid: false, msgError: msgErrorbyName(event.target.name) } }));
    } else {
      setInputs(inputs => ({ ...inputs, [event.target.name]: { isValid: true, value: event.target.value.replace(/[^a-zA-Z0-9,./ ]/g, ""), msgError: "" } }));
    }
  };

  const handleLetterNumberInput = event => {
    event.persist();
    if (event.target.name === "description" && event.target.value.length < 1) {
      setInputs(inputs => ({ ...inputs, [event.target.name]: { isValid: false, value: event.target.value.replace(/[^a-zA-Z0-9 ]/i, ''), msgError: "Deskripsi Tidak Valid" } }));
    } else {
      setInputs(inputs => ({ ...inputs, [event.target.name]: { isValid: true, value: event.target.value.replace(/[^a-zA-Z0-9 ]/i, ''), msgError: "" } }));
    }
  };

  const handleNameInput = event => {
    event.persist();
    setInputs(inputs => ({ ...inputs, [event.target.name]: { isValid: !!event.target.value.replace(notNamePeopleRegex, ''), value: event.target.value.replace(notNamePeopleRegex, '') } }));
  };

  const handleNumberInput = event => {
    event.persist();
    const msgErrorbyName = (name) => {
      switch (name) {
        case "noPKS":
          return "Nomor PKS tidak valid";
        default:
          return "";
      }
    }
    if (event.target.value.length < 1) {
      setInputs(inputs => ({ ...inputs, [event.target.name]: { isValid: false, value: event.target.value.replace(/[^0-9]/gi, ''), msgError: msgErrorbyName(event.target.name) } }));
    } else if ((/[^0-9]/i).test(event.target.value)) {
      setInputs(inputs => ({ ...inputs, [event.target.name]: { isValid: false, value: event.target.value.replace(/[^0-9]/gi, ''), msgError: msgErrorbyName(event.target.name) } }));
    } else {
      setInputs(inputs => ({ ...inputs, [event.target.name]: { isValid: !!event.target.value.replace(/[^0-9]/gi, ''), value: event.target.value.replace(/[^0-9]/i, ''), msgError: "" } }));
    }
  };

  const handleEmail = event => {
    event.persist();
    if (!emailRegex.test(event.target.value)) {
      setInputs(inputs => ({ ...inputs, [event.target.name]: { isValid: false, value: event.target.value, msgError: "Email Belum Benar" } }));
    } else {
      setInputs(inputs => ({ ...inputs, [event.target.name]: { isValid: true, value: event.target.value, msgError: "" } }));
    }
  };

  const handlePhoneNum = event => {
    event.persist();
    if (!phoneNoRegex.test(event.target.value)) {
      setInputs(inputs => ({ ...inputs, [event.target.name]: { isValid: false, value: event.target.value.replace(/[^0-9]/i, ''), msgError: "No. HP belum sesuai" } }));
    } else {
      setInputs(inputs => ({ ...inputs, [event.target.name]: { isValid: true, value: event.target.value.replace(/[^0-9]/i, ''), msgError: "" } }));
    }
  };

const handleNoRekening = event => {
    event.persist();
    if (event.target.value.length < 1) {
      setInputs(inputs => ({ ...inputs, [event.target.name]: { isValid: false, value: event.target.value.replace(/[^0-9]/gi, ''), msgError: "Nomor Rekening Tidak Boleh Kosong" } }));
    } else if((/[^0-9]/i).test(event.target.value)) {
      setInputs(inputs => ({ ...inputs, [event.target.name]: { isValid: false, value: event.target.value.replace(/[^0-9]/gi, ''), msgError: "Nomor Rekening Tidak Valid" } }));
    }else {
      setInputs(inputs => ({ ...inputs, [event.target.name]: { isValid: !!event.target.value.replace(/[^0-9]/gi, ''), value: event.target.value.replace(/[^0-9]/i, ''), msgError: "" } }));
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
    inputs,
    setInputs,
    handleInputChange,
    initiateState,
    handleName,
    handleAddress,
    handleLetterNumberInput,
    handleNumberInput,
    handleNameInput,
    handlePhoneNum,
    handleNoRekening,
    handleEmail,
    handleAltInput,
    handleDateInputChange,
    handleTiering
  };
};

export default useAddDevHooks;
