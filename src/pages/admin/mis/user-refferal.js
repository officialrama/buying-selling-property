import React, { useState } from 'react';
import { NavHeaderAdmin, SideMenuAdmin, Modal } from '../../../components/organisms';
import { TextboxLabel, TableCheckbox, TableUserRefferal, Dropdown } from '../../../components/molecules';
import { Button } from '../../../components/atoms';
import { FiDownload, FiPlus } from "react-icons/fi";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { selectConst } from '../../../static/selectConst';
import { useDispatch, useSelector } from 'react-redux';
import { showSingleModal } from '../../../store/actions/changeState';
import useInputHooks from '../../../hooks/useInputHooks';
import useInputRefHooks from '../../../hooks/useInputRefHooks';
import useRegSalesHooks from '../../../hooks/useRegSalesHooks';
import ModalReferral from '../../../components/molecules/Modal/modal-referral';

const UserRefferal = () => {
    const state = useSelector((state) => state.stateReducer);
    const [filter, setFilter] = useState({
        userType: { name: "Filter", value: "all" },
    });
    const [startDate, setStartDate] = useState(null);
    const {editMode, setEditMode} = useRegSalesHooks();
    const [endDate, setEndDate] = useState(null);
    const [isModal, setIsModal] = useState(false);
    const dispatch = useDispatch();
    const {inputs} = useInputHooks();
    const {inputsRef, setInputsRef, handleInput, handleAltInput, handleNumberInput, handleInutNoZero, handleInputNoNumberAndSpec} = useInputRefHooks();
    const [cari, setCari] = useState("");
    const [isCheckAll, setIsCheckAll] = useState(false);
    const [isCheck, setIsCheck] = useState([]);   
    const onChange = (dates) => {
        const [start, end] = dates;
        setStartDate(start);
        setEndDate(end);
    };

    const handleSearchChange = (evt) => {
        setCari(evt.target.value);
    };

    const handleOnSearch = () => {
        // const tempRows = dataTemp.originalRows.filter(
        //   (evt) => JSON.stringify(evt).toLowerCase().indexOf(dataTemp.search.toLowerCase()) >= 0
        // );

        // setDataTemp({
        //   ...dataTemp,
        //   rows: tempRows,
        // });
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
    };    

    const handleChangeTypes = (data) => {
        setFilter({
            ...filter,
            userType: data,
        });
    };

    return (
        <div>
            {state.showSingleModal && (
                <Modal
                    closeModal={() => dispatch(showSingleModal(!state.showSingleModal))}
                    modalTypes="filterSalesRefferal"
                    title="Filter"
                    disableScroll={false}
                    // otherProps={{ setDataProperty, dataProperty, setTotalData }}
                />
            )}
            <NavHeaderAdmin />
            <SideMenuAdmin title="MIS User Refferal">
                <div className="admin-page__srch-drp-gmk-wrap gtc-user-reff">
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
                            className='rounded-md border-gray-300'
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
                        <Button
                            buttonColor="blue"
                            textColor="white"
                            className="mr-2 h-10 mobile:text-[10px] text-[15px]"
                        // onClick={() => {
                        //     setEditMode(false);
                        //     handleModal();
                        // }}
                        >
                            <FiDownload />
                        </Button>
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
                <TableCheckbox
                    tblAdmin
                    checkProps={{isCheck,setIsCheck,isCheckAll,setIsCheckAll}}
                    header={[
                        // {
                        //     name: "",
                        //     class: "admin-page__tbl--left",
                        // },
                        {
                            name: "Nama User",
                            class: "admin-page__tbl",
                        },
                        {
                            name: "Nama Sales",
                            class: "admin-page__tbl",
                        },
                        // {
                        //     name: "Nama Debitur",
                        //     class: "admin-page__tbl",
                        // },
                        // {
                        //     name: "NIK",
                        //     class: "admin-page__tbl",
                        // },
                        {
                            name: "Nama Developer",
                            class: "admin-page__tbl",
                        },
                        {
                            name: "Jenis Proyek",
                            class: "admin-page__tbl",
                        },
                        {
                            name: "Plafond Pengajuan",
                            class: "admin-page__tbl",
                        },
                        {
                            name: "Plafond Putusan",
                            class: "admin-page__tbl",
                        },
                        {
                            name: "Tanggal Pengajuan",
                            class: "admin-page__tbl",
                        },
                        {
                            name: "Tanggal Putusan",
                            class: "admin-page__tbl",
                        },
                        {
                            name: "Status",
                            class: "admin-page__tbl",
                        },
                        {
                            name: "Kantor Wilayah",
                            class: "admin-page__tbl",
                        },
                        {
                            name: "Kantor Cabang",
                            class: "admin-page__tbl",
                        },
                        {
                            name: "RM",
                            class: "admin-page__tbl",
                        },
                        {
                            name: "Pemutus",
                            class: "admin-page__tbl",
                        },
                        {
                            name: "Jenis Properti",
                            class: "admin-page__tbl",
                        },
                        {
                            name: "Tipe Properti",
                            class: "admin-page__tbl--right",
                        },
                    ]}
                >
                    <TableUserRefferal />
                </TableCheckbox>
                <AddUserSales isModal={isModal} editMode={editMode} closeModal={closeModal} inputs={inputs} inputsRef={inputsRef} dispatch={dispatch} otherProps={{handleInput}} />
            </SideMenuAdmin>
        </div>
    )
};

