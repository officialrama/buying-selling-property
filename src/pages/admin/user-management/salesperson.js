import cookie from "js-cookie";
import React, { useEffect, useRef, useState } from 'react';
import { NavHeaderAdmin, SideMenuAdmin, Modal } from '../../../components/organisms';
import { TextboxLabel } from '../../../components/molecules';
import { Button, LabelInputTextbox } from '../../../components/atoms';
import { FiPlus } from "react-icons/fi";
import "react-datepicker/dist/react-datepicker.css";
import useRegSalesHooks from '../../../hooks/useRegSalesHooks';
import { useDispatch, useSelector } from 'react-redux';
import { closeModalFail, closeModalSuccess, saReset, showModalFail } from '../../../store/actions/fetchData/superAdminState';
import useInputHooks from '../../../hooks/useInputHooks';
import useInputRefHooks from '../../../hooks/useInputRefHooks';
import ModalReferral from '../../../components/molecules/Modal/modal-referral';
import { salesRefferalAdmin, addReferralAdmin, deleteRef, editReferralAdmin, inquiryDeveloper } from '../../../store/actions/fetchData/salesReferral';
import { showSingleModal } from "../../../store/actions/changeState";
import AsyncSelect from 'react-select/async';
import TableUserMgmt from "./table-user-mgmt";
import { Pagination } from 'flowbite-react';
import JSZip, { file } from "jszip";
import { FS_LOADING, SA_SUCCESS } from "../../../store/actions/types";
import useProfileMenuHooks from "../../../hooks/useProfileMenuHooks";
import { decryptStr, encryptStr } from "../../../helpers/encryptDecrypt";
import { removePP } from "../../../store/actions/fetchData/uploadFile";

const SalesPerson = ({ userStatus, salesName }) => {
    const saState = useSelector((state) => state.superAdminReducer);
    const state = useSelector((state) => state.stateReducer);
    const dispatch = useDispatch();
    const [isModal, setIsModal] = useState(false);
    const { inputs } = useInputHooks();
    const { inputsRef, setInputsRef, handleInput, handleAltInput, handleNumberInput, handleInutNoZero, handleInputNoNumberAndSpec, handleEmail, handleMobileNo, handlePhoneNum, handleAutoComplete, handleName } = useInputRefHooks();
    const { bodyListOfUser, setBodyListOfUser, bodySalesReferral, setBodySalesRefferal, dataTemp, setDataTemp, referralId, setReferralId, editMode, setEditMode, handleSearchChange, cari, downloadData, setDownloadData, listDeveloper, setListDeveloper } = useRegSalesHooks();
    const [profilePic, setProfilePic] = useState({
        file: "",
        name: "",
        preview: "",
    });
    const refProfilePic = useRef(null);
    const resetProfilePic = () => {
        refProfilePic.current.value = null;
    }

    useEffect(() => {
        dispatch(salesRefferalAdmin(bodyListOfUser, setDataTemp, dataTemp));
        return () => {
            dispatch(saReset());
        };
    }, [bodyListOfUser]);

    useEffect(() => {
        dispatch(inquiryDeveloper("", setListDeveloper));
    }, [])

    const handleOnSearch = () => {
        setBodyListOfUser({
            ...bodyListOfUser,
            keyword: cari,
            pageStart: 0
        });
    };

    const handleKeyDown = (evt) => {
        if (evt.key === "Enter") {
            handleOnSearch();
        }
    };

    const handleModal = () => {
        setIsModal(!isModal);
    };

    const closeModal = () => {
        setInputsRef({});
        setIsModal(false);
        setProfilePic({ ...profilePic, name: "", file: "", preview: "" });

    };

    const handleModalEdit = (id) => {
        if (id) {
            const dataFiltered = dataTemp?.rows?.filter((e) => e.id === id)[0];
            setInputsRef({
                id: { value: dataFiltered.id },
                nameDev: { isValid: !!dataFiltered.metadata, value: dataFiltered.metadata },
                salesName: { isValid: !!dataFiltered.salesName, value: dataFiltered.salesName },
                salesPhone: { isValid: !!dataFiltered.salesPhone, value: dataFiltered.salesPhone },
                emailSales: { isValid: !!dataFiltered.salesEmail, value: dataFiltered.salesEmail },
            });
            if(dataFiltered.ppUrl !== ""){
                setProfilePic({
                    preview: {value: dataFiltered.ppUrl}
                });
            }
        }
        setIsModal(!isModal);
    };

    const onPageChange = (e) => {
        setBodyListOfUser({
            ...bodyListOfUser,
            pageStart: e - 1,
        });
    }

    return (
        <div>
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
                        dispatch(salesRefferalAdmin(bodyListOfUser, setDataTemp, dataTemp));
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
            <NavHeaderAdmin />
            <SideMenuAdmin title="Sales">
                <div className="admin-page__srch-drp-gmk-wrap gtc-mon-user">
                    <div>
                        <div className="admin-page__srch-drp">
                            <TextboxLabel
                                placeholder="Search"
                                onChange={handleSearchChange}
                                onKeyDown={handleKeyDown}
                            />
                        </div>
                    </div>
                    <div className="admin-page__srch-drp">
                        <Button
                            buttonColor="blue"
                            textColor="white"
                            className="h-10 mobile:text-[10px] text-[15px] w-full"
                            onClick={() => {
                                setEditMode(false);
                                handleModal();
                            }}
                        >
                            <div className="flex flex-row space-x-2 justify-center">
                                <div className="mt-1"><FiPlus /> </div>
                                <div>Tambah Sales</div>
                            </div>
                        </Button>
                    </div>
                </div>
                <div className="user-ref__wrapper">
                <TableUserMgmt tableType="salesPerson" referralId={referralId} setReferralId={setReferralId} dispatch={dispatch} setEditMode={setEditMode} handleModalEdit={handleModalEdit} dataTemp={React.useMemo(() => (dataTemp), [dataTemp])} />
                {dataTemp && dataTemp?.metadata?.totalData > 10 ?
                    (
                            <Pagination
                                currentPage={dataTemp?.metadata?.currentPage + 1 || 1}
                                totalPages={Math.ceil(dataTemp?.metadata?.totalData / 10) || 10}
                                onPageChange={onPageChange}
                                showIcons={false}
                                layout={window.innerWidth <=768 ? "navigation" : "pagination"}
                                className="flex items-center justify-center"
                            />
                    ) : ""
                }
                </div>
                <AddUserSales email={encryptStr(decryptStr(salesName))} listDeveloper={listDeveloper} setListDeveloper={setListDeveloper} isModal={isModal} editMode={editMode} closeModal={closeModal} inputs={inputs} inputsRef={inputsRef} dispatch={dispatch} profilePic={profilePic} setProfilePic={setProfilePic} refProfilePic={refProfilePic} resetProfilePic={resetProfilePic} otherProps={{ handleInput, handleEmail, handlePhoneNum, handleAutoComplete, handleName }} />
            </SideMenuAdmin>
        </div>
    )
};

