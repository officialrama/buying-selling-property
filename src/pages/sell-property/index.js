/* eslint-disable react-hooks/exhaustive-deps */
import JSZip from 'jszip';
import React, { useEffect, useState } from "react";
import { useDropzone } from 'react-dropzone';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from 'react-router-dom';
import { StepperSell } from "../../components/atoms";
import { Footer } from "../../components/molecules";
import { Modal } from '../../components/organisms';
import FooterSuccessReg from '../../components/organisms/Modal/modal-types/footer/SuccessReg';
import useFormStepperHooks from '../../hooks/useFormStepperHooks';
import useSellPropsHooks from "../../hooks/useSellPropsHooks";
import { inquiryDetailProps } from "../../store/actions/fetchData/inquiryDetailProp";
import { inquiryUserSellProp } from '../../store/actions/fetchData/sellPropState';
import { closeModalFail, closeModalSuccess, showModalFail } from '../../store/actions/fetchData/superAdminState';
import { uploadZipAndAddProp } from "../../store/actions/fetchData/uploadFile";
import SellAdditionalInfo from "./additional-info";
import SellPropAddress from "./address";
import SellDetailProp from "./detail-property";
import SellPhotoProperty from "./photo-property";
import { compressImage } from '../../helpers/imageCompressor';

const SellProperty = ({ userStatus, email, editMode }) => {
  const { id } = useParams();
  const { dropdownVal, setDropdownVal, files, setFiles, setImgFiles } = useSellPropsHooks();
  const { inputs, setInputs, handleInputChange, initiateState, handleDateInputChange, handleCheckboxChange, handleLetterNumberInput, handleNumberInput, handleRadioDropChange, handleCurrency, handlePromoCodeInput, handleAllCharInput } = useFormStepperHooks();
  const saState = useSelector((state) => state.superAdminReducer);
  const stateSellProp = useSelector(state => state.sellPropertyReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const group = "#USER#_#TYPE#";
  let groupAfter = "";
  if (userStatus === "developer") {
    groupAfter = group.replace("#USER#", "PRJ").replace("#TYPE#", stateSellProp.devName.replace(/\W/g, "_").toUpperCase());
  } else if (userStatus === "visitor") {
    groupAfter = group.replace("#USER#", "IND").replace("#TYPE#", inputs?.tipeProperti?.value?.toUpperCase());
  }
  const [brochureFile, setBrochureFile] = useState({
    file: "",
    name: "",
    selected: false
  });
  const [loadingFile, setLoadingFile] = useState(false);
  const [dataAddress, setDataAddress] = useState({
    address: "",
    rt: "",
    rw: "",
    posCode: "",
    province: "",
    subDistrict: "",
    district: "",
    urbanVillage: "",
    lng: "",
    lat: ""
  });
  const onChangeAddress = (key, value) => {
    setDataAddress({ ...dataAddress, [key]: value });
  };
  const stringMinified = "{\"alamat\":\"" + dataAddress.address + "\",\"rt\":\"" + dataAddress.rt.replace(/ /g, '') + "\",\"rw\":\"" + dataAddress.rw.replace(/ /g, '') + "\",\"kodePos\":\"" + dataAddress.posCode + "\",\"provinsi\":\"" + dataAddress.province + "\",\"kabupaten\":\"" + dataAddress.subDistrict + "\",\"kecamatan\":\"" + dataAddress.district + "\",\"kelurahan\":\"" + dataAddress.urbanVillage + "\"}";
  useEffect(() => {
    setInputs({
      ...inputs,
      alamat: stringMinified,
      longLat: dataAddress.lng + "," + dataAddress.lat
    })
  }, [dataAddress])
  const zip = new JSZip();
  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    onDrop: (acceptedFiles) => {
      acceptedFiles.forEach((file) => {
        if (file.size <= 1000000) {
          setImgFiles(file, URL.createObjectURL(file));
        } else {
          const compressedImage = compressImage(file);
          compressedImage.then(function(result) {
            setImgFiles(result, URL.createObjectURL(result));
          }, function(err) {
            dispatch(showModalFail("Gagal", "Kompresi File Gagal")); 
          });
        }
      })
    }
  })
  function removeItem(index, imgSrc) {
    URL.revokeObjectURL(imgSrc);
    setFiles((prevState) => ([
      ...prevState.slice(0, index), ...prevState.slice(index + 1)
    ]));
  }
  const handleOnDragEnd = (result) => {
    if (!result.destination) return

    const items = Array.from(files)
    const [reorderedItem] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, reorderedItem)

    setFiles(items)
  };
  useEffect(() => {
    dispatch(inquiryUserSellProp(email));
    if (id) {
      dispatch(inquiryDetailProps(id, email, initiateState, setDataAddress, setDropdownVal, setImgFiles, null, null, setBrochureFile, setLoadingFile));
    }
  }, [email]);

  const inputAlamatArr = [
    inputs?.tipeProperti?.isValid,
    inputs?.jenisProperti?.isValid,
  ];

  const inputDetailArr = [
    inputs?.namaProperti?.isValid,
    inputs?.namaProyek?.isValid,
    brochureFile?.file,
    inputs?.picProyek?.isValid,
    inputs?.deskripsi?.isValid,
    inputs?.lt?.isValid,
    inputs?.lb?.isValid,
    inputs?.jmlKmrTidur?.isValid,
    inputs?.jmlKmrMandi?.isValid,
    inputs?.jmlKmrMandi?.isValid,
    inputs?.hargaProperti?.isValid
  ];

  const addInfoArr = [
    inputs?.sertifikat?.isValid,
    inputs?.jmlLantai?.isValid,
    inputs?.kondisiProperti?.isValid,
    inputs?.dayaListrik?.isValid,
    inputs?.hadapRumah?.isValid,
    inputs?.tahunBangun?.isValid,
    inputs?.kamarPembantu?.isValid,
  ]

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

  const stepperContent = [
    {
      label: "Alamat",
      content: <SellPropAddress userStatus={userStatus} inputs={inputs} setInputs={setInputs} handleInputChange={handleInputChange} handleLetterNumberInput={handleLetterNumberInput} handleNumberInput={handleNumberInput} initiateState={initiateState} handleRadioDropChange={handleRadioDropChange} dataAddress={dataAddress} setDataAddress={setDataAddress} onChangeAddress={onChangeAddress} />,
    },
    {
      label: "Detail Properti",
      content: <SellDetailProp userStatus={userStatus} inputs={inputs} handleLetterNumberInput={handleLetterNumberInput} handleNumberInput={handleNumberInput} handlePromoCodeInput={handlePromoCodeInput} initiateState={initiateState} handleRadioDropChange={handleRadioDropChange} brochureFile={brochureFile} setBrochureFile={setBrochureFile} dropdownVal={dropdownVal} setDropdownVal={setDropdownVal} handleCurrency={handleCurrency} handleAllCharInput={handleAllCharInput} loadingFile={loadingFile} />,
    },
    {
      label: "Informasi Tambahan",
      content: <SellAdditionalInfo userStatus={userStatus} inputs={inputs} handleInputChange={handleInputChange} handleLetterNumberInput={handleLetterNumberInput} handleNumberInput={handleNumberInput} initiateState={initiateState} handleRadioDropChange={handleRadioDropChange} handleCheckboxChange={handleCheckboxChange} dropdownVal={dropdownVal} setDropdownVal={setDropdownVal} handleDateInputChange={handleDateInputChange} />,
    },
    {
      label: "Foto Properti",
      content: <SellPhotoProperty userStatus={userStatus?.userType} inputs={inputs} handleInputChange={handleInputChange} files={files} setFiles={setFiles} zip={zip} getRootProps={getRootProps} getInputProps={getInputProps} removeItem={removeItem} handleOnDragEnd={handleOnDragEnd} />,
    },
  ];

  const submitStepper = () => {
    dispatch(uploadZipAndAddProp(files, brochureFile.file, email, groupAfter, userStatus, inputs, editMode));
  };

  return (
    <div>
      {saState.success === true && <Modal closeModal={() => { dispatch(closeModalSuccess()); navigate("/"); }} modalTypes="modalSF" title="" titleBody={saState.titleSuccess} descBody={saState.msgSuccess} btnBottom={<FooterSuccessReg />} />}
      {saState.fail === true && <Modal closeModal={() => { dispatch(closeModalFail()); }} modalTypes="modalSF" title="" titleBody={saState.titleFail} descBody={saState.msgFail} />}
      <div className="stepper-container">
        <StepperSell stepperContent={stepperContent} submitStepper={submitStepper} isInline inputAlamatArr={inputAlamatArr} dataAddressArr={dataAddressArr} inputDetailArr={inputDetailArr} addInfoArr={addInfoArr} inputs={inputs} setInputs={setInputs} files={files} userStatus={userStatus} />
      </div>
      <Footer />
    </div>
  );
};

export default SellProperty;
