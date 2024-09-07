import cookie from "hs-cookie"

import React, { useEffect, useState } from "react"
import { FiPlus, FiSearch } from "react-icons/fi"
import { TextboxLabel } from "../../../components/molecules"
import { Pagination } from "flowbite-react"
import { NavHeaderAdmin, SideMenuAdmin } from "../../../components/organisms"
import TableArticle from "./table-article"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { ListArticle, deleteArticle, updatePublish } from "../../../store/actions/fetchData/article-fetch"
import ConfirmationV2 from "../../../components/organisms/Modal/modal-types/Confirmation/ComfirmationV2"
import { showSingleModal } from "../../../store/actions/changeState"
import moment from "moment"
import { saReset } from "../../../store/actions/fetchData/superAdminState"

const ListArticles = ({email}) => {
    const saState = useSelector((state) => state.superAdminReducer)
    const state = useSelector((state) => state.stateReducer)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [dataTemp, setDataTemp] = useState([])
    const [bodyRequest, setBodyRequest] = useState({
        page: 1,
        limit: 10,
        all: "true",
        order: "-created_at",
        search: ""
    })

    useEffect(() => {
        dispatch(ListArticle(bodyRequest, ()=>{}, "", "", setDataTemp))
    },[localStorage.getItem("snackBarSucces"),bodyRequest.page])

    const handleSearch = (evt) => {
        if (evt.key === "Enter") {
            dispatch(ListArticle(bodyRequest, ()=>{}, "", "", setDataTemp))
        }
    }
    const [publishConfirmation, setPublishConfirmation] = useState({
        slug: "",
        publishedDate: "",
        state: false
    })
    const actionPublish = () => {
        const date = moment(publishConfirmation.publishedDate).isBefore(moment(), 'year, month, day')
        let newDate
        if(date){
            newDate = moment(publishConfirmation.publishedDate).clone().add(2,"years")
        }else{
            newDate = moment()
        }
        dispatch(updatePublish(date, newDate, publishConfirmation.slug))
        dispatch(showSingleModal(!state.showSingleModal))
        setPublishConfirmation({
            slug: "",
            publishedDate: "",
            state: false
        })
    }
    const onClickView = (slug) => {
        navigate(`/homespot-update/${slug}`)
    }
    const onClickEdit = (slug) => {
        navigate(`edit-article/${slug}`)
    }
    const [deleteConfirmation, setDeleteConfirmation] = useState({
        slug: "",
        state: false
    })
    const deleteAction = () => {
        dispatch(deleteArticle(deleteConfirmation?.slug ?? ""))
        dispatch(showSingleModal(!state.showSingleModal))
        setDeleteConfirmation({
            slug: "",
            state: false
        })
    }
    const onPageChange = (e) => {
        setBodyRequest({
            ...bodyRequest,
            page: e,
        })
    }

    return(
        <>
            {state.showSingleModal === true && deleteConfirmation.state === true && (
                <ConfirmationV2
                    title="Hapus Artikel Ini?"
                    description="Artikel ini akan dihapus secara permanen."
                    closeModal={() => dispatch(showSingleModal(!state.showSingleModal))}
                    onClicConfirmation={deleteAction}
                    confirmText="Ya, Hapus"
                    cancelText="Batal"
                />
            )}
            {state.showSingleModal === true && publishConfirmation.state === true && (
                <ConfirmationV2
                    title={moment(publishConfirmation.publishedDate).isBefore(moment(), 'year, month, day') ? "Pindahkan ke Draft ?" : "Terbitkan Artikel Ini ?"}
                    description={moment(publishConfirmation.publishedDate).isBefore(moment(), 'year, month, day') ? "Artikel ini akan dikembalikan ke Draft" : "Pastikan artikel sudah benar dan sesuai."}
                    closeModal={() => dispatch(showSingleModal(!state.showSingleModal))}
                    onClicConfirmation={actionPublish}
                    confirmText={moment(publishConfirmation.publishedDate).isBefore(moment(), 'year, month, day') ? "Ya, Pindahkan" : "Ya, Terbitkan"}
                    cancelText="Batal"
                />
            )}
            {saState.success === true && (
                <Snackbar timeout={5000} message={saState.msgSuccess} otherProps={{
                    dispatch: dispatch
                }}/>
            )}
            {saState.fail === true && (
                <Snackbar timeout={5000} message={saState.msgFail} otherProps={{
                    dispatch: dispatch
                }}/>
            )}
            <NavHeaderAdmin />
            <SideMenuAdmin title="Homespot Update">
                <div>
                    <div className="flex justify-between pb-4">
                        <div className="w-[546px] h-[48px]">
                            <TextboxLabel 
                                placeholder="Cari judul artikel atau video"
                                onChange={(e) => setBodyRequest({...bodyRequest, search: e.target.value})}
                                onKeyDown={handleSearch}
                                leftLabel={<FiSearch color={"#777777"} size={20} />}
                            />
                        </div>
                        <button 
                            className="flex flex-row items-center p-3 gap-2 rounded-md h-[48px] bg-[#1078CA] w-fit"
                            onClick={() => navigate("add-article")}
                        >
                            <div className="mt-1"><FiPlus color={"#ffffff"}/></div>
                            <p className="text-white font-bold text-[14px]">Tambah Artikel atau Video</p>
                        </button>
                    </div>
                    <div>
                        <TableArticle
                            dataTemp={React.useMemo(() => (dataTemp.responseData), [dataTemp?.responseData])}
                            onPublish={setPublishConfirmation}
                            onClickView={onClickView}
                            onClickEdit={onClickEdit}
                            onClickDelete={setDeleteConfirmation}
                        />
                        {dataTemp && dataTemp?.metadata?.total > 10 ? (
                            <Pagination
                                currentPage={parseInt(dataTemp?.metadata?.next?.match(/&page=(\d+)/)?.[1], 10)-1 > 0 ? parseInt(dataTemp?.metadata?.next?.match(/&page=(\d+)/)?.[1], 10)-1 : parseInt(dataTemp?.metadata?.prev?.match(/&page=(\d+)/)?.[1], 10) ? parseInt(dataTemp?.metadata?.prev?.match(/&page=(\d+)/)?.[1], 10)+1 : 1}
                                totalPages={Math.ceil(dataTemp?.metadata?.total / 10)}
                                onPageChange={onPageChange}
                                showIcons={false}
                                layout={window.innerWidth <= 768 ? "navigation" : "pagination"}
                                className="flex items-center justify-center"
                            />
                        ) : null}
                    </div>
                </div>
            </SideMenuAdmin>
        </>
    )
}

const Snackbar = ({ message, timeout = 5000, otherProps }) => {
    const [visible, setVisible] = useState(false)
    let showSnackbar = localStorage.getItem('snackBarSucces')
  
    useEffect(() => {
      if (showSnackbar) {
        setVisible(true)
        const timer = setTimeout(() => {
          setVisible(false)
          localStorage.removeItem('snackBarSucces')
        }, timeout)
  
        return () => {
          clearTimeout(timer)
          otherProps.dispatch(saReset())
        }
      }
    }, [showSnackbar])
  
    const handleClose = () => {
      setVisible(false)
      otherProps.dispatch(saReset())
      localStorage.removeItem('snackBarSucces')
    }
    return (
      <div className='fixed top-[100px] xxl:left-[26.8%] largePc:left-[26.8%] mobile:left-[50%] xxl:h-[42px] largePc:h-[42px] mobile:h-[55px] mobile:w-[380px]' 
        style={
            { 
                display: visible ? 'block' : 'none' , 
                transform: 'translateX(-50%)', 
                backgroundColor: '#E1F8EB', 
                color: '#27AE60', 
                padding: '12px', 
                borderRadius: '4px', 
                width: '432px',
                maxWidth: '700px'}
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

export default ListArticles