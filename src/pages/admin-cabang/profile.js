/* eslint-disable react-hooks/exhaustive-deps */
import cookie from "hs-cookie"
import moment from "moment"
import React, { useEffect, useState, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { decryptStr, encryptStr } from "../../helpers/encryptDecrypt"
import { FS_LOADING, SA_SUCCESS } from "../../store/actions/types"
import { 
  addEditUserDev, 
  closeModalFail, 
  closeModalSuccessRdr,
  disableEdit, 
  inquiryUser, 
  requestEditUser, 
  saRedirect, 
  showModalFail } from "../../store/actions/fetchData/superAdminState"
import { ProfileUser } from "../../components/templates"
import useWindowDimensions from "../../utils/dimensions"
import { uploadProfilePic, removePP } from "../../store/actions/fetchData/uploadFile"
import { 
  Button, 
  CurrencyInput, 
  LabelInputTextbox, 
  Textarea, 
  UploadSingleFile } from "../../components/atoms"
import { useNavigate } from "react-router-dom"
import { TextboxLabel, DetailsCard, TextboxDropdown } from "../../components/molecules"
import { Modal, NavHeader } from "../../components/organisms"
import { accountAdminCabang, editPassword } from "../../store/actions/fetchData/admin-cabang"
import useInputRefHooks from "../../hooks/useInputRefHooks"
import useProfileMenuHooks from "../../hooks/useProfileMenuHooks"
import useAdminCabangHooks from "../../hooks/useAdminCabangHooks"


const ProfileAdminCabang = ({userStatus, email}) => {

  const { width } = useWindowDimensions()
  const saState = useSelector((state) => state.superAdminReducer)
  const state = useSelector((state) => state.stateReducer)
  const dispatch = useDispatch()
  const morgateCookie = cookie.get("morgateCookie")
  const cookieIsExist = morgateCookie && JSON.parse(morgateCookie)
  const {
    inputs,
    setInputs,
    handleEmail,
    handleName,
    handlePass
  } = useAdminCabangHooks()
  const [status, setStatus] = useState("")
  const [userTemp, setUserTemp] = useState({})
  const [item, setItem] = useState(null)
  const [profilePic, setProfilePic] = useState({
    file: "",
    name: "",
    preview: ""
  })

  const inputArr = [
    inputs.password?.isValid
  ]
  const refProfilePic = useRef(null)
  const resetProfilePic = () => {
    refProfilePic.current.value = null
  }

  useEffect(() => {
    dispatch(disableEdit(true))
    dispatch(accountAdminCabang(email, setItem))
  }, [])
  
  useEffect(() => {
    setInputs({
        id: {
          value: item?.responseData?.ID
        },
        namaPic: {
          value: item?.responseData?.NamaPic,
          isValid: !!item?.responseData?.NamaPic
        },
        kanwil: {
          value: item?.responseData?.Kanwil,
          isValid: !!item?.responseData?.Kanwil
        },
        kancab: {
          value: item?.responseData?.Kancab,
          isValid: !!item?.responseData?.Kancab
        },
        email: {
          value: item?.responseData?.Email,
          isValid: !!item?.responseData?.Email
        },
        password: {
          value: item?.responseData?.Password,
          isValid: !!item?.responseData?.Password
        },
        ppUrl: {
          value: item?.responseData?.PpUrl,
          isValid: !!item?.responseData?.PpUrl
        }
      })
  }, [item])

  const [loadingFile, setLoadingFile] = useState(false)
  const navigate = useNavigate()
  const [cancelModal, setCancelModal] = useState(false)

  return (
    <div>
      {saState.success === true && (
        <Modal
          closeModal={() =>{ 
            dispatch(closeModalSuccessRdr())
          }}
          modalTypes="modalSF"
          title=""
          titleBody={saState.titleSuccess}
          descBody={saState.msgSuccess}
        />
      )}
      {saState.fail === true && (
        <Modal
          closeModal={() => dispatch(closeModalFail())}
          modalTypes="modalSF"
          title=""
          titleBody={saState.titleFail}
          descBody={saState.msgFail}
        />
      )}
      {cancelModal &&
        <div className={`${cancelModal ? "block" : "hidden"}`}>
          <Modal
            closeModal={() => setCancelModal(false)}
            title="Konfirmasi edit profile"
            modalTypes="confirm"
            onConfirm={() => navigate(0)}
            descBody="Apakah anda yakin ingin membatalkan edit profile?"
          />
        </div>
      }

    <NavHeader />
      <ProfileUser
        title="Detail Profile"
        desc="Atur profil kamu disini"
        userStatus={userStatus}
        data={
          saState.resApi && 
          saState.resApi?.responseData && 
          saState.resApi?.responseData?.[0]}
      >
        <div className="profile-page__wrapper">
          <div
            className={`profile-page__body-wrap ${width < 1025 ? "gtc-profile-page-s" : "gtc-profile-page"
              }`}
          >
            <div className="profile-page__left-wrap">
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
                    className="profile-page__profile-pic"
                  />
                )}
              </div>
              <div>
                <Button
                  btnTypes="upload"
                  buttonColor="blueLight"
                  textColor="blue"
                  className="profile-page__button"
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
                            showModalFail("Gagal", "Size file terlalu besar")
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
              <div>
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
              </div>
            </div>
            <div>
              <>
                <div className="profile-page__textbox-wrap ml-auto flex">
                  <div className="ml-auto">
                    <Button buttonColor="orangeBorder" textColor="orange" className="profile-page__edit-btn" onClick={() => dispatch(disableEdit(!saState.disableEdit))} paddingSize="padding-0">
                      <span className="flex gap-2">
                        <img src="/icons/small-icons/edit-orange.svg" alt="edit" />{" "}
                        Edit
                      </span>
                    </Button>
                  </div>
                </div>
                <div className="profile-page__textbox-wrap">
                  <TextboxLabel
                    topLabel="Nama PIC"
                    placeholder="Nama PIC"
                    name="name"
                    value={inputs?.namaPic?.value}
                    onChange={handleName}
                    warnText={inputs?.name?.msgError}
                    disabled={true}
                    maxLength={100}
                  />
                </div>
                <div className="profile-page__textbox-wrap">
                  <TextboxLabel
                    topLabel="Kantor Wilayah"
                    placeholder="Kantor Wilayah"
                    name="kanwil"
                    value={inputs?.kanwil?.value}
                    onChange={handleName}
                    disabled={true}
                  />
                </div>
                <div className="profile-page__textbox-wrap">
                  <TextboxLabel
                    topLabel="Kantor Cabang"
                    placeholder="Kantor Cabang"
                    name="kantorcabang"
                    value={inputs?.kancab?.value}
                    onChange={handleName}
                    disabled={true}
                  />
                </div>
                <div className="profile-page__textbox-wrap">
                  <TextboxLabel
                    disabled={true}
                    topLabel="Email"
                    placeholder="Email"
                    name="email"
                    value={inputs?.email?.value}
                    onChange={handleEmail}
                    warnText={inputs?.email?.msgError}
                  />
                </div>
                <div className="profile-page__textbox-wrap">
                  <TextboxLabel
                    disabled={saState.disableEdit && true}
                    className={saState.disableEdit && `profile-page__textbox`}
                    topLabel="Ubah Kata Sandi"
                    placeholder="Ubah Kata Sandi"
                    typeInput="password"
                    isPassword={true}
                    name="password"
                    value={inputs?.password?.value}
                    onChange={handlePass}
                    warnText={inputs?.password?.msgError}
                  />
                </div>
                <div className="profile-page__btn-wrap">
                  <Button
                    buttonColor="blue"
                    textColor="white"
                    className="add-admin__btn-bottom--save"
                    disabled={inputArr.filter(Boolean).length !==1}
                    onClick={() => {
                      dispatch(
                        editPassword(
                          inputs,
                          profilePic,
                        )
                      );
                      setProfilePic({ ...profilePic, file: "", name: "", preview: "" });
                    }}
                  >
                    Ubah
                  </Button>
                </div>
              </>
            </div>
          </div>
        </div>
      </ProfileUser>
    </div>
  )
}

export default ProfileAdminCabang