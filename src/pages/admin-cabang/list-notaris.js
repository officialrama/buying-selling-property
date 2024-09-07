import cookie from "js-cookie"
import React, { useState, useRef, useEffect, useMemo } from "react"
import { ProfileUser } from "../../components/templates"
import { useDispatch, useSelector } from "react-redux"
import { decryptStr, encryptStr } from "../../helpers/encryptDecrypt"
import tableUserMgmt from "../admin/user-management/table-user-mgmt"
import { Pagination, TextboxLabel, Textarea } from "../../components/molecules"
import { FiPlus } from "react-icons/fi"
import { Button } from "../../components/atoms"
import TableAdminCabang from "./table"
import { Modal, NavHeader } from "../../components/organisms"
import useInputHooks from "../../hooks/useInputHooks"
import ModalReferral from "../../components/molecules/Modal/modal-referral"
import { showSingleModal } from "../../store/actions/changeState"
import { 
    closeModalFail,
    inquiryUser,
    saReset, 
    showModalFail } from '../../store/actions/fetchData/superAdminState'
import JSZip from "jszip"
import { FS_LOADING } from "../../store/actions/types"
import useInputRefHooks from "../../hooks/useInputRefHooks"
import { addKjpp, editKjpp, listKjpp, deleteAdminCabang, addNotaris, editNotaris } from "../../store/actions/fetchData/admin-cabang"
import useRegSalesHooks from "../../hooks/useRegSalesHooks"
import TableDataAdminCabang from "./table-data-adminCabang"

