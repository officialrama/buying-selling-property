import cookie from "hs-cookie";
import React, { useEffect,useRef,useState } from "react";
import { Modal } from "../../components/organisms";
import {TblListSales, Dropdown } from "../../components/molecules";
import { ProfileUser } from '../../components/templates';
import { selectConst } from '../../static/selectConst';
import { Button } from '../../components/atoms';
import { showSingleModal, showModalFilter } from '../../store/actions/changeState';
import TableData from "./../../components/molecules/Tables/Component";
import { useDispatch,useSelector } from "react-redux";
import { TextboxLabel} from '../../components/molecules';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import useRegSalesHooks from "../../hooks/useRegSalesHooks";
import useInputHooks from "../../hooks/useInputHooks";
import useInputRefHooks from "../../hooks/useInputRefHooks";
import ModalReferral from "../../components/molecules/Modal/modal-referral";
import { addReferral, deleteRef, editReferral, salesReferralList } from "../../store/actions/fetchData/salesReferral";
import { closeModalSuccess, closeModalFail, saReset, showModalFail, inquiryUser } from "../../store/actions/fetchData/superAdminState";
import useProfileMenuHooks from "../../hooks/useProfileMenuHooks";
import TableSales from "./table-sales";
import { Pagination } from 'flowbite-react';
import { decryptStr, encryptStr } from "../../helpers/encryptDecrypt";
import JSZip, { file, files } from "jszip";
import { FS_LOADING, SA_SUCCESS } from "../../store/actions/types";
import moment from 'moment';
import _ from "lodash-contrib";

const SalesReferral = ({userStatus, emailSales}) => {
  const saState = useSelector((state) => state.superAdminReducer);
  const state = useSelector((state) => state.stateReducer);
  const dispatch = useDispatch();
const [startDate, setStartDate] = useState(null);
const [endDate, setEndDate] = useState(null);
const { bodyListOfUser, setBodyListOfUser, bodySalesReferral, referralId, setReferralId, dataTemp, setDataTemp, editMode, setEditMode, cari, setCari } = useRegSalesHooks();
const [isModal, setIsModal] = useState(false);
const { inputs } = useInputHooks();
const { inputsRef, setInputsRef, handleInput, handleEmail, handlePhoneNum, handleName } = useInputRefHooks();
const [isCheckAll, setIsCheckAll] = useState(false);
const [isCheck, setIsCheck] = useState([]);
const [filterCheck, setFilterCheck] = useState([])
const onChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);

    const startDate = moment(start).format("YYYY-MM-DD");
    const endDate = moment(end).format("YYYY-MM-DD");

    if (start === null && end === null){
      setBodyListOfUser({
          ...bodyListOfUser,
          startDate: "",
          endDate: "",
          pageStart: 0
      });
      dispatch(inquiryUser(JSON.parse(cookie.get("morgateCookie"))?.email));
    }
  
    if (startDate !== "Invalid date" && endDate !== "Invalid date") {
        setBodyListOfUser({
            ...bodyListOfUser,
            startDate: startDate,
            endDate: endDate,
            keyword: cari ? cari : "",
            pageStart: 0
        });
        dispatch(inquiryUser(JSON.parse(cookie.get("morgateCookie"))?.email));
    }
};

useEffect(() => {
  dispatch(salesReferralList(bodyListOfUser, setDataTemp, dataTemp));
  dispatch(inquiryUser(JSON.parse(cookie.get("morgateCookie"))?.email));
  return () => {
    dispatch(saReset());
  };
}, [bodyListOfUser]);


const handleOnSearch = () => {
  setBodyListOfUser({
      ...bodyListOfUser,
      keyword: cari,
      pageStart: 0
  });
  setIsCheck([]);
  setIsCheckAll(false);
  dispatch(inquiryUser(JSON.parse(cookie.get("morgateCookie"))?.email));
};
const handleSearchChange = (evt) => {
  setCari(evt.target.value);
};
const handleKeyDown = (evt) => {
  if (evt.key === "Enter") {
      handleOnSearch();
  }
};

