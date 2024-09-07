import { useState } from "react";

const useInputGmkHooks = () => {
  const [inputsGmk, setInputsGmk] = useState({});

  const handleInput = (event) => {
    event.persist();
    setInputsGmk({
      ...inputsGmk,
      [event.target.name]: {
        isValid: !!event.target.value,
        value: event.target.value,
      },
    });
  };
  
  const handleRadioDropChange = (name, value) => {
    setInputsGmk(inputsGmk => ({ ...inputsGmk, [name]: value }));
  };

  const handleAltInput = (value, name) => {
    setInputsGmk({
      ...inputsGmk,
      [name]: {
        isValid: !!value,
        value: value,
      },
    });
  };

  const handleNumberInput = (event) => {
    const value = event.target.value.replace(/[^0-9]/i, "")
    event.persist();
    const msgNotValidByName = (name) => {
      switch (name) {
        case "tenorFixedRate":
          return "Tenor Suku Bunga tidak valid";
        default:
          return "";
      }
    }
    if (value.length < 1 || value === "0" || value === "00") {
      setInputsGmk({
        ...inputsGmk,
        [event.target.name]: {
          isValid: false,
          value: value,
          msgError: msgNotValidByName(event.target.name)
        },
      });
    } else {
      setInputsGmk({
        ...inputsGmk,
        [event.target.name]: {
          isValid: true,
          value: value,
          msgError: ""
        },
      });
    }
  };

  const handleInputNoZero = (value, name) => {
    const regex = /^\d*/i;
    const noZeroVal = value.replace(/^0/i, "");
    const msgNotValidByName = (name) => {
      switch (name) {
        case "biayaAdminNominal":
          return "Biaya Admin Nominal tidak valid";
        case "biayaProvisiNominal":
          return "Biaya Provisi Nominal tidak valid";
        default:
          return "";
      }
    }
    if(name === "biayaProvisiNominal"){
      if (!regex.test(value)) {
        setInputsGmk({
          ...inputsGmk,
          [name]: { isValid: !!regex, value: value, msgError: msgNotValidByName(name) },
        });
      } else if (value.length < 1) {
        setInputsGmk({
          ...inputsGmk,
          [name]: { isValid: !!regex, value: value, msgError: msgNotValidByName(name) },
        });
      } else {
        setInputsGmk({
          ...inputsGmk,
          [name]: { isValid: !!regex, value: value, msgError: "" },
        });
      }
    }else{
      if (!regex.test(value)) {
        setInputsGmk({
          ...inputsGmk,
          [name]: { isValid: !!noZeroVal, value: noZeroVal, msgError: msgNotValidByName(name) },
        });
      } else if (value.length < 1) {
        setInputsGmk({
          ...inputsGmk,
          [name]: { isValid: !!noZeroVal, value: noZeroVal, msgError: msgNotValidByName(name) },
        });
      } else {
        setInputsGmk({
          ...inputsGmk,
          [name]: { isValid: !!noZeroVal, value: noZeroVal, msgError: "" },
        });
      }
    }

  };

  const handleInputNoNumberAndSpec = (value, name) => {
    const regex = /[a-zA-Z][\w\s-]+/;
    const noZeroVal = value.replace(/^[^a-zA-Z]/g, "");
    const msgNotValidByName = (name) => {
      switch (name) {
        case "name":
          return "Nama tidak valid";
        case "name":
          return "Nama tidak valid";
        default:
          return "";
      }
    }
    if (!regex.test(value)) {
      setInputsGmk({
        ...inputsGmk,
        [name]: { isValid: !!noZeroVal, value: noZeroVal, msgError: msgNotValidByName(name) },
      });
    } else if (value.length < 1) {
      setInputsGmk({
        ...inputsGmk,
        [name]: { isValid: !!noZeroVal, value: noZeroVal, msgError: msgNotValidByName(name) },
      });
    } else {
      setInputsGmk({
        ...inputsGmk,
        [name]: { isValid: !!noZeroVal, value: noZeroVal, msgError: "" },
      });
    }

  };

  const handleAdmPercentInput = (event) => {
    event.persist();
    const regex = /^[0-9]\d*(\.\d+)?$/i;
    const msgNotValidByName = (name) => {
      switch (name) {
        case "biayaAdminPercentage":
          return "Biaya Admin Persentase tidak valid";
        case "biayaProvisiPercentage":
          return "Biaya Provisi Persentase tidak valid";
        case "fixedRate":
          return "Suku Bunga tidak valid";
        case "floatingRate":
          return "Floating Rate tidak valid";
        case "tenorFixedRate":
          return "Tenor Suku Bunga tidak valid";
        default:
          return "";
      }
    }
    if (!regex.test(event.target.value)) {
      setInputsGmk({
        ...inputsGmk,
        [event.target.name]: {
          isValid: false,
          value: event.target.value,
          msgError: msgNotValidByName(event.target.name)
        }
      })
    } else if (event.target.value.length < 1) {
      setInputsGmk({
        ...inputsGmk,
        [event.target.name]: {
          isValid: false,
          value: event.target.value,
          msgError: msgNotValidByName(event.target.name)
        }
      })
    } else {
      setInputsGmk({
        ...inputsGmk,
        [event.target.name]: {
          isValid: true,
          value: event.target.value,
          msgError: ""
        }
      })
    }
  };

  const handleStrSpecChar = (value, name) => {
    const regex =/^[^\s].*[^\s]$/g;
    if (!regex.test(value)) {
      setInputsGmk({
        ...inputsGmk,
        [name]: { isValid: false, value: value, msgError: "Nama tidak valid" },
      });
    } else {
      setInputsGmk({
        ...inputsGmk, [name]: { isValid: true, value: value },
      });
    }
  };

  return {
    inputsGmk,
    setInputsGmk,
    handleInput,
    handleAltInput,
    handleNumberInput,
    handleInputNoZero,
    handleAdmPercentInput,
    handleStrSpecChar,
    handleInputNoNumberAndSpec,
    handleRadioDropChange
  };
};

export default useInputGmkHooks;
