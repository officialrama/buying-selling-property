/* eslint-disable no-useless-escape */
import moment from "moment";
import { useState } from "react";
import { invalidAlpaNumRegex, invalidNumRegex, notNamePeopleRegex } from "../helpers/regex";

const useInputHooks = () => {
  const [inputs, setInputs] = useState({});
  const [warning, setWarning] = useState({});
  const [warningMsg, setWarningMsg] = useState({});
  const handleInputChange = (event) => {
    event.persist();
    setInputs((inputs) => ({ ...inputs, [event.target.name]: event.target.value, }));
  };
  const initiateState = (payload) => {
    for (const [key, value] of Object.entries(payload)) {
      setInputs((inputs) => ({ ...inputs, [key]: value }));
    }
  };
  const handleDateInputChange = (date, name) => {
    setInputs((inputs) => ({ ...inputs, [name]: date }));
    setInputs((inputs) => ({ ...inputs, [name + "_value"]: parseInt(moment(date).format("yyyy")) }));
  };
  const handleLetterNumberInput = event => {
    event.persist();
    setInputs(inputs => ({ ...inputs, [event.target.name]: event.target.value.replace(invalidAlpaNumRegex, '') }));
  };
  const handleAllCharInput = event => {
    event.persist();
    setInputs(inputs => ({ ...inputs, [event.target.name]: event.target.value }));
  };
  const handleNumberInput = event => {
    event.persist();
    setInputs(inputs => ({ ...inputs, [event.target.name]: event.target.value.replace(/[^0-9]/gi, '') }));
  };
  const handleNumberDecInput = event => {
    event.persist();
    setInputs(inputs => ({ ...inputs, [event.target.name]: event.target.value.replace(/[^\d+\.?\d]*/g, '') }));
  };
  const handlePromoCodeInput = event => {
    event.persist();
    setInputs(inputs => ({ ...inputs, [event.target.name]: event.target.value.replace(/[^A-Z\s 0-9]/g, '') }));
  };
  const handleLetterInput = event => {
    event.persist();
    setInputs(inputs => ({ ...inputs, [event.target.name]: event.target.value.replace(/[^a-zA-Z ]/i, '') }));
  };
  const handleNameInput = event => {
    event.persist();
    setInputs(inputs => ({ ...inputs, [event.target.name]: event.target.value.replace(notNamePeopleRegex, '') }));
  };
  const handleRadioDropChange = (name, value) => {
    setInputs(inputs => ({ ...inputs, [name]: value }));
  };
  const handleCheckboxChange = event => {
    event.persist();
    setInputs(inputs => ({ ...inputs, [event.target.name]: event.target.checked }));
  };
  const handleCurrency = (value, name) => {
    setInputs(inputs => ({ ...inputs, [name]: value.replace(invalidNumRegex, "") }));
  };
  const handlePhoneNum = event => {
    event.persist();
    setInputs(inputs => ({ ...inputs, [event.target.name]: event.target.value.replace(/[^0-9]/i, '') }));
    const phoneNoRegex = /(^08\d{8,11}$)/i;
    if (!phoneNoRegex.test(event.target.value)) {
      setWarning({ ...warning, invalidMobileNo: true });
      setWarningMsg({ ...warningMsg, invalidMobileNo: "No. HP belum sesuai" });
    } else {
      setWarning({ ...warning, invalidMobileNo: false });
      setWarningMsg({ ...warningMsg, invalidMobileNo: "" });
    }
  };
  const handleEmail = event => {
    event.persist();
    setInputs(inputs => ({ ...inputs, [event.target.name]: event.target.value }));
    const emailRegex = /^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/;
    if (!emailRegex.test(event.target.value)) {
      setWarning({ ...warning, invalidEmail: true });
      setWarningMsg({ ...warningMsg, invalidEmail: "Email Belum Benar" });
    } else {
      setWarning({ ...warning, invalidEmail: false });
      setWarningMsg({ ...warningMsg, invalidEmail: "" });
    }
  };
  const handleAltInput = (value, name) => {
    setInputs({ ...inputs, [name]: value });
  };

  return {
    inputs,
    setInputs,
    handleInputChange,
    initiateState,
    handleDateInputChange,
    handleLetterNumberInput,
    handleAllCharInput,
    handleNumberInput,
    handleNumberDecInput,
    handlePromoCodeInput,
    handleLetterInput,
    handleNameInput,
    handleRadioDropChange,
    handleCheckboxChange,
    handleCurrency,
    warning,
    warningMsg,
    handlePhoneNum,
    handleEmail,
    handleAltInput
  };
};

export default useInputHooks;