const handleModal = () => {
  setIsModal(!isModal);
};
const onPageChange = (e) => {
  setBodyListOfUser({
      ...bodyListOfUser,
      pageStart: e - 1,
  });
}
const [profilePic, setProfilePic] = useState({
  file: "",
  name: "",
  preview: "",
});
const refProfilePic = useRef(null);
const resetProfilePic = () => {
  refProfilePic.current.value = null;
}

const closeModal = () => {
  setInputsRef({});
  setIsModal(false);
  setProfilePic({ ...profilePic, file: "", name: "", preview: ""});
};

const handleModalEdit = (id) => {
  if(id) {
    const dataFiltered = dataTemp?.dataRows?.filter((e) => e.id === id)[0];
    setInputsRef({
      id: { value: dataFiltered.id },
      salesName: { isValid: !!dataFiltered.salesName, value: dataFiltered.salesName},
      salesPhone: { isValid: !!dataFiltered.salesPhone, value: dataFiltered.salesPhone},
      emailSales: { isValid: !!dataFiltered.salesEmail, value: dataFiltered.salesEmail},
    });
    if(dataFiltered.ppUrl !== ""){
      setProfilePic({
        preview: {value: dataFiltered.ppUrl}
      });
    }
  }
  setIsModal(!isModal);
  // console.log("INI PREVIEW",preview);
};

const applyFilter = () => {
  setBodyListOfUser({
      ...bodyListOfUser,
      parameter: filterCheck,
      keyword: cari,
      pageStart: 0
      
  });
  dispatch(showModalFilter(!state.showModalFilter));
  dispatch(inquiryUser(JSON.parse(cookie.get("morgateCookie"))?.email));
}
  return (
    <div>
      
      {state.showModalFilter === true && (
                <Modal
                    closeModal={() => dispatch(showModalFilter(!state.showModalFilter))}
                    modalTypes="filterSalesRefferal"
                    title="Filter"
                    disableScroll={false}
                    otherProps={{ setFilterCheck, filterCheck, applyFilter }}
                />
            )}
      {state.showSingleModal === true && (
        <Modal
          closeModal={() => dispatch(showSingleModal(!state.showSingleModal))}
          onClickDelete={() => dispatch(deleteRef(referralId))}
          modalTypes="deleteConfirm"
          title="Konfirmasi"
        />
      )}
      {saState.success === true && (
        <Modal
          closeModal={() => {
            dispatch(closeModalSuccess());
            dispatch(saReset());
            dispatch(inquiryUser(JSON.parse(cookie.get("morgateCookie")).email));
            dispatch(salesReferralList(bodyListOfUser, setDataTemp, dataTemp));
          }}
          modalTypes="modalSF"
          title=""
          titleBody={saState.titleSuccess}
          descBody={saState.msgSuccess}
        />
      )}
      {saState.fail === true && (
        <Modal 
          closeModal={() => {
            dispatch(closeModalFail());
          }}
          modalTypes="modalSF"
          title=""
          titleBody={saState.titleFail}
          descBody={saState.msgFail}
        />
      )}
      <ProfileUser
        title="Sales"
        userStatus={userStatus}
        data={saState.resApi && saState.resApi.responseData && saState.resApi.responseData[0]}
      >
      <div className="sales-ref__srch-drp-gmk-wrap gtc-salesdeveloper-reff">
                      <div>
                          <div className="sales-ref__srch-drp">
                              <TextboxLabel
                                  placeholder="Search"
                                  onChange={handleSearchChange}
                                  onKeyDown={handleKeyDown}
                              />
                          </div>
                      </div>
                      <div className="sales-ref__srch-drp">
                      <button
                            onClick={() => {
                                dispatch(showModalFilter(!state.showModalFilter));
                            }}
                            className="w-full"
                        >
                            <Dropdown
                                value={selectConst.filter[0]}
                                onChange={() => { }}
                                data={selectConst.filter}
                                showOptions={false}
                            />
                        </button>
                      </div>
                      <div className="sales-ref__srch-drp">
                        <DatePicker
                        paddingSize="3"
                              className='rounded-md border-gray-300 mobile:w-full'
                              onChange={onChange}
                              startDate={startDate}
                              endDate={endDate}
                              selectsRange
                              placeholderText="Date"
                          />
                      </div>
                      <div className="sales-ref__srch-drp">
                          <Button
                            className="mobile:w-full h-10 mobile:text-[10px] text-[15px] tab:text-[10px]"
                            paddingSize="0.5"
                            buttonColor="blue"
                            textColor="white"
                            onClick={() => {
                              setEditMode(false);
                              handleModal();
                            }}
                          >Tambah Sales</Button>
                      </div>
                      
                  </div>
        <div className="sales-ref__wrapper">
          
          <TableSales referralId={referralId} setReferralId={setReferralId} dispatch={dispatch} setEditMode={setEditMode} handleModalEdit={handleModalEdit} tableType="salesRefferal" dataTemp={React.useMemo( () => (dataTemp),[dataTemp])}/>
                  <Pagination
                      currentPage={dataTemp?.metadata?.currentPage + 1 || 1}
                      totalPages={Math.ceil(dataTemp?.metadata?.totalData / 10) || 10}
                      onPageChange={onPageChange}
                      showIcons={false}
                      layout={window.innerWidth <=768 ? "navigation" : "pagination"}
                      className="flex items-center justify-center"
                  />
          <AddUserSales email={encryptStr(decryptStr(emailSales))} data={dataTemp?.dataRows} isModal={isModal} editMode={editMode} closeModal={closeModal} inputs={inputs} inputsRef={inputsRef} profilePic={profilePic} setProfilePic={setProfilePic} refProfilePic={refProfilePic} dispatch={dispatch} otherProps={{ handleInput, handleEmail, handlePhoneNum, handleName }} />
        </div>
      </ProfileUser>
    </div>
  );
};

