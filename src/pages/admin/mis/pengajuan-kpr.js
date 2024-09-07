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
import { showSingleModal } from '../../../store/actions/changeState';
import { salesRefferalAdmin, addReferralAdmin, editReferralAdmin, inquiryDeveloper } from '../../../store/actions/fetchData/salesReferral';
import { inquiryPengajuanKPR, exportPengajuanKPR } from "../../../store/actions/fetchData/kpr";
import TableMIS from './table-mis';
import { CSVLink } from 'react-csv';
import { Pagination } from 'flowbite-react';
import moment from "moment";

const PengajuanKPR = ({ userStatus, salesName }) => {
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
    const { inputsRef, setInputsRef, handleInput, handleAltInput, handleNumberInput, handleInutNoZero, handleInputNoNumberAndSpec, handleEmail, handleMobileNo, handlePhoneNum, handleAutoComplete } = useInputRefHooks();
    const { bodyListOfUser, setBodyListOfUser, bodySalesReferral, setBodySalesRefferal, dataTemp, setDataTemp, editMode, setEditMode, handleSearchChange, cari, downloadData, setDownloadData, listDeveloper, setListDeveloper } = useRegSalesHooks();
    const [isCheckAll, setIsCheckAll] = useState(false);
    const [isCheck, setIsCheck] = useState([]);
    const [filterCheck, setFilterCheck] = useState([])
    const headers = [
        { label: "Kantor Wilayah", key: "regionalOffice" },
        { label: "Kantor Cabang", key: "branchOffice" },
        { label: "No. Reff", key: "refNo" },
        { label: "Nama Debitur", key: "namaDebitur" },
        { label: "NIK", key: "nik" },
        { label: "Jenis Proyek", key: "jenisProyek" },
        { label: "Plafond Pengajuan", key: "plafondPengajuan" },
        { label: "Nama Pemutus", key: "pemutus" },
        { label: "Nominal Putusan", key: "nominalPutusan" },
        { label: "Program Suku Bunga", key: "gimmick" },
        { label: "Source", key: "source" },
        { label: "Tanggal Pengajuan", key: "tanggalPengajuan" },
        { label: "Tanggal Proses", key: "tanggalProses" },
        { label: "Tanggal Putusan", key: "tanggalPutusan" },
        { label: "Status", key: "status" },
        { label: "RM", key: "rm" },
        { label: "Jenis Properti", key: "jenisProperti" },
        { label: "Tipe Properti", key: "tipeProperti" },
    ];

    useEffect(() => {

        if (isCheckAll === true) {
            let tempData = []
            dataTemp?.responseData?.map((item, index) => {
                const data = {
                    regionalOffice: item.regionalOffice ? item.regionalOffice : "-",
                    branchOffice: item.branchOffice ? item.branchOffice : "-",
                    refNo: item.refNo,
                    namaDebitur: item.namaDebitur,
                    nik: item.nik,
                    jenisProyek: item.jenisProyek ? item.jenisProyek : "-",
                    plafondPengajuan: item.plafondPengajuan ? `Rp. ${new Intl.NumberFormat("id-ID").format(item.plafondPengajuan)}` : "-",
                    pemutus: item.pemutus ? item.pemutus : "-",
                    nominalPutusan: item.nominalPutusan ? `Rp. ${new Intl.NumberFormat("id-ID").format(item.nominalPutusan)}` : "-",
                    gimmick: item.gimmick,
                    source: item.source,
                    tanggalPengajuan: item.tanggalPengajuan ? moment(item.tanggalPengajuan).format("DD MMM YYYY") : "-",
                    tanggalProses: item.tanggalProses ? moment(item.tanggalProses).format("DD MMM YYYY") : "-",
                    tanggalPutusan: item.tanggalPutusan ? moment(item.tanggalPutusan).format("DD MMM YYYY") : "-",
                    status: item.status ? item.status : "-",
                    rm: item.rm ? item.rm : "-",
                    jenisProperti: item.jenisProperti === "subsidi" ? "Subsidi" : "Komersial",
                    tipeProperti: item.tipeProperti,
                    index: index
                }
                tempData.push(data)
            })
            setDownloadData(tempData);
        }

    }, [isCheckAll]);

    const onChange = (dates) => {
        const [start, end] = dates;
        setStartDate(start);
        setEndDate(end);

        const startDate = moment(start).format("YYYY-MM-DD");
        const endDate = moment(end).format("YYYY-MM-DD");

        if (startDate !== "Invalid date" && endDate !== "Invalid date") {
            setBodyListOfUser({
                ...bodyListOfUser,
                startDate: startDate,
                endDate: endDate,
                keyword: cari ? cari : "",
                pageStart: 0
            });
        }
        if (start === null && end === null) {
            setBodyListOfUser({
                ...bodyListOfUser,
                startDate: "",
                endDate: "",
                pageStart: 0
            });
        }
    };

    useEffect(() => {
        dispatch(inquiryPengajuanKPR(bodyListOfUser, setDataTemp));
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
    };

    const handleChangeTypes = (data) => {
        setFilter({
            ...filter,
            userType: data,
        });
        dispatch(salesRefferalAdmin({ ...bodySalesReferral, status: data.value }))
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
        setBodyListOfUser({
            ...bodyListOfUser,
            parameter: filterCheck,
            keyword: cari,
            pageStart: 0
        });
        dispatch(showSingleModal(!state.showSingleModal))
    }

    const handleDownload = (e) => {
        dispatch(exportPengajuanKPR({ ...bodyListOfUser, userType: "superadmin" }, downloadData));
    }

    return (
        <div>
            {state.showSingleModal && (
                <Modal
                    closeModal={() => dispatch(showSingleModal(!state.showSingleModal))}
                    modalTypes="filterPengajuanKPR"
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
            <NavHeaderAdmin />
            <SideMenuAdmin title="All Submissions">
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
                        {/* <CSVLink filename={`mis-pengajuan-kpr-${tanggal.getDate()}/${tanggal.getMonth() + 1}/${tanggal.getFullYear()}.csv`} data={downloadData} headers={headers}> */}
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
                    </div>
                </div>
                <div className="user-ref__wrapper">
                <TableMIS tableType="pengajuankprAdmin" dataTemp={React.useMemo(() => (dataTemp), [dataTemp])} downloadData={downloadData} setDownloadData={setDownloadData} checkProps={{ isCheck, setIsCheck, isCheckAll, setIsCheckAll }} />
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
            </SideMenuAdmin>
        </div>
    )
};

export default PengajuanKPR