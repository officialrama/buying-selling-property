import React, { useEffect, useState } from 'react';
import { Modal } from "../../components/organisms";
import { TextboxLabel, Dropdown } from '../../components/molecules';
import { Button} from '../../components/atoms';
import { FiDownload} from "react-icons/fi";
import "react-datepicker/dist/react-datepicker.css";
import useRegSalesHooks from '../../hooks/useRegSalesHooks';
import { selectConst } from '../../static/selectConst';
import { useDispatch, useSelector } from 'react-redux';
import { closeModalFail, closeModalSuccess, saReset, showModalFail, inquiryUser } from '../../store/actions/fetchData/superAdminState';
import useInputHooks from '../../hooks/useInputHooks';
import { inquiryWishlist, exportWishlist } from "../../store/actions/fetchData/inquiryWishlist";
import useInputRefHooks from '../../hooks/useInputRefHooks';
import { showSingleModal } from '../../store/actions/changeState';
import { Pagination } from 'flowbite-react';
import moment from "moment";
import { ProfileUser } from "../../components/templates";
import TableMis from "../admin/mis/table-mis";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import cookie from 'js-cookie';

const WishlistDeveloper = ({ userStatus, salesName }) => {
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
    const [filterCheck, setFilterCheck] = useState([]);
    const headers = [
        { label: "Nama Visitor", key: "visitorName" },
        { label: "Email", key: "email" },
        { label: "Nama Proyek", key: "namaProyek" },
        { label: "Nama Properti", key: "namaProperti" },
        { label: "No. Handphone", key: "mobileNo" },
        { label: "Tanggal", key: "tanggal" },
        { label: "Type", key: "type" },
    ];

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
            dispatch(inquiryUser(JSON.parse(cookie.get("morgateCookie"))?.email));
        }

        if (startDate !== "Invalid date" && endDate !== "Invalid date") {
            setBodyListOfUser({
                ...bodyListOfUser,
                startDate: startDate,
                keyword: cari? cari : "",
                endDate: startDate === endDate && filterCheck.length === 0 ? "" : endDate,
                pageStart: 0
            });
            dispatch(inquiryUser(JSON.parse(cookie.get("morgateCookie"))?.email));
        }
    };

    useEffect(() => {
        dispatch(inquiryWishlist({...bodyListOfUser, userType: "developer"}, setDataTemp));
        dispatch(inquiryUser(JSON.parse(cookie.get("morgateCookie"))?.email));
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
        dispatch(inquiryUser(JSON.parse(cookie.get("morgateCookie"))?.email));
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
        dispatch(showSingleModal(!state.showSingleModal));
        dispatch(inquiryUser(JSON.parse(cookie.get("morgateCookie"))?.email));
    }
    const handleDownload = (e) => {
        dispatch(exportWishlist({ ...bodyListOfUser, userType: "developer" }, downloadData));
    }
    return (
        <div>
            {state.showSingleModal && (
                <Modal
                    closeModal={() => dispatch(showSingleModal(!state.showSingleModal))}
                    modalTypes="filterWishlist"
                    title="Filter"
                    disableScroll={false}
                    otherProps={{ setFilterCheck, filterCheck, applyFilter }}
                />
            )}
           
            <ProfileUser title="Visitors Monitoring"
                        userStatus={userStatus}
                        data={saState.resApi.responseData && saState.resApi.responseData[0]}
                        >
             <div className="wishlist-page__whl-drp-gmk-wrap gtc-list-whl">
                    <div>
                        <div className="wishlist-page__whl-drp">
                            <TextboxLabel
                                placeholder="Search"
                                onChange={handleSearchChange}
                                onKeyDown={handleKeyDown}
                            />
                        </div>
                    </div>
                    <div className="wishlist-page__whl-drp">
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
                    <div className="wishlist-page__whl-drp">
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
                    <div className="wishlist-page__whl-drp">
                        {/* <CSVLink filename={`sales-refferal-${tanggal.getDate()}/${tanggal.getMonth() + 1}/${tanggal.getFullYear()}.csv`} data={downloadData} headers={headers}> */}
                        <Button
                                buttonColor="blue"
                                textColor="white"
                                className="mr-2 h-10 mobile:text-[10px] text-[15px] mobile:w-full"
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
                <TableMis tableType="wishlistDeveloper" dataTemp={React.useMemo(() => (dataTemp), [dataTemp])} downloadData={downloadData} setDownloadData={setDownloadData} checkProps={{ isCheck, setIsCheck, isCheckAll, setIsCheckAll }} />
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
                
            </ProfileUser>
        </div>
    )
};


export default WishlistDeveloper