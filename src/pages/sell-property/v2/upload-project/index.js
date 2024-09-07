/* eslint-disable react-hooks/exhaustive-deps */
import JSZip from "jszip";
import _ from "lodash-contrib";
import { useEffect, useState } from "react";
import { useDropzone } from 'react-dropzone';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { StepperUploadProject } from "../../../../components/atoms";
import { Footer } from "../../../../components/molecules";
import { Modal } from '../../../../components/organisms';
import FooterSuccessRegV2 from "../../../../components/organisms/Modal/modal-types/footer/v2/SuccessReg";
import { compressImage } from "../../../../helpers/imageCompressor";
import useFormStepperHooksV2 from "../../../../hooks/v2/useFormStepperHooks";
import useListPropertyHooksV2 from "../../../../hooks/v2/useListPropertyHooks";
import useSellPropsHooksV2 from "../../../../hooks/v2/useSellPropsHooksV2";
import { setPrjGrupProp } from "../../../../store/actions/changeUploadProjectReducer";
import { inquiryUserSellProp } from "../../../../store/actions/fetchData/sellPropState";
import { closeModalFail, closeModalSuccess, showModalFail } from '../../../../store/actions/fetchData/superAdminState';
import { projectDetail } from "../../../../store/actions/fetchData/v2/detailProject";
import { saveProject, sendProjectBrispot } from "../../../../store/actions/fetchData/v2/saveProject";
import DetailProject from "./detail-project";
import TypeUnit from "./type-unit";

