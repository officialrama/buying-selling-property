import { useState } from "react"
import { alphaRegex, emailRegex, invalidStrRegex, passwordRegex, nameRegex, notNamePeopleRegex, phoneNoRegisterRegex, phoneNoRegex } from "../helpers/regex";

const useInputRefHooks = () => {
    const [inputsRef, setInputsRef] = useState({});

    const handleAutoComplete = (e) => {
      
      if ( e !== null){
        setInputsRef({
          ...inputsRef,
          nameDev: { isValid: true, value: e.value, msgError: "" },
        });
      } else {
        setInputsRef({
          ...inputsRef,
          nameDev: { isValid: false, value: "", msgError: "" },
        });
      }

    }

    const handleInput = (event) => {
        event.persist();
        setInputsRef({
          ...inputsRef,
          [event.target.name]: {
            isValid: !!event.target.value,
            value: event.target.value,
          },
        });
    };

    const handleName = event => {
      event.persist();
      if (!nameRegex.test(event.target.value)) {
        setInputsRef({
          ...inputsRef,
          [event.target.name]: { isValid: false, value: event.target.value.replace(notNamePeopleRegex, ""), msgError: "Nama Lengkap yang dimasukkan belum benar" },
        });
      } else {
        setInputsRef({
          ...inputsRef,
          [event.target.name]: { isValid: true, value: event.target.value.replace(notNamePeopleRegex, ""), msgError: "" },
        });
      }
    };
    
    const handleAltInput = (value, name) => {
        setInputsRef({
          ...inputsRef,
          [name]: {
            isValid: !!value,
            value: value,
          },
        });
    };

    const handleAlpha = event => {
      event.persist();
      if (!alphaRegex.test(event.target.value) || event.target.value.length < 3) {
        setInputsRef({
          ...inputsRef,
          [event.target.name]: { isValid: false, value: event.target.value.replace(/[^a-z\  ]/i, '') },
        });
      } else if (invalidStrRegex.test(event.target.value)) {
        setInputsRef({
          ...inputsRef,
          [event.target.name]: { isValid: false, value: "" },
        });
      } else {
        setInputsRef({
          ...inputsRef,
          [event.target.name]: { isValid: true, value: event.target.value.replace(/[^a-z\  ]/i, '') },
        });
      }
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
        setInputsRef(inputsRef => ({ ...inputsRef, [event.target.name]: { isValid: false, value: event.target.value.replace(/[^0-9]/gi, ''), msgError: msgErrorbyName(event.target.name) } }));
      } else if ((/[^0-9]/i).test(event.target.value)) {
        setInputsRef(inputsRef => ({ ...inputsRef, [event.target.name]: { isValid: false, value: event.target.value.replace(/[^0-9]/gi, ''), msgError: msgErrorbyName(event.target.name) } }));
      } else {
        setInputsRef(inputsRef => ({ ...inputsRef, [event.target.name]: { isValid: !!event.target.value.replace(/[^0-9]/gi, ''), value: event.target.value.replace(/[^0-9]/i, ''), msgError: "" } }));
      }
    };

    const handleEmail = event => {
      event.persist();
      setInputsRef(inputs => ({ ...inputs, [event.target.name]: event.target.value }));
      if (!emailRegex.test(event.target.value)) {
        setInputsRef({
          ...inputsRef,
          [event.target.name]: { isValid: false, value: event.target.value, msgError: "Email yang dimasukkan belum sesuai" },
        });
      } else {
        setInputsRef({
          ...inputsRef,
          [event.target.name]: { isValid: true, value: event.target.value, msgError: "" },
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
        if (!regex.test(value)) {
          setInputsRef({
            ...inputsRef,
            [name]: { isValid: !!noZeroVal, value: noZeroVal, msgError: msgNotValidByName(name) },
          });
        } else if (value.length < 1) {
          setInputsRef({
            ...inputsRef,
            [name]: { isValid: !!noZeroVal, value: noZeroVal, msgError: msgNotValidByName(name) },
          });
        } else {
          setInputsRef({
            ...inputsRef,
            [name]: { isValid: !!noZeroVal, value: noZeroVal, msgError: "" },
          });
        }
    
    };

    const handleMobileNo = (event) => {
      event.persist();
      if (!phoneNoRegisterRegex.test(event.target.value)) {
        setInputsRef({
          ...inputsRef,
          [event.target.name]: {
            isValid: false,
            value: event.target.value.replace(/[^0-9]/i, ""),
            msgError: "No Handphone yang dimasukkan belum benar",
          },
        });
      } else {
        setInputsRef({
          ...inputsRef,
          [event.target.name]: {
            isValid: true,
            value: event.target.value.replace(/[^0-9]/i, ""),
            msgError: "",
          },
        });
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
          setInputsRef({
            ...inputsRef,
            [name]: { isValid: !!noZeroVal, value: noZeroVal, msgError: msgNotValidByName(name) },
          });
        } else if (value.length < 1) {
          setInputsRef({
            ...inputsRef,
            [name]: { isValid: !!noZeroVal, value: noZeroVal, msgError: msgNotValidByName(name) },
          });
        } else {
          setInputsRef({
            ...inputsRef,
            [name]: { isValid: !!noZeroVal, value: noZeroVal, msgError: "" },
          });
        }
    };

    const handlePhoneNum = (event) => {
      event.persist();
      if (!phoneNoRegex.test(event.target.value)) {
        setInputsRef(inputsRef => ({ ...inputsRef, [event.target.name]: { isValid: false, value: event.target.value.replace(/[^0-9]/i, ''), msgError: "No. HP belum sesuai" } }));
      } else {
        setInputsRef(inputsRef => ({ ...inputsRef, [event.target.name]: { isValid: true, value: event.target.value.replace(/[^0-9]/i, ''), msgError: "" } }));
      }
    };

    return {
        inputsRef,
        setInputsRef,
        handleAlpha,
        handleInput,
        handleNumberInput,
        handleAltInput,
        handleInputNoZero,
        handleInputNoNumberAndSpec,
        handleEmail,
        handleMobileNo,
        handlePhoneNum,
        handleAutoComplete,
        handleName
    };    
};

export default useInputRefHooks;