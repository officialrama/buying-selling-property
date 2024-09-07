import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DatePicker from 'react-datepicker';
import { SideMenuSales, Modal, NavHeaderSales } from '../../../components/organisms';
import { TextboxLabel, Dropdown, PaginationTable } from '../../../components/molecules';
import { showSingleModal } from '../../../store/actions/changeState';
import { Button } from '../../../components/atoms';
import { selectConst } from '../../../static/selectConst';
import { saReset } from '../../../store/actions/fetchData/superAdminState';
import { finalPengajuan, exportDataFinal } from '../../../store/actions/fetchData/salesReferral';
import useRegSalesHooks from '../../../hooks/useRegSalesHooks';
import TableFinal from './table-final';
import { Pagination } from 'flowbite-react';
import { FiDownload } from 'react-icons/fi';
import moment from 'moment';
function DataPenjualanFinal() {
  const tanggal = new Date();
  const state = useSelector((state) => state.stateReducer);
  const [cari, setCari] = useState("")
  const dispatch = useDispatch();
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [isCheckAll, setIsCheckAll] = useState(false);
  const [isCheck, setIsCheck] = useState([]);
  const [filterCheck, setFilterCheck] = useState([])
  const { setDataTemp, dataTemp, bodyListOfUser, setBodyListOfUser,  downloadData, setDownloadData } = useRegSalesHooks();
  const headers = [
    { label: "NIK", key: "nik" },
    { label: "Nama", key: "nama" },
    { label: "Jenis Proyek", key: "jenisproyek" },
    { label: "Jenis Properti", key: "jenisproperti" },
    { label: "Tipe Properti", key: "typeproperti" },
    { label: "Plafond Pengajuan", key: "plafondpengajuan" },
    { label: "Plafond Putusan", key: "plafondputusan" },
    { label: "Tanggal Pengajuan", key: "tanggalpengajuan" },
    { label: "Tanggal Putusan", key: "tanggalputusan" },
    { label: "Status", key: "status" },
    { label: "Kantor Wilayah", key: "regional" },
    { label: "Kantor Cabang", key: "office" },
];
const applyFilter = () => {
  setBodyListOfUser({
      ...bodyListOfUser,
      parameter: filterCheck,
      keyword: cari,
      pageStart: 0
  });
  dispatch(showSingleModal(!state.showSingleModal))
}
  const handleSearchChange = (evt) => {
    setCari(evt.target.value);
};
useEffect(() => {
  dispatch(finalPengajuan( dataTemp, setDataTemp, {...bodyListOfUser,userType: "Sales"}));
  return () => {
      dispatch(saReset());
  };
  
}, [bodyListOfUser]);
const onChange = (dates) => {
  const [start, end] = dates;
  setStartDate(start);
  setEndDate(end);

  const startDate = moment(start).format("YYYY-MM-DD");
  const endDate = moment(end).format("YYYY-MM-DD");

  if(startDate !== "Invalid Date" && endDate !== "Invalid Date") {
    setBodyListOfUser({
      ...bodyListOfUser,
      startDate: startDate,
      endDate: endDate,
      keyword: cari ? cari : "",
      pageStart: 0
    });
  };
  if(start === null && end === null){
    setBodyListOfUser({
      ...bodyListOfUser,
      startDate: "",
      endDate: "",
      pageStart: 0
    });
  };
};
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
const onPageChange = (e) => {
  setBodyListOfUser({
    ...bodyListOfUser,
    pageStart: e - 1,
  });
};
const handleDownload = (e) => {
  dispatch(exportDataFinal({...bodyListOfUser, userType:"Sales"}, downloadData));
}
  return (
    <div>
    
    {state.showSingleModal && (
                <Modal
                    closeModal={() => dispatch(showSingleModal(!state.showSingleModal))}
                    modalTypes="filterSalesFinal"
                    title="Filter"
                    disableScroll={false}
                    otherProps={{ setFilterCheck, filterCheck, applyFilter }}
                />
            )}
    <>
      <NavHeaderSales />
      <SideMenuSales title="Penjualan KPR ">
        <div>Data penjualan KPR</div><br></br>
      <div className="sales-page__srch-drp-gmk-wrap gtc-penjualanfinal-reff">
     
                        <div className="sales-page__srch-drp">
                            <TextboxLabel
                                placeholder="Search"
                                onChange={handleSearchChange}
                                onKeyDown={handleKeyDown}
                            />
                        </div>
                        <div className="sales-page__srch-drp">
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
                    <div className="sales-page__srch-drp">
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
                    {/* <CSVLink filename={`penjualan-final-${tanggal.getDate()}/${tanggal.getMonth() + 1}/${tanggal.getFullYear()}.csv`} data={downloadData} headers={headers}> */}
                    <Button
                                buttonColor="blue"
                                textColor="white"
                                className="mr-2 h-10 mobile:text-[10px] text-[15px] mobile:w-[33%] largePc:w-[68%]"
                                onClick={() => {
                                    handleDownload();
                                }}
                                // disabled={ isCheckAll !== false || downloadData.length > 0 ? false : true}
                            >
                               <div className="flex flex-row space-x-2 mobile:text-sm">
                                    <div className="mt-1"><FiDownload /> </div>
                                    <div>Export</div>
                                </div>
                            </Button>
                            <br></br>
                        {/* </CSVLink> */}
         </div>
         <div className="sales-ref__wrapper">

                        <TableFinal
                            dispatch={dispatch} 
                            tableType="userReferralFinal" 
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
            </SideMenuSales>
    </>
    </div>
  )
}

export default DataPenjualanFinal