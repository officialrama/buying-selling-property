import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import _ from "lodash-contrib"
import { StepperPropertiSecondary } from "../../components/atoms" 
import DetailProperti from "./AddPropertiSecondary/detail-properti"
import InformasiProperti from "./AddPropertiSecondary/informasi-properti"
import KelengkapanRumah from "./AddPropertiSecondary/kelengkapan-rumah"
import Foto from "./AddPropertiSecondary/foto"
import Ringkasan from "./AddPropertiSecondary/ringkasan"
import AksesDanFasilitas from "./AddPropertiSecondary/aksesDanFasilitas"
import useFormStepperHooksV2 from "../../hooks/v2/useFormStepperHooks"
import useSellPropsHooksV2 from "../../hooks/v2/useSellPropsHooksV2"
import { addPropertiSecond, editPropertiSecond } from "../../store/actions/fetchData/admin-cabang"
import { inquiryUserSellProp } from "../../store/actions/fetchData/sellPropState"
import { setPrjGrupProp } from "../../store/actions/changeUploadProjectReducer"
import JSZip from "jszip"
import { useDropzone } from "react-dropzone"
import { compressImage } from "../../helpers/imageCompressor"
import { projectDetail } from "../../store/actions/fetchData/detail-properti-secondary"
import { Modal, NavHeader } from "../../components/organisms"
import { Footer } from "../../components/molecules"
import { phoneNoRegisterRegex } from "../../helpers/regex"
import { closeModalFail, closeModalSuccess } from "../../store/actions/fetchData/superAdminState"
import FooterSuccessRegV2 from "../../components/organisms/Modal/modal-types/footer/v2/SuccessReg"