const AddUserSales = ({ email, userStatus, data, id, isModal, closeModal, editMode, inputs, inputsRef, dispatch, otherProps, profilePic, setProfilePic, resetProfilePic, refProfilePic }) => {
  const inputArr = [
      inputsRef?.salesName?.isValid,
      inputsRef?.salesPhone?.isValid,
      inputsRef?.emailSales?.isValid,
  ];
  const morgateCookie = cookie.get("morgateCookie");
  const cookieIsExist = morgateCookie && JSON.parse(morgateCookie);
  const { refSingleUpload, resetSingleUpload } = useProfileMenuHooks();
  const saState = useSelector((state) => state.superAdminReducer);
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
      <ModalReferral 
          isModal={isModal} 
          closeModal={closeModal} 
          title={!editMode ? "Tambah Sales" : "Edit Sales"} 
          editMode={editMode}>
          <form>
              <div class="grid grid-cols-5 mobile:grid-cols-1 gap-6">
                  <div class="col-span-2">
                      <div className='p-6 pt-2 pb-0 flex-auto max-h-[50vh] overflow-y-auto lg:w-[300px]'>
                          Foto Sales
                          <div className="profile-page__left-wrap">
                            {!profilePic.preview.value ? (
                              <div className="profile-page__profile-pic-wrap">
                                {!profilePic.preview || profilePic.file.size > 1000000 ? (
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
                                  {profilePic.file.size > 1000000 ? "File Terlalu Besar" : "" }
                              </div>
                            ) : (
                              <div className="profile-page__profile-pic-wrap">
                                <img 
                                  src={profilePic.preview.value}
                                  alt="profile-page_pict"
                                  className="profile-page__profile-pic"
                                />
                              </div>
                            )}
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
                                                          setProfilePic,
                                                      )
                                                  );
                                              });
                                          }
                                      }}
                                  >
                                      {/* Upload Foto */}
                                      {!profilePic.preview ? "Upload Foto" : "Ganti Foto"}
                                  </Button>
                                  {!profilePic.preview.value ? (
                                    <p className="mx-auto text-center text-red-600">
                                      {profilePic.file.size > 1000000 ? "File Terlalu Besar" : ""}
                                    </p>
                                  ) : ""}
                              </div>
                              <div className="mx-auto text-center text-gray">
                                <p>
                                  Size max. 1MB.<br></br>
                                  Res. 600x600 px<br></br>
                                  Format .JPG, .PNG
                                </p>
                              </div>
                          </div>
                      </div>
                  </div>
                  <div class="col-span-2">
                      <div className='p-6 pt-2 pb-0 flex-auto max-h-[50vh] overflow-y-auto lg:w-[400px]'>
                          <div className='mb-4'>
                              <TextboxLabel 
                                  topLabel="Nama Sales" 
                                  requiredStar={true} 
                                  placeholder="Nama Sales" 
                                  name="salesName" 
                                  value={inputsRef?.salesName?.value}
                                  onChange={otherProps?.handleName}
                                  warnText={!inputsRef?.salesName?.value ? "Nama sales tidak boleh kosong" : !inputsRef?.salesName?.isValid ? inputsRef?.salesName?.msgError : ""}
                              />
                          </div>
                          <div className='mb-4'>
                              <TextboxLabel 
                                  topLabel="Nomor Handphone" 
                                  requiredStar={true} 
                                  placeholder="08xxxxxxxxxx" 
                                  name="salesPhone"
                                  maxLength={13}
                                  value={inputsRef?.salesPhone?.value}
                                  onChange={otherProps.handlePhoneNum}
                                  warnText={!inputsRef?.salesPhone?.value ? "Nomor handphone tidak boleh kosong" : !inputsRef?.salesPhone?.isValid ? inputsRef?.salesPhone?.msgError : ""}
                              />
                          </div>
                          <div className='mb-4'>
                              <TextboxLabel 
                                  topLabel="Email" 
                                  requiredStar={true} 
                                  placeholder="abcd@mail.com" 
                                  name="emailSales" 
                                  value={inputsRef?.emailSales?.value}
                                  onChange={otherProps.handleEmail}
                                  warnText={!inputsRef?.emailSales?.value ? "Email tidak boleh kosong" : !inputsRef?.emailSales?.isValid ? inputsRef?.emailSales?.msgError : ""}
                              />
                          </div>
                      </div>
                  </div>
              </div>
              <div className="p-6 w-full">
                  <Button btnTypes="submit" 
                          id="submitRef" 
                          name="submitRef" 
                          className="w-full" 
                          acceptedFiles=""
                          disabled={inputArr.filter(Boolean).length !==3} 
                          onClick={(e) => {
                            closeModal();
                            if (!editMode) {
                              if(profilePic.file.size > 1000000){
                                dispatch(
                                  addReferral(
                                    inputsRef
                                  )
                                )
                              } else {
                                dispatch(
                                  addReferral(
                                    inputsRef,
                                    profilePic
                                  )
                                )
                              }
                            } else {
                              if (!profilePic.preview.value) {
                                if (profilePic.file.size > 1000000) {
                                  dispatch(
                                    editReferral(
                                      inputsRef
                                    )
                                  );
                                } else {
                                  dispatch(
                                    editReferral(
                                      inputsRef,
                                      profilePic
                                    )
                                  );
                                }
                              } else {
                                dispatch(
                                  editReferral(
                                    inputsRef
                                  )
                                );
                              }
                            }
                            setProfilePic({ ...profilePic, file: "", name: "", preview: "" });
                          }}>{editMode ? "Simpan" : "Tambahkan"}
                    </Button>
              </div>
          </form>

      </ModalReferral>
  )
};

export default SalesReferral;