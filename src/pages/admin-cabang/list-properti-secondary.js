import cookie from "hs-cookie"
import React, { useState, useRef, useEffect } from "react"
import { Modal, NavHeader } from "../../components/organisms"
import { ProfileUser } from "../../components/templates"
import { TabAdminCabang } from "../../components/organisms"
import { Pagination, ResponsiveListProperty } from "../../components/molecules"
import ListingPropertySecond from "../../components/molecules/Tables/AdminCabang/ListingPropertySecond"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { staticConst } from "../../static/staticConst"
import useListPropertyHooksV2 from "../../hooks/v2/useListPropertyHooks"
import {
    fetchNextPage,
    fetchPage,
    nextPage,
    prevPage,
    removePaginationData,
    resetPaginationPage,
} from "../../store/actions/paginationAction"
import { 
    closedProject,
    unPublishProject,
    publishProject } from "../../store/actions/fetchData/admin-cabang"
import { decryptStr } from "../../helpers/encryptDecrypt"
import { 
    prjReset,
    setPrjClsInfoDto,
    setPrjInfo, } from "../../store/actions/changeUploadProjectReducer"
import { 
    inquiryUser,
    saReset } from '../../store/actions/fetchData/superAdminState'

const ListPropertiSecondary = ({userStatus, email}) => {
    const saState = useSelector((state) => state.superAdminReducer)
    const pagination = useSelector((state) => state.paginationReducer)
    const [header, setHeader] = useState({
        header: [
            {name: "No", class: "p-3"},
            {name: "Nama Properti", class: "p-3"},
            {name: "Harga", class: "p-3"},
            {name: "Tanggal Dibuat", class: "p-3"},
            {name: "Published", class: "p-3"},
            {name: "Action", class: "p-3"}
        ],
        tabIndex: 0
    })
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {
        listProp,
        bodyListProp,
        setBodyListProp,
        setListProp,
        modalDelete,
        setModalDelete,
        id,
        setId,
        tabId,
        setTabId,
        dataTemp,
        setDataTemp,
        onFetchData,
        setOnFetchData,
        selectType,
        setSelectType,
        modalPublish,
        setModalPublish,
      } = useListPropertyHooksV2()
    const [modalUnPublish, setModalUnPublish] = useState(false)

    useEffect(() => {
        dispatch(
            fetchPage({
                ...bodyListProp,
                pageStart: 0,
                email: email,
                status: tabId === 0 ? "draft" : tabId === 1 ? "published" : "closed",
            })
        )
        dispatch(
            fetchNextPage({
              ...bodyListProp,
              pageStart: 1,
              email: email,
              status: tabId === 0 ? "draft" : tabId === 1 ? "published" : "closed",
            })
        )
        dispatch(setPrjInfo({}));
        dispatch(setPrjClsInfoDto({}));

        return () => {
            dispatch(setPrjInfo({}))
            dispatch(setPrjClsInfoDto({}))
            dispatch(prjReset())
            dispatch(saReset())
            dispatch(inquiryUser(JSON.parse(cookie.get("morgateCookie"))?.email))
        }
    }, [bodyListProp.status.pageStart])
      
    let [categories] = useState({
        Draft: [],
        Published: [],
        Closed: [],
    })

    const [filter, setFilter] = useState({
        listType: staticConst.listingProperty[0],
    })

    const handleSelectDropdown = (data) => {

    }

    const handleClickTab = (props) => {
        function inquiryData(status, num) {
            const newBodyRequest = {
                email: pagination.email,
                status: status,
                pageStart: pagination.pageStart,
                sortBy: pagination.sortBy,
                sortDirection: pagination.sortDirection,
            }
    
            const newBodyRequestNext = {
                email: pagination.email,
                status: status,
                pageStart: pagination.nextPageJumper,
                sortBy: pagination.sortBy,
                sortDirection: pagination.sortDirection,
            }
    
            dispatch(fetchPage(newBodyRequest));
            dispatch(fetchNextPage(newBodyRequestNext));

            setFilter({ listType: staticConst.listingProperty[num] })
            setTabId(num)
            setBodyListProp({ ...bodyListProp, status: status })
            dispatch(resetPaginationPage())
            inquiryUser(JSON.parse(cookie.get("morgateCookie"))?.email)
        }
    
        switch (props) {
          case 0:
            inquiryData("draft", 0);
            break;
          case 1:
            inquiryData("published", 1);
            break;
          case 2:
            inquiryData("closed", 2);
            break;
          default:
            break;
        }
      }

    const handleInputSearchChange = (event) => {
        dispatch({
            type: "SET_PAGE_SEARCH",
            payload: event.target.value,
        })
        inquiryUser(JSON.parse(cookie.get("morgateCookie"))?.email)
    }

    const handleKeyDown = (evt) => {
        if (evt.key === "Enter") {
          window.scrollTo(0, 0)
        }
    }

    useEffect(() => {
        if(tabId === 2){
            setHeader({
                header: [
                    {name: "No", class: "p-3 text-center"},
                    {name: "Nama Properti", class: "p-3"},
                    {name: "Harga", class: "p-3 text-center"},
                    {name: "Tanggal Dibuat", class: "p-3 text-center"},
                    {name: "Tanggal Closing", class: "p-3 text-center"},
                    {name: "Action", class: "p-3 text-center"}
                ],
                tabIndex: tabId
            })
        } else {
            setHeader({
                header: [
                    {name: "No", class: "p-3 text-center"},
                    {name: "Nama Properti", class: "p-3"},
                    {name: "Harga", class: "p-3 text-center"},
                    {name: "Tanggal Dibuat", class: "p-3 text-center"},
                    {name: "Published", class: "p-3 text-center"},
                    {name: "Action", class: "p-3 text-center"}
                ],
                tabIndex: tabId
            })
        }
    }, [tabId])

    const handleNextPage = () => {

        const newStatus = tabId === 0 ? "draft" : tabId === 1 ? "published" : "closed";
    
        const newBodyRequest = {
          email: pagination.bodyRequest.email,
          status: newStatus,
          pageStart: pagination.currentPage + 1,
          sortBy: pagination.bodyRequest.sortBy,
          sortDirection: pagination.bodyRequest.sortDirection,
        };
    
        const newBodyRequestNext = {
          email: pagination.bodyRequest.email,
          status: newStatus,
          pageStart: pagination.currentPage + 2,
          sortBy: pagination.bodyRequest.sortBy,
          sortDirection: pagination.bodyRequest.sortDirection,
        };
    
        dispatch(fetchPage(newBodyRequest))
        dispatch(fetchNextPage(newBodyRequestNext))
        dispatch(nextPage())
        inquiryUser(JSON.parse(cookie.get("morgateCookie"))?.email)
    }

    const handlePrevPage = () => {
        const newStatus = tabId === 0 ? "draft" : tabId === 1 ? "published" : "closed";
    
        const newBodyRequest = {
          email: pagination.bodyRequest.email,
          status: newStatus,
          pageStart: pagination.currentPage - 1,
          sortBy: pagination.bodyRequest.sortBy,
          sortDirection: pagination.bodyRequest.sortDirection,
        };
    
        const newBodyRequestNext = {
          email: pagination.bodyRequest.email,
          status: newStatus,
          pageStart: pagination.nextPageJumper - 1,
          sortBy: pagination.bodyRequest.sortBy,
          sortDirection: pagination.bodyRequest.sortDirection,
        };
    
        dispatch(prevPage())
        dispatch(fetchPage(newBodyRequest))
        dispatch(fetchNextPage(newBodyRequestNext))
        inquiryUser(JSON.parse(cookie.get("morgateCookie"))?.email)
    }

    return(
        <div>
            {modalDelete && (
                <Modal
                closeModal={() => {
                    setModalDelete(false);
                    setId(0);
                }}
                title="Hapus Properti Secondary"
                modalTypes="confirm"
                onConfirm={async () => {
                    setModalDelete(false);
                    dispatch(closedProject({ id: decryptStr(id) }));
                    // dispatch(sendProjectBrispot(id));
                    dispatch(
                        removePaginationData({
                            id: decryptStr(id),
                            data: pagination?.data,
                        })
                    )
                    dispatch(
                        fetchPage({
                            ...bodyListProp,
                            pageStart: 0,
                            email: email,
                            status: tabId === 0 ? "draft" : tabId === 1 ? "published" : "closed",
                        })
                    )
                }}
                descBody="Apakah anda yakin ingin menghapus data ini?"
                />
            )}
            {modalPublish && (
                <Modal
                closeModal={() => {
                    setModalPublish(false);
                    setId(0);
                }}
                title="Publish Properti  Secondary"
                modalTypes="confirm"
                onConfirm={() => {
                    setModalPublish(false)
                    dispatch(publishProject({ id: decryptStr(id) }))
                    dispatch(
                        removePaginationData({
                            id: decryptStr(id),
                            data: pagination?.data,
                        })
                    )
                    dispatch(
                        fetchPage({
                            ...bodyListProp,
                            pageStart: 0,
                            email: email,
                            status: tabId === 0 ? "draft" : tabId === 1 ? "published" : "closed",
                        })
                    )
                }}
                descBody="Apakah anda yakin ingin mempublish data ini?"
                />
            )}
            {modalUnPublish && (
                <Modal
                closeModal={() => {
                    setModalUnPublish(false);
                    setId(0);
                }}
                title="Unublish Properti Secondary"
                modalTypes="confirm"
                onConfirm={() => {
                    setModalUnPublish(false)
                    dispatch(unPublishProject({ id: decryptStr(id) }))
                    dispatch(
                        removePaginationData({
                            id: decryptStr(id),
                            data: pagination?.data,
                        })
                    )
                    dispatch(
                        fetchPage({
                            ...bodyListProp,
                            pageStart: 0,
                            email: email,
                            status: tabId === 0 ? "draft" : tabId === 1 ? "published" : "closed",
                        })
                    )
                }}
                descBody="Apakah anda yakin ingin memunpublish data ini?"
                />
            )}
            {saState.success === true && (
                <Snackbar message={saState.msgSuccess} otherProps={{
                    bodyListProp: bodyListProp,
                    setDataTemps: setDataTemp,
                    dataTemps: dataTemp,
                    dispatch: dispatch,
                    tabId: tabId,
                    email: email,
                }}/>
            )}
            {saState.fail === true && (
                <Snackbar message={saState.msgFail} otherProps={{
                    bodyListProp: bodyListProp,
                    setDataTemps: setDataTemp,
                    dataTemps: dataTemp,
                    dispatch: dispatch,
                    tabId: tabId,
                    email: email,
                }}/>
            )}
            <NavHeader />
            <ProfileUser
                title="List Properti Secondary"
                userStatus={userStatus}
                data={
                saState.resApi && 
                saState.resApi?.responseData && 
                saState.resApi?.responseData[0]}
            >
                <div className="property-listing__wrapper">
                    <TabAdminCabang
                        categories={categories}
                        dropdownData={staticConst?.listingProperty}
                        type={filter?.listType}
                        onClickDropdown={handleSelectDropdown}
                        setModalDelete={setModalDelete}
                        setId={setId}
                        handleClickTab={handleClickTab}
                        selectedIndex={tabId}
                        handleInputSearchChange={handleInputSearchChange}
                        handleKeyDown={handleKeyDown}
                        dataTemp={dataTemp}
                        onFetchData={pagination.loading}
                        showSellBtn={true}
                    >
                        <ListingPropertySecond
                            header={header}
                            isLoading={pagination.loading}
                            content={
                                !pagination.loading
                                    ? pagination?.data?.responseData
                                        ?.filter((item) => 
                                            item?.namaProyek?.toLowerCase().includes(pagination.search)
                                        )
                                        .map((data, index) => {
                                            return {
                                                index,
                                                name: data?.namaProyek,
                                                rangePrice: data?.kisaranHarga,
                                                status: data?.status,
                                                dateCreated: data?.createdAt,
                                                timeCreated: data?.createdAt,
                                                modifiedAt: data?.modifiedAt,
                                                isPublish: data?.status === "published",
                                                onClickEdit: () => {
                                                    dispatch(prjReset())
                                                    navigate(
                                                      `/admin-cabang/properti-secondary/edit-properti/${encodeURIComponent(
                                                        data?.id
                                                      )}?status=${data?.status}&from=profile-menu`
                                                    )
                                                },
                                                onClickPublish: () => {
                                                    setId(data?.id.toString())
                                                    setModalPublish(true)
                                                },
                                                onClickUnPublish: () => {
                                                    setId(data?.id.toString())
                                                    setModalUnPublish(true)
                                                },
                                                onClickDelete: () => {
                                                    setId(data?.id?.toString())
                                                    setModalDelete(true)
                                                },
                                                onClickView: () => {
                                                    dispatch(prjReset())
                                                    navigate(
                                                      `/admin-cabang/properti-secondary/view-properti/${encodeURIComponent(
                                                        data?.id
                                                      )}?status=${data?.status}&from=profile-menu`
                                                    )
                                                }
                                            }
                                        })
                                        : []
                            }
                        />
                        <Pagination 
                            bodyListOfUser={bodyListProp}
                            setBodyListOfUser={setBodyListProp}
                            data={dataTemp?.rows}
                            metaData={saState?.resApi?.metadata?.listUserDtoRes}
                            handleNextPage={handleNextPage}
                            handlePrevPage={handlePrevPage}
                        />
                    </TabAdminCabang>
                </div>
            </ProfileUser>
        </div>
    )
}