const AddUserSales = ({isModal, closeModal, editMode, inputs, inputsRef, dispatch, otherProps}) => {
    const inputArr = [
        inputsRef?.name?.isValid,
        inputsRef?.mobilePhone?.isValid,
        inputsRef?.email?.isValid
    ];
    return (
        <ModalReferral isModal={isModal} closeModal={closeModal} title={!editMode ? "Tambah Sales" : "Edit Sales"} editMode={editMode}>
            <form>
                <div class="grid grid-cols-5 gap-6">
                    <div class="col-span-2">
                        <div className='p-6 pt-2 pb-0 flex-auto max-h-[50vh] overflow-y-auto lg:w-[300px]'>
                            Foto Sales
                            <div className="profile-page__left-wrap">
                                <div className="profile-page__profile-pic-wrap">
                                    {/* {!profilePic.preview ? ( */}
                                    <div className="profile-page__profile-pic-empty">
                                        <img
                                        className="profile-page__profile-pic-icon"
                                        src="/icons/avatar.svg"
                                        alt="avatar"
                                        />
                                    </div>
                                    {/* ) : ( */}
                                    <img
                                        // src={profilePic.preview}
                                        alt="profile-page_pict"
                                        className="profile-page__profile-pic"
                                    />
                                    {/* )} */}
                                </div>
                                <div>
                                    <Button
                                    btnTypes="upload"
                                    buttonColor="blueLight"
                                    textColor="blue"
                                    className="profile-page__button"
                                    // referenceUpload={refProfilePic}
                                    nameUpload="profilePic"
                                    acceptedFiles=".jpg,.png,.jpeg"
                                    onChangeUpload={(e) => {
                                        const fileName = e.target.files[0].name.toString();
                                        const extFile = fileName
                                        .substr(fileName.lastIndexOf(".") + 1, fileName.length)
                                        .toLowerCase();
                                        const filterExtArray = [extFile !== "jpg", extFile !== "jpeg", extFile !== "png"];
                                        if (filterExtArray.indexOf(false) === -1) {
                                        // resetProfilePic();
                                        dispatch(
                                            // showModalFail("Gagal", `Format file *.${extFile} tidak didukung`)
                                        );
                                        } else {
                                        Array.from(e.target.files).forEach((file) => {
                                            dispatch(
                                            // uploadProfilePic(
                                            //     file,
                                            //     email,
                                            //     profilePic,
                                            //     setProfilePic
                                            // )
                                            );
                                        });
                                        }
                                    }}
                                    >
                                        Upload Foto
                                    {/* {!profilePic.preview ? "Upload Foto" : "Ganti Foto"} */}
                                    </Button>
                                </div>
                                <div>
                                    {/* {!profilePic.preview ? (
                                    <></>
                                    ) : ( */}
                                    <Button buttonColor="white" textColor="orange" className="profile-page__button" onClick={() => dispatch()}>
                                        Hapus
                                    </Button>
                                    {/* )} */}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-span-2">
                        <div className='p-6 pt-2 pb-0 flex-auto max-h-[50vh] overflow-y-auto lg:w-[400px]'>
                            <div className='mb-4'>
                                <TextboxLabel topLabel= "Nama Sales" requiredStar={true} placeholder="Nama Sales" name="nameSales" value={inputsRef?.name?.value} 
                                    onChange={(e) => {
                                        otherProps.handleInputNoNumberAndSpec(e?.target?.value, e?.target?.name);
                                    }}
                                    warnText={inputsRef?.name?.msgError}
                                />                    
                            </div>
                            <div className='mb-4'>
                                <TextboxLabel topLabel="Nomor Handphone" requiredStar={true} placeholder="08xxxxxxxxxx" name="mobilePhone" value={ inputsRef?.mobilePhone?.value }
                                    onChange={(e) => {
                                        otherProps.handleInputNoNumberAndSpec(e?.target?.value, e?.target?.mobilePhone);
                                    }}
                                    warnText={inputsRef?.mobilePhone?.msgError}
                                />
                            </div>
                            <div className='mb-4'>
                                <TextboxLabel topLabel="Email" requiredStar={true} placeholder="abcd@mail.com" name="email" value={ inputsRef?.mobilePhone?.value }
                                    onChange={(e) => {
                                        otherProps.handleInputNoNumberAndSpec(e?.target?.value, e?.target?.mobilePhone);
                                    }}
                                    warnText={inputsRef?.email?.msgError}
                                />
                            </div>                    
                        </div>
                    </div>
                </div>
                <div className="p-6 w-full">
                    <Button btnTypes="submit" id="submitRef" name="submitRef" className="w-full" disabled={inputArr.filter(Boolean).length !== 8} onClick={() => {
                        closeModal();
                        // if (!editMode) {
                        //     dispatch(addReferral(inputsRef));
                        // } else {
                        //     dispatch(editReferral(inputsRef));
                        // }
                    }}>{editMode ? "Simpan" : "Tambahkan"}</Button>
                </div>                
            </form>

        </ModalReferral>
    )
}

export default UserRefferal