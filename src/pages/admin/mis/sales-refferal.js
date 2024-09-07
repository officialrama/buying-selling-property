import cookie from "js-cookie";
import React, { useEffect, useRef, useState } from 'react';
import { NavHeaderAdmin, SideMenuAdmin, Modal } from '../../../components/organisms';
import { TextboxLabel, TableCheckbox, TableSalesRefferal, Dropdown } from '../../../components/molecules';
import { Button, LabelInputTextbox } from '../../../components/atoms';
import { FiDownload, FiPlus } from "react-icons/fi";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import useRegSalesHooks from '../../../hooks/useRegSalesHooks';
import { selectConst } from '../../../static/selectConst';
import { useDispatch, useSelector } from 'react-redux';
import { closeModalFail, closeModalSuccess, saReset, showModalFail } from '../../../store/actions/fetchData/superAdminState';
import useInputHooks from '../../../hooks/useInputHooks';
import useInputRefHooks from '../../../hooks/useInputRefHooks';
import ModalReferral from '../../../components/molecules/Modal/modal-referral';
import { showSingleModal } from '../../../store/actions/changeState';
import { salesRefferalAdmin, addReferralAdmin, editReferralAdmin, inquiryDeveloper, finalPengajuan, exportDataFinal } from '../../../store/actions/fetchData/salesReferral';
import AsyncSelect from 'react-select/async';
import TableMIS from './table-mis';
import { CSVLink } from 'react-csv';
import { Pagination } from 'flowbite-react';
import JSZip from "jszip";
import { FS_LOADING, SA_SUCCESS } from "../../../store/actions/types";
import useProfileMenuHooks from "../../../hooks/useProfileMenuHooks";
import { decryptStr, encryptStr } from "../../../helpers/encryptDecrypt";
import { removePP } from "../../../store/actions/fetchData/uploadFile";
import moment from "moment";