const AddPropertiSecondary = ({userStatus, email}) => {
    const { id } = useParams()
    const [queryParam] = useSearchParams()
    const { 
        files, 
        setFiles, 
        setImgFiles,
        dropdownVal, 
        setDropdownVal } = useSellPropsHooksV2()
    const saState = useSelector((state) => state.superAdminReducer)
    const uploadProjectState = useSelector((state) => state.uploadProjectReducer)
    const stateSellProp = useSelector(state => state.sellPropertyReducer)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const group = "#AGENPROPERTI#|PROPERTI_SECONDARY|#PROYEKNAME#"
    let groupAfter = ""
    let clusterInput = []
  let listPropInput = []
    if (queryParam?.get("from") === "editProperty") {
        groupAfter = group.replace("#AGENPROPERTI#", uploadProjectState?.projectInfo?.namaAgen?.value).replace("#PROYEKNAME#", uploadProjectState?.projectInfo?.project?.namaProyek);
      } else {
        groupAfter = group.replace("#AGENPROPERTI#", uploadProjectState?.projectInfo?.namaAgen?.value).replace("#PROYEKNAME#", uploadProjectState?.projectInfo?.namaProyek?.value);
      }
    const { 
      inputs, 
      setInputs, 
      handleInputChange, 
      handleCheckboxChange, 
      handleRadioDropChange, 
      handleLetterNumberInput,
      handleAllCharInput, 
      initiateStateV2, 
      initiateState,
      handleDateInputChange,
      handleCurrency,
      handleNumberInput,
      handleAreaCode,
      fasAksesPropertiDto, 
      setFasAksesPropertiDto,
      newFieldAkses,
      setNewFieldAkses,
      handleAddField,
      handleDeleteNewField,
      handleAdditionalFieldChange
     } = useFormStepperHooksV2()

        const [isDeleteProp, setIsDeleteProp] = useState(false)
        const [isEdit, setIsEdit] = useState(false)
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
    })
    const [loadingFile, setLoadingFile] = useState(false);
    const [dataAddress, setDataAddress] = useState({
        address: "",
        fullAddress: "",
        rt: "",
        rw: "",
        posCode: "",
        province: "",
        subDistrict: "",
        district: "",
        urbanVillage: "",
        lng: "",
        lat: ""
    })

    const onChangeAddress = (key, value) => {
        setDataAddress({ ...dataAddress, [key]: value });
    }

    // const stringMinified = "{\"alamat\":\"" + dataAddress.address + "\",\"rt\":\"" + dataAddress.rt.replace(/ /g, '') + "\",\"rw\":\"" + dataAddress.rw.replace(/ /g, '') + "\",\"kodePos\":\"" + dataAddress.posCode + "\",\"provinsi\":\"" + dataAddress.province + "\",\"kabupaten\":\"" + dataAddress.subDistrict + "\",\"kecamatan\":\"" + dataAddress.district + "\",\"kelurahan\":\"" + dataAddress.urbanVillage + "\"}";
    const stringMinified = "{\"alamatLengkap\":\"" + dataAddress.fullAddress + "\",\"alamat\":\"" + dataAddress.address + "\",\"rt\":\"" + dataAddress.rt.replace(/ /g, '') + "\",\"rw\":\"" + dataAddress.rw.replace(/ /g, '') + "\",\"kodePos\":\"" + dataAddress.posCode + "\",\"provinsi\":\"" + dataAddress.province + "\",\"kabupaten\":\"" + dataAddress.subDistrict + "\",\"kecamatan\":\"" + dataAddress.district + "\",\"kelurahan\":\"" + dataAddress.urbanVillage + "\"}";
    
    useEffect(() => {
        setInputs({
          ...inputs,
          alamat: stringMinified,
          alamatLengkap: inputs?.alamatLengkap ? inputs?.alamatLengkap : dataAddress.fullAddress,
          longLat: dataAddress.lng + "," + dataAddress.lat
        })
      }, [dataAddress])

    useEffect(() => {
      if(inputs?.alamatLengkap?.isValid){
        setDataAddress({ ...dataAddress, fullAddress: inputs?.alamatLengkap?.value })
      }
    },[inputs?.alamatLengkap])


    useEffect(() => {
        dispatch(inquiryUserSellProp(email))
        dispatch(setPrjGrupProp(groupAfter))
    }, [email])

    useEffect(() => {
        dispatch(setPrjGrupProp(groupAfter));
      }, [stateSellProp?.devName, inputs?.namaProyek?.value])

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
                // dispatch(showModalFail("Gagal", "Kompresi File Gagal"));
              });
            }
          })
        }
    })

    function removeItem(index, imgSrc) {
        URL.revokeObjectURL(imgSrc);
        setFiles((prevState) => ([
          ...prevState.slice(0, index), ...prevState.slice(index + 1)
        ]))
    }

    const handleOnDragEnd = (result) => {
      if (!result.destination) return
      const items = Array.from(files)
      const [reorderedItem] = items.splice(result.source.index, 1)
      items.splice(result.destination.index, 0, reorderedItem)
      setFiles(items)
    }

    const handleMobileNo = (event) => {
      event.persist()
      if (!phoneNoRegisterRegex.test(event.target.value) && event.target.value.length > 0) {
          setInputs({
              ...inputs,
              [event.target.name]: {
                  isValid: false,
                  value: event.target.value.replace(/[^0-9]/i, ""),
                  msgError: "No Handphone yang dimasukkan belum benar",
              },
          })
      } else if (event.target.value.length === 0) {
          setInputs({
              ...inputs,
              [event.target.name]: {
                  isValid: false,
                  value: event.target.value.replace(/[^0-9]/i, ""),
                  msgError: "No Handphone tidak boleh kosong",
              },
          })
      } else {
          setInputs({
              ...inputs,
              [event.target.name]: {
                  isValid: true,
                  value: event.target.value.replace(/[^0-9]/i, ""),
                  msgError: "",
              },
          })
      }
  }

    const inputDetailProjectArr = [
        inputs?.namaAgen?.isValid,
        inputs?.tipeProperti?.isValid,
        inputs?.namaProyek?.isValid,
        inputs?.namaPIC?.isValid,
        inputs?.hargaAkhir?.isValid,
        inputs?.hargaProperti?.isValid,
        inputs?.NohpPic?.isValid,
        inputs?.alamatLengkap?.isValid
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
        dataAddress?.rt?.length > 0 && dataAddress?.rt?.length <= 3,
        dataAddress?.rw?.length > 0 && dataAddress?.rw?.length <= 3,
        dataAddress?.posCode?.length === 5,
        dataAddress?.province?.length > 0 && dataAddress?.province?.length <= 50,
        dataAddress?.subDistrict?.length > 0 && dataAddress?.subDistrict?.length <= 50,
        dataAddress?.district?.length > 0 && dataAddress?.district?.length <= 50,
        dataAddress?.urbanVillage?.length > 0 && dataAddress?.urbanVillage?.length <= 50,
    ]

    const informasiProperti = [
      inputs?.lt?.isValid,
      inputs?.lb?.isValid,
      inputs?.jmlKmrTidur?.isValid,
      inputs?.jmlKmrMandi?.isValid,
      inputs?.jmlLantai?.isValid,
      inputs?.kamarPembantu?.isValid,
      inputs?.hadapRumah?.isValid,
      inputs?.tahunBangun?.isValid,
      inputs?.dayaListrik?.isValid,
      !!inputs?.sertifikat?.value
    ]
    const kelengkapanRumah = [
      inputs?.dapur,
      inputs?.ruangKeluarga,
      inputs?.ruangKerja,
      inputs?.jalurListrik,
      inputs?.jalurTelepon,
      inputs?.jalurPDAM,
      inputs?.rumahSakit,
      inputs?.jalanTol,
      inputs?.sekolah,
      inputs?.mall,
      inputs?.bankAtm,
      inputs?.taman,
      inputs?.pasar,
      inputs?.farmasi,
      inputs?.rumahIbadah,
      inputs?.restoran,
      inputs?.bioskop,
      inputs?.bandara,
      inputs?.halte,
      inputs?.stasiun,
      inputs?.spbu,
      inputs?.furnished,
      inputs?.tempatParkir,
      inputs?.keamanan,
      inputs?.kolamRenang,
      inputs?.penghijauan,
      inputs?.lift,
      inputs?.clubHouse,
      inputs?.internetProvider,
      inputs?.gym,
      !!inputs?.garasi
    ]

    const submitStepper = () => {
      if (window.location.pathname.includes("edit-properti")){
        dispatch(editPropertiSecond({
          inputs: { ...inputs, ...uploadProjectState?.projectInfo, ...uploadProjectState?.clusterInfoDto },
          newFieldAkses: newFieldAkses,
          files: files,
          group: groupAfter,
          userName: email,
          addressJsonData: uploadProjectState?.addressJson,
          unitPhoto: !_.isEqual(files, uploadProjectState?.propPhoto) ? files : null,
        }))
      } else {
        dispatch(addPropertiSecond({
          prjId: uploadProjectState?.idProperty,
          inputs: { ...inputs, ...uploadProjectState?.projectInfo, ...uploadProjectState?.clusterInfoDto },
          newFieldAkses: newFieldAkses,
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
          dropdownVal: dropdownVal
        }))
      }
      navigate('/admin-cabang/list-properti')
    }

    useEffect(() => {
        dispatch(inquiryUserSellProp(email))
        if (window.location.pathname.includes("edit-properti") && _.isEmpty(uploadProjectState?.projectInfo)) {
            dispatch(projectDetail(
                {
                  email: email,
                  inputs: inputs,
                  setInputs: setInputs,
                  projectId: id,
                  setDataWithVal: initiateStateV2, 
                  setData: initiateState, 
                  setImgFiles: setImgFiles, 
                  setDataAddress: setDataAddress, 
                  setLoadingFile: setLoadingFile,
                  dropdownVal: dropdownVal,
                  setDropdownVal: setDropdownVal,
                  setFasAksesPropertiDto: setFasAksesPropertiDto
                }
              )
            )
            setIsEdit(true)
        }    
    }, [])

    const stepperContent = [
        {
          label: "Detail Properti",
          isComplete: false,
          content: <DetailProperti
                inputs={inputs}
                setInputs={setInputs}
                dataAddress={dataAddress}
                setDataAddress={setDataAddress}
                onChangeAddress={onChangeAddress}
                handleProps={{
                    handleLetterNumberInput,
                    handleAllCharInput,
                    handleDateInputChange,
                    handleRadioDropChange,
                    dropdownVal, 
                    setDropdownVal,
                    handleCurrency,
                    handleNumberInput,
                    handleMobileNo,
                    handleAreaCode,
                    handleInputChange,
                }}
            />,
        },
        {
          label: "Informasi Properti",
          isComplete: false,
          content: <InformasiProperti 
                inputs={inputs}
                setInputs={setInputs}
                handleProps={{
                    handleNumberInput,
                    setDropdownVal,
                    handleCheckboxChange,
                    handleRadioDropChange,
                    handleDateInputChange,
                    handleInputChange
                }}
                dropdownVal={dropdownVal}
            />
        },
        {
            label: "Kelengkapan Rumah",
            isComplete: false,
            content: <AksesDanFasilitas 
              inputs={inputs}
              setInputs={setInputs}
              handleProps={{
                handleCheckboxChange
              }}
              fasAksesPropertiDto={fasAksesPropertiDto}
              newFieldAkses={newFieldAkses}
              dropdownVal={dropdownVal}
              handleDeleteNewField={handleDeleteNewField}
              handleAddField={handleAddField}
              handleAdditionalFieldChange={handleAdditionalFieldChange}
            />
        },
        {
            label: "Foto & Video",
            isComplete: false,
            content: <Foto
                inputs={inputs}
                files={files}
                setFiles={setFiles}
                zip={zip}
                getRootProps={getRootProps}
                getInputProps={getInputProps}
                removeItem={removeItem}
                otherProps={{
                  handleInputChange
                }}
            />
          },
          {
            label: "Ringkasan",
            isComplete: false,
            content: <Ringkasan 
                files={files}
                dataAddress={dataAddress}
                inputs={inputs}
                fasAksesPropertiDto={fasAksesPropertiDto}
                newFieldAkses={newFieldAkses}
            />
          }
    ]

    return (
        <div>
          {saState.success === true && <Modal closeModal={() => { dispatch(closeModalSuccess()); !isDeleteProp && navigate(-1); setIsDeleteProp(false) }} modalTypes="modalSF" title="" titleBody={saState.titleSuccess} descBody={saState.msgSuccess} btnBottom={<FooterSuccessRegV2 />} />}
          {saState.fail === true && <Modal closeModal={() => { dispatch(closeModalFail()); }} modalTypes="modalSF" title="" titleBody={saState.titleFail} descBody={saState.msgFail} />}
            <div>
              <NavHeader />
                <StepperPropertiSecondary 
                    stepperContent={stepperContent} 
                    submitStepper={submitStepper}
                    isInline 
                    inputs={inputs} 
                    setInputs={setInputs} 
                    files={files} 
                    setFiles={setFiles} 
                    userStatus={userStatus} 
                    inputDetailProjectArr={inputDetailProjectArr} 
                    dataAddressArr={dataAddressArr} 
                    dataAddress={dataAddress} 
                    setDataAddress={setDataAddress} 
                    brochureFile={brochureFile} 
                    setBrochureFile={setBrochureFile} 
                    stringMinified={stringMinified} 
                    siteplanFile={siteplanFile} 
                    setSiteplanFile={setSiteplanFile} 
                    pricelistFile={pricelistFile} 
                    setPricelistFile={setPricelistFile}
                    isEdit={isEdit}
                    otherChecker={{
                      informasiProperti,
                      kelengkapanRumah
                    }} />
            </div>
            {/* <Footer /> */}
        </div>
    )
}

export default AddPropertiSecondary