import cookie from "hs-cookie";
import React, { useEffect, useState, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Modal, SnackBar } from "../../components/organisms"
import { ProfileUser } from "../../components/templates"
import { Button } from "../../components/atoms"
import useWindowDimensions from "../../utils/dimensions"
import { 
    closeModalFail,
    closeModalSuccessRdr,
    disableEdit, 
    showModalFail } from "../../store/actions/fetchData/superAdminState"
import { uploadProfilePic, removePP } from "../../store/actions/fetchData/uploadFile"
import { TextboxLabel } from "../../components/molecules"
import { AccordionInput } from "../../components/molecules"
import useREPassHooks from "../../hooks/useREPassHooks"
import { useNavigate } from "react-router-dom"
import { updatePassword, getProfile } from "../../store/actions/fetchData/customer-service"
import { min1CapitalAndNumber, specialCharacter } from "../../helpers/regex";

const ProfileCustomerService = ({email, userStatus}) => {
    const navigate = useNavigate()
    const { width } = useWindowDimensions()
    const dispatch = useDispatch()
    const morgateCookie = cookie.get("morgateCookie")
    const cookieIsExist = morgateCookie && JSON.parse(morgateCookie)
    const [dataTemp, setDataTemp] = useState([])
    const saState = useSelector((state) => state.superAdminReducer)
    const {
        inputs,
        setInputs,
        handlePass,
        handlePassConfirm
    } = useREPassHooks()

    const handleOldPass = event => {
        event.presist()
        setInputs(inputs => ({ ...inputs, [event.target.name]: event.target.value}))
    }

    const [profilePic, setProfilePic] = useState({
        file: "",
        name: "",
        preview: "",
        msgError: ""
    })

    useEffect(() => {
        dispatch(getProfile(email,setDataTemp))
    },[])

    useEffect(() => {
        setInputs({
            id: {
              value: dataTemp?.responseData?.ID
            },
            name: {
              value: dataTemp?.responseData?.NamaPic,
              isValid: !!dataTemp?.responseData?.NamaPic
            },
            kanwil: {
              value: dataTemp?.responseData?.Kanwil,
              isValid: !!dataTemp?.responseData?.Kanwil
            },
            kancab: {
              value: dataTemp?.responseData?.Kancab,
              isValid: !!dataTemp?.responseData?.Kancab
            },
            email: {
              value: dataTemp?.responseData?.Email,
              isValid: !!dataTemp?.responseData?.Email
            },
            password: {
              value: dataTemp?.responseData?.Password,
              isValid: !!dataTemp?.responseData?.Password
            },
            ppUrl: {
              value: dataTemp?.responseData?.PpUrl,
              isValid: !!dataTemp?.responseData?.PpUrl
            }
          })
      }, [dataTemp])

    const inputArr = {
        length: inputs?.newPassword?.value.length >= 8 ? true : false,
        mixedCase: min1CapitalAndNumber.test(inputs?.newPassword?.value),
        specialCharacter: specialCharacter.test(inputs?.newPassword?.value)
    }

    const refProfilePic = useRef(null)
    const resetProfilePic = () => {
        refProfilePic.current.value = null
    }
    return (
        <>
            {saState.fail === true && (
                <SnackBar timeout={5000} message={saState.msgFail} refreshPage={true}/>
            )}
            {saState.success === true && (
                <SnackBar timeout={5000} message={saState.msgSuccess} refreshPage={true}/>
            )}
            <ProfileUser
                userStatus={userStatus}
                isBreadcrumb={true}
                warnPhoto={ saState.fail === true ? saState.msgFail : null}
                data={
                saState.resApi && 
                saState.resApi?.responseData && 
                saState.resApi?.responseData?.[0]}
            >
                <div className="profile-page__wrapper">
                    <div className="pb-6">
                        <span className="font-bold text-[#292929] text-2xl">Profil</span>
                    </div>
                    <div
                        className={`profile-page__body-wrap ${width < 1025 ? "gtc-profile-page-s" : "gtc-profile-page"
                        }`}
                    >
                        <div className="profile-page__left-wrap-unborder">
                            <div className="profile-page__profile-pic-wrap">
                                {!profilePic.preview && !saState.resApi?.responseData?.[0].ppUrl ? (
                                <div className="profile-page__profile-pic-empty">
                                    <img
                                        className="profile-page__profile-pic-icon"
                                        src="/icons/avatar.svg"
                                        alt="avatar"
                                    />
                                </div>
                                ) : (
                                <img
                                    src={(profilePic.preview) ? profilePic.preview : saState.resApi?.responseData?.[0].ppUrl}
                                    alt="profile-page_pict"
                                    className={`profile-page__profile-pic ${profilePic.msgError !== "" && profilePic.msgError !== null ? "border border-[1px] border-[#E84040]" : ""}`}
                                />
                                )}
                            </div>
                            <div>
                                <Button
                                btnTypes="upload"
                                buttonColor="blueFigmaBorderOnly"
                                textColor="bluefigma"
                                className="profile-page__button cursor-pointer"
                                referenceUpload={refProfilePic}
                                nameUpload="profilePic"
                                acceptedFiles=".jpg,.png,.jpeg"
                                onChangeUpload={(e) => {
                                    const fileName = e.target.files[0].name.toString();
                                    const extFile = fileName
                                    .substr(fileName.lastIndexOf(".") + 1, fileName.length)
                                    .toLowerCase()
                                    const filterExtArray = [extFile !== "jpg", extFile !== "jpeg", extFile !== "png"];
                                    if (filterExtArray.indexOf(false) === -1) {
                                    resetProfilePic()
                                    dispatch(
                                        showModalFail("Gagal", `Format file *.${extFile} tidak didukung`)
                                    )
                                    } else {
                                    Array.from(e.target.files).forEach((file) => {
                                        if(file.size > 1500000){
                                        dispatch(
                                            setProfilePic({...profilePic, msgError: "Ukuran foto lebih dari 1.5 MB"})
                                        )
                                        } else {
                                        dispatch(
                                            uploadProfilePic(
                                                file,
                                                email,
                                                profilePic,
                                                setProfilePic
                                            )
                                        )
                                        }
                                    })
                                    }
                                }}
                                >
                                {!profilePic.preview ? "Upload Foto" : "Ganti Foto"}
                                </Button>
                            </div>
                            {/* <div>
                                {!profilePic.preview ? (
                                <></>
                                ) : (
                                <Button 
                                    buttonColor="white" 
                                    textColor="orange" 
                                    className="profile-page__button" 
                                    onClick={
                                    () => dispatch(
                                        removePP(
                                        cookieIsExist.email, 
                                        setProfilePic, 
                                        resetProfilePic
                                        )
                                    )
                                    }
                                >
                                    Hapus
                                </Button>
                                )}
                            </div> */}
                            <div className={`pt-2 font-medium text-[12px] text-center ${profilePic.msgError !== "" && profilePic.msgError !== null ? "text-[#E84040]" : "text-[#777777]"}`}>
                                <p>{profilePic.msgError !== "" && profilePic.msgError !== null ? profilePic.msgError : "Maksimal 1.5 MB"}</p>
                            </div>
                        </div>
                        <div>
                        <>
                            <div className="profile-page__textbox-wrap">
                                <TextboxLabel
                                    topLabel="Nama Lengkap"
                                    placeholder="Nama Lengkap"
                                    name="name"
                                    value={inputs?.name?.value}
                                    disabled={true}
                                    maxLength={100}
                                />
                            </div>
                            <div className="profile-page__textbox-wrap">
                                <TextboxLabel
                                    disabled={true}
                                    topLabel="Email"
                                    placeholder="Email"
                                    name="email"
                                    value={inputs?.email?.value}
                                />
                            </div>
                            <div className="profile-page__textbox-wrap">
                                <TextboxLabel
                                    topLabel="Kantor Wilayah"
                                    placeholder="Kantor Wilayah"
                                    name="kanwil"
                                    value={inputs?.kanwil?.value}
                                    disabled={true}
                                />
                            </div>
                            <div className="profile-page__textbox-wrap">
                                <TextboxLabel
                                    topLabel="Kantor Cabang"
                                    placeholder="Kantor Cabang"
                                    name="kantorcabang"
                                    value={inputs?.kancab?.value}
                                    disabled={true}
                                />
                            </div>
                            <div className="profile-page__textbox-wrap w-full">
                                <AccordionInput title={"Ubah Password"} classesName={"font-bold text-[#292929] text-[14px]"}>
                                    <div className="p-4 space-y-4">
                                        {/* <div>
                                            <TextboxLabel
                                                topLabel="Password Lama"
                                                placeholder="Masukkan Password Lama"
                                                name="oldPassword"
                                                value={inputs?.oldPassword?.value}
                                                onChange={handleOldPass}
                                                requiredStar={true}
                                                isPassword={true}
                                                typeInput="password"
                                                warnText={inputs?.oldPassword?.msgError}
                                            />
                                        </div> */}
                                        <div>
                                            <TextboxLabel
                                                topLabel="Password Baru"
                                                placeholder="Masukkan Password Baru"
                                                name="newPassword"
                                                value={inputs?.newPassword?.value}
                                                onChange={handlePass}
                                                requiredStar={true}
                                                typeInput="password"
                                                isPasswordV2={true}
                                                invalid={inputs?.newPassword && Object.values(inputArr).filter(Boolean).length !== 3}
                                            />
                                        </div>
                                        <div className="text-gray-600">
                                            <span className={`${inputs?.newPassword?.value && !inputs?.newPassword?.isValid ? 'text-[#E84040]' : 'text-[#777777]'} font-medium text-[12px]`}>Password harus berisi:</span>
                                            <div className="flex flex-col gap-1">
                                                <div className="flex flex-row gap-1">
                                                    <img src={`${inputArr.length === true ? '/icons/small-icons/Check_Circle_Password_active.svg' : "/icons/small-icons/Check_Circle_Password.svg"}`} alt="icon" />
                                                    <span className="font-medium text-[12px] text-[#777777]">8 karakter</span>
                                                </div>
                                                <div className="flex flex-row gap-1">
                                                    <img src={`${inputArr.mixedCase === true ? '/icons/small-icons/Check_Circle_Password_active.svg' : "/icons/small-icons/Check_Circle_Password.svg"}`} alt="icon" />
                                                    <span className="font-medium text-[12px] text-[#777777]">1 huruf kapital dan angka</span>
                                                </div>
                                                <div className="flex flex-row gap-1">
                                                    <img src={`${inputArr.specialCharacter === true ? '/icons/small-icons/Check_Circle_Password_active.svg' : "/icons/small-icons/Check_Circle_Password.svg"}`} alt="icon" />
                                                    <span className="font-medium text-[12px] text-[#777777]">1 simbol spesial (contoh: !@#$%^&*-_) </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            <TextboxLabel
                                                topLabel="Konfirmasi Password"
                                                placeholder="Konfirmasi Password"
                                                name="retypeNewPassword"
                                                value={inputs?.retypeNewPassword?.value}
                                                onChange={handlePassConfirm}
                                                requiredStar={true}
                                                isPasswordV2={true}
                                                typeInput="password"
                                                invalid={inputs?.retypeNewPassword && Object.values(inputArr).filter(Boolean).length !== 3}
                                                warnText={inputs?.retypeNewPassword?.msgError}
                                            />
                                        </div>
                                    </div>
                                </AccordionInput>
                            </div>
                            <div className="profile-page__btn-wrap">
                            <button 
                                disabled={Object.values(inputArr).filter(Boolean).length !== 3 || !inputs?.retypeNewPassword?.isValid} 
                                className={`${Object.values(inputArr).filter(Boolean).length !== 3 || !inputs?.retypeNewPassword?.isValid ? "cursor-not-allowed bg-[#EAEBEB]" : "bg-[#1078CA]"} rounded-lg`}
                                onClick={() => {
                                    dispatch( updatePassword(email,inputs) )
                                    setProfilePic({ ...profilePic, file: "", name: "", preview: "" });
                                }}
                            >
                                <p className={`${Object.values(inputArr).filter(Boolean).length !== 3 || !inputs?.retypeNewPassword?.isValid ? "text-[#B5B6B6]" : "text-[#FFFFFF]"} font-bold text-primary px-4 py-3`}>Simpan</p>
                            </button>
                            </div>
                        </>
                        </div>
                    </div>
                    </div>
            </ProfileUser>
        </>
    )
}

export default ProfileCustomerService