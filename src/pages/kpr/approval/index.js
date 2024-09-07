/* eslint-disable react-hooks/exhaustive-deps */
import cookie from "hs-cookie";
import moment from "moment";
import _ from "lodash-contrib"
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { StepperKpr } from "../../../components/atoms";
import { Footer } from "../../../components/molecules";
import { Modal } from "../../../components/organisms";
import { decryptStr, encryptStr } from "../../../helpers/encryptDecrypt";
import useFormStepperHooks from "../../../hooks/useFormStepperHooks";
import useKprApprovalHooks from "../../../hooks/useKprApprovalHooks";
import { areacodeConst } from "../../../static/areacodeConst";
import {
  closeModalFail,
  inquiryUser
} from "../../../store/actions/fetchData/superAdminState";
import { generateBrivaVisitor, generateLinkDoku, submitKpr, submitVisitorKpr } from "../../../store/actions/fetchData/uploadFile";
import DataDiri from "../data-diri";
import SummarySubmitKpr from "../summary";
import UploadDoc from "../upload-doc";
import { useNavigate } from "react-router-dom";
import UtjVisitor from "../utj-visitor";
import { showUserPaymentModal } from "../../../store/actions/changeModalState";
import { setSoldInfolelang } from "../../../store/actions/fetchData/info-lelang";

const PengajuanKpr = () => {
  const navigate = useNavigate();
  const saState = useSelector((state) => state.superAdminReducer);
  const { inputs, utjInputs, selectedOption, setUtjInputs, setInputs, setSelectedOption, initiateState, handleWaktuKontak, waktuKontak, setWaktuKontak, handleInputChange, handleOptionChange, handleLetterNumberInput, handleLetterInput, handleNumberInput, handleDateInputChange, handleRadioDropChange, handleAltInput, handleAreaCode, handleName, handleMobileNo, handleEmail, handleUtj } = useFormStepperHooks();
  const { ktpFiles, setKtpFiles, selfieKtpfiles, setSelfieKtpFiles, dropdownVal, setDropdownVal } = useKprApprovalHooks();
  const dispatch = useDispatch();
  const [kcDescVal, setKcDescVal] = useState("");
  const [kcList, setKcList] = useState([]);
  const [kcOtherList, setKcOtherList] = useState([]);
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

  const [itemBrivaVisitor, setItemBrivaVisitor] = useState();
  const [itemIdPengajuan, setItemIdPengajuan] = useState();
  const [itemDokuGenerateLink, setItemDokuGenerateLink] = useState();

  useEffect(() => {
    let respData = saState?.resApi?.responseData?.[0] || [];
    initiateState({
      fullName: { isValid: !!respData?.metadata?.fullName, value: respData?.metadata?.fullName },
      email: { isValid: !!respData?.email, value: decryptStr(respData?.email) },
      mobileNo: { isValid: !!respData?.mobileNo?.split("|")?.[1], value: respData?.mobileNo?.split("|")?.[1] },
      password: { isValid: !!respData?.metadata?.password, value: respData?.metadata?.password },
      confirmPassword: { isValid: !!respData?.metadata?.confirmPassword, value: respData?.metadata?.confirmPassword },
      dob: respData?.metadata?.dob ? { isValid: !!moment(respData?.metadata?.dob, "DD-MM-YYYY")?.toDate(), value: moment(respData?.metadata?.dob, "DD-MM-YYYY")?.toDate() } : { isValid: false, value: null },
      pob: { isValid: !!respData?.metadata?.pob, value: respData?.metadata?.pob },
      address: { isValid: !!respData?.metadata?.address, value: respData?.metadata?.address },
      longLatAddress: { isValid: !!respData?.metadata?.longLatAddress, value: respData?.metadata?.longLatAddress },
    });
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

  const inputUtjArr = [
    inputs?.utj?.isValid
  ];

  const isSecondary = JSON.parse(window.localStorage.getItem("detailProperti"))?.detailProperti?.groupProperti ? decryptStr(JSON.parse(window.localStorage.getItem("detailProperti"))?.detailProperti?.groupProperti)?.split("|")[1] === "PROPERTI_SECONDARY" ? true : false : false

  const stepperContent = [
    {
      label: "Data Diri",
      content: (
        <DataDiri
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
        />
      ),
    },
    ...(localStorage.getItem("infolelangUtj") || isSecondary
      ? []
      : [
          {
            label: "UTJ",
            content: (
              <UtjVisitor
                inputs={inputs}
                selectedOption={selectedOption}
                handleInput={{ handleUtj }}
                setInputs={setInputs}
                setSelectedOption={setSelectedOption}
                handleOptionChange={handleOptionChange}
              />
            ),
          },
        ]),
    {
      label: "Ringkasan",
      content: (
        <SummarySubmitKpr
          inputs={inputs}
          dataAddressKTP={dataAddressKTP}
          dataAddress={dataAddress}
          selectedOption={selectedOption}
          itemBrivaVisitor={itemBrivaVisitor}
          waktuKontak={waktuKontak}
          setItemBrivaVisitor={setItemBrivaVisitor}
        />
      ),
    },
  ];  

  const submitGenerateBrivaVisitor = () => {
    if (selectedOption !== 'Paid') {
      dispatch(
        generateBrivaVisitor(inputs, setItemBrivaVisitor)
      );
    }
  }
  const submitStepperKprVisitor = () => {
    const PaidInfolelang = localStorage.getItem("infolelangUtj") === "PaidInfolelang";
     
    if (PaidInfolelang) {
      dispatch(setSoldInfolelang(inputs, JSON.parse(window.localStorage.getItem("detailProperti"))?.responseData?.id, JSON.parse(window.localStorage.getItem("simulasiCalc")),waktuKontak, selectedOption, dataAddress, JSON.parse(window.localStorage.getItem("detailProperti"))?.detailProperti?.id, setItemIdPengajuan));
    }  
   else {
    dispatch(
      submitVisitorKpr(encryptStr(inputs?.email?.value), inputs, waktuKontak, selectedOption, JSON.parse(window.localStorage.getItem("simulasiCalc")), dataAddress, JSON.parse(window.localStorage.getItem("detailProperti"))?.detailProperti?.id, setItemIdPengajuan, setItemDokuGenerateLink, isSecondary)
    );
    localStorage.setItem("ratingModal", "true");
  }
}

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
            closeModal={() => navigate("/")}
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
        <StepperKpr
          stepperContent={stepperContent}
          submitGenerateBrivaVisitor={submitGenerateBrivaVisitor}
          submitStepperKprVisitor={submitStepperKprVisitor}
          inputStep1Arr={inputStep1Arr}
          dataAddressArr={dataAddressArr}
          inputUtjArr={inputUtjArr}
          selectedOption={selectedOption}
          itemBrivaVisitor={itemBrivaVisitor}
          inputs={inputs}
          isInline
        />
      </div>
      <div style={{ flex: 1 }}></div>
      <Footer />
    </div>
  );
};

export default PengajuanKpr;
