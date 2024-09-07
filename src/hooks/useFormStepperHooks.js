/* eslint-disable no-useless-escape */
import moment from "moment";
import {useState} from "react";
import {
    emailRegex,
    invalidAlpaNumRegex,
    invalidNumRegex,
    nameRegex,
    notNamePeopleRegex,
    phoneNoRegisterRegex,
} from "../helpers/regex";

const useFormStepperHooks = () => {
    const [inputs, setInputs] = useState({});

    const [selectedOption, setSelectedOption] = useState("Paid");

    const [waktuKontak, setWaktuKontak] = useState("Pagi")

    const [kondisiAset, setKondisiAset] = useState("Baru")

    const [utjInputs, setUtjInputs] = useState({});

    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
        // event.persist();
        // setSelectedOption((selectedOption) => ({
        //   ...selectedOption,
        //   [event.target.name]: { isValid: !!event.target.value, value: event.target.value}
        // }))
    };

    const handleWaktuKontak = (event) => {
        setWaktuKontak(event.target.value);
    
      };
    const handleKondisiAset = (event) => {
        setKondisiAset(event.target.value);
    
      };

    const handleInputChange = (event) => {
        event.persist();
        setInputs((inputs) => ({
            ...inputs,
            [event.target.name]: {
                isValid: !!event.target.value,
                value: event.target.value,
                msgError: "",
            },
        }));
    };

    const initiateState = (payload) => {
        for (const [key, value] of Object.entries(payload)) {
            setInputs((inputs) => ({...inputs, [key]: value}));
        }
    };

    const handleDateInputChange = (date, name) => {
        const setInputDate = ({isValid = !!date, msgError = ""}) => {
            setInputs((inputs) => ({
                ...inputs,
                [name]: {isValid: isValid, value: date, msgError: msgError},
            }));
            setInputs((inputs) => ({
                ...inputs,
                [name + "_value"]: {
                    isValid: isValid,
                    value: parseInt(moment(date).format("yyyy")),
                    msgError: msgError,
                },
            }));
        };
        if (name === "tahunBangun" && !date) {
            setInputDate({isValid: false, msgError: "Tahun Bangun tidak valid"});
        } else if (name === "periodeDiskon" && !date) {
            setInputDate({isValid: false, msgError: "Durasi Diskon tidak valid"});
        } else {
            setInputDate({isValid: !!date, msgError: ""});
        }
    };

    const handleLetterNumberInput = (event) => {
        event.persist();
        const evtName = event.target.name;
        const evtValue = event.target.value;
        const setInputSimple = ({
                                    isValid = !!evtValue.replace(invalidAlpaNumRegex, ""),
                                    value = evtValue.replace(invalidAlpaNumRegex, ""),
                                    msgError = "",
                                }) => {
            setInputs((inputs) => ({
                ...inputs,
                [evtName]: {isValid: isValid, value: value, msgError: msgError},
            }));
        };

        if (evtName === "namaProyek" && evtValue?.length === 0) {
            setInputSimple({msgError: "Nama Proyek tidak valid"});
        } else if (evtName === "namaProperti" && evtValue?.length === 0) {
            setInputSimple({msgError: "Nama Properti tidak valid"});
        } else if (evtName === "picProyek" && evtValue?.length === 0) {
            setInputSimple({msgError: "PIC Proyek tidak valid"});
        } else {
            setInputSimple({msgError: ""});
        }
    };

    const handleNumberInput = (event) => {
        event.persist();
        const evtName = event.target.name;
        const evtValue = event.target.value;
        const setInputSimple = ({
                                    isValid = !!evtValue.replace(/[^0-9]/g, ""),
                                    value = evtValue.replace(/[^0-9]/g, ""),
                                    msgError = "",
                                }) => {
            setInputs((inputs) => ({
                ...inputs,
                [evtName]: {isValid: isValid, value: value, msgError: msgError},
            }));
        };

        if (evtName === "nik" && evtValue.length !== 16) {
            setInputSimple({isValid: false, msgError: "NIK tidak boleh kurang dari 16"});
        } else if (evtName === "lt" && evtValue.length === 0) {
            setInputSimple({isValid: false, msgError: "Luas Tanah tidak valid"});
        } else if (evtName === "lb" && evtValue.length === 0) {
            setInputSimple({isValid: false, msgError: "Luas Bangunan tidak valid"});
        } else {
            setInputSimple({
                isValid: !!evtValue.replace(/[^0-9]/g, ""),
                value: evtValue.replace(/[^0-9]/gi, ""),
                msgError: "",
            });
        }
    };

    const handleLetterInput = (event) => {
        event.persist();
        if (event.target.name === "pob" && event.target.value.replace(/[^a-zA-Z ]/i, "").length < 3) {
            setInputs((inputs) => ({
                ...inputs,
                [event.target.name]: {
                    isValid: false,
                    value: event.target.value.replace(/[^a-zA-Z ]/i, ""),
                    msgError: "Tempat Lahir tidak valid",
                },
            }));
        } else {
            setInputs((inputs) => ({
                ...inputs,
                [event.target.name]: {
                    isValid: !!event.target.value.replace(/[^a-zA-Z ]/i, ""),
                    value: event.target.value.replace(/[^a-zA-Z ]/i, ""),
                    msgError: "",
                },
            }));
        }
    };

    const handleRadioDropChange = (nameField, valueField) => {
        const setInputSimple = ({isValid = !!valueField, value = valueField, msgError = ""}) => {
            setInputs((inputs) => ({
                ...inputs,
                [nameField]: {isValid: isValid, value: value, msgError: msgError},
            }));
        };
        if (nameField === "jmlKmrTidur" && !valueField) {
            setInputSimple({
                isValid: false,
                value: valueField,
                msgError: "Jumlah Kamar Tidur tidak valid",
            });
        } else if (nameField === "jmlKmrMandi" && !valueField) {
            setInputSimple({
                isValid: false,
                value: valueField,
                msgError: "Jumlah Kamar Mandi tidak valid",
            });
        } else if (nameField === "sertifikat" && !valueField) {
            setInputSimple({isValid: false, value: valueField, msgError: "Sertifikat tidak valid"});
        } else if (nameField === "jmlLantai" && !valueField) {
            setInputSimple({isValid: false, value: valueField, msgError: "Jumlah Lantai tidak valid"});
        } else if (nameField === "kondisiProperti" && !valueField) {
            setInputSimple({
                isValid: false,
                value: valueField,
                msgError: "Kondisi Properti tidak valid",
            });
        } else if (nameField === "dayaListrik" && !valueField) {
            setInputSimple({isValid: false, value: valueField, msgError: "Daya Listrik tidak valid"});
        } else if (nameField === "hadapRumah" && !valueField) {
            setInputSimple({isValid: false, value: valueField, msgError: "Hadap Rumah tidak valid"});
        } else if (nameField === "kamarPembantu" && !valueField) {
            setInputSimple({isValid: false, value: valueField, msgError: "Kamar Pembantu tidak valid"});
        } else {
            setInputSimple({isValid: !!valueField, value: valueField, msgError: ""});
        }
    };

    const handleCheckboxChange = (event) => {
        event.persist();
        setInputs((inputs) => ({
            ...inputs,
            [event.target.name]: event.target.checked,
        }));
    };

    const handleAltInput = (value, name) => {
        setInputs({
            ...inputs,
            [name]: {isValid: !!value, value: value, msgError: ""},
        });
    };

    const handleAreaCode = (value, name) => {
        setInputs({
            ...inputs,
            [name]: value,
        });
    };

    const handleName = (event) => {
        event.persist();
        if (!nameRegex.test(event.target.value)) {
            setInputs({
                ...inputs,
                [event.target.name]: {
                    isValid: false,
                    value: event.target.value.replace(notNamePeopleRegex, ""),
                    msgError: "Nama Lengkap yang dimasukkan belum benar",
                },
            });
        } else {
            setInputs({
                ...inputs,
                [event.target.name]: {
                    isValid: true,
                    value: event.target.value.replace(notNamePeopleRegex, ""),
                    msgError: "",
                },
            });
        }
    };

    const handleUtj = (event) => {
        event.persist();
        setInputs({
            ...inputs,
            [event.target.name]: {isValid: !!event.target.value},
        });
    };

    const handleMobileNo = (event) => {
        event.persist();
        if (!phoneNoRegisterRegex.test(event.target.value) && event.target.value.length > 0) {
            setInputs({
                ...inputs,
                [event.target.name]: {
                    isValid: false,
                    value: event.target.value.replace(/[^0-9]/i, ""),
                    msgError: "No Handphone yang dimasukkan belum benar",
                },
            });
        } else if (event.target.value.length === 0) {
            setInputs({
                ...inputs,
                [event.target.name]: {
                    isValid: false,
                    value: event.target.value.replace(/[^0-9]/i, ""),
                    msgError: "No Handphone tidak boleh kosong",
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

    const handleEmail = (event) => {
        event.persist();
        if (!emailRegex.test(event.target.value) || event.target.value.length < 1) {
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
                [event.target.name]: {isValid: true, value: event.target.value, msgError: ""},
            });
        }
    };

    const handlePromoCodeInput = (event) => {
        event.persist();
        setInputs((inputs) => ({
            ...inputs,
            [event.target.name]: {
                isValid: !!event.target.value.replace(/[^A-Z\s 0-9]/g, ""),
                value: event.target.value.replace(/[^A-Z\s 0-9]/g, ""),
            },
        }));
    };

    const handleCurrency = (valueCurr, nameCurr) => {
        const setInputSimple = ({
                                    isValid = !!valueCurr.replace(invalidNumRegex, ""),
                                    value = valueCurr.replace(invalidNumRegex, ""),
                                    msgError = "",
                                }) => {
            setInputs((inputs) => ({
                ...inputs,
                [nameCurr]: {isValid: isValid, value: value, msgError: msgError},
            }));
        };

        if (nameCurr === "hargaProperti" && valueCurr.length < 1) {
            setInputSimple({
                isValid: false,
                value: valueCurr.replace(invalidNumRegex, ""),
                msgError: "Harga Properti tidak valid",
            });
        } else if (nameCurr === "hargaProperti" && valueCurr.length < 7) {
            setInputSimple({
                isValid: false,
                value: valueCurr.replace(invalidNumRegex, ""),
                msgError: "Harga Properti kurang dari 7 digit",
            });
        } else {
            setInputSimple({
                isValid: !!valueCurr.replace(invalidNumRegex, ""),
                value: valueCurr.replace(invalidNumRegex, ""),
                msgError: "",
            });
        }
    };

    const handleAllCharInput = (event) => {
        event.persist();
        const evtName = event.target.name;
        const evtValue = event.target.value;
        const setInputSimple = ({isValid = !!evtValue, value = evtValue, msgError = ""}) => {
            setInputs((inputs) => ({
                ...inputs,
                [evtName]: {isValid: isValid, value: value, msgError: msgError},
            }));
        };

        if (evtName === "deskripsi" && evtValue?.length === 0) {
            setInputSimple({msgError: "Deskripsi tidak valid"});
        } else {
            setInputs((inputs) => ({
                ...inputs,
                [event.target.name]: {isValid: !!event.target.value, value: event.target.value},
            }));
        }
    };

    return {
        inputs,
        utjInputs,
        selectedOption,
        waktuKontak,
        setWaktuKontak,
        handleWaktuKontak,
        handleKondisiAset,
        kondisiAset,
        setKondisiAset,
        setUtjInputs,
        setInputs,
        setSelectedOption,
        handleInputChange,
        handleOptionChange,
        initiateState,
        handleDateInputChange,
        handleLetterNumberInput,
        handleNumberInput,
        handleLetterInput,
        handleRadioDropChange,
        handleCheckboxChange,
        handleAltInput,
        handleAreaCode,
        handleName,
        handleMobileNo,
        handleUtj,
        handleEmail,
        handlePromoCodeInput,
        handleCurrency,
        handleAllCharInput,
    };
};

export default useFormStepperHooks;