const UploadProyek = ({ userStatus, email, editMode }) => {
  const { id } = useParams();
  const [queryParam] = useSearchParams();
  const { files, setFiles, setImgFiles } = useSellPropsHooksV2();
  const { listClusterUnit, setListClusterUnit } = useListPropertyHooksV2();
  const { inputs, setInputs, handleInputChange, handleCheckboxChange, handleRadioDropChange, handleLetterNumberInput, handleAllCharInput, handleAltInput, handleRangePrice, handleMobileNo, initiateStateV2, initiateState,handleDateInput, handleNumberInput, dropdownVal, setDropdownVal, dropdownJarak, setDropdownJarak, fasAksesPropertiDto, setFasAksesPropertiDto, handleAddField, handleAdditionalFieldChange, newFieldAkses, setNewFieldAkses, handleDeleteNewField } = useFormStepperHooksV2();
  const saState = useSelector((state) => state.superAdminReducer);
  const stateSellProp = useSelector(state => state.sellPropertyReducer);
  const uploadProjectState = useSelector((state) => state.uploadProjectReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const group = "#USER#|#TYPE#|#PRJNAME#";
  let groupAfter = "";
  let clusterInput = [];
  let listPropInput = [];
  if (queryParam?.get("from") === "editProperty") {
    groupAfter = group.replace("#USER#", "PRJ").replace("#TYPE#", stateSellProp.devName.replace(/\W/g, "").toUpperCase()).replace("#PRJNAME#", uploadProjectState?.projectInfo?.project?.namaProyek?.replace(/\W/g, "").toUpperCase());
  } else {
    groupAfter = group.replace("#USER#", "PRJ").replace("#TYPE#", stateSellProp.devName.replace(/\W/g, "").toUpperCase()).replace("#PRJNAME#", uploadProjectState?.projectInfo?.namaProyek?.value?.replace(/\W/g, "").toUpperCase());
  }
  const [isDeleteProp, setIsDeleteProp] = useState(false);
  const [brochureFile, setBrochureFile] = useState({
    file: "",
    name: "",
    selected: false
  });
  const [siteplanFile, setSiteplanFile] = useState({
    file: "",
    name: "",
    selected: false
  });
  const [pricelistFile, setPricelistFile] = useState({
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
  
  // console.log("[DEBUG] project dataAddress : ", dataAddress);

  const stringMinified = "{\"alamat\":\"" + dataAddress.address + "\",\"rt\":\"" + dataAddress.rt.replace(/ /g, '') + "\",\"rw\":\"" + dataAddress.rw.replace(/ /g, '') + "\",\"kodePos\":\"" + dataAddress.posCode + "\",\"provinsi\":\"" + dataAddress.province + "\",\"kabupaten\":\"" + dataAddress.subDistrict + "\",\"kecamatan\":\"" + dataAddress.district + "\",\"kelurahan\":\"" + dataAddress.urbanVillage + "\"}";

  useEffect(() => {
    setInputs({
      ...inputs,
      alamat: stringMinified,
      longLat: dataAddress.lng + "," + dataAddress.lat
    })
  }, [dataAddress]);

  useEffect(() => {
    dispatch(inquiryUserSellProp(email));
    dispatch(setPrjGrupProp(groupAfter));
  }, [email]);

  useEffect(() => {
    dispatch(setPrjGrupProp(groupAfter));
  }, [stateSellProp?.devName, inputs?.namaProyek?.value]);

  const zip = new JSZip();
  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    onDrop: (acceptedFiles) => {
      acceptedFiles.forEach((file) => {
        if (file.size <= 1000000) {
          setImgFiles(file, URL.createObjectURL(file));
        } else {
          const compressedImage = compressImage(file);
          compressedImage.then(function (result) {
            setImgFiles(result, URL.createObjectURL(result));
          }, function (err) {
            dispatch(showModalFail("Gagal", "Kompresi File Gagal"));
          });
        }
      })
    }
  });

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

  const inputDetailProjectArr = [
    inputs?.namaProyek?.isValid,
    inputs?.startRangePrice?.isValid,
    inputs?.endRangePrice?.isValid,
    inputs?.picProyek?.isValid,
    inputs?.noHpPic?.isValid,
    inputs?.tipeProperti?.isValid,
    inputs?.jenisProperti?.isValid,
    inputs?.deskripsi?.isValid,
    files.length >= 4
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
    dataAddress?.rt?.length > 0 && dataAddress?.rt?.length <= 3,
    dataAddress?.rw?.length > 0 && dataAddress?.rw?.length <= 3,
    dataAddress?.posCode?.length === 5,
    dataAddress?.province?.length > 0 && dataAddress?.province?.length <= 50,
    dataAddress?.subDistrict?.length > 0 && dataAddress?.subDistrict?.length <= 50,
    dataAddress?.district?.length > 0 && dataAddress?.district?.length <= 50,
    dataAddress?.urbanVillage?.length > 0 && dataAddress?.urbanVillage?.length <= 50,
  ];

  useEffect(() => {
    dispatch(inquiryUserSellProp(email));
    if (window.location.pathname.includes("edit-project") && _.isEmpty(uploadProjectState?.projectInfo)) {
      dispatch(projectDetail({ email: email, projectId: id, setDataWithVal: initiateStateV2, setData: initiateState, setImgFiles: setImgFiles, setDataAddress: setDataAddress, setBrochureFile: setBrochureFile, setLoadingFile: setLoadingFile }));
    }
  }, []);

  // console.log("[DEBUG] ID MASUK - brosurProjectId : ", uploadProjectState?.brosurProjectId)
  // console.log("[DEBUG] ID MASUK - imageProjectId : ", uploadProjectState?.imageProjectId)

  // console.log("[DEBUG] halaman pertama - projectPhoto Masuk sini : ", uploadProjectState?.projectPhoto);
  // console.log("[DEBUG] halaman pertama - brochure Masuk sini : ", uploadProjectState?.brochure);
  // console.log("[DEBUG] halaman pertama - project photo files Masuk sini : ", files);
  // console.log("DEBUG Tanggal Akhir Proyek", inputs);
  const stepperContent = [
    {
      label: "Detail Proyek",
      content: <DetailProject inputs={inputs} brochureFile={brochureFile} loadingFile={loadingFile} setBrochureFile={setBrochureFile} handleDeleteNewField={handleDeleteNewField} handleRadioDropChange={handleRadioDropChange} handleCheckboxChange={handleCheckboxChange} handleInputChange={handleInputChange} files={files} setFiles={setFiles} zip={zip} getRootProps={getRootProps} getInputProps={getInputProps} removeItem={removeItem} handleOnDragEnd={handleOnDragEnd} dataAddress={dataAddress} setDataAddress={setDataAddress} onChangeAddress={onChangeAddress} handleLetterNumberInput={handleLetterNumberInput} handleAllCharInput={handleAllCharInput} handleAltInput={handleAltInput} handleRangePrice={handleRangePrice} handleMobileNo={handleMobileNo} handleDateInput={handleDateInput} siteplanFile={siteplanFile} setSiteplanFile={setSiteplanFile} pricelistFile={pricelistFile} setPricelistFile={setPricelistFile} handleNumberInput={handleNumberInput} dropdownVal={dropdownVal} setDropdownVal={setDropdownVal} dropdownJarak={dropdownJarak} setDropdownJarak={setDropdownJarak} fasAksesPropertiDto={fasAksesPropertiDto} setFasAksesPropertiDto={setFasAksesPropertiDto} handleAddField={handleAddField} handleAdditionalFieldChange={handleAdditionalFieldChange} newFieldAkses={newFieldAkses} setNewFieldAkses={setNewFieldAkses} idProject={uploadProjectState?.idProperty}/>,
    },
    {
      label: "Tipe Unit",
      content: <TypeUnit isDeleteProp={isDeleteProp} setIsDeleteProp={setIsDeleteProp} listClusterUnit={listClusterUnit} setListClusterUnit={setListClusterUnit} />,
    }
  ];
  const submitStepper = () => {
    dispatch(saveProject({
      prjId: uploadProjectState?.idProperty,
      inputs: { ...inputs, ...uploadProjectState?.projectInfo, ...uploadProjectState?.clusterInfoDto, newFieldAkses},
      dataAddress: uploadProjectState?.address,
      addressJsonData: uploadProjectState?.addressJson,
      brochureFile: uploadProjectState?.brosurProjectId === "" ? brochureFile.file : null,
      siteplanFile: uploadProjectState?.siteplanId === "" ? siteplanFile.file : null,
      pricelistFile: uploadProjectState?.pricelistId === "" ? pricelistFile.file : null,
      prjPhoto: uploadProjectState?.imageProjectId === "" ? files : null,
      userName: email,
      group: groupAfter,
      clusterData: clusterInput,
      listPropData: listPropInput,
      type: "project",
      brosurProjectId: uploadProjectState?.brosurProjectId,
      siteplanProjectId: uploadProjectState?.siteplanId,
      pricelistProjectId: uploadProjectState?.pricelistId, 
      imageProjectId: uploadProjectState?.imageProjectId,
    }));
    dispatch(sendProjectBrispot({
      prjId: uploadProjectState?.idProperty,
      userName: email,
    }))
  };
  // console.log("[DEBUG DIMAS] uploadProjectState",uploadProjectState);
  return (
    <div>
      {saState.success === true && <Modal closeModal={() => { dispatch(closeModalSuccess()); !isDeleteProp && navigate("/profile-user/property-listing"); setIsDeleteProp(false) }} modalTypes="modalSF" title="" titleBody={saState.titleSuccess} descBody={saState.msgSuccess} btnBottom={<FooterSuccessRegV2 />} />}
      {saState.fail === true && <Modal closeModal={() => { dispatch(closeModalFail()); }} modalTypes="modalSF" title="" titleBody={saState.titleFail} descBody={saState.msgFail} />}
      <div className="stepper-container">
        <StepperUploadProject stepperContent={stepperContent} submitStepper={submitStepper} isInline inputs={inputs} setInputs={setInputs} files={files} setFiles={setFiles} userStatus={userStatus} inputDetailProjectArr={inputDetailProjectArr} dataAddressArr={dataAddressArr} dataAddress={dataAddress} setDataAddress={setDataAddress} brochureFile={brochureFile} setBrochureFile={setBrochureFile} stringMinified={stringMinified} listClusterUnit={listClusterUnit} siteplanFile={siteplanFile} setSiteplanFile={setSiteplanFile} 
        pricelistFile={pricelistFile} setPricelistFile={setPricelistFile}/>
      </div>
      <Footer />
    </div>
  );
};

export default UploadProyek;
