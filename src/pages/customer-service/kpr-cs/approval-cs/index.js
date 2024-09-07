/* eslint-disable react-hooks/exhaustive-deps */
import cookie from "hs-cookie";
import moment from "moment";
import _ from "lodash-contrib"
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { StepperKpr, StepperKprCS } from "../../../../components/atoms";
import { Footer, ModalKPRCS } from "../../../../components/molecules";
import { Modal } from "../../../../components/organisms";
import { decryptStr, encryptStr } from "../../../../helpers/encryptDecrypt";
import useFormStepperHooks from "../../../../hooks/useFormStepperHooks";
import useKprApprovalHooks from "../../../../hooks/useKprApprovalHooks";
import { areacodeConst } from "../../../../static/areacodeConst";
import {
  closeModalFail,
  inquiryUser
} from "../../../../store/actions/fetchData/superAdminState";
import { submitCSKpr } from "../../../../store/actions/fetchData/uploadFile";
import { useNavigate } from "react-router-dom";
import { showUserPaymentModal } from "../../../../store/actions/changeModalState";
import PropertiCS from "../properti-cs";
import DataDiriCS from "../data-diri-cs";
import SummarySubmitCS from "../summary-cs";
import { fetchPost } from "../../../../helpers/fetchApi";
import { invalidNumRegex, percentDecRegex } from "../../../../helpers/regex";
import { compressImage } from "../../../../helpers/imageCompressor";
import { useDropzone } from "react-dropzone";
import { savePropertiCS } from "../../../../store/actions/fetchData/customer-service";

