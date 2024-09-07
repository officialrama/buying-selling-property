/* eslint-disable react-hooks/exhaustive-deps */
import cookie from "hs-cookie";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { StepperInsurance, StepperKpr } from "../../../../components/atoms";
import { Footer } from "../../../../components/molecules";
import { Modal } from "../../../../components/organisms";
import { decryptStr, encryptStr } from "../../../../helpers/encryptDecrypt";
import useFormStepperHooks from "../../../../hooks/useFormStepperHooks";
import useKprApprovalHooks from "../../../../hooks/useKprApprovalHooks";
import { areacodeConst } from "../../../../static/areacodeConst";
import {
  closeModalFail,
  inquiryUser,
  showModalFail,
  showSuccessPengajuan
} from "../../../../store/actions/fetchData/superAdminState";
import { generateBrivaVisitor, generateLinkDoku, submitKpr, submitVisitorKpr } from "../../../../store/actions/fetchData/uploadFile";
import DataDiriAsuransi from "../data-diri-asuransi";
import SummaryAsuransi from "../summary-asuransi";
import { useLocation, useNavigate } from "react-router-dom";
import { showUserPaymentModal } from "../../../../store/actions/changeModalState";
import { insuranceReference } from "../../../../store/actions/fetchData/insurancePremi";

const PengajuanAsuransi = () => {
  const location = useLocation();
  const { name, href } = location?.state || {};
  const saState = useSelector((state) => state.superAdminReducer);
  const { inputs, utjInputs, selectedOption, setUtjInputs, setInputs, setSelectedOption, initiateState, handleInputChange, handleOptionChange, handleAllCharInput, handleLetterNumberInput, handleLetterInput, handleNumberInput, handleDateInputChange, handleRadioDropChange, handleAltInput, handleAreaCode, handleName, handleMobileNo, handleEmail, handleUtj, handleWaktuKontak, waktuKontak, setWaktuKontak, } = useFormStepperHooks();
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
      dob: respData?.metadata?.dob ? { isValid: !!moment(respData?.metadata?.dob, "DD-MM-YYYY")?.toDate(), value: moment(respData?.metadata?.dob, "DD-MM-YYYY")?.toDate() } : { isValid: false, value: null },
      address: { isValid: !!respData?.metadata?.address, value: respData?.metadata?.address },
    });
    initiateState({
      mobileNoArea: areacodeConst.filter((e) => e.value === saState?.resApi?.responseData?.[0]?.mobileNo?.split("|")?.[0])[0] || areacodeConst.filter((e) => e.value === "+62")[0]
    })
  }, [saState.resApi]);

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

  const inputStep1Arr = [
    inputs?.nik?.isValid,
    inputs?.fullName?.isValid,
    inputs?.noRekeningSimpanan?.isValid,
    inputs?.dob?.isValid,
    waktuKontak !== "",
    inputs?.mobileNo?.isValid,
    dropdownVal?.tujuanNasabah?.value !== "",
  ];

  const dataAddressArr = [
    !!dataAddress?.address,
    !!dataAddress?.posCode,
    !!dataAddress?.province,
    !!dataAddress?.subDistrict,
    !!dataAddress?.district,
    !!dataAddress?.urbanVillage,
    dataAddress?.address?.length > 3,
    dataAddress?.posCode?.length === 5,
    dataAddress?.province?.length > 3 && dataAddress?.province?.length <= 50,
    dataAddress?.subDistrict?.length > 3 && dataAddress?.subDistrict?.length <= 50,
    dataAddress?.district?.length > 3 && dataAddress?.district?.length <= 50,
    dataAddress?.urbanVillage?.length > 3 && dataAddress?.urbanVillage?.length <= 50,
  ];

  const inputUtjArr = [
    inputs?.utj?.isValid
  ];

  const stepperContent = [
    {
      label: "Data Diri",
      content: (
        <DataDiriAsuransi
          inputs={inputs}
          dataAddress={dataAddress}
          setDataAddress={setDataAddress}
          dataAddressKTP={dataAddressKTP}
          setDataAddressKTP={setDataAddressKTP}
          setInputs={setInputs}
          mapsState={mapsState}
          setMapsState={setMapsState}
          dropdownVal={dropdownVal}
          setDropdownVal={setDropdownVal}
          handleInput={{ handleDateInputChange, handleLetterNumberInput, handleLetterInput, handleNumberInput, handleInputChange, handleRadioDropChange, initiateState, handleAltInput, handleAreaCode, handleName, handleMobileNo, handleEmail, handleAllCharInput }}
          kcDescVal={kcDescVal}
          setKcDescVal={setKcDescVal}
          kcList={kcList}
          setKcList={setKcList}
          kcOtherList={kcOtherList}
          setKcOtherList={setKcOtherList}
          kcForm={kcForm}
          setKcForm={setKcForm}
          waktuKontak={waktuKontak}
          setWaktuKontak={setWaktuKontak}
          handleWaktuKontak={handleWaktuKontak}
        />
      ),
    },
    // {
    //   label: "Ringkasan",
    //   content: (
    //     <SummaryAsuransi
    //       inputs={inputs}
    //       dataAddress={dataAddress}
    //       dataAddressKTP={dataAddressKTP}
    //       waktuKontak={waktuKontak}
          
    //     />
    //   ),
    // },
  ];


  const submitStepperKprVisitor = () => {
    if (inputStep1Arr.filter(Boolean).length !== 7 || dataAddressArr.filter(Boolean).length !== 12) {
      dispatch(showModalFail("Gagal", "Isian form data diri tidak valid"));
    }
    else if (inputStep1Arr.filter(Boolean).length === 7 || dataAddressArr.filter(Boolean).length === 12) {
      dispatch(
        insuranceReference(inputs, dataAddress, kcList, waktuKontak, href)
      )
    }
  }
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      {saState.fail === true && (
        <Modal
          closeModal={() => dispatch(closeModalFail())}
          modalTypes="modalSF"
          title=""
          titleBody={saState.titleFail}
          descBody={saState.msgFail}
        />
      )}
      {saState.successPengajuan === true && (
        <Modal
          modalTypes="successPengajuan"
          title=""
        />
      )}
      <div className="stepper-container">
        <StepperInsurance
          namebreadcrumb={name}
          hrefbreadcrumb={href}
          stepperContent={stepperContent}
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

export default PengajuanAsuransi;
