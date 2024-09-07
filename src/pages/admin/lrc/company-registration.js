import React, { useEffect, useRef, useState } from 'react';
import { NavHeaderAdmin, SideMenuAdmin, Modal } from '../../../components/organisms';
import { TextboxLabel, Dropdown } from '../../../components/molecules';
import { Button } from '../../../components/atoms';
import { FiDownload } from "react-icons/fi";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import useRegSalesHooks from '../../../hooks/useRegSalesHooks';
import { useDispatch, useSelector } from 'react-redux';
import { closeModalFail, closeModalSuccess, saReset, showModalFail } from '../../../store/actions/fetchData/superAdminState';
import useInputHooks from '../../../hooks/useInputHooks';
import useInputRefHooks from '../../../hooks/useInputRefHooks';
import { showSingleModal } from '../../../store/actions/changeState';
import { listLoanCompany, exportLoanRefferalCompany, DeleteLRC } from '../../../store/actions/fetchData/hotLeadsManagement';
import TableLRC from '../table-lrc';
import { Pagination } from 'flowbite-react';
import moment from "moment";
import ModalCompanyRegistration from './modal-company-registration';

const CompanyRegistration = () => {
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
    const [id, setId] = useState("");
    const { inputs } = useInputHooks();
    const { inputsRef, setInputsRef, handleInput, handleAltInput, handleNumberInput, handleInutNoZero, handleInputNoNumberAndSpec, handleEmail, handleMobileNo, handlePhoneNum, handleAutoComplete } = useInputRefHooks();
    const { bodyListOfUser, setBodyListOfUser, bodySalesReferral, setBodySalesRefferal, dataTemp, setDataTemp, editMode, setEditMode, handleSearchChange, cari, downloadData, setDownloadData, listDeveloper, setListDeveloper } = useRegSalesHooks();
    const [isCheckAll, setIsCheckAll] = useState(false);
    const [isCheck, setIsCheck] = useState([]);
    const [filterCheck, setFilterCheck] = useState([]);

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
                pageStart: 0
            });
        }
    };

    useEffect(() => {
        dispatch(listLoanCompany({ ...bodyListOfUser, userType: "superadmin" }, setDataTemp));
        return () => {
            dispatch(saReset());
        };
    }, [bodyListOfUser]);



    const handleOnSearch = () => {
        if (filterCheck.includes("mobileNo")) {
            setBodyListOfUser({
                ...bodyListOfUser,
                keyword: '+62|' + cari.substring(1),
                pageStart: 0
            });
        } else {
            setBodyListOfUser({
                ...bodyListOfUser,
                keyword: cari,
                pageStart: 0
            });
        }
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
    };

    const onPageChange = (e) => {
        setBodyListOfUser({
            ...bodyListOfUser,
            pageStart: e - 1,
        });
        setIsCheck([]);
        setIsCheckAll(false);
    }

    const applyFilter = () => {

        if (filterCheck.includes("mobileNo")) {
            setBodyListOfUser({
                ...bodyListOfUser,
                parameter: filterCheck,
                keyword: '+62|' + cari.substring(1),
                pageStart: 0
            });
        } else {
            setBodyListOfUser({
                ...bodyListOfUser,
                parameter: filterCheck,
                keyword: cari,
                pageStart: 0
            });
        }

        dispatch(showSingleModal(!state.showSingleModal))
    }

    const handleDownload = (e) => {
        dispatch(exportLoanRefferalCompany({ ...bodyListOfUser, userType: "superadmin" }, downloadData));
    }

    const handleModalEdit = (id) => {

        if (id) {
            const dataFiltered = dataTemp?.responseData?.filter((e) => e.uniqueCode === id)[0];

            if (dataFiltered?.url) {
                fetch(dataFiltered?.url)
                    .then(response => response.blob())
                    .then(blob => setInputsRef({
                        id: { value: dataFiltered?.id },
                        namaPartner: { isValid: !!dataFiltered?.namaPartner, value: dataFiltered?.namaPartner },
                        nomerPks: { isValid: !!dataFiltered?.nomerPks, value: dataFiltered?.nomerPks },
                        uniqueCode: { isValid: !!dataFiltered?.uniqueCode, value: dataFiltered?.uniqueCode },
                        filePKS: { isValid: !!dataFiltered?.namaFile, value: blob },
                        namaFilePKS: { isValid: !!dataFiltered?.namaFile, value: dataFiltered?.namaFile }
                    }))
                    .catch(error => console.error(error));
            } else {
                setInputsRef({
                    id: { value: dataFiltered?.id },
                    namaPartner: { isValid: !!dataFiltered?.namaPartner, value: dataFiltered?.namaPartner },
                    nomerPks: { isValid: !!dataFiltered?.nomerPks, value: dataFiltered?.nomerPks },
                    uniqueCode: { isValid: !!dataFiltered?.uniqueCode, value: dataFiltered?.uniqueCode }
                });
            }
        }
        setIsModal(!isModal);
    };

    return (
        <div>
            {state.showSingleModal && (
                <Modal
                    closeModal={() => dispatch(showSingleModal(!state.showSingleModal))}
                    onClickDelete={() => dispatch(DeleteLRC(id))}
                    modalTypes="deleteConfirm"
                    title="Konfirmasi"
                />
            )}
            {saState.success === true && (
                <Modal
                    closeModal={() => {
                        dispatch(showSingleModal(false));
                        dispatch(closeModalSuccess());
                        dispatch(listLoanCompany({ ...bodyListOfUser, userType: "superadmin" }, setDataTemp));
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
            <SideMenuAdmin title="Company Registration">
                <div className="admin-page__srch-drp-gmk-wrap gtc-hlm">
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
                            className="mobile:text-[12px] w-full h-full"
                            onClick={() => {
                                setEditMode(false);
                                handleModal();
                            }}
                        >
                            Registration
                        </Button>
                    </div>
                    <div className="admin-page__srch-drp">
                        <Button
                            buttonColor="blue"
                            textColor="white"
                            className="mr-2 mobile:text-[12px] text-[15px] w-full h-full"
                            onClick={() => {
                                handleDownload();
                            }}
                        >
                            <div className="flex flex-row space-x-2 justify-center">
                                <div className="mt-1"><FiDownload /> </div>
                                <div>Export</div>
                            </div>
                        </Button>
                    </div>
                </div>
                <div className="user-ref__wrapper">
                <TableLRC tableType="companyRegistration" dataTemp={React.useMemo(() => (dataTemp), [dataTemp])} setEditMode={setEditMode} dispatch={dispatch} setId={setId} handleModalEdit={handleModalEdit} downloadData={downloadData} setDownloadData={setDownloadData} checkProps={{ isCheck, setIsCheck, isCheckAll, setIsCheckAll }} />
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
                <ModalCompanyRegistration inputsRef={inputsRef} setInputsRef={setInputsRef} isModal={isModal} editMode={editMode} closeModal={closeModal} dispatch={dispatch} otherProps={{ handleInput, handleAltInput, handleNumberInput, handleInputNoNumberAndSpec }} />
            </SideMenuAdmin>
        </div>
    )
};

export default CompanyRegistration