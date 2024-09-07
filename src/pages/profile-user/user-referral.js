import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FiDownload } from "react-icons/fi";
import { TextboxLabel, Dropdown, PaginationTable } from "../../components/molecules";
import { Button } from "../../components/atoms";
import useInputHooks from "../../hooks/useInputHooks";
import useInputRefHooks from "../../hooks/useInputRefHooks";
import useRegSalesHooks from "../../hooks/useRegSalesHooks";
import { showSingleModal } from "../../store/actions/changeState";
import { ProfileUser } from '../../components/templates';
import { Modal } from "../../components/organisms";
import DatePicker from 'react-datepicker';
import { inquiryUser, saReset, } from '../../store/actions/fetchData/superAdminState';
import "react-datepicker/dist/react-datepicker.css";
import { selectConst } from '../../static/selectConst';
import TableMis from "../admin/mis/table-mis";
import moment from "moment";
import { Pagination } from 'flowbite-react';
import { decryptStr } from "../../helpers/encryptDecrypt";
import useProfileMenuHooks from "../../hooks/useProfileMenuHooks";
import cookie from "js-cookie";
import { exportDataFinal, finalPengajuan } from "../../store/actions/fetchData/salesReferral";

const UserRefferal = ({userStatus}) => {
  const tanggal = new Date();
    const saState = useSelector((state) => state.superAdminReducer);
    const state = useSelector((state) => state.stateReducer);
    const dispatch = useDispatch();
    const [isModal, setIsModal] = useState(false);
    const { inputs } = useInputHooks();
    const { inputsRef, setInputsRef} = useInputRefHooks();
    const { bodyListOfUser, setBodyListOfUser, dataTemp, setDataTemp, editMode, setEditMode, cari, setCari, downloadData, setDownloadData } = useRegSalesHooks();
    const [isCheckAll, setIsCheckAll] = useState(false);
    const [isCheck, setIsCheck] = useState([]);
    const [filterCheck, setFilterCheck] = useState([])
//   const [filter, setFilter] = useState({
//     userType: { name: "Filter", value: "all" },
// });
const [startDate, setStartDate] = useState(null);
const [endDate, setEndDate] = useState(null);
const headers = [
  { label: "Nama Sales", key: "namasales" },
  { label: "Nama Debitur", key: "namadebitur" },
  { label: "NIK", key: "nik" },
  { label: "Jenis Proyek", key: "jenisproyek" },
  { label: "Plafond Pengajuan", key: "plafondpengajuan" },
  { label: "Plafond Putusan", key: "plafondputusan" },
  { label: "Tanggal Pengajuan", key: "tanggalpengajuan" },
  { label: "Tanggal Putusan", key: "tanggalputusan" },
  { label: "Status", key: "status" },
  { label: "Kantor Wilayah", key: "regional" },
  { label: "Kantor Cabang", key: "office" },
  { label: "RM", key: "rm" },
  { label: "Pemutus", key: "pemutus" },
  { label: "Jenis Properti", key: "jenisproperti" },
  { label: "Tipe Properti", key: "typeproperti" },
];
useEffect(() => {
  dispatch(finalPengajuan( dataTemp, setDataTemp, {...bodyListOfUser,userType: "developer"}));
  dispatch(inquiryUser(JSON.parse(cookie.get("morgateCookie"))?.email));
  return () => {
      dispatch(saReset());
  };
}, [bodyListOfUser]);
const applyFilter = () => {
  setBodyListOfUser({
      ...bodyListOfUser,
      parameter: filterCheck,
      keyword: cari,
      pageStart: 0
  });
  dispatch(showSingleModal(!state.showSingleModal))
  dispatch(inquiryUser(JSON.parse(cookie.get("morgateCookie"))?.email));
}
const {initiateState} = useProfileMenuHooks();

useEffect(() =>{ 
  if(saState.resApi) {
    let respData = saState.resApi?.responseData && saState.resApi?.responseData[0];
    try {
      if(decryptStr(userStatus) === "visitor"){
        initiateState({
          name: {value :respData?.metaData?.name}
        })
      }
    } catch (error) {
      
    }
  }
})
const onChange = (dates) => {
  const [start, end] = dates;
  setStartDate(start);
  setEndDate(end);

  const startDate = moment(start).format("YYYY-MM-DD");
  const endDate = moment(end).format("YYYY-MM-DD");

  if(start === null && end === null){
    setBodyListOfUser({
      ...bodyListOfUser,
      startDate: "",
      endDate: "",
      pageStart: 0
    });
    dispatch(inquiryUser(JSON.parse(cookie.get("morgateCookie"))?.email));
  };

  if (startDate !== "Invalid date" && endDate !== "Invalid date") {
      setBodyListOfUser({
          ...bodyListOfUser,
          startDate: startDate,
          endDate: endDate,
          keyword: cari ? cari : "",
          pageStart: 0
      });
  }
  dispatch(inquiryUser(JSON.parse(cookie.get("morgateCookie"))?.email));
};

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
const handleDownload = (e) => {
  dispatch(exportDataFinal({...bodyListOfUser, userType:"developer"}, downloadData));
}
  return (
    <div>
       {state.showSingleModal && (
                <Modal
                    closeModal={() => dispatch(showSingleModal(!state.showSingleModal))}
                    modalTypes="filterSalesDev"
                    title="Filter"
                    disableScroll={false}
                    otherProps={{ setFilterCheck, filterCheck, applyFilter }}
                />
            )}
    
    <ProfileUser
    title="KPR Sales"
    userStatus={userStatus}
    data={saState.resApi && saState.resApi.responseData && saState.resApi.responseData[0]}
  >
     <div className="user-ref__srch-drp-gmk-wrap gtc-userdeveloper-reff">
                    <div>
                        <div className="user-ref__srch-drp">
                            <TextboxLabel
                                placeholder="Search"
                            onChange={handleSearchChange}
                            onKeyDown={handleKeyDown}
                            />
                        </div>
                    </div>
                    <div className="user-ref__srch-drp">
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
                    <div className="user-ref__srch-drp">
                    <DatePicker
                            className='rounded-md border-gray-300 mobile:w-full'
                            onChange={onChange}
                            startDate={startDate}
                            endDate={endDate}
                            selectsRange
                            placeholderText="Date"
                        />
                    </div>
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
                        <br></br>
                </div>
      <div className="user-ref__wrapper">
      <TableMis
                            dispatch={dispatch} 
                            tableType="userRefferalDeveloper" 
                            dataTemp={
                            React.useMemo( () => (dataTemp),[dataTemp])
                            }
                            downloadData={downloadData} 
                            setDownloadData={setDownloadData} 
                            checkProps={{ isCheck, setIsCheck, isCheckAll, setIsCheckAll }}
                            
                        />
                {dataTemp && dataTemp?.metadata?.totalData > 10 ?
                // console.log("apakah inii", dataTemp)
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
  );
};


export default UserRefferal;