const SalesRefferal = ({ userStatus, salesName }) => {
    const tanggal = new Date();
    const saState = useSelector((state) => state.superAdminReducer);
    const state = useSelector((state) => state.stateReducer);
    const dispatch = useDispatch();
    const [filter, setFilter] = useState({
        userType: { name: "Filter", value: "all" },
    });
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [isModal, setIsModal] = useState(false);
    const { inputs } = useInputHooks();
    const { inputsRef, setInputsRef, handleInput, handleAltInput, handleNumberInput, handleInutNoZero, handleInputNoNumberAndSpec, handleEmail, handleMobileNo, handlePhoneNum, handleAutoComplete, handleName } = useInputRefHooks();
    const { bodyListOfUser, setBodyListOfUser, bodySalesReferral, setBodySalesRefferal, dataTemp, setDataTemp, editMode, setEditMode, handleSearchChange, cari, downloadData, setDownloadData, listDeveloper, setListDeveloper } = useRegSalesHooks();
    const [isCheckAll, setIsCheckAll] = useState(false);
    const [isCheck, setIsCheck] = useState([]);
    const [filterCheck, setFilterCheck] = useState([])
    const headers = [
        { label: "Nama Sales", key: "salesName" },
        { label: "Nama Developer", key: "developer" },
        { label: "Nama Debitur", key: "customerName" },
        { label: "NIK", key: "nik" },
        { label: "Jenis Proyek", key: "jenisProyek" },
        { label: "Plafond Pengajuan", key: "plafondPengajuan" },
        { label: "Plafond Putusan", key: "plafondPutusan" },
        { label: "Tanggal Pengajuan", key: "createdAt" },
        { label: "Tanggal Putusan", key: "tanggalPutusan" },
        { label: "Status", key: "status" },
        { label: "Kantor Cabang", key: "branchOffice" },
        { label: "Kantor Wilayah", key: "regionalBranch" },
        { label: "RM", key: "rm" },
        { label: "Nama Pemutus", key: "pemutus" },
        { label: "Jenis Properti", key: "jenisProperti" },
        { label: "Tipe Properti", key: "tipeProperti" }
    ];
    const [profilePic, setProfilePic] = useState({
        file: "",
        name: "",
        preview: "",
    });
    const refProfilePic = useRef(null);
    const resetProfilePic = () => {
        refProfilePic.current.value = null;
    }


    const applyFilter = () => {
        setBodyListOfUser({
            ...bodyListOfUser,
            parameter: filterCheck,
            keyword: cari,
            pageStart: 0
        });
        dispatch(showSingleModal(!state.showSingleModal))
    }

    const onChange = (dates) => {
        const [start, end] = dates;
        setStartDate(start);
        setEndDate(end);

        const startDate = moment(start).format("YYYY-MM-DD");
        const endDate = moment(end).format("YYYY-MM-DD");

        if (start === null && end === null) {
            setBodyListOfUser({
                ...bodyListOfUser,
                startDate: "",
                endDate: "",
                pageStart: 0
            });
        }
        if (startDate !== "Invalid date" && endDate !== "Invalid date") {
            setBodyListOfUser({
                ...bodyListOfUser,
                startDate: startDate,
                endDate: endDate,
                keyword: cari ? cari : "",
                pageStart: 0
            });
        }
    };

    useEffect(() => {
        dispatch(inquiryDeveloper("", setListDeveloper));
    }, [])

    useEffect(() => {
        dispatch(finalPengajuan(dataTemp, setDataTemp, { ...bodyListOfUser, userType: "superadmin" }));
        // dispatch(salesRefferalAdmin(bodyListOfUser, setDataTemp, dataTemp));
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
        setProfilePic({ ...profilePic, file: "", name: "", preview: "" });
    };

    // const handleChangeTypes = (data) => {
    //     setFilter({
    //         ...filter,
    //         userType: data,
    //     });
    //     dispatch(salesRefferalAdmin({ ...bodySalesReferral, status: data.value }))
    // };

    const onPageChange = (e) => {
        setBodyListOfUser({
            ...bodyListOfUser,
            pageStart: e - 1,
        });
        setIsCheck([]);
        setIsCheckAll(false);
    }

    const handleDownload = (e) => {
        dispatch(exportDataFinal({ ...bodyListOfUser, userType: "superadmin" }, downloadData));
    }

    return (
        <div>
            {state.showSingleModal && (
                <Modal
                    closeModal={() => dispatch(showSingleModal(!state.showSingleModal))}
                    modalTypes="FilterSubmittedBySales"
                    title="Filter"
                    disableScroll={false}
                    otherProps={{ setFilterCheck, filterCheck, applyFilter }}
                />
            )}
            {saState.success === true && (
                <Modal
                    closeModal={() => {
                        dispatch(closeModalSuccess());
                        dispatch(saReset());
                        dispatch(salesRefferalAdmin(bodySalesReferral));
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
            <SideMenuAdmin title="Submitted by Sales">
                <div className="admin-page__srch-drp-gmk-wrap gtc-four-column">
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
                        <button
                            onClick={() => {
                                dispatch(showSingleModal(!state.showSingleModal));
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
                    <div className="admin-page__srch-drp">
                        <DatePicker
                            className='rounded-md border-gray-300 mobile:w-full'
                            placeholderText="Date"
                            onChange={onChange}
                            startDate={startDate}
                            endDate={endDate}
                            selectsRange
                            showMonthDropdown
                            showYearDropdown
                        />
                    </div>
                    <div className="admin-page__srch-drp">
                        {/* <CSVLink filename={`data-penjualan-sales-${tanggal.getDate()}/${tanggal.getMonth() + 1}/${tanggal.getFullYear()}.csv`} data={downloadData} headers={headers}> */}
                        <Button
                            buttonColor="blue"
                            textColor="white"
                            className="mr-2 h-10 mobile:text-[12px] text-[15px] mobile:w-full"
                            onClick={() => {
                                handleDownload();
                            }}
                        // disabled={ isCheckAll !== false || downloadData.length > 0 ? false : true}
                        >
                            <div className="flex flex-row space-x-2 mobile:text-sm justify-center">
                                <div className="mt-1"><FiDownload /> </div>
                                <div>Export</div>
                            </div>
                        </Button>
                        {/* </CSVLink> */}

                        {/* <Button
                            buttonColor="blue"
                            textColor="white"
                            className="h-10 mobile:text-[10px] text-[15px]"
                            onClick={() => {
                                setEditMode(false);
                                handleModal();
                            }}
                        >
                            <FiPlus />
                        </Button> */}
                    </div>
                </div>
                <div className="user-ref__wrapper">
                <TableMIS tableType="salesRefferalAdmin" dataTemp={React.useMemo(() => (dataTemp), [dataTemp])} downloadData={downloadData} setDownloadData={setDownloadData} checkProps={{ isCheck, setIsCheck, isCheckAll, setIsCheckAll }} />
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
                <AddUserSales email={encryptStr(decryptStr(salesName))} listDeveloper={listDeveloper} setListDeveloper={setListDeveloper} isModal={isModal} editMode={editMode} closeModal={closeModal} inputs={inputs} inputsRef={inputsRef} profilePic={profilePic} setProfilePic={setProfilePic} refProfilePic={refProfilePic} dispatch={dispatch} otherProps={{ handleInput, handleEmail, handlePhoneNum, handleAutoComplete, handleName }} />
            </SideMenuAdmin>
        </div>
    )
};

const AddUserSales = ({ email, listDeveloper, setListDeveloper, isModal, closeModal, editMode, inputs, inputsRef, dispatch, setProfilePic, profilePic, resetProfilePic, refProfilePic, otherProps }) => {
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
                                        {!profilePic.preview || profilePic.file.size > 100000 ? (
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
                                        <p className="mx-auto text-center text-red">
                                            {profilePic.file.size > 1000000 ? "File Terlalu Besar" : ""}
                                        </p>
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
                                            } else if (e.target.files[0].size > 1000000) {
                                                resetSingleUpload();
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
                                    isClearable />
                            </div>
                            <div className='mb-4'>
                                <TextboxLabel
                                    topLabel="Nama Sales"
                                    requiredStar={true}
                                    placeholder="Nama Sales"
                                    name="salesName"
                                    value={inputsRef?.salesName?.value}
                                    onChange={otherProps?.handleName}
                                    // invalid={!inputsRef?.salesName?.isValid}
                                    warnText={!inputsRef?.salesName?.value ? "Nama sales tidak boleh kosong" : !inputsRef?.salesName?.isValid ? inputsRef?.salesName?.msgError : ""}
                                />
                            </div>
                            <div className='mb-4'>
                                <TextboxLabel
                                    topLabel="Nomor Handphones"
                                    requiredStar={true}
                                    placeholder="08xxxxxxxxxx"
                                    name="salesPhone"
                                    value={inputsRef?.salesPhone?.value}
                                    onChange={otherProps.handlePhoneNum}
                                    // invalid={!inputsRef?.salesPhone?.isValid}
                                    warnText={!inputsRef?.salesPhone?.value ? "Nomor handphone tidak boleh kosong" : !inputsRef?.salesPhone?.isValid ? inputsRef?.salesPhone?.msgError : ""}
                                />
                            </div>
                            <div className='mb-4'>
                                <TextboxLabel topLabel="Email" requiredStar={true} placeholder="abcd@mail.com" name="emailSales" value={inputsRef?.emailSales?.value}
                                    onChange={otherProps.handleEmail}
                                    // invalid={!inputsRef?.emailSales?.isValid}
                                    warnText={!inputsRef?.emailSales?.value ? "Email tidak boleh kosong" : !inputsRef?.emailSales?.isValid ? inputsRef?.emailSales?.msgError : ""}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="p-6 w-full">
                    <Button btnTypes="submit" id="submitRef" name="submitRef" className="w-full" disabled={inputArr.filter(Boolean).length !== 4} onClick={() => {
                        closeModal();
                        if (!editMode) {
                            dispatch(
                                addReferralAdmin(
                                    inputsRef,
                                    profilePic
                                ));
                        } else {
                            dispatch(editReferralAdmin(inputsRef));
                        }
                        resetProfilePic();
                        setProfilePic({ ...profilePic, file: "", name: "", preview: "" });
                    }}>{editMode ? "Simpan" : "Tambahkan"}</Button>
                </div>
            </form>

        </ModalReferral>
    )
};

export default SalesRefferal