const Snackbar = ({ message, timeout = 5000, otherProps }) => {
    const [visible, setVisible] = useState(false)
    let showSnackbar = localStorage.getItem("snackBarSucces")

    useEffect(() => {
        otherProps.dispatch(inquiryUser(JSON.parse(cookie.get("morgateCookie"))?.email))
        otherProps.dispatch(
            fetchPage({
                ...otherProps.bodyListProp,
                pageStart: 0,
                email: otherProps.email,
                status: otherProps.tabId === 0 ? "draft" : otherProps.tabId === 1 ? "published" : "closed",
            })
        )
        otherProps.dispatch(
            fetchNextPage({
            ...otherProps.bodyListProp,
            pageStart: 1,
            email: otherProps.email,
            status: otherProps.tabId === 0 ? "draft" : otherProps.tabId === 1 ? "published" : "closed",
            })
        )
    }, [showSnackbar])
  
    useEffect(() => {
      if (showSnackbar) {
        setVisible(true)
        const timer = setTimeout(() => {
          setVisible(false)
          localStorage.removeItem("snackBarSucces")
        }, timeout)
  
        return () => {
          clearTimeout(timer)
          otherProps.dispatch(saReset())
        }
      }
    }, [showSnackbar])
  
    const handleClose = () => {
        setVisible(false)
        localStorage.removeItem("snackBarSucces")
        otherProps.dispatch(saReset())
        otherProps.dispatch(inquiryUser(JSON.parse(cookie.get("morgateCookie"))?.email))
        otherProps.dispatch(
            fetchPage({
                ...otherProps.bodyListProp,
                pageStart: 0,
                email: otherProps.email,
                status: otherProps.tabId === 0 ? "draft" : otherProps.tabId === 1 ? "published" : "closed",
            })
        )
        otherProps.dispatch(
            fetchNextPage({
            ...otherProps.bodyListProp,
            pageStart: 1,
            email: otherProps.email,
            status: otherProps.tabId === 0 ? "draft" : otherProps.tabId === 1 ? "published" : "closed",
            })
        )
    }
    return (
      <div className='fixed top-[75px] xxl:left-[37.5%] largePc:left-[37.5%] mobile:left-[50%] xxl:h-[42px] largePc:h-[42px] mobile:h-[55px] mobile:w-[380px]' 
        style={
            { 
                display: visible ? 'block' : 'none', 
                transform: 'translateX(-50%)', 
                backgroundColor: '#E1F8EB', 
                color: '#27AE60', 
                padding: '12px', 
                borderRadius: '4px', 
                width: '432px',
                maxWidth: '700px',
                zIndex: '9999'}
        }>
            <div className='flex flex-row'>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 16 16" fill="none">
                    <g clip-path="url(#clip0_12234_4647)">
                        <path d="M8.00065 1.3335C4.32065 1.3335 1.33398 4.32016 1.33398 8.00016C1.33398 11.6802 4.32065 14.6668 8.00065 14.6668C11.6807 14.6668 14.6673 11.6802 14.6673 8.00016C14.6673 4.32016 11.6807 1.3335 8.00065 1.3335ZM6.19398 10.8602L3.80065 8.46683C3.54065 8.20683 3.54065 7.78683 3.80065 7.52683C4.06065 7.26683 4.48065 7.26683 4.74065 7.52683L6.66732 9.44683L11.254 4.86016C11.514 4.60016 11.934 4.60016 12.194 4.86016C12.454 5.12016 12.454 5.54016 12.194 5.80016L7.13398 10.8602C6.88065 11.1202 6.45398 11.1202 6.19398 10.8602Z" fill="#27AE60"/>
                    </g>
                <defs>
                    <clipPath id="clip0_12234_4647">
                        <rect width="16" height="16" fill="white"/>
                    </clipPath>
                </defs>
                </svg>
                <span className='font-medium text-[#525252] px-2' style={{fontSize: '12px', lineHeight: '18px', flex: '1 0 0'}}>{message}</span>
                <button className='mobile:hidden' 
                    style={
                        { 
                            float: 'right', 
                            backgroundColor: 'transparent', 
                            border: 'none', 
                            color: '#27AE60', 
                            cursor: 'pointer', 
                            paddingLeft:'8px' 
                        }
                    } onClick={handleClose}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                        <g clip-path="url(#clip0_910_1350)">
                            <path d="M13.725 4.28249C13.4325 3.98999 12.96 3.98999 12.6675 4.28249L9.00004 7.94249L5.33254 4.27499C5.04004 3.98249 4.56754 3.98249 4.27504 4.27499C3.98254 
                            4.56749 3.98254 5.03999 4.27504 5.33249L7.94254 8.99999L4.27504 12.6675C3.98254 12.96 3.98254 13.4325 4.27504 13.725C4.56754 14.0175 5.04004 14.0175 5.33254 
                            13.725L9.00004 10.0575L12.6675 13.725C12.96 14.0175 13.4325 14.0175 13.725 13.725C14.0175 13.4325 14.0175 12.96 13.725 12.6675L10.0575 8.99999L13.725 
                            5.33249C14.01 5.04749 14.01 4.56749 13.725 4.28249Z" fill="#27AE60"/>
                        </g>
                        <defs>
                            <clipPath id="clip0_910_1350">
                            <rect width="18" height="18" fill="white"/>
                            </clipPath>
                        </defs>
                    </svg>
                </button>
            </div>
      </div>
    )
  }

export default ListPropertiSecondary