/* eslint-disable no-useless-escape */
import moment from "moment";
import {useState} from "react";
import {useSelector} from "react-redux";
import {
    emailRegex,
    invalidNumRegex,
    nameRegex,
    notNamePeopleRegex,
    phoneNoRegex,
} from "../../helpers/regex";
import { fasilitasAksesConst } from "../../static/fasilitas-akses/fasilitasAksesConst";

const useFormStepperHooksV2 = () => {
    const [inputs, setInputs] = useState({});
    const [modalConfirm, setModalConfirm] = useState(false);
    const uploadProjectState = useSelector((state) => state.uploadProjectReducer);

    const [dropdownVal, setDropdownVal] = useState({
        options:[]
      });
      const [dropdownJarak, setDropdownJarak] = useState({
        options:[]
      });

    const [fasAksesPropertiDto, setFasAksesPropertiDto] = useState(
       []
    );

    const [newFieldAkses, setNewFieldAkses] = useState(
        []
     );
      const handleDeleteField = (index) => {
        const updatedFields = [...fasAksesPropertiDto];
        updatedFields.splice(index, 1);
        setFasAksesPropertiDto(updatedFields);
      };

      const handleDeleteNewField = (index) => {
        const updatedFields = [...newFieldAkses];
        updatedFields.splice(index, 1);
        setNewFieldAkses(updatedFields);
      };
    
      const handleAddField = () => {
        const newField = {
          namaFas: { value: '' },
          tipeFasilitas: { value: { name: '' } },
          jarakWaktuTempuh: { value: '' },
          satuan: { value: { name: '' } },
          kategori:{value: ''}
        };
        setNewFieldAkses(prevFields => [...prevFields, newField]);
      };
      const filterFasilitasAkses = (kategori) => {
        return fasilitasAksesConst.filter((fasilitas) => fasilitas.type === kategori);
      };
    
      const handleAdditionalFieldChange = (index, fieldName, value) => {
        const updatedFields = [...newFieldAkses];
        updatedFields[index][fieldName].value = value;
        if (fieldName === 'kategori') {
          updatedFields[index].tipeFasilitas.value = '';
          updatedFields[index].filteredTipeFasilitas = filterFasilitasAkses(value.value);
        }
        setNewFieldAkses(updatedFields);
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

    const initiateStateV2 = (payload) => {
        for (const [key, value] of Object.entries(payload)) {
            setInputs((inputs) => ({...inputs, [key]: {isValid: !!value, value: value}}));
            
        }
        const newFasAksesProperti = payload?.fasAksesProperti.map(item => ({
            id: item.id,
            namaFas: { value: item.namaFas },
            tipeFasilitas: { value: {name:item.tipeFasilitas} },
            jarakWaktuTempuh: { value: item.jarakWaktuTempuh },
            satuan: { value: {name:item.satuan}, name: item.satuan },
            kategori: {value: {name:item.kategori}, name: item.kategori}
        }));
    
        setFasAksesPropertiDto(newFasAksesProperti);
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
        } else {
            setInputDate({isValid: !!date, msgError: ""});
        }
    };

    const handleDateInput = (value, name, request) => {
        setInputs((inputs) => ({
            ...inputs,
            [name]: {isValid: true, value: new Date(moment(value).format("YYYY/MM/DD")), msgError: ""},
        }));
        setInputs((inputs) => ({
            ...inputs,
            [request]: {isValid: true, value: moment(value).format("DD-MM-yyyy"), msgError: ""},
        }));
    };

    const handleLetterNumberInput = (event) => {
        event.persist();
        const evtName = event.target.name;
        const evtValue = event.target.value;
        const setInputSimple = ({
                                    isValid = !!evtValue.replace(/^[^-\S][a-zA-Z\s]*$/, ""),
                                    value = evtValue.replace(/^[^-\S][a-zA-Z\s]*$/, ""),
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
            setInputSimple({msgError: "Nama Tipe Unit tidak valid"});
        } else if (evtName === "picProyek" && evtValue?.length === 0) {
            setInputSimple({msgError: "PIC Proyek tidak valid"});
        } else if (evtName === "namaCluster" && evtValue?.length === 0) {
            setInputSimple({msgError: "Nama Cluster tidak valid"});
        } else if (evtName === "deskripsiCluster" && evtValue?.length === 0) {
            setInputSimple({msgError: "Deskripsi Cluster tidak valid"});
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

        const setInputPercentageValue = ({
                                             isValid = !!evtValue.replace(/[^0-9]/g, "").replace(/^0+/g, ""),
                                             value = evtValue.replace(/[^0-9]/g, "").replace(/^0+/g, ""),
                                             msgError = "",
                                         }) => {
            setInputs((inputs) => ({
                ...inputs,
                [evtName]: {isValid: isValid, value: value, msgError: msgError},
            }));
        };

        // console.log("DEBUG PERSENTASE DISCOUNT", evtName, evtValue);

        if (evtName === "nik" && evtValue.length !== 16) {
            setInputSimple({isValid: false, msgError: "NIK tidak boleh kurang dari 16"});
        } else if (evtName === "lt" && evtValue.length === 0) {
            setInputSimple({isValid: false, msgError: "Luas Tanah tidak valid"});
        } else if (evtName === "lb" && evtValue.length === 0) {
            setInputSimple({isValid: false, msgError: "Luas Bangunan tidak valid"});
        } else if (evtName === "jumlahUnit" && evtValue.length === 0) {
            setInputSimple({isValid: false, msgError: "Jumlah Unit tidak valid"});
        } else if (evtName === "stockUnits" && evtValue.length === 0) {
            setInputSimple({isValid: false, msgError: "Jumlah Unit tidak valid"});
        } else if (evtName === "stockUnitsProp" && evtValue.length === 0) {
            setInputSimple({isValid: false, msgError: "Jumlah Unit tidak valid"});
        } else if (evtName === "percentageValue" && evtValue.length === 0) {
            setInputPercentageValue({isValid: false, msgError: "Persentase discount tidak valid"});
        } else if (evtName === "percentageValue" && evtValue.length > 0) {
            // console.log("DEBUG PERSENTASE DISCOUNT", evtName, evtValue);
            // console.log("DEBUG PERSENTASE DISCOUNT", evtName, typeof evtValue);

            // change evtValue to number
            const evtValueNumber = Number(evtValue);

            // create regex validation for number
            const regexNumber = /^[0-9\b]+$/;

            // check if evtValueNumber is number
            let hargaAkhir = 0;

            if (!regexNumber.test(evtValueNumber)) {
                // console.log("DEBUG PERSENTASE DISCOUNT INPUT NOT NUMBER");
                hargaAkhir = inputs?.hargaProperti?.value;
            } else {
                // console.log("DEBUG PERSENTASE DISCOUNT INPUT NUMBER");
                if (inputs?.hargaProperti?.value) {
                    // calculate harga akhir without komma
                    hargaAkhir = inputs?.hargaProperti?.value - (inputs?.hargaProperti?.value * evtValueNumber / 100);
                }
            }

            // console.log("DEBUG PERSENTASE DISCOUNT HARGA AKHIR", hargaAkhir);
            setInputs({
                ...inputs,
                hargaAkhir: {
                    isValid: true,
                    value: hargaAkhir,
                },
            });

            setInputPercentageValue({
                isValid: !!evtValue.replace(/[^0-9]/g, "").replace(/^0+/g, ""),
                value: evtValue.replace(/[^0-9]/g, "").replace(/^0+/g, ""),
                msgError: "",
            });
        } else {
            setInputSimple({
                isValid: !!evtValue.replace(/[^0-9]/g, ""),
                value: evtValue.replace(/[^0-9]/g, ""),
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
        } else if (nameField === "statusCluster" && !valueField) {
            setInputSimple({isValid: false, value: valueField, msgError: "Status Cluster tidak valid"});
        } else if (nameField === "statusUnit" && !valueField) {
            // console.log("DEBUG STATUS UNIT", valueField);
            setInputSimple({isValid: false, value: valueField, msgError: "Status Unit tidak valid"});
        } else if (nameField === "statusDiscount" && !valueField) {
            // console.log("DEBUG STATUS DISCOUNT", !valueField);
            // console.log("DEBUG STATUS DISCOUNT", valueField);
            setInputSimple({
                isValid: false,
                value: valueField,
                msgError: "",
            });
        } else if (nameField === "tipeProperti" && !valueField) {
            setInputSimple({
                isValid: false,
                value: valueField,
                msgError: "Tipe properti tidak valid",
            })
        } else {
            setInputSimple({isValid: !!valueField, value: valueField, msgError: ""});
        }

        // if (nameField === "statusDiscount") {
        //   console.log("DEBUG STATUS DISCOUNT", valueField);
        //   switch (valueField) {
        //     case "nominal":
        //       setInputs({
        //         ...inputs,
        //         hargaAkhir: {
        //           isValid: true,
        //           value: inputs.hargaProperti.value,
        //         },
        //       });
        //       break;
        //     case "persentase":
        //       setInputs({
        //         ...inputs,
        //         hargaAkhir: {
        //           isValid: true,
        //           value: inputs.hargaProperti.value,
        //         },
        //       });
        //       break;
        //     default:
        //       setInputs({
        //         ...inputs,
        //         hargaAkhir: {
        //           isValid: true,
        //           value: 0,
        //         },
        //       });
        //   }
        // }
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

    const handleMobileNo = (event) => {
        event.persist();
        if (!phoneNoRegex.test(event.target.value) && event.target.value.length > 0) {
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
        } else if (
            Number(valueCurr) <
            Number(
                uploadProjectState?.projectInfo?.startRangePrice?.value ||
                uploadProjectState?.projectInfo?.kisaranHarga?.split?.(",")?.[0]
            )
        ) {
            setInputSimple({
                isValid: false,
                value: valueCurr.replace(invalidNumRegex, ""),
                msgError: "Harga Properti kurang dari batas minimum kisaran harga",
            });
        } else if (
            Number(valueCurr) >
            Number(
                uploadProjectState?.projectInfo?.endRangePrice?.value ||
                uploadProjectState?.projectInfo?.kisaranHarga?.split?.(",")?.[1]
            )
        ) {
            setInputSimple({
                isValid: false,
                value: valueCurr.replace(invalidNumRegex, ""),
                msgError: "Harga Properti lebih dari batas maksimum kisaran harga",
            });
        } else {
            setInputSimple({
                isValid: !!valueCurr.replace(invalidNumRegex, ""),
                value: valueCurr.replace(invalidNumRegex, ""),
                msgError: "",
            });
        }

        if (nameCurr === "nominalValue" && valueCurr > 0) {
            // console.log("DEBUG FOR DISKON NOMINAL", valueCurr, nameCurr);
            // console.log("DEBUG FOR DISKON NOMINAL HARGA PROPERTI", inputs.hargaProperti.value);
            // console.log(
            //     "DEBUG FOR DISKON NOMINAL HARGA PROPERTI",
            //     inputs.hargaProperti.value - valueCurr
            // );
            if (valueCurr.length < 1) {
                setInputSimple({
                    isValid: false,
                    value: valueCurr.replace(invalidNumRegex, ""),
                    msgError: "Diskon Nominal tidak valid",
                });
            }

            if (Number(valueCurr) > Number(inputs.hargaProperti.value)) {
                setInputSimple({
                    isValid: false,
                    value: valueCurr.replace(invalidNumRegex, ""),
                    msgError: "Diskon Nominal lebih dari harga properti",
                });
            }

            if (Number(valueCurr) < Number(inputs.hargaProperti.value)) {
                setInputSimple({
                    isValid: true,
                    value: valueCurr.replace(invalidNumRegex, ""),
                    msgError: "",
                });
            }

            if (Number(valueCurr) === Number(inputs.hargaProperti.value)) {
                setInputSimple({
                    isValid: true,
                    value: valueCurr.replace(invalidNumRegex, ""),
                    msgError: "",
                });
            }

            let hargaAkhir = inputs.hargaProperti.value - valueCurr;

            if (hargaAkhir < 0) {
                hargaAkhir = 0;
            }

            setInputs({
                ...inputs,
                hargaAkhir: {
                    isValid: true,
                    value: hargaAkhir,
                },
            });

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
        } else if (evtName === "deskripsiProperti" && evtValue?.length === 0) {
            setInputSimple({msgError: "Deskripsi properti tidak valid"});
        } else {
            setInputs((inputs) => ({
                ...inputs,
                [event.target.name]: {isValid: !!event.target.value, value: event.target.value},
            }));
        }
    };

    const handleRangePrice = (value, name, compare) => {
        const msgErrorbyName = (name) => {
            switch (name) {
                case "startRangePrice":
                    return "Harga Mulai Properti Kosong";
                case "endRangePrice":
                    return "Harga Akhir Properti Kosong";
                default:
                    return "";
            }
        };
        const msgErrorMinLength = (name) => {
            switch (name) {
                case "startRangePrice":
                    return "Harga Mulai Properti kurang dari 7 digit";
                case "endRangePrice":
                    return "Harga Akhir Properti kurang dari 7 digit";
                default:
                    return "";
            }
        };
        if (name === "startRangePrice" || name === "endRangePrice") {
            if (value.length < 1) {
                setInputs({
                    ...inputs,
                    [name]: {isValid: false, value: value, msgError: msgErrorbyName(name)},
                });
            } else if (value.length < 7) {
                setInputs({
                    ...inputs,
                    [name]: {isValid: false, value: value, msgError: msgErrorMinLength(name)},
                });
            } else if (name === "startRangePrice" && Number(value) >= Number(compare)) {
                setInputs({...inputs, [name]: {isValid: false, value: value, msgError: ""}});
            } else if (name === "endRangePrice" && Number(value) <= Number(compare)) {
                setInputs({...inputs, [name]: {isValid: false, value: value, msgError: ""}});
            } else {
                setInputs({...inputs, [name]: {isValid: !!value, value: value, msgError: ""}});
            }
        } else {
            setInputs({...inputs, [name]: {isValid: !!value, value: value, msgError: ""}});
        }
    };

    return {
        inputs,
        setInputs,
        handleInputChange,
        initiateState,
        initiateStateV2,
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
        handleEmail,
        handlePromoCodeInput,
        handleCurrency,
        handleAllCharInput,
        handleRangePrice,
        modalConfirm,
        setModalConfirm,
        handleDateInput,
        dropdownVal, 
        setDropdownVal,
        dropdownJarak, 
        setDropdownJarak,
        fasAksesPropertiDto, 
        setFasAksesPropertiDto,
        handleDeleteField,
        handleDeleteNewField,
        handleAdditionalFieldChange,
        handleAddField,
        newFieldAkses, 
        setNewFieldAkses
    };
};

export default useFormStepperHooksV2;