const ListNotaris = ({userStatus, email}) => {
    const [dataTemp, setDataTemp] = useState({
        originalRows: [],
        rows: [],
        search: "",
    })
    const saState = useSelector((state) => state.superAdminReducer)
    const state = useSelector((state) => state.stateReducer)
    const dispatch = useDispatch()
    const [isModal, setIsModal] = useState(false)
    const { 
        inputsRef, 
        setInputsRef, 
        handleName,
        handleAlpha,
        handleInput,
    } = useInputRefHooks()
    const { 
        bodyListOfUser, 
        setBodyListOfUser, 
        bodySalesReferral, 
        editMode, 
        setEditMode, 
        handleSearchChange,
        referralId,
        setReferralId,
        cari} = useRegSalesHooks()
    const [profilePic, setProfilePic] = useState({
        file: "",
        name: "",
        preview: "",
    })
    const refProfilePic = useRef(null)
    const resetProfilePic = () => {
        refProfilePic.current.value = null
        setProfilePic({
            file: '',
            name: '',
            preview: ''
        })
    }
    useEffect(() => {
        dispatch(listKjpp(bodyListOfUser, setDataTemp, dataTemp, "notaris"))
        return () => {
            dispatch(saReset());
        }
    }, [bodyListOfUser])
    const handleModal = () => {
        setIsModal(!isModal)
    }
    const closeModal = () => {
        setInputsRef({})
        setIsModal(false)
        setProfilePic({
            ...profilePic,
            file: "",
            name: "",
            preview: ""
        })
    }
    const handleOnSearch = () => {
        setBodyListOfUser({
            ...bodyListOfUser,
            keyword: cari,
            pageStart: 0
        })
        dispatch(inquiryUser(JSON.parse(cookie.get("morgateCookie"))?.email))
    }
    const handleModalEdit = (id) => {
        if(id){
            const dataFiltered = dataTemp?.ResponseData?.['listNotaris']?.filter((e) => e.ID === id)
            setInputsRef({
                id: {value: dataFiltered[0]['ID']},
                namaNotaris: {isValid: !!dataFiltered[0]['Nama'], value:dataFiltered[0]['Nama']},
                addressNotaris: {isValid: !!dataFiltered[0]['Deskripsi'], value:dataFiltered[0]['Deskripsi']}
            })
            setProfilePic({
                ...profilePic,
                file: "",
                name: "",
                preview: dataFiltered[0]['PpUrl']
            })
        }
        setIsModal(!isModal)
    }
    const handleKeyDown = (event) => {
        if(event.key === "Enter")
            handleOnSearch()
    }

    const onPageChange = (e) => {
        setBodyListOfUser({
            ...bodyListOfUser,
            pageStart: e - 1,
        })
    }

    return (
        <div>
        {state.showSingleModal === true && (
             <Modal
                closeModal={() => dispatch(showSingleModal(!state.showSingleModal))}
                onClickDelete={() => {
                    dispatch(deleteAdminCabang(email, referralId, "notaris"))
                    dispatch(showSingleModal(!state.showSingleModal))
                }}
                modalTypes="deleteConfirm"
                title="Konfirmasi"
            />
        )}
        {saState.success === true && (
            <Snackbar message={saState.msgSuccess} otherProps={{
                bodyListOfUsers: bodyListOfUser,
                setDataTemps: setDataTemp,
                dataTemps: dataTemp,
                dispatch: dispatch
            }}/>
        )}
        {saState.fail === true && (
            <Snackbar message={saState.msgFail} otherProps={{
                bodyListOfUsers: bodyListOfUser,
                setDataTemps: setDataTemp,
                dataTemps: dataTemp,
                dispatch: dispatch
            }}/>
        )}
        <NavHeader />
          <ProfileUser
            title="List Notaris"
            userStatus={userStatus}
            data={
            saState.resApi && 
            saState.resApi?.responseData && 
            saState.resApi?.responseData[0]}
          >
            <div className="admin-page__srch-drp-gmk-wrap gtc-admin-cabang">
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
                        className="h-10 mobile:text-[10px] text-[15px] w-full"
                        onClick={() => {
                            setEditMode(false)
                            handleModal()
                        }}
                    >
                        <div className="flex flex-row space-x-2 justify-center">
                            <div className="mt-1"><FiPlus /> </div>
                            <div className="whitespace-nowrap">Tambah Notaris</div>
                        </div>
                    </Button>
                </div>
            </div>
            <div className="sales-ref__wrapper">
                <TableDataAdminCabang 
                    tableType="tableNotaris"
                    dataTemp={React.useMemo(() => (dataTemp), [dataTemp])}
                    dispatch={dispatch}
                    setReferralId={setReferralId}
                    setEditMode={setEditMode}
                    handleModalEdit={handleModalEdit}
                />
                {dataTemp && dataTemp?.metadata?.listUserDtoRes?.totalData > 10 ?
                    (
                        <Pagination
                            currentPage={dataTemp?.metadata?.listUserDtoRes?.currentPage + 1 || 1}
                            totalPages={Math.ceil(dataTemp?.metadata?.listUserDtoRes?.totalData / 10) || 10}
                            // onPageChange={onPageChange}
                            showIcons={false}
                            layout={window.innerWidth <= 768 ? "navigation" : "pagination"}
                            className="flex items-center justify-center"
                        />
                    ) : ""
               }
            </div>
            <AddNotaris
                email={encryptStr(decryptStr(email))}
                isModal={isModal}
                editMode={editMode}
                closeModal={closeModal}
                inputsRef={inputsRef}
                dispatch={dispatch}
                profilePic={profilePic}
                setProfilePic={setProfilePic}
                refProfilePic={refProfilePic}
                resetProfilePic={resetProfilePic}
                otherProps={{
                    handleAlpha,
                    handleName,
                    handleInput
                }}
            />
          </ProfileUser>
        </div>
    )
}

