/* eslint-disable react-hooks/exhaustive-deps */
import cookie from "hs-cookie";
import moment from "moment";
import React, { useEffect, useRef, useState } from "react";
import DatePicker from "react-date-picker";
import { MdOutlineClear } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button, CurrencyInput, LabelInputTextbox, Textarea, UploadSingleFile } from "../../components/atoms";
import { ModalGMaps, DetailsCard, TextboxDropdown, TextboxLabel } from "../../components/molecules";
import { GMapsPinBox, Location, LocationDomisili, Modal } from "../../components/organisms";
import { ProfileUser } from "../../components/templates";
import { getLocByLatLng } from "../../helpers/getLocByLatLng";
import useProfileMenuHooks from "../../hooks/useProfileMenuHooks";
import { areacodeConst } from "../../static/areacodeConst";
import { addEditUserDev, closeModalFail, closeModalSuccessRdr, disableEdit, inquiryUser, requestEditUser, saRedirect, showModalFail } from "../../store/actions/fetchData/superAdminState";
import { removePP, uploadProfilePic } from "../../store/actions/fetchData/uploadFile";
import { deleteAccount, userLogout } from "../../store/actions/fetchData/userState";
import useWindowDimensions from "../../utils/dimensions";
import { decryptStr } from "../../helpers/encryptDecrypt";
import { FaCalendarAlt } from "react-icons/fa";
import { showSingleModal } from "../../store/actions/changeState";

