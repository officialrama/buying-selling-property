import React, { useEffect, useState } from 'react';
import { SideMenuSales, Modal, NavHeaderSales } from '../../../components/organisms';
import { TextboxLabel, Dropdown, Checkbox, PenjualanDraft, TableData, PaginationTable } from '../../../components/molecules';
import { showSingleModal } from '../../../store/actions/changeState';
import { showModalFilter } from '../../../store/actions/changeState';
import { selectConst } from '../../../static/selectConst';
import useRegSalesHooks from '../../../hooks/useRegSalesHooks';
import { useDispatch, useSelector } from 'react-redux';
import DatePicker from 'react-datepicker';
import { closeModalFail, closeModalSuccess, saReset } from '../../../store/actions/fetchData/superAdminState';
import { deleteDraftRef, editDraftRef, salesReferralList, salesReferralProject, userReferralList } from '../../../store/actions/fetchData/salesReferral';
import TableDraft from './table-draft';
import moment from 'moment';
import { showApprovalKprModal } from '../../../store/actions/changeModalState';
import { fetchPost } from '../../../helpers/fetchApi';
import _ from 'lodash';
import useInputHooks from '../../../hooks/useInputHooks';
import { Pagination } from 'flowbite-react';
import { useParams } from 'react-router-dom';

function DataPenjualanDraft() {
    const state = useSelector((state) => state.stateReducer);
    const saState = useSelector((state) => state.superAdminReducer);
    const dispatch = useDispatch();
    const { inputs, setInputs } = useInputHooks();
    const stateModal = useSelector((state) => state.modalReducer);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const {id} = useParams();
    const [gimmickOptions, setGimmickOptions] = useState([]);
    const [filterCheck, setFilterCheck] = useState([])
    const [dataInputSalesCalc, setDataInputSalesCalc] = useState({
        gimmick: {
          value: {
            biayaAdminNominal: 0,
            biayaProvisiNominal: 0,
            tenorFixedRate: 0,
            fixedRate: 0,
            floatingRate: 0,
            name: "Pilih Program Suku Bunga",
          },
        }
      });
      
      const applyFilter = () => {
        setBodyListOfUser({
            ...bodyListOfUser,
            parameter: filterCheck,
            keyword: cari,
            pageStart: 0
        });
        dispatch(showModalFilter(!state.showModalFilter))
      }
        const handleSearchChange = (evt) => {
          setCari(evt.target.value);
      };
    const [ item, setItem ] = useState(null);
    useEffect(() => {
        dispatch(salesReferralProject(setItem));
      }, []);


    const { setDataTemp, dataTemp, bodyListOfUser, setBodyListOfUser, cari, setCari, draftId, setDraftId, propertiId, setPropertiId, salesReferralId, setSalesReferralId } = useRegSalesHooks();
    useEffect(() => {
        dispatch(userReferralList(bodyListOfUser, dataTemp, setDataTemp));
        return () => {
            dispatch(saReset());
        };

    }, [bodyListOfUser]);

    useEffect(() => {
        window.scrollTo(0, 0);
        try {
            fetchPost(
                `${process.env.REACT_APP_URL_MORTGAGE_API}/mes/api/v1/promo/listGimmick`,
                {
                    // email: _.isJSON(cookie.get("morgateCookie")) ? JSON.parse(cookie.get("morgateCookie")).email : "",
                    status: "active",
                    pageStart: 1,
                    sortBy: "createdAt",
                    sortDirection: "desc",
                    requestType:"visitor",
                    nameSearch: ""
                }
                )
                .then((res) => {
                    if (res.data.responseCode === "00") {
                        setGimmickOptions(res?.data?.responseData);
                    }
                })
                .catch((err) => console.log("Error List Program Suku Bunga : " + err));
        } catch (error) {
            console.log(error.error);
        }
    }, []);

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
    };
    const onPageChange = (e) => {
        setBodyListOfUser({
          ...bodyListOfUser,
          pageStart: e - 1,
        });
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
    
    return (
        <div>
            {state.showModalFilter && (
                <Modal
                    closeModal={() => dispatch(showModalFilter(!state.showModalFilter))}
                    modalTypes="filterUserRefferal"
                    title="Filter"
                    disableScroll={false}
                    otherProps={{ setFilterCheck, filterCheck, applyFilter }}
                />
            )}
           
            {stateModal.showApprovalKprModal === true && (
                <Modal 
                    closeModal={() => dispatch(showApprovalKprModal(!stateModal.showApprovalKprModal))}
                    modalTypes="kprSubmissionSalesDraft"
                    data={item?.responseData[0]}
                    title='Edit Pengajuan Pembelian KPR'
                    otherProps={{ gimmickOptions, dataInputSalesCalc, setDataInputSalesCalc, propertiId, salesReferralId }}
                />
            )}
           
           {saState.success === true && (
        <Modal
          closeModal={() => {
            dispatch(closeModalSuccess());
            window.location.reload()
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
             {state.showSingleModal === true && (
                <Modal
                    closeModal={() => dispatch(showSingleModal(!state.showSingleModal))}
                    onClickDelete={() => dispatch(deleteDraftRef(draftId))}
                    modalTypes="deleteConfirm"
                    title="Konfirmasi"
                />
             )}
            <>
                <NavHeaderSales />
                <SideMenuSales title="Penjualan KPR ">
                    <div>Data penjualan KPR</div><br></br>
                    <div className="sales-page__srch-drp-gmk-wrap gtc-penjualandraft-reff">
                        <div>
                            <div className="sales-page__srch-drp">
                                <TextboxLabel
                                    placeholder="Search"
                                    onChange={handleSearchChange}
                                    onKeyDown={handleKeyDown}
                                />
                            </div>
                        </div>
                        <div className="sales-page__srch-drp">
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
                        <div className="sales-page__srch-drp">
                        <DatePicker
                              paddingSize="3"
                              className='rounded-md border-gray-300'
                              onChange={onChange}
                              startDate={startDate}
                              endDate={endDate}
                              selectsRange
                              placeholderText="Date"
                          />
                        </div>
                    </div>
                    <div className="sales-ref__wrapper">
                            <TableDraft 
                                draftId={draftId}
                                setDraftId={setDraftId}
                                dispatch={dispatch} 
                                stateModal={stateModal}
                                tableType="userReferral"
                                setPropertiId = {setPropertiId}
                                setSalesReferralId = {setSalesReferralId}
                                dataTemp={
                                    React.useMemo( () => (dataTemp),[dataTemp])
                                }
                            />
                    {dataTemp && dataTemp?.rows?.metadata?.totalData > 10 ?
                    (

                  <Pagination
                      currentPage={dataTemp?.rows?.metadata?.currentPage + 1 || 1}
                      totalPages={Math.ceil(dataTemp?.rows?.metadata?.totalData / 10) || 10}
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
export default DataPenjualanDraft