const AddNotaris = ({
    email,
    ListNotaris,
    setListNotaris,
    isModal,
    closeModal,
    editMode,
    inputsRef,
    dispatch,
    profilePic,
    setProfilePic,
    resetProfilePic,
    refProfilePic,
    otherProps
}) => {
    const inputArr = [
        profilePic.preview.startsWith('blob:') ? profilePic?.file.size <= 1500000 : ((profilePic?.preview) ? true : false),
        inputsRef?.namaNotaris?.isValid,
        inputsRef?.addressNotaris?.isValid
    ]
    const [checkValidFoto, setcheckValidFoto] = useState({
        message: ''
    })
    const memoizedHandleName = useMemo(() => otherProps.handleName, [otherProps.handleName])
    const uploadFotoNotaris = (
        files,
        profilePic,
        setProfilePic
    ) => (dispatch) => {
        const zip = new JSZip()
        const datenow = Date.now()
        zip.file(files.name, files)
        zip.generateAsync({type: "blob"}).then((content) => {
            dispatch({ type: FS_LOADING, payload: false });
            setProfilePic({
                ...profilePic,
                file: files,
                name: files.name,
                preview: URL.createObjectURL(files)
            })
        })
    }
    return (
        <ModalReferral
            isModal={isModal}
            closeModal={closeModal}
            title={!editMode ? "Tambah Notaris" : "Edit Notaris"}
            editMode={editMode}>
            <form>
                <div class="flex flex-col gap-2">
                    <div class="col-span-2">
                        <div className='p-6 flex-auto'>
                            <div className='mb-4 w-[432px]'>
                                <span className="text-xs font-semibold">Nama Notaris</span>
                                    <TextboxLabel
                                        requiredStar={true}
                                        placeholder="Masukan Nama Notaris"
                                        name="namaNotaris"
                                        value={inputsRef?.namaNotaris?.value}
                                        onChange={memoizedHandleName}
                                        warnText={!inputsRef?.namaNotaris?.value ? "Nama notaris tidak boleh kosong" : !inputsRef?.namaNotaris?.isValid ? inputsRef?.namaNotaris?.msgError : ""}
                                    />
                            </div>
                            <div className='mb-4'>
                                <span className="text-xs font-semibold">Alamat</span>
                                    <Textarea
                                        placeholder="Masukan Alamat"
                                        name="addressNotaris"
                                        value={inputsRef?.addressNotaris?.value}
                                        rows="4"
                                        onChange={otherProps.handleInput}
                                        warnText={!inputsRef?.addressNotaris?.value ? "Alamat Notaris tidak boleh kosong" : !inputsRef?.addressNotaris?.isValid ? inputsRef?.addressNotaris?.msgError : ""}
                                    />
                            </div>
                            <span className="text-xs font-semibold">Foto</span>
                            <div className="border-2 border-gray-200 border-dotted rounded-lg p-1 h-[216px] tab:w-1/3 tab:m-auto tab:mb-4 cursor-pointer">
                                <input
                                    type="file"
                                    accept=".jpg,.png,.jpeg"
                                    ref={refProfilePic}
                                    style={{ display: 'none' }}
                                    onChange={(e) => {
                                        const fileName = e.target.files[0].name.toString();
                                        const extFile = fileName
                                            .substr(fileName.lastIndexOf(".") + 1, fileName.length)
                                            .toLowerCase();
                                        const filterExtArray = [extFile !== "jpg", extFile !== "jpeg", extFile !== "png"]
                                        if (e.target.files[0].size > 1500000){
                                            resetProfilePic()
                                            setcheckValidFoto({
                                                message: "Ukuran foto lebih dari 1.5 MB"
                                            })
                                        } else {
                                            if (filterExtArray.indexOf(false) === -1) {
                                                resetProfilePic()
                                                setcheckValidFoto({
                                                    message: `Format file *.${extFile} tidak didukung`
                                                })
                                            } else {
                                                Array.from(e.target.files).forEach((file) => {
                                                    setcheckValidFoto({
                                                        message: ""
                                                    })
                                                    dispatch(
                                                        uploadFotoNotaris(
                                                            file,
                                                            profilePic,
                                                            setProfilePic
                                                        )
                                                    );
                                                });
                                            }
                                        }
                                    }}
                                />
                                <div
                                    className="cursor-pointer object-contain relative max-w-[100%] max-h-[100%] w-auto h-auto"
                                    onClick={() => {
                                        refProfilePic.current.click();
                                    }}
                                >
                                    {profilePic.preview ? (checkValidFoto?.message != '' ? (
                                        <div className="flex flex-col items-center pt-[75px]">
                                            <img
                                                className="w-6 h-6"
                                                src="/icons/small-icons/Upload-Notaris.svg"
                                                alt="avatar"
                                            />
                                            <p className="mt-3 font-bold text-xs">Upload Foto Disini</p>
                                            <p className="text-[#777777] text-xs">Maksimal 1.5 MB</p>
                                        </div>
                                    ) : (
                                        <img 
                                            src={profilePic.preview} 
                                            alt="notaris_image" 
                                            className="w-[425px] h-[200px] absolute" />
                                    )) : (
                                        <div className="flex flex-col items-center pt-[75px]">
                                            <img
                                                className="w-6 h-6"
                                                src="/icons/small-icons/Upload-Notaris.svg"
                                                alt="avatar"
                                            />
                                            <p className="mt-3 font-bold text-xs">Upload Foto Disini</p>
                                            <p className="text-[#777777] text-xs">Maksimal 1.5 MB</p>
                                        </div>
                                    )
                                    }
                                </div>
                            </div>
                            <p className="mx-auto text-red">
                                {checkValidFoto?.message != '' && 
                                    (
                                        <div className="my-2 flex items-center" style={{flex: '1 0 0'}}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                                <path d="M8 5.25582C8.26972 5.25582 8.48838 5.47447 8.48838 5.74419V9.00001C8.48838 9.26973 8.26972 9.48839 8 9.48839C7.73028 9.48839 7.51163 9.26973 7.51163 9.00001V5.74419C7.51163 5.47447 7.73028 5.25582 8 5.25582Z" fill="#E84040"/>
                                                <path d="M8 11.6047C8.35963 11.6047 8.65117 11.3131 8.65117 10.9535C8.65117 10.5939 8.35963 10.3023 8 10.3023C7.64038 10.3023 7.34884 10.5939 7.34884 10.9535C7.34884 11.3131 7.64038 11.6047 8 11.6047Z" fill="#E84040"/>
                                                <path fill-rule="evenodd" clip-rule="evenodd" d="M5.58706 3.44977C6.28505 2.56321 7.02445 2 8 2C8.97555 2 9.71495 2.56321 10.4129 3.44977C11.0994 4.32169 11.8269 5.6115 12.7576 7.26175L13.0412 7.76454C13.8106 9.12871 14.4183 10.2062 14.7375 11.071C15.0637 11.9547 15.1412 12.7572 14.6477 13.465C14.1689 14.1519 13.3699 14.4329 12.3623 14.5656C11.3584 14.6977 10.0085 14.6977 8.27664 14.6977H7.72338C5.99151 14.6977 4.64156 14.6977 3.63775 14.5656C2.63006 14.4329 1.83112 14.1519 1.35227 13.465C0.858814 12.7572 0.936305 11.9547 1.26251 11.071C1.58171 10.2062 2.18941 9.12872 2.95882 7.76456L3.24236 7.26184C4.17312 5.61155 4.90059 4.3217 5.58706 3.44977ZM6.35451 4.05398C5.72026 4.85957 5.02878 6.08272 4.07021 7.7823L3.8334 8.20215C3.03493 9.61787 2.46751 10.627 2.17883 11.4092C1.89385 12.1813 1.93336 12.5906 2.15353 12.9064C2.3883 13.2432 2.82894 13.4739 3.76523 13.5972C4.69769 13.7199 5.9831 13.721 7.7632 13.721H8.2368C10.0169 13.721 11.3023 13.7199 12.2348 13.5972C13.1711 13.4739 13.6117 13.2432 13.8465 12.9064C14.0666 12.5906 14.1061 12.1813 13.8212 11.4092C13.5325 10.627 12.9651 9.61786 12.1666 8.20215L11.9298 7.78229C10.9712 6.08271 10.2797 4.85957 9.64549 4.05398C9.01715 3.25587 8.52913 2.97675 8 2.97675C7.47087 2.97675 6.98285 3.25587 6.35451 4.05398Z" fill="#E84040"/>
                                            </svg>
                                            <p className="textbox__invalidTxt" style={{marginTop: "0.3rem", padding: "0 0 0 5px"}}>{checkValidFoto.message}</p>
                                        </div>
                                    )
                                }
                            </p>
                        </div>
                    </div>
                    <div className="p-6 w-full">
                        <Button 
                            btnTypes="submit" 
                            id="submitRef" 
                            name="submitRef" 
                            className="w-full" 
                            disabled={inputArr.filter(Boolean).length !== 3} 
                            onClick={() => {
                            closeModal();
                            if (!editMode) {
                                dispatch(
                                    addNotaris(
                                        inputsRef, 
                                        profilePic
                                    )
                                )
                            } else {
                                dispatch(
                                    editNotaris(
                                        inputsRef, 
                                        profilePic
                                    )
                                )
                            }
                            resetProfilePic();
                            setProfilePic({ ...profilePic, file: "", name: "", preview: "" });
                        }}>{editMode ? "Simpan" : "Tambahkan"}</Button>
                    </div>
                </div>
            </form>
        </ModalReferral>
    )
}

const Snackbar = ({ message, timeout = 5000, otherProps }) => {
    const [visible, setVisible] = useState(false)
    let showSnackbar = localStorage.getItem("snackBarSucces")

    useEffect(() => {
        otherProps.dispatch(inquiryUser(JSON.parse(cookie.get("morgateCookie"))?.email))
        otherProps.dispatch(listKjpp(otherProps.bodyListOfUsers, otherProps.setDataTemps, "notaris"))
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
      otherProps.dispatch(listKjpp(otherProps.bodyListOfUsers, otherProps.setDataTemps, "notaris"))
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

export default ListNotaris