const PengajuanCS = () => {
  const navigate = useNavigate();
  const saState = useSelector((state) => state.superAdminReducer);
  const { inputs, utjInputs, selectedOption, setUtjInputs, setInputs, setSelectedOption, initiateState, handleWaktuKontak, waktuKontak, setWaktuKontak, handleKondisiAset, kondisiAset, setKondisiAset, handleInputChange, handleOptionChange, handleLetterNumberInput, handleLetterInput, handleNumberInput, handleDateInputChange, handleRadioDropChange, handleAltInput, handleAreaCode, handleName, handleMobileNo, handleEmail, handleAllCharInput } = useFormStepperHooks();
  const { files, setFiles, setImgFiles, setSelfieKtpFiles, dropdownVal, setDropdownVal } = useKprApprovalHooks();
  const dispatch = useDispatch();
  const [kcDescVal, setKcDescVal] = useState("");
  const [kcList, setKcList] = useState([]);
  const [kcOtherList, setKcOtherList] = useState([]);
  const [isModalDone, setModalDone] = useState(false);
  const [kcForm, setKcForm] = useState({
    state: "nearby"
  })

  const [dataAddress, setDataAddress] = useState({
    address: "",
    rt: "",
    rw: "",
    posCode: "",
    province: "",
    subDistrict: "",
    district: "",
    urbanVillage: "",
  });

  const [dataAddressKTP, setDataAddressKTP] = useState({
    address: "",
    rt: "",
    rw: "",
    posCode: "",
    province: "",
    subDistrict: "",
    district: "",
    urbanVillage: "",
  });

  const [dataAddressProperti, setAddressProperti] = useState({
    address: "",
    rt: "",
    rw: "",
    posCode: "",
    province: "",
    subDistrict: "",
    district: "",
    urbanVillage: "",
  });

  const [mapsState, setMapsState] = useState({
    center: {
      lat: -6.22472,
      lng: 106.80778,
    },
    address: "",
    zoom: 11,
    draggable: false,
    gestureHandling: "cooperative",
  });

  useEffect(() => {
    if (cookie.get("morgateCookie")) {
      dispatch(inquiryUser(JSON.parse(cookie.get("morgateCookie"))?.email));
    }
  }, []);
  const nameCS = saState?.resApi?.responseData?.[0]?.metadata?.fullName
  const [itemBrivaVisitor, setItemBrivaVisitor] = useState();
  const [itemIdPengajuan, setItemIdPengajuan] = useState();
  const [itemDokuGenerateLink, setItemDokuGenerateLink] = useState();
  const emailCS = _.isJSON(cookie.get("morgateCookie")) ? JSON?.parse?.(cookie.get("morgateCookie"))?.email : ""


  useEffect(() => {
    initiateState({
      mobileNoArea: areacodeConst.filter((e) => e.value === saState?.resApi?.responseData?.[0]?.mobileNo?.split("|")?.[0])[0] || areacodeConst.filter((e) => e.value === "+62")[0]
    })
  }, [saState.resApi]);

  const inputStep1Arr = [
    inputs?.nik?.isValid,
    inputs?.fullName?.isValid,
    inputs?.pob?.isValid,
    inputs?.dob?.isValid,
    dropdownVal.gender.value !== "",
    inputs?.mobileNo?.isValid,
    inputs?.email?.isValid,
    dropdownVal.maritalStatus.value !== "",
    dropdownVal.agama.value !== "",
    inputs?.ukerCode?.isValid,
    inputs?.ukerName?.isValid,
    waktuKontak !== "",
  ];
  const dataAddressArr = [
    !!dataAddress?.address,
    !!dataAddress?.rt,
    !!dataAddress?.rw,
    !!dataAddress?.posCode,
    !!dataAddress?.province,
    !!dataAddress?.subDistrict,
    !!dataAddress?.district,
    !!dataAddress?.urbanVillage,
    dataAddress?.rt?.length > 1 && dataAddress?.rt?.length <= 3,
    dataAddress?.rw?.length > 1 && dataAddress?.rw?.length <= 3,
    dataAddress?.posCode?.length === 5,
    dataAddress?.province?.length > 3 && dataAddress?.province?.length <= 50,
    dataAddress?.subDistrict?.length > 3 && dataAddress?.subDistrict?.length <= 50,
    dataAddress?.district?.length > 3 && dataAddress?.district?.length <= 50,
    dataAddress?.urbanVillage?.length > 3 && dataAddress?.urbanVillage?.length <= 50,
  ];

  const inputPropertiArr = [
    inputs?.noReferral?.isValid,
    inputs?.namaProperti?.isValid,
    kondisiAset !== "",
  ];

  const addressPropertiArr = [
    !!dataAddressProperti?.address,
    !!dataAddressProperti?.rt,
    !!dataAddressProperti?.rw,
    !!dataAddressProperti?.posCode,
    !!dataAddressProperti?.province,
    !!dataAddressProperti?.subDistrict,
    !!dataAddressProperti?.district,
    !!dataAddressProperti?.urbanVillage,
    dataAddressProperti?.rt?.length > 1 && dataAddressProperti?.rt?.length <= 3,
    dataAddressProperti?.rw?.length > 1 && dataAddressProperti?.rw?.length <= 3,
    dataAddressProperti?.posCode?.length === 5,
    dataAddressProperti?.province?.length > 3 && dataAddressProperti?.province?.length <= 50,
    dataAddressProperti?.subDistrict?.length > 3 && dataAddressProperti?.subDistrict?.length <= 50,
    dataAddressProperti?.district?.length > 3 && dataAddressProperti?.district?.length <= 50,
    dataAddressProperti?.urbanVillage?.length > 3 && dataAddressProperti?.urbanVillage?.length <= 50,
  ];
  const [idProperti, setIdProperti] = useState();
  const [gimmickOptions, setGimmickOptions] = useState([]);
  const [calcState, setCalcState] = useState({
    gimmick: {
      value: {
        biayaAdminNominal: 0,
        biayaProvisiNominal: 0,
        floatingRate: 0,
        name: "Pilih Program Suku Bunga",
        requestType:"visitor",
        gimmickType: "",
      },
      isValid : false
    },
    hargaRumah: {isValid : false},
    jangkaWaktu: {isValid : false}
  });
  const [tenorFixedRate, setTenorFixedRate] = useState(calcState?.gimmick?.value?.tenorFixedRate || 0);
  const [jangkaWaktu, setJangkaWaktu] = useState(calcState?.jangkaWaktu?.value || '');
  useEffect(() => {
    window.scrollTo(0, 0);
    // if (!_.isEmpty(cookie.get())) {
    try {
      fetchPost(
        `${process.env.REACT_APP_URL_MORTGAGE_API}/mes/api/v1/promo/listGimmick`,
        {
          // email: _.isJSON(cookie.get("morgateCookie")) ? JSON.parse(cookie.get("morgateCookie")).email : "",
          status: "active",
          pageStart: 1,
          sortBy: "createdAt",
          sortDirection: "desc",
          nameSearch: "",
          requestType:"visitor"
        }
      )
        .then((res) => {
          if (res.data.responseCode === "00") {
            setGimmickOptions(res?.data?.responseData);
          }
        })
        .catch((err) => console.log("Error List Program Suku Bunga : " + err));
    } catch (error) {
      console.log(error.error);
    }
    // };
  }, []);

  const handleJangkaWaktu = (key, val) => {
    const msgErrorbyName = (name) => {
      switch (name) {
        case "jangkaWaktu":
          return "Tidak boleh kurang dari Masa Kredit Fix";
        default:
          return "";
      }
    };

    if (val < 1 || invalidNumRegex.test(val) || val < tenorFixedRate) {
      setCalcState({
        ...calcState,
        [key]: {
          isValid: false,
          value: val.replace(/[^0-9]/gi, ""),
          msgError: msgErrorbyName(key),
        },
      });
    } else {
      setCalcState({
        ...calcState,
        [key]: { isValid: !!val, value: val.replace(/[^0-9]/gi, ""), msgError: "" },
      });
    }
    setJangkaWaktu(val);
  };
  useEffect(() => {

    setTenorFixedRate(calcState?.gimmick?.value?.tenorFixedRate / 12 || 0);
  }, [calcState?.gimmick?.value?.tenorFixedRate / 12]);

  useEffect(() => {
    if (jangkaWaktu < tenorFixedRate) {
      setCalcState((prevState) => ({
        ...prevState,
        jangkaWaktu: {
          ...prevState.jangkaWaktu,
          msgError: "Tidak boleh kurang dari Masa Kredit Fix",
        },
      }));
    } else {
      setCalcState((prevState) => ({
        ...prevState,
        jangkaWaktu: {
          ...prevState.jangkaWaktu,
          msgError: "",
        },
      }));
    }
  
  }, [tenorFixedRate, jangkaWaktu]);

  const handleChangeAlt = (name, value) => {
    const msgErrorbyName = (name) => {
      switch (name) {
        case "hargaRumah":
          return "Harga Rumah tidak valid";
        default:
          return "";
      }
    };
    if (value.length < 7 || value === "0" || invalidNumRegex.test(value) || value === undefined) {
      setCalcState({
        ...calcState,
        [name]: { isValid: false, value: value, msgError: msgErrorbyName(name) },
        dp: {
          isValid: false,
          value: 0,
        },
      });
    } else {
      setCalcState({
        ...calcState,
        [name]: { isValid: !!value, value: value, msgError: "" },
        dp: {
          isValid: true,
          value: parseInt((value * 5) / 100),
        },
      });
    }
  };

  const handleUangMuka = (name, value) => {
    const hargaProperti = parseInt((calcState?.hargaRumah?.value * 5) / 100);
    if (hargaProperti > value) {
      setCalcState({
        ...calcState,
        [name]: {
          isValid: false,
          value: value,
          msgError: "Uang Muka tidak boleh dibawah dari 5% Harga Properti",
        },
      });
    } else if (value > calcState?.hargaRumah?.value){ 
      setCalcState({
        ...calcState,
        [name]: {
          isValid: false,
          value: value,
          msgError: "Uang muka tidak boleh sama atau melebihi harga properti",
        },
      });
    } else if (value === calcState?.hargaRumah?.value){ 
      setCalcState({
        ...calcState,
        [name]: {
          isValid: false,
          value: value,
          msgError: "Uang muka tidak boleh sama atau melebihi harga properti",
        },
      });
    } else {
      setCalcState({
        ...calcState,
        [name]: { isValid: true, value: value, msgError: "" },
      });
    }
  };

  useEffect(() => {
    if (Number(calcState?.dp?.value) < Number(calcState?.hargaRumah?.value)) {
      setCalcState({
        ...calcState,
        jumlahPinjaman: {
          ...calcState?.jumlahPinjaman,
          value: Number(calcState?.hargaRumah?.value) - Number(calcState?.dp?.value),
        },
      });
    } else if (
      Number(calcState?.dp?.value) === Number(calcState?.hargaRumah?.value) ||
      Number(calcState?.dp?.value) > Number(calcState?.hargaRumah?.value)
    ) {
      setCalcState({
        ...calcState,
        dp: {
          ...calcState?.dp,
          isValid: false,
          value: Number(calcState?.hargaRumah?.value),
        },
        jumlahPinjaman: {
          ...calcState?.jumlahPinjaman,
          value: 0,
        },
      });
    } else if (isNaN(Number(calcState?.dp?.value)) || isNaN(Number(calcState?.hargaRumah?.value))) {
      setCalcState({
        ...calcState,
        dp: {
          ...calcState?.dp,
          value: 0,
        },
        jumlahPinjaman: {
          ...calcState?.jumlahPinjaman,
          value: Number(calcState?.hargaRumah || 0),
        },
      });
    }
  }, [calcState?.dp?.value]);

  const handleChangeGimmick = (value, name) => {
    setCalcState({
      ...calcState,
      [name]: { isValid: !!value, value: value },
    });
  };

  const handleChangeCalc = (key, val) => {
    const msgErrorbyName = (name) => {
      switch (name) {
        case "jangkaWaktu":
          return "Lama Pinjaman tidak valid";
        case "fixedRate":
          return "Suku Bunga tidak valid";
        case "floatRate":
          return "Floating Rate tidak valid";
        default:
          return "";
      }
    };
    if (!percentDecRegex.test(val) || val.length < 1 || val === "0" || val === "100") {
      setCalcState({
        ...calcState,
        [key]: { isValid: false, value: val, msgError: msgErrorbyName(key) },
      });
    } else {
      setCalcState({
        ...calcState,
        [key]: { isValid: !!val, value: val, msgError: "" },
      });
    }
  };

  const calcKPRSimArr = [
    //calcState?.dp?.isValid,
    calcState?.gimmick?.isValid !== false,
    calcState?.hargaRumah?.isValid !== false,
    calcState?.jangkaWaktu?.isValid !== false,
  ];
  
  const handleResetCacl = (e) => {
    e.preventDefault();
    setCalcState({
      gimmick: {
        value: {
          biayaAdminNominal: 0,
          biayaProvisiNominal: 0,
          tenorFixedRate: 0,
          fixedRate: 0,
          floatingRate: 0,
          name: "Pilih Program Suku Bunga",
          requestType:"visitor",
          gimmickType: "",
        }
      },
      hargaRumah: { isValid: false, value: "", msgError: "" },
      jangkaWaktu: { isValid: false, value: "", msgError: "" },
      dp: { isValid: false, value: "", msgError: "" },
      jumlahPinjaman: { isValid: false, value: "", msgError: "" },
    });
  };
  const [generatePDF, setGeneratePDF] = useState(false);
  
  const handleSimulasiCalc = (e) => {
    setGeneratePDF(true)
    const payload = {
      productDetails: false,
      dp: Number(calcState?.dp?.value),
      fixedRate: Number(calcState?.gimmick?.value?.fixedRate),
      floatRate: Number(calcState?.gimmick?.value?.floatingRate),
      jangkaWaktu: Number(calcState?.jangkaWaktu?.value),
      jangkaWaktuFixed: Number(calcState?.gimmick?.value?.tenorFixedRate),
      hargaRumah: Number(calcState?.hargaRumah?.value),
    };

    window.localStorage.setItem("simulasiCalc", JSON.stringify(payload));
  }; 

  useEffect(() => {
    if (generatePDF === true) {
      const payload = {
        productDetails: false,
        dp: Number(calcState?.dp?.value),
        fixedRate: Number(calcState?.gimmick?.value?.fixedRate),
        floatRate: Number(calcState?.gimmick?.value?.floatingRate),
        jangkaWaktu: Number(calcState?.jangkaWaktu?.value),
        jangkaWaktuFixed: Number(calcState?.gimmick?.value?.tenorFixedRate),
        hargaRumah: Number(calcState?.hargaRumah?.value),
      };
  
      window.localStorage.setItem("simulasiCalc", JSON.stringify(payload));
    }
  },[generatePDF, calcState])

  const [alertImg, setAlertImg] = useState()
  const { getRootProps, getInputProps } = useDropzone({
    accept:".jpeg,.jpg,.png,.pdf",
    maxSize:  1500000,
    onDrop: (acceptedFiles, rejectedFiles) => {

      rejectedFiles.forEach(file => {
        if (file.file.size > 1500000) {
          setImgFiles('','','Ukuran file anda melebihi 1.5 mb')
        }
      });

      acceptedFiles.forEach((file) => {
        if (file.type.startsWith('image/')) {
          setImgFiles(file, URL.createObjectURL(file), '');
        } else if (file.type.startsWith('image/')) {
          const compressedImage = compressImage(file);
          compressedImage.then(
            (result) => {
              setImgFiles(result, URL.createObjectURL(result),'');
            },
            (err) => {
              // showModalFail("Gagal", "Kompresi File Gagal");
            }
          );
        } else if (file.type === 'application/pdf') {
          setImgFiles(file, URL.createObjectURL(file),'');
        }
      });
    }
  });

//   const { getRootProps, getInputProps } = useDropzone({
//     accept: "image/*",
//     onDrop: (acceptedFiles) => {
//       acceptedFiles.forEach((file) => {
//         if (file.size <= 1000000) {
//           setImgFiles(file, URL.createObjectURL(file));
//         } else {
//           const compressedImage = compressImage(file);
//           compressedImage.then(function (result) {
//             setImgFiles(result, URL.createObjectURL(result));
//           }, function (err) {
//             // dispatch(showModalFail("Gagal", "Kompresi File Gagal"));
//           });
//         }
//       })
//     }
// })

function removeItem(index, imgSrc) {
    URL.revokeObjectURL(imgSrc);
    setFiles((prevState) => ([
      ...prevState.slice(0, index), ...prevState.slice(index + 1)
    ]))
}
const [complete, setComplete] = useState(false)
  const stepperContent = [
    {
      label: "Detail Properti",
      content: (
        <PropertiCS
          inputs={inputs}
          dataAddressProperti={dataAddressProperti}
          setAddressProperti={setAddressProperti}
          setInputs={setInputs}
          mapsState={mapsState}
          setMapsState={setMapsState}
          dropdownVal={dropdownVal}
          setDropdownVal={setDropdownVal}
          kondisiAset={kondisiAset}
          setKondisiAset={setKondisiAset}
          handleKondisiAset={handleKondisiAset}
          handleInput={{
            handleDateInputChange,
            handleLetterNumberInput,
            handleLetterInput,
            handleNumberInput,
            handleInputChange,
            handleRadioDropChange,
            initiateState,
            handleAltInput,
            handleAreaCode,
            handleName,
            handleMobileNo,
            handleEmail,
            handleAllCharInput
          }}
         calcState={calcState}
         calcKPRSimArr={calcKPRSimArr}
         handleResetCacl={handleResetCacl}
         handleSimulasiCalc={handleSimulasiCalc}
         gimmickOptions={gimmickOptions}
         handleChangeGimmick={handleChangeGimmick}
         handleUangMuka={handleUangMuka}
         handleJangkaWaktu={handleJangkaWaktu}
         handleChangeAlt={handleChangeAlt}
         handleChangeCalc={handleChangeCalc}
         generatePDF={generatePDF}
         setGeneratePDF={setGeneratePDF}
        />
      ),
      isComplete: complete
    },
    {
      label: "Data Diri",
      content: (
        <DataDiriCS
          inputs={inputs}
          dataAddressKTP={dataAddressKTP}
          setDataAddressKTP={setDataAddressKTP}
          dataAddress={dataAddress}
          setDataAddress={setDataAddress}
          setInputs={setInputs}
          mapsState={mapsState}
          setMapsState={setMapsState}
          dropdownVal={dropdownVal}
          setDropdownVal={setDropdownVal}
          waktuKontak={waktuKontak}
          setWaktuKontak={setWaktuKontak}
          handleWaktuKontak={handleWaktuKontak}
          handleInput={{
            handleDateInputChange,
            handleLetterNumberInput,
            handleLetterInput,
            handleNumberInput,
            handleInputChange,
            handleRadioDropChange,
            initiateState,
            handleAltInput,
            handleAreaCode,
            handleName,
            handleMobileNo,
            handleEmail,
          }}
          kcDescVal={kcDescVal}
          setKcDescVal={setKcDescVal}
          kcList={kcList}
          setKcList={setKcList}
          kcOtherList={kcOtherList}
          setKcOtherList={setKcOtherList}
          kcForm={kcForm}
          setKcForm={setKcForm}
          files={files}
          setFiles={setFiles}
          getRootProps={getRootProps}
          getInputProps={getInputProps}
          removeItem={removeItem}
          alertImg={alertImg}
        />
      ),
    },
    {
      label: "Ringkasan",
      content: (
        <SummarySubmitCS
          inputs={inputs}
          files={files}
          dataAddressKTP={dataAddressKTP}
          dataAddress={dataAddress}
          selectedOption={selectedOption}
          dataAddressProperti={dataAddressProperti}
          calcState={calcState}
          nameCS={nameCS}
          waktuKontak={waktuKontak}
          setItemBrivaVisitor={setItemBrivaVisitor}
        />
      ),
    },
  ];  
  const handleModalDone = () => {
    setModalDone(true);
  }
  const [isSuccess, setSuccess] = useState();
  
  const submitStepperKprVisitor = () => {
   dispatch(
      savePropertiCS(inputs, calcState?.hargaRumah?.value, kondisiAset, setIdProperti, setSuccess),
    );
    localStorage.setItem("snackBarSucces", "true");  
}
    useEffect(() => {
     if(isSuccess === "00"){
      dispatch(
        submitCSKpr(emailCS, inputs, waktuKontak, "PaidCS", calcState, dataAddress, idProperti, setItemIdPengajuan, files)
      );
      setModalDone(false)
     } 

    }, [isSuccess]);

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {selectedOption === 'doku' ? 
        saState.success === true && (
          <Modal
            closeModal={() => dispatch(
              showUserPaymentModal(!saState.showUserPaymentModal)
            )}
            modalTypes="DokuPaymentVisitor"
            title="Payment Visitor"
            otherProps={itemDokuGenerateLink?.data?.responseData?.payment?.url}
          />
        )
        :
        saState.success === true && (
          <Modal
            // closeModal={() => navigate("/")}
            modalTypes="modalSF"
            title=""
            titleBody={saState.titleSuccess}
            descBody={saState.msgSuccess}
          />
        )      
      }
      {saState.fail === true && (
        <Modal
          closeModal={() => dispatch(closeModalFail())}
          modalTypes="modalSF"
          title=""
          titleBody={saState.titleFail}
          descBody={saState.msgFail}
        />
      )}
      <div className="stepper-container">
        <StepperKprCS
          setComplete={setComplete}
          stepperContent={stepperContent}
          submitStepperKprVisitor={handleModalDone}
          inputStep1Arr={inputStep1Arr}
          dataAddressArr={dataAddressArr}
          inputPropertiArr={inputPropertiArr}
          addressPropertiArr={addressPropertiArr}
          calcKPRSimArr={calcKPRSimArr}
          selectedOption={selectedOption}
          itemBrivaVisitor={itemBrivaVisitor}
          inputs={inputs}
          isInline
        />
        <ModalKPRCS 
        isModalDone={isModalDone}
        setModalDone={setModalDone}
        handleModalDone={handleModalDone}
        submitStepperKprVisitor={submitStepperKprVisitor}
        inputs={inputs} 
        calcState={calcState} 
        kondisiAset={kondisiAset} 
        setIdProperti={setIdProperti} 
        idProperti={idProperti} 
        setItemIdPengajuan={setItemIdPengajuan} 
        waktuKontak={waktuKontak} 
        dataAddress={dataAddress}
        files={files}
        />
      </div>
      <div style={{ flex: 1 }}></div>
      <Footer />
    </div>
  );
};

export default PengajuanCS;