const AddUserSales = ({ email, listDeveloper, setListDeveloper, isModal, closeModal, editMode, inputs, inputsRef, dispatch, profilePic, setProfilePic, refProfilePic, resetProfilePic, otherProps }) => {
    const inputArr = [
        inputsRef?.nameDev?.isValid,
        inputsRef?.salesName?.isValid,
        inputsRef?.salesPhone?.isValid,
        inputsRef?.emailSales?.isValid
    ];
    const morgateCookie = cookie.get("morgateCookie");
    const cookieIsExist = morgateCookie && JSON.parse(morgateCookie);
    const { refSingleUpload, resetSingleUpload } = useProfileMenuHooks();
    const saState = useSelector((state) => state.superAdminReducer);
    const uploadProfileSales = (files, userName, profilePic, setProfilePic) => (dispatch) => {
        const zip = new JSZip();
        const datenow = Date.now();
        zip.file(files.name, files);
        zip.generateAsync({ type: "blob" }).then((content) => {
            dispatch({ type: FS_LOADING, payload: false });
            setProfilePic({ ...profilePic, file: files, name: files.name, preview: URL.createObjectURL(files) });
        })
    };

    const loadOptions = async (inputText, callback) => {
        dispatch(inquiryDeveloper(inputText, setListDeveloper));
        callback(listDeveloper?.map(i => ({ label: (i.name).replace(/['"]+/g, ''), value: i.email })))
    }

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
                                    {profilePic.file.size > 1000000 ? "File Terlalu Besar" : ""}
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
                                                    // if (file.size > 1000000) {
                                                    //     dispatch("");
                                                    // } else {
                                                        dispatch(
                                                            uploadProfileSales(
                                                                file,
                                                                email,
                                                                profilePic,
                                                                setProfilePic
                                                            )
                                                        );   
                                                    // }
                                                });
                                            }
                                        }}
                                    >
                                        {!profilePic.preview ? "Upload Foto" : "Ganti Foto"}
                                    </Button>
                                    {!profilePic.preview.value ? (
                                        <p className="mx-auto text-center text-red-600">
                                            {profilePic.file.size > 1000000 ? "File Terlalu Besar" : ""}
                                        </p>
                                    ) : ""}
                                </div>
                                <div className="mx-auto  text-center text-gray">
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
                            {!editMode ? (
                                <div className='mb-4'>
                                    <div className="mb-2">
                                        <LabelInputTextbox text={"Pilih Developer"} />
                                        <span className="sellprops__card__redstar">*</span>
                                    </div>
                                    <AsyncSelect
                                        name="nameDev"
                                        value={inputs?.nameDev?.value}
                                        onChange={otherProps.handleAutoComplete}
                                        loadOptions={loadOptions}
                                        defaultOptions={listDeveloper?.map(i => ({ label: (i.name).replace(/['"]+/g, ''), value: i.email }))}
                                        warnText={!inputs?.nameDev?.value ? "Developer harus dipilih" : !inputs?.nameDev?.isValid ? inputs?.nameDev?.msgError : ""}
                                        isClearable />
                                </div>
                            ) : ""}

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
                                    topLabel="Nomor Handphones"
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
                                            requiredStar={true} placeholder="abcd@mail.com"
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
                            disabled={inputArr.filter(Boolean).length !== 4} 
                            onClick={() => {
                                closeModal();
                                if (!editMode) {
                                    if(profilePic.file.size > 1000000 ){
                                        dispatch(
                                            addReferralAdmin(
                                                inputsRef,
                                            )
                                        );
                                    } else {
                                        dispatch(
                                            addReferralAdmin(
                                                inputsRef,
                                                profilePic,
                                            )
                                        );
                                    }
                                } else {
                                    if (!profilePic.preview.value) {
                                        if(profilePic.file.size > 1000000){
                                            dispatch(
                                                editReferralAdmin(
                                                    inputsRef,
                                                )
                                            );
                                        } else {
                                            dispatch(
                                                editReferralAdmin(
                                                    inputsRef,
                                                    profilePic
                                                )
                                            );
                                        }
                                    } else {
                                        dispatch(
                                            editReferralAdmin(
                                                inputsRef,
                                            )
                                        );
                                    }
                                }
                                setProfilePic({ ...profilePic, file: "", name: "", preview: "" });
                            }}>{editMode ? "Simpan" : "Tambahkan"}</Button>
                </div>
            </form>

        </ModalReferral>
    )
};

export default SalesPerson