const Profile = ({ userStatus, email }) => {
  const { width } = useWindowDimensions();
  const saState = useSelector((state) => state.superAdminReducer);
  const state = useSelector((state) => state.stateReducer);
  const dispatch = useDispatch();
  const morgateCookie = cookie.get("morgateCookie");
  const cookieIsExist = morgateCookie && JSON.parse(morgateCookie);
  const [status, setStatus] = useState("");
  const [isModalGmaps, setModalGmaps] = useState(false);
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
  const onChangeAdress = (key, value) => {
    setDataAddress({ ...dataAddress, [key]: value });
  };
  const [loadingFile, setLoadingFile] = useState(false);
  const navigate = useNavigate();
  const [cancelModal, setCancelModal] = useState(false);
  const stringMinified =
    '{"alamat":"' +
    dataAddress.address +
    '","rt":"' +
    (dataAddress.rt ? dataAddress.rt.replace(/ /g, "") : "-") +
    '","rw":"' +
    (dataAddress.rw ? dataAddress.rw.replace(/ /g, "") : "-") +
    '","kodePos":"' +
    dataAddress.posCode +
    '","provinsi":"' +
    dataAddress.province +
    '","kabupaten":"' +
    dataAddress.district +
    '","kecamatan":"' +
    dataAddress.subDistrict +
    '","kelurahan":"' +
    dataAddress.urbanVillage +
    '"}';
  const [profilePic, setProfilePic] = useState({
    file: "",
    name: "",
    preview: "",
  });
  const refProfilePic = useRef(null);
  const resetProfilePic = () => {
    refProfilePic.current.value = null;
  };
  const [mapsState, setMapsState] = useState({
    center: { lat: -6.22472, lng: 106.80778 },
    address: "",
    zoom: 11,
    draggable: false,
    gestureHandling: "cooperative",
  });

  const handleLoadPinLoc = () => {
    if (!!dataAddress.placeId) {
      setMapsState({
        ...mapsState,
        center: {
          lat: dataAddress.lat,
          lng: dataAddress.lng,
        },
        address: dataAddress.address,
      });
      setModalGmaps(true);
    } else {
      navigator.geolocation.getCurrentPosition(function (position) {
        getLocByLatLng(position.coords.longitude, position.coords.latitude)
          .then((res) => {
            setMapsState({
              ...mapsState,
              center: {
                ...mapsState.center,
                lat: position.coords.latitude,
                lng: position.coords.longitude,
              },
              address: res.results[0].formatted_address,
              placeId: res.results[0].place_id,
              draggable: true,
            });
          })
          .catch((err) => console.log("Get Loc by Lat Lng Error : ", err));
      });
      setModalGmaps(true);
    }
  };

  const { pks, setPks, refSingleUpload, resetSingleUpload, inputs, initiateState, handleInput, handleAlphanumeric, handleEmail, handlePass, handlePassConfirm, handleMobileNo, handleAlpha, handleDob, handleNumber, handleName, handleAltInput, handleDateInputChange, handleNoRekening } = useProfileMenuHooks();

  useEffect(() => {
    if (saState.redirect) {
      dispatch(disableEdit(true));
      window.scrollTo(0, 0);
      dispatch(inquiryUser(cookieIsExist.email));
      dispatch(saRedirect(false));
    }
  }, [saState.redirect]);

  const developer_phone = inputs?.mobileNo?.value && inputs?.mobileNo?.value.replace("+62|", "0")

  useEffect(() => {
    if (saState.resApi) {
      let respData = saState.resApi?.responseData && saState.resApi?.responseData[0];
      try {
        if (decryptStr(userStatus) === "developer") {
          initiateState({
            name: {
              value: respData?.metadata?.name,
              isValid: !!respData?.metadata?.name,
            },
            groupName: {
              value: respData?.metadata?.groupName,
              isValid: !!respData?.metadata?.groupName,
            },
            picDeveloper: {
              value: respData?.metadata?.picDeveloper,
              isValid: !!respData?.metadata?.picDeveloper,
            },
            description: {
              value: respData?.metadata?.description,
              isValid: !!respData?.metadata?.description,
            },
            noPKS: {
              value: respData?.metadata?.noPKS,
              isValid: !!respData?.metadata?.noPKS,
            },
            email: { value: decryptStr(respData?.email), isValid: !!respData?.email },
            mobileNo: {
              value: decryptStr(respData?.mobileNo),
              isValid: !!respData?.mobileNo,
            },
            accountNo: {
              value: decryptStr(respData?.accountNo) ? decryptStr(respData?.accountNo) : "",
              isValid: !!respData?.accountNo,
            },
            startRangePrice: {
              value: respData?.metadata?.rangeHargaUnit.split("-")[0],
              isValid: !!respData?.metadata?.rangeHargaUnit.split("-")[0],
            },
            endRangePrice: {
              value: respData?.metadata?.rangeHargaUnit.split("-")[1],
              isValid: !!respData?.metadata?.rangeHargaUnit.split("-")[1],
            },
            tanggalAkhirPKS: {
              isValid: !!respData?.pksEnd,
              value: respData?.pksEnd ? new Date(respData?.pksEnd) : ""
            },
            tanggalPKS: {
              isValid: !!respData?.pksStart,
              value: respData?.pksStart ? new Date(respData?.pksStart) : ""
            },
            pksEnd: {
              isValid: !!respData?.pksEnd,
              value: respData?.pksEnd ? moment(respData?.pksEnd).format('DD-MM-yyyy') : ""
            },
            pksStart: {
              isValid: !!respData?.pksStart,
              value: respData?.pksStart ? moment(respData?.pksStart).format('DD-MM-yyyy') : ""
            },
          });
        } else {
          const mobilePhone = decryptStr(respData?.mobileNo);
          initiateState({
            name: {
              value: respData?.metadata?.fullName,
              isValid: !!respData?.metadata?.fullName,
            },
            email: { value: decryptStr(respData?.email), isValid: !!respData?.email },
            mobileNo: {
              value: mobilePhone.split("|")[1] === undefined ? mobilePhone : `${mobilePhone.split("|")[1]}`,
              isValid: !!respData?.mobileNo,
            },
            password: {
              value: respData?.metadata?.password,
              isValid: !!respData?.metadata?.password,
            },
            confirmPassword: {
              value: respData?.metadata?.confirmPassword,
              isValid: !!respData?.metadata?.confirmPassword,
            },
            dob: {
              value: respData?.metadata?.dob
                ? moment(respData?.metadata?.dob, "DD-MM-YYYY")?.toDate()
                : null,
              isValid: !!respData?.metadata?.dob,
            },
            pob: {
              value: respData?.metadata?.pob,
              isValid: !!respData?.metadata?.pob,
            },
            longLatAddress: {
              value: respData?.metadata?.longLatAddress,
              isValid: !!respData?.metadata?.longLatAddress,
            },
            addressDomisili: {
              value: respData?.metadata?.addressDomisili
            },
            profession: "",
            rangeIncome: "",
            agreeTnC: {
              value: respData?.isAgreeTnc,
              isValid: !!respData?.isAgreeTnc,
            },
          });
        }
      } catch (e) { }

      setProfilePic({
        preview: respData?.ppUrl,
      });

      if (respData && respData?.pksUrl) {
        setLoadingFile(true);
        Promise.all(
          fetch(respData?.pksUrl).then((res) => res.blob())
            .then((blob) => {
              setPks({
                file: new File([blob], "Dokumen_PKS.pdf", { type: blob.type }),
                name: "Dokumen_PKS.pdf",
                selected: true
              });
              setLoadingFile(false);
            }
            ).catch((err) => console.log("[DEBUG] error loading file : ", err))
        );
      }

      if (respData?.status === "SocialMediaLogin") {
        initiateState({
          name: { value: respData?.metadata?.fullName, isValid: !!respData?.metadata?.fullName},
          email: { value: decryptStr(respData?.email), isValid: !!respData?.email },
          mobileNo : {value : "", isValid: true},
          password: {value: "", isValid: true},
          agreeTnC: {value : true, isValid: true}
          
        });
        // dispatch(disableEdit(true));
        // setStatus("SocialMediaLogin");
      }


      initiateState({
        mobileNoArea: {
          value: areacodeConst.filter((e) => e.value === saState?.resApi?.responseData?.[0]?.mobileNo?.split("|")?.[0])[0] || areacodeConst.filter((e) => e.value === "+62")[0]
        }
      })

      try {
        setDataAddress({
          address: JSON.parse(respData?.metadata?.address)?.alamat,
          rt: JSON.parse(respData?.metadata?.address)?.rt || "",
          rw: JSON.parse(respData?.metadata?.address)?.rw || "",
          posCode: JSON.parse(respData?.metadata?.address)?.kodePos || "",
          province: JSON.parse(respData?.metadata?.address)?.provinsi,
          subDistrict: JSON.parse(respData?.metadata?.address)?.kecamatan,
          district: JSON.parse(respData?.metadata?.address)?.kabupaten,
          urbanVillage: JSON.parse(respData?.metadata?.address)?.kelurahan,
          lng: respData?.metadata?.longLatAddress?.split(",")[0],
          lat: respData?.metadata?.longLatAddress?.split(",")[1],
        });
        initiateState({
          address: {
            value: JSON.parse(respData?.metadata?.address)?.alamat,
            isValid: !!JSON.parse(respData?.metadata?.address)?.alamat,
          },
        });
      } catch (e) { }
    }
  }, [saState.resApi]);
  useEffect(() => {
    initiateState({
      longLatAddress: {
        value: dataAddress.lng + "," + dataAddress.lat,
        isValid: !!(dataAddress.lng + "," + dataAddress.lat),
      },
      address: { value: dataAddress.address, isValid: !!dataAddress.address },
    });
  }, [dataAddress]);
  const inputsArrDev = [
    inputs?.name?.isValid,
    inputs?.picDeveloper?.isValid,
    inputs?.description?.isValid,
    inputs?.noPKS?.isValid,
    inputs?.email?.isValid,
    inputs?.mobileNo?.isValid,
    inputs?.accountNo?.isValid,
    inputs?.startRangePrice?.isValid,
    inputs?.endRangePrice?.isValid,
    Boolean(Number(inputs?.endRangePrice?.value) > Number(inputs?.startRangePrice?.value)),
    inputs?.address?.isValid,
    pks.file
  ];
  const inputsArrVisitor = [
    inputs?.name?.isValid,
    // inputs?.email?.isValid,
    // inputs?.mobileNo?.isValid,
    // inputs?.password?.isValid,
    inputs?.dob?.isValid,
    inputs?.pob?.isValid,
    inputs?.address?.isValid,
    inputs?.longLatAddress?.isValid,
    inputs?.agreeTnC?.isValid
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
  ]
  const confPassArr = [
    inputs?.password?.isValid,
    inputs?.confirmPassword?.isValid
  ];

  return (
    <div>
      {state.showSingleModal === true && (
        <Modal
          closeModal={() => dispatch(showSingleModal(!state.showSingleModal))}
          onClickDelete={() => {
            dispatch(showSingleModal(!state.showSingleModal));
            dispatch(deleteAccount(JSON.parse(cookie.get("morgateCookie"))?.email));
          }}
          modalTypes="deleteAccountConfirm"
          title="Konfirmasi"
        />
      )}
      {saState.success === true && (
        <Modal
          closeModal={() => dispatch(closeModalSuccessRdr())}
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
            descBody="Apakah anda yakin ingin membatalkan edit profil?"
          />
        </div>
      }
      <ModalGMaps
        isModalGmaps={isModalGmaps}
        dataAddress={dataAddress}
        mapsState={mapsState}
        setMapsState={setMapsState}
        setDataAddress={setDataAddress}
        setModalGmaps={setModalGmaps}
      />
      <ProfileUser
        title="Detail Profile"
        desc="Atur profil kamu disini"
        userStatus={userStatus}
        data={saState.resApi && saState.resApi?.responseData && saState.resApi?.responseData[0]}
      >
        <div className="profile-page__wrapper">
          <div
            className={`profile-page__body-wrap ${width < 1025 ? "gtc-profile-page-s" : "gtc-profile-page"
              }`}
          >
            <div className="profile-page__left-wrap">
              <div className="profile-page__profile-pic-wrap">
                {!profilePic.preview ? (
                  <div className="profile-page__profile-pic-empty">
                    <img
                      className="profile-page__profile-pic-icon"
                      src="/icons/avatar.svg"
                      alt="avatar"
                    />
                  </div>
                ) : (
                  <img
                    src={profilePic.preview}
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
                          uploadProfilePic(
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
              <div>
                {!profilePic.preview ? (
                  <></>
                ) : (
                  <Button buttonColor="white" textColor="orange" className="profile-page__button" onClick={() => dispatch(removePP(cookieIsExist.email, setProfilePic, resetProfilePic))}>
                    Hapus
                  </Button>
                )}
              </div>
            </div>
            <div>
              {decryptStr(userStatus) === "visitor" && saState?.resApi?.responseData?.[0]?.status === "Active" ? (
                <>
                  <div className="profile-page__edit-btn-wrap mobile:mt-4">
                    <div className="grid grid-flow-col h-[max-content] gap-4">
                      <p className="sellprops__card__title">
                        Data Diri{" "}
                        <span className="sellprops__card__redstar">*</span>
                      </p>
                      {/* {status === "SocialMediaLogin" && <p className="mt-1 cursor-pointer text-[#07447B] hover:text-[#3596E2] h-[inherit] underline" onClick={() => dispatch(userLogout(true))}>Yuk, Daftar Sekarang !</p>} */}
                    </div>
                    <div>
                      <Button /* disabled={status === "SocialMediaLogin" ? true : false} */ buttonColor="orangeBorderOnly" textColor="orange" className="profile-page__edit-btn" onClick={() => dispatch(disableEdit(!saState.disableEdit))} paddingSize="padding-0">
                        <span className="flex gap-2">
                          <img src="/icons/small-icons/edit-orange.svg" alt="edit" />{" "}
                          Edit
                        </span>
                      </Button>
                    </div>
                  </div>
                  <div className="profile-page__textbox-wrap">
                    <TextboxLabel
                      topLabel="Nama Lengkap"
                      disabled={saState.disableEdit && true}
                      placeholder="Nama Lengkap"
                      name="name"
                      value={inputs?.name?.value}
                      onChange={handleName}
                      warnText={inputs?.name?.msgError}
                    />
                  </div>
                  <div className="profile-page__ttl-wrap mobile:grid-cols-1">
                    <TextboxLabel
                      topLabel="Tempat Lahir"
                      disabled={saState.disableEdit && true}
                      placeholder=""
                      name="pob"
                      value={inputs?.pob?.value}
                      onChange={handleAlpha}
                      warnText={
                        !inputs?.pob?.isValid && "Tempat lahir tidak valid"
                      }
                    />
                    <div>
                      <div className="mb-2">
                        <LabelInputTextbox text="Tanggal Lahir" />
                      </div>
                      <div>
                        <DatePicker
                          name="dob"
                          disabled={saState.disableEdit && true}
                          onChange={(e) => handleDob(e, "dob")}
                          value={inputs?.dob?.value || null}
                          onChangeRaw={(e) => e.preventDefault()}
                          maxDate={new Date()}
                          format="dd-MM-yyyy"
                          locale="id-ID"
                          calendarIcon={
                            <>
                              <img
                                src="/icons/small-icons/date-orange.svg"
                                alt="date-icon"
                              />
                            </>
                          }
                          clearIcon={<MdOutlineClear />}
                        />
                        {!inputs?.dob?.isValid && (
                          <div className="my-2">
                            <p className="textbox__invalidTxt">
                              Tanggal lahir tidak valid
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <DetailsCard className="sellpropsV2__card__wrapper">
                    <p className="sellprops__card__title">
                      Identitas <span className="sellprops__card__redstar">*</span>
                    </p>
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
                      <TextboxDropdown
                        label="No Handphone"
                        value={inputs?.mobileNoArea?.value}
                        valueInput={inputs?.mobileNo?.value}
                        name="mobileNo"
                        onValueChange={handleMobileNo}
                        onChange={(value) => {
                          handleAltInput(value, "mobileNoArea");
                        }}
                        data={areacodeConst}
                        maxLength={13}
                        invalid={!inputs?.mobileNo?.isValid && inputs?.mobileNo?.value}
                        invalidTxt={inputs?.mobileNo?.msgError}
                        disabled={true}
                        showOptions={saState.disableEdit ? false : true}
                      />
                    </div>
                    <div className="profile-page__textbox-wrap">
                      <TextboxLabel
                        // disabled={edit.password && true}
                        disabled={true}
                        className={saState.disableEdit && `profile-page__textbox`}
                        topLabel="Ubah Kata Sandi"
                        placeholder="Ubah Kata Sandi"
                        typeInput="password"
                        isPassword={true}
                        name="password"
                        value={inputs?.password?.value}
                        onChange={handlePass}
                        warnText={inputs?.password?.msgError}
                      // rightLabel={<Fragment><button onClick={() => handleEditChange("password", !edit.password)} className="profile-page__btn-edit">Edit</button></Fragment>}
                      // rightLabelBorder={false}
                      />
                    </div>
                    {/* {!saState.disableEdit && (
                      <div className="profile-page__textbox-wrap">
                        <TextboxLabel
                          disabled={true}
                          className={
                            saState.disableEdit && `profile-page__textbox`
                          }
                          topLabel="Konfirmasi Ubah Kata Sandi"
                          placeholder="Konfirmasi Ubah Kata Sandi"
                          typeInput="password"
                          isPassword={true}
                          name="confirmPassword"
                          onChange={handlePassConfirm}
                          warnText={inputs?.confirmPassword?.msgError}
                        />
                      </div>
                    )} */}
                    <div className="profile-page__btn-wrap">
                      <Button
                        buttonColor="blue"
                        textColor="white"
                        className="add-admin__btn-bottom--save"
                        onClick={() => {
                          dispatch(requestEditUser(JSON.parse(cookie.get("morgateCookie"))?.email));
                        }}
                        isLoading={state.loading}
                      >
                        Ubah Data
                      </Button>
                    </div>
                  </DetailsCard>

                  <div className="profile-page__textbox-wrap mt-10 ">
                    <Location
                      title="Alamat (Sesuai KTP)"
                      dataAddress={dataAddress}
                      onChangeText={onChangeAdress}
                      setDataAddress={setDataAddress}
                      disabled={saState.disableEdit}
                    />
                  </div>
                  <div className="profile-page__textbox-wrap mt-10 ">
                    <LocationDomisili
                      title="Alamat Domisili"
                      inputs={inputs}
                      disabled={saState.disableEdit}
                      name="addressDomisili"
                      value={inputs?.addressDomisili?.value}
                      onChange={handleAlphanumeric}
                      maxLength={255}
                    // warnText={!inputs?.addressDomisili?.isValid && "Alamat Domisili tidak valid"}
                    />
                  </div>
                  <div className="profile-page__textbox-wrap mt-10 ">
                    <div className="mt-10">
                      <GMapsPinBox
                        title="Pin Lokasi"
                        setModalGmaps={handleLoadPinLoc}
                        dataAddress={dataAddress}
                        disabled={saState.disableEdit}
                      />
                    </div>
                  </div>
                  {/* <div className="mt-5 flex justify-end">
                  <Button
                        buttonColor="blue"
                        textColor="white"
                        className="add-admin__btn-bottom--save"
                        onClick={() => {
                          dispatch(showSingleModal(true));
                        }}
                        isLoading={state.loading}
                      >
                        Hapus Akun
                  </Button>
               </div> */}
                  {/* {!edit.email || !edit.mobileNo || !edit.password ? */}
                  {!saState.disableEdit && (
                    <div className="profile-page__btn-wrap">
                      <Button
                        className="add-admin__btn-bottom"
                        buttonColor="white"
                        textColor="blue"
                        onClick={() => setCancelModal(true)}
                      >
                        Batal
                      </Button>
                      <Button
                        buttonColor="blue"
                        textColor="white"
                        className="add-admin__btn-bottom--save"
                        disabled={inputsArrVisitor.filter(Boolean).length !== 6 || dataAddressArr.filter(Boolean).length !== 15}
                        onClick={() => {
                          dispatch(addEditUserDev(inputs, { editMode: true, userType: "visitor" }, stringMinified));
                        }}
                        isLoading={state.loading}
                      >
                        Simpan
                      </Button>
                    </div>
                  )}
                </>
              ) : saState?.resApi?.responseData?.[0]?.status === "SocialMediaLogin"  ?(
                <>
                <div className="profile-page__edit-btn-wrap mobile:mt-4">
                  <div className="grid grid-flow-col h-[max-content] gap-4">
                    <p className="sellprops__card__title">
                      Data Diri{" "}
                      <span className="sellprops__card__redstar">*</span>
                    </p>
                    {/* {status === "SocialMediaLogin" && <p className="mt-1 cursor-pointer text-[#07447B] hover:text-[#3596E2] h-[inherit] underline" onClick={() => dispatch(userLogout(true))}>Yuk, Daftar Sekarang !</p>} */}
                  </div>
                  <div>
                    <Button /* disabled={status === "SocialMediaLogin" ? true : false} */ buttonColor="orangeBorderOnly" textColor="orange" className="profile-page__edit-btn" onClick={() => dispatch(disableEdit(!saState.disableEdit))} paddingSize="padding-0">
                      <span className="flex gap-2">
                        <img src="/icons/small-icons/edit-orange.svg" alt="edit" />{" "}
                        Edit
                      </span>
                    </Button>
                  </div>
                </div>
                <div className="profile-page__textbox-wrap">
                  <TextboxLabel
                    topLabel="Nama Lengkap"
                    disabled={saState.disableEdit && true}
                    placeholder="Nama Lengkap"
                    name="name"
                    value={inputs?.name?.value}
                    onChange={handleName}
                    warnText={inputs?.name?.msgError}
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
                <div className="profile-page__ttl-wrap mobile:grid-cols-1">
                  <TextboxLabel
                    topLabel="Tempat Lahir"
                    disabled={saState.disableEdit && true}
                    placeholder=""
                    name="pob"
                    value={inputs?.pob?.value}
                    onChange={handleAlpha}
                    warnText={
                      !inputs?.pob?.isValid && "Tempat lahir tidak valid"
                    }
                  />
                  <div>
                    <div className="mb-2">
                      <LabelInputTextbox text="Tanggal Lahir" />
                    </div>
                    <div>
                      <DatePicker
                        name="dob"
                        disabled={saState.disableEdit && true}
                        onChange={(e) => handleDob(e, "dob")}
                        value={inputs?.dob?.value || null}
                        onChangeRaw={(e) => e.preventDefault()}
                        maxDate={new Date()}
                        format="dd-MM-yyyy"
                        locale="id-ID"
                        calendarIcon={
                          <>
                            <img
                              src="/icons/small-icons/date-orange.svg"
                              alt="date-icon"
                            />
                          </>
                        }
                        clearIcon={<MdOutlineClear />}
                      />
                      {!inputs?.dob?.isValid && (
                        <div className="my-2">
                          <p className="textbox__invalidTxt">
                            Tanggal lahir tidak valid
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                {/* <DetailsCard className="sellpropsV2__card__wrapper">
                  <p className="sellprops__card__title">
                    Identitas <span className="sellprops__card__redstar">*</span>
                  </p>
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
                  {/* <div className="profile-page__textbox-wrap">
                    <TextboxDropdown
                      label="No Handphone"
                      value={inputs?.mobileNoArea?.value}
                      valueInput={inputs?.mobileNo?.value}
                      name="mobileNo"
                      onValueChange={handleMobileNo}
                      onChange={(value) => {
                        handleAltInput(value, "mobileNoArea");
                      }}
                      data={areacodeConst}
                      maxLength={13}
                      invalid={!inputs?.mobileNo?.isValid && inputs?.mobileNo?.value}
                      invalidTxt={inputs?.mobileNo?.msgError}
                      disabled={true}
                      showOptions={saState.disableEdit ? false : true}
                    />
                  </div> */}
                  {/* <div className="profile-page__textbox-wrap">
                    <TextboxLabel
                      // disabled={edit.password && true}
                      disabled={true}
                      className={saState.disableEdit && `profile-page__textbox`}
                      topLabel="Ubah Kata Sandi"
                      placeholder="Ubah Kata Sandi"
                      typeInput="password"
                      isPassword={true}
                      name="password"
                      value={inputs?.password?.value}
                      onChange={handlePass}
                      warnText={inputs?.password?.msgError}
                    // rightLabel={<Fragment><button onClick={() => handleEditChange("password", !edit.password)} className="profile-page__btn-edit">Edit</button></Fragment>}
                    // rightLabelBorder={false}
                    />
                  </div> */}
                  {/* {!saState.disableEdit && (
                    <div className="profile-page__textbox-wrap">
                      <TextboxLabel
                        disabled={true}
                        className={
                          saState.disableEdit && `profile-page__textbox`
                        }
                        topLabel="Konfirmasi Ubah Kata Sandi"
                        placeholder="Konfirmasi Ubah Kata Sandi"
                        typeInput="password"
                        isPassword={true}
                        name="confirmPassword"
                        onChange={handlePassConfirm}
                        warnText={inputs?.confirmPassword?.msgError}
                      />
                    </div>
                  )} */}
                  {/* <div className="profile-page__btn-wrap">
                    <Button
                      buttonColor="blue"
                      textColor="white"
                      className="add-admin__btn-bottom--save"
                      onClick={() => {
                        dispatch(requestEditUser(JSON.parse(cookie.get("morgateCookie"))?.email));
                      }}
                      isLoading={state.loading}
                    >
                      Ubah Data
                    </Button>
                  </div> 
                </DetailsCard> */}
            
                <div className="profile-page__textbox-wrap mt-10 ">
                  <Location
                    title="Alamat (Sesuai KTP)"
                    dataAddress={dataAddress}
                    onChangeText={onChangeAdress}
                    setDataAddress={setDataAddress}
                    disabled={saState.disableEdit}
                  />
                </div>
                <div className="profile-page__textbox-wrap mt-10 ">
                  <LocationDomisili
                    title="Alamat Domisili"
                    inputs={inputs}
                    disabled={saState.disableEdit}
                    name="addressDomisili"
                    value={inputs?.addressDomisili?.value}
                    onChange={handleAlphanumeric}
                    maxLength={255}
                  // warnText={!inputs?.addressDomisili?.isValid && "Alamat Domisili tidak valid"}
                  />
                </div>
                <div className="profile-page__textbox-wrap mt-10 ">
                  <div className="mt-10">
                    <GMapsPinBox
                      title="Pin Lokasi"
                      setModalGmaps={handleLoadPinLoc}
                      dataAddress={dataAddress}
                      disabled={saState.disableEdit}
                    />
                  </div>
                </div>
                {/* {!edit.email || !edit.mobileNo || !edit.password ? */}
                {!saState.disableEdit && (
                  <div className="profile-page__btn-wrap">
                    <Button
                      className="add-admin__btn-bottom"
                      buttonColor="white"
                      textColor="blue"
                      onClick={() => setCancelModal(true)}
                    >
                      Batal
                    </Button>
                    <Button
                      buttonColor="blue"
                      textColor="white"
                      className="add-admin__btn-bottom--save"
                      disabled={inputsArrVisitor.filter(Boolean).length !== 6 || dataAddressArr.filter(Boolean).length !== 15}
                      onClick={() => {
                        dispatch(addEditUserDev(inputs, { editMode: true, userType: "visitor" }, stringMinified));
                      }}
                      isLoading={state.loading}
                    >
                      Simpan
                    </Button>
                  </div>
                )}
              </>
             ) : decryptStr(userStatus) === "developer" && saState?.resApi?.responseData?.[0]?.status === "Active" ? (
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
                  <div className="pb-6 flex flex-row gap-4">
                    <p className="text-sm font-medium">Buyback</p>
                    <p className={`text-[#E1F8EB] rounded-lg px-2 py-1 text-xs ${saState.resApi?.responseData[0].isBuyBack === true ? "bg-[#27AE60]" : "bg-[#C61818]"}`}>{saState.resApi?.responseData[0].isBuyBack === true ? 'Ya' : 'Tidak'} </p>
                  </div>
                  <div className="profile-page__textbox-wrap">
                    <TextboxLabel
                      topLabel="Nama Developer"
                      placeholder="Nama Developer"
                      name="name"
                      value={inputs?.name?.value}
                      onChange={handleName}
                      warnText={inputs?.name?.msgError}
                      disabled={saState.disableEdit && true}
                      maxLength={100}
                    />
                  </div>
                  <div className="profile-page__textbox-wrap">
                    <TextboxLabel
                      topLabel="Nama Group Developer"
                      placeholder="Nama Group Developer"
                      name="groupName"
                      value={inputs?.groupName?.value}
                      onChange={handleName}
                      warnText={inputs?.groupName?.msgError}
                      disabled={saState.disableEdit && true}
                      maxLength={100}
                    />
                  </div>
                  <div className="profile-page__textbox-wrap">
                    <TextboxLabel
                      topLabel="PIC Developer"
                      placeholder="PIC Developer"
                      name="picDeveloper"
                      value={inputs?.picDeveloper?.value}
                      onChange={handleName}
                      warnText={
                        !inputs?.picDeveloper?.isValid &&
                        "PIC developer yang dimasukkan belum benar"
                      }
                      disabled={saState.disableEdit && true}
                    />
                  </div>
                  <div className="profile-page__textbox-wrap">
                    <Location
                      title="Alamat Developer"
                      dataAddress={dataAddress}
                      onChangeText={onChangeAdress}
                      setDataAddress={setDataAddress}
                      disabled={saState.disableEdit && true}
                    />
                  </div>
                  <div className="profile-page__textbox-wrap mt-10 ">
                    <div className="mt-10">
                      <GMapsPinBox
                        title="Pin Lokasi"
                        setModalGmaps={handleLoadPinLoc}
                        dataAddress={dataAddress}
                        disabled={saState.disableEdit}
                      />
                    </div>
                    <div className="mt-10">
                      <ModalGMaps
                        isModalGmaps={isModalGmaps}
                        dataAddress={dataAddress}
                        mapsState={mapsState}
                        setMapsState={setMapsState}
                        setDataAddress={setDataAddress}
                        setModalGmaps={setModalGmaps}
                        disabled={saState.disableEdit && true}
                      />
                    </div>
                  </div>
                  <div className="profile-page__textbox-wrap">
                    <Textarea
                      topLabel="Deskripsi"
                      placeholder="Enter a description..."
                      resize={true}
                      name="description"
                      value={inputs?.description?.value}
                      onChange={handleInput}
                      warnText={
                        !inputs?.description?.isValid &&
                        "Deskripsi yang dimasukkan belum benar"
                      }
                      disabled={saState.disableEdit && true}
                      maxLength={5000}
                    />
                  </div>
                  <div className="profile-page__price-range-wrap">
                    <CurrencyInput
                      topLabel="Range Harga Unit (min)"
                      disabled={saState.disableEdit && true}
                      className="textbox-label__currency"
                      name="startRangePrice"
                      placeholder="0"
                      decimalsLimit={2}
                      groupSeparator="."
                      decimalSeparator=","
                      minLength={7}
                      maxLength={14}
                      value={inputs?.startRangePrice?.value}
                      allowNegativeValue={false}
                      onValueChange={(value) => handleAltInput(value || "", "startRangePrice")}
                      warnText={
                        Number(inputs?.startRangePrice?.value) > Number(inputs?.endRangePrice?.value) ?
                          "Harga awal melebihi harga akhir" :
                          inputs?.startRangePrice?.value !== "" && Number(inputs?.startRangePrice?.value) >= Number(inputs?.endRangePrice?.value) ?
                            "Harga awal sama dengan harga akhir" :
                            inputs?.startRangePrice?.value === "" && inputs?.endRangePrice?.value === "" ?
                              "Harga Mulai Properti Kosong" :
                              inputs?.startRangePrice?.msgError
                      }
                    />
                    <CurrencyInput
                      topLabel="Range Harga Unit (max)"
                      disabled={saState.disableEdit && true}
                      className="textbox-label__currency"
                      name="endRangePrice"
                      placeholder="0"
                      decimalsLimit={2}
                      groupSeparator="."
                      decimalSeparator=","
                      minLength={7}
                      maxLength={14}
                      value={inputs?.endRangePrice?.value}
                      allowNegativeValue={false}
                      onValueChange={(value) => handleAltInput(value || "", "endRangePrice")}
                      warnText={inputs?.endRangePrice?.msgError}
                    />

                  </div>
                  <div className="profile-page__textbox-wrap">
                    <TextboxLabel
                      topLabel="Nomor PKS"
                      placeholder="Nomor PKS"
                      name="noPKS"
                      value={inputs?.noPKS?.value}
                      onChange={handleNumber}
                      warnText={
                        !inputs?.noPKS?.isValid &&
                        "Nomor PKS yang dimasukkan belum benar"
                      }
                      disabled={saState.disableEdit && true}
                    />
                  </div>
                  <div className="add-admin__form-txtbox-wrap">
                    <div className="w-full">
                      <div className="mb-2">
                        <LabelInputTextbox text={"Tanggal PKS"} />
                      </div>
                      <div className="flex flex-row gap-3">
                        <DatePicker
                          name="tanggalPKS"
                          onChange={(e) => {
                            handleDateInputChange(e, "tanggalPKS", "pksStart");
                          }}
                          value={inputs?.tanggalPKS?.value || null}
                          onChangeRaw={(e) => e.preventDefault()}
                          locale="id-ID"
                          isClearable
                          calendarIcon={<FaCalendarAlt />}
                          clearIcon={<MdOutlineClear />}
                          disabled={saState.disableEdit && true}
                        />
                      </div>
                    </div>
                    {!inputs?.tanggalPKS?.value && <p className="textbox__invalidTxt">Tanggal PKS belum dipilih</p>}
                  </div>
                  <div className="add-admin__form-txtbox-wrap">
                    <div className="w-full">
                      <div className="mb-2">
                        <LabelInputTextbox text={"Tanggal Akhir PKS"} />
                      </div>
                      <div className="flex flex-row gap-3">
                        <DatePicker
                          name="tanggalAkhirPKS"
                          onChange={(e) => {
                            handleDateInputChange(e, "tanggalAkhirPKS", "pksEnd");
                          }}
                          value={inputs?.tanggalAkhirPKS?.value || null}
                          onChangeRaw={(e) => e.preventDefault()}
                          locale="id-ID"
                          calendarIcon={<FaCalendarAlt />}
                          clearIcon={<MdOutlineClear />}
                          disabled={saState.disableEdit && true}
                          minDate={inputs?.tanggalPKS?.value}
                        />
                      </div>
                      {!inputs?.tanggalAkhirPKS?.value && <p className="textbox__invalidTxt">Tanggal Akhir PKS belum dipilih</p>}
                    </div>
                  </div>
                  <div className="profile-page__textbox-wrap">
                    <div className="mb-2">
                      <LabelInputTextbox text="Upload PKS" />
                    </div>
                    <UploadSingleFile
                      loading={loadingFile}
                      files={pks.file}
                      reference={refSingleUpload}
                      id="uploadPks"
                      name="pks"
                      onChange={(e) => {
                        const fileName = e.target.files[0].name.toString();
                        const idxDot = fileName.lastIndexOf(".") + 1;
                        const extFile = fileName
                          .substr(idxDot, fileName.length)
                          .toLowerCase();
                        if (extFile !== "pdf") {
                          dispatch(
                            showModalFail("Gagal", "Format file tidak didukung")
                          );
                        } else if (e.target.files[0].size > 5000000) {
                          dispatch(showModalFail("Gagal", "File Terlalu Besar"));
                          resetSingleUpload();
                        } else {
                          Array.from(e.target.files).forEach((file) => {
                            setPks({
                              ...pks,
                              file: file,
                              name: file.name,
                              selected: true,
                            });
                          });
                        }
                      }}
                      selectedFile={pks.selected && true}
                      fileName={pks !== [] && pks.name}
                      onClickClear={(e) => {
                        resetSingleUpload();
                        setPks({ file: "", name: "", selected: false });
                      }}
                      acceptedFiles=".pdf"
                      disabled={saState.disableEdit && true}
                      invalidTxt={!pks.file && "Upload PKS tidak valid"}
                    />
                  </div>
                  <DetailsCard className="sellpropsV2__card__wrapper">
                    <p className="sellprops__card__title">
                      Pengaturan
                    </p>
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
                        disabled={true}
                        topLabel="No Handphone"
                        placeholder="No Handphone"
                        name="mobileNo"
                        value={developer_phone}
                        onChange={handleMobileNo}
                        warnText={inputs?.mobileNo?.msgError}
                      />
                    </div>
                    <div className="profile-page__textbox-wrap">
                      <TextboxLabel
                        disabled={true}
                        topLabel="No Rekening"
                        placeholder="No Rekening"
                        name="accountNo"
                        value={inputs?.accountNo?.value}
                        onChange={handleNoRekening}
                        invalid={!inputs?.accountNo?.isValid}
                        warnText={inputs?.accountNo?.msgError}
                        maxLength={15}
                      />
                    </div>
                    <div className="profile-page__textbox-wrap">
                      <TextboxLabel
                        // disabled={edit.password && true}
                        disabled={true}
                        className={saState.disableEdit && `profile-page__textbox`}
                        topLabel="Ubah Kata Sandi"
                        placeholder="Ubah Kata Sandi"
                        typeInput="password"
                        isPassword={true}
                        name="password"
                        value={"P@ssw0rd"}
                        onChange={handlePass}
                        warnText={inputs?.password?.msgError}
                      />
                    </div>
                    <div className="profile-page__btn-wrap">
                      <Button
                        buttonColor="blue"
                        textColor="white"
                        className="add-admin__btn-bottom--save"
                        onClick={() => {
                          dispatch(requestEditUser(JSON.parse(cookie.get("morgateCookie"))?.email));
                        }}
                        isLoading={state.loading}
                      >
                        Ubah Data
                      </Button>
                    </div>
                  </DetailsCard>
                  {!saState.disableEdit && (
                    <div className="profile-page__btn-wrap">
                      <Button
                        className="add-admin__btn-bottom"
                        buttonColor="white"
                        textColor="blue"
                        onClick={() => setCancelModal(true)}
                      >
                        Batal
                      </Button>
                      <Button
                        buttonColor="blue"
                        textColor="white"
                        className="add-admin__btn-bottom--save"
                        disabled={inputsArrDev.filter(Boolean).length !== 12 || dataAddressArr.filter(Boolean).length !== 15}
                        onClick={() => {
                          if (pks.file.length !== 0) {
                            dispatch(addEditUserDev(inputs, { editMode: true, userType: "developer" }, stringMinified, pks.file))
                          } else {
                            dispatch(addEditUserDev(inputs, { editMode: true, userType: "developer" }, stringMinified))
                          }
                        }}
                        isLoading={state.loading}
                      >
                        {" "}
                        Simpan{" "}
                      </Button>
                    </div>
                  )}
                </>
              ) : "" }
            </div>
          </div>
        </div>
      </ProfileUser>
    </div>
  );
};

export default Profile;
