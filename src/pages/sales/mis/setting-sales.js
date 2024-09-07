/* eslint-disable react-hooks/exhaustive-deps */
import cookie from "hs-cookie";
import moment from "moment";
import React, { useEffect, useRef, useState } from "react";
import { editSettingSales, salesSetting } from "../../../store/actions/fetchData/salesReferral";
import {DetailsCard} from "../../../components/molecules";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { TextboxLabel } from "../../../components/molecules";
import { SideMenuSales, Modal, NavHeaderSales } from "../../../components/organisms";
import useInputRefHooks from "../../../hooks/useInputRefHooks";
import { Button } from "../../../components/atoms";
import { closeModalFail, closeModalSuccessRdr, disableEdit, showModalFail } from "../../../store/actions/fetchData/superAdminState";
import useWindowDimensions from "../../../utils/dimensions";
import { removePP, uploadProfilePic } from "../../../store/actions/fetchData/uploadFile";
import { decryptStr, encryptStr } from "../../../helpers/encryptDecrypt";
import useRegSalesHooks from "../../../hooks/useRegSalesHooks";
import JSZip, { file } from "jszip";
import { FS_LOADING } from "../../../store/actions/types";

const SettingSales = ({ userStatus, email}) => {
  const { width } = useWindowDimensions();
  const saState = useSelector((state) => state.superAdminReducer);
  const state = useSelector((state) => state.stateReducer);
  const dispatch = useDispatch();
  const { editMode, setEditMode } = useRegSalesHooks();
  const { inputsRef, setInputsRef, handleInput, handleEmail, handlePhoneNum, handleName } = useInputRefHooks();
  const morgateCookie = cookie.get("morgateCookie");
  const cookieIsExist = morgateCookie && JSON.parse(morgateCookie);
  const [status, setStatus] = useState("");
 
  const [loadingFile, setLoadingFile] = useState(false);
  const navigate = useNavigate();
  const [cancelModal, setCancelModal] = useState(false);
  const [ item, setItem ] = useState(null);
  const [profilePic, setProfilePic] = useState({
    file: "",
    name: "",
    preview: "",
  });
  const inputArr = [
    inputsRef?.name?.isValid,
    inputsRef?.email?.isValid,
    inputsRef?.mobileNo?.isValid,
];
  const refProfilePic = useRef(null);
  const resetProfilePic = () => {
    refProfilePic.current.value = null;
  };
 

  useEffect(() => {  
    dispatch(disableEdit(true));
    dispatch(salesSetting(setItem));
  }, []);
  
  useEffect(() => {
    setInputsRef({
      id: {
        value:item?.responseData?.id
      },
      name: {
        value: item?.responseData?.name,
        isValid: !!item?.responseData?.name,
      },
      email: {
        value: item?.responseData?.email,
        isValid: !!item?.responseData?.email,
      },
      mobileNo: {
        value: item?.responseData?.mobileNo,
        isValid: !!item?.responseData?.mobileNo,
      },
      ppUrl: {
        value: item?.responseData?.ppUrl,
        isValid: !!item?.responseData?.ppUrl,
      },
    });
    // setProfilePic({
    //   preview: item?.responseData?.ppUrl,
    // });
    
  },[item])
 

  const uploadProfileSales = (files, userName, profilePic, setProfilePic) => (dispatch) => {
    const zip = new JSZip();
    const datenow = Date.now();
    zip.file(files.name, files);
    zip.generateAsync({type: "blob"}).then((content) => {
      dispatch({ type: FS_LOADING, payload: false});
      setProfilePic({...profilePic, file: files, name: files.name, preview: URL.createObjectURL(files)});
    })
  };
  return (
    <div>
      {saState.success === true && (
        <Modal
          closeModal={() =>{ 
          dispatch(closeModalSuccessRdr())
          dispatch(salesSetting(setItem))
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
     
       <NavHeaderSales />
       <SideMenuSales title="Profile Sales">
       <div>Setting Profile</div><br></br>
        <div className="setting-page-sales__wrapper"> 
        <div
            className={`setting-page-sales__body-wrap ${width < 1025 ? "gtc-setting-page-sales-s" : "gtc-setting-page-sales"
              }`}
          >
            <div className="setting-page-sales__left-wrap">
        <div className="setting-page-sales__profile-pic-wrap">
                {!profilePic.preview && item?.responseData?.ppUrl || profilePic.file.size > 1000000 ? (
                  <div className="setting-page-sales__profile-pic-empty">
                      <img
                      src={item?.responseData?.ppUrl}
                      alt="setting-page-sales_pict"
                      className="setting-page-sales__profile-pic"
                    />
                  </div>
                ) : profilePic.preview ? (
                  <img
                    src={profilePic.preview}
                    alt="setting-page-sales_pict"
                    className="setting-page-sales__profile-pic"
                  />
                  ) : (
                  
                    <img
                      className="setting-page-sales__profile-pic"
                      src="/icons/avatar.svg"
                      alt="avatar"
                    />
                  ) 
                  }
                {profilePic.file.size > 1000000 ? "File Terlalu Besar" : "" }
              </div>
              <div>
                <Button
                  btnTypes="upload"
                  buttonColor="blueLight"
                  textColor="blue"
                  className="profile-page__button"
                  referenceUpload={refProfilePic}
                  value={profilePic}
                  nameUpload="profilePic"
                  acceptedFiles=".jpg,.png,.jpeg"
                  onChangeUpload={(e) => {
                    const fileName = e.target.files[0].name.toString();
                    const extFile = fileName
                      .substr(fileName.lastIndexOf(".") + 1, fileName.length)
                      .toLowerCase();
                    const filterExtArray = [extFile !== "jpg", extFile !== "jpeg", extFile !== "png"];
                    if (filterExtArray.indexOf(false) === -1) {
                      resetProfilePic();
                      dispatch(
                        showModalFail("Gagal", `Format file *.${extFile} tidak didukung`)
                      );
                    } else {
                      Array.from(e.target.files).forEach((file) => {
                        dispatch(
                          uploadProfileSales(
                            file,
                            email,
                            profilePic,
                            setProfilePic
                          )
                        );
                      });
                    }
                  }}
                >
                  {!profilePic.preview ? "Upload Foto" : "Ganti Foto"}
                </Button>
              </div>
              <p className="mx-auto text-center text-red-600">
              {profilePic.file.size > 1000000 ? "File Terlalu Besar" : "" }          
                              </p>
                              <div className="mx-auto text-center text-gray">
                                <p>
                                  Size max. 1MB.<br></br>
                                  Res. 600x600 px<br></br>
                                  Format .JPG, .PNG
                                </p>
                              </div>
              <div>
               
              </div>
              </div>
              <DetailsCard className="setting-page-sales__left-wrap">
              <div className="profile-page__edit-btn-wrap">
                      <Button disabled={status === "SocialMediaLogin" ? true : false} buttonColor="orangeBorderOnly" textColor="orange" className="profile-page__edit-btn" onClick={() => dispatch(disableEdit(!saState.disableEdit))} paddingSize="padding-0">
                        <span className="flex gap-2">
                          <img src="/icons/small-icons/edit-orange.svg" alt="edit" />{" "}
                          Edit
                        </span>
                      </Button>
                    </div> 
                          <div className="setting-page-sales__textbox-wrap">
                              <TextboxLabel 
                                  topLabel="Nama" 
                                  requiredStar={true} 
                                  disabled={saState.disableEdit && true}
                                  placeholder="Nama" 
                                  name="name" 
                                  value={inputsRef?.name?.value}
                                  onChange={handleName}
                                  // invalid={!inputsRef?.salesName?.isValid}
                                  warnText={inputsRef?.name?.msgError}
                              />
                          </div>
                          <div className="setting-page-sales__textbox-wrap">
                              <TextboxLabel 
                                  topLabel="Email" 
                                  requiredStar={true} 
                                  disabled={saState.disableEdit && true}
                                  placeholder="abcd@mail.com" 
                                  name="email" 
                                  value={inputsRef?.email?.value}
                                  onChange={handleEmail}
                                  // invalid={!inputsRef?.emailSales?.isValid}
                                  warnText={inputsRef?.email?.msgError}
                              />
                          </div>   
                          <div className="setting-page-sales__textbox-wrap">
                              <TextboxLabel 
                                  topLabel="Nomor Handphones" 
                                  requiredStar={true} 
                                  disabled={saState.disableEdit && true}
                                  placeholder="08xxxxxxxxxx" 
                                  name="mobileNo"
                                  maxLength={13}
                                  value={inputsRef?.mobileNo?.value}
                                  onChange={handlePhoneNum}
                                  // invalid={!inputsRef?.salesPhone?.isValid}
                                  warnText={inputsRef?.mobileNo?.msgError}
                              />
                          </div>
                          <div className="profile-page__btn-wrap">
                      <Button
                        buttonColor="blue"
                        textColor="white"
                        className="add-admin__btn-bottom--save"
                        disabled={inputArr.filter(Boolean).length !==3}
                        onClick={() => {
                          dispatch(
                            editSettingSales(
                              inputsRef,
                              profilePic,
                            )
                          );
                          setProfilePic({ ...profilePic, file: "", name: "", preview: "" });
                        }}
                      >
                        Simpan
                      </Button>
                    </div>
                          </DetailsCard>
                     
                      </div>
                   </div>
      </SideMenuSales>
    </div>
  );
};

export default SettingSales;
