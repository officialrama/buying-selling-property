import cookie from "js-cookie"
import React, { useState, useRef, useEffect } from "react"
import { NavHeaderAdmin, SideMenuAdmin, Modal } from "../../../components/organisms"
import { TextboxLabel } from '../../../components/molecules'
import { 
    Button,
    LabelInputTextbox } from '../../../components/atoms'
import { FiPlus } from "react-icons/fi"
import { useDispatch, useSelector } from 'react-redux'
import { saReset } from '../../../store/actions/fetchData/superAdminState'
import { decryptStr, encryptStr } from "../../../helpers/encryptDecrypt"
import { showSingleModal } from "../../../store/actions/changeState"
import useInputHooks from '../../../hooks/useInputHooks'
import useInputRefHooks from "../../../hooks/useInputRefHooks"
import ModalReferral from '../../../components/molecules/Modal/modal-referral'
import useAdminCabangHooks from "../../../hooks/useAdminCabangHooks"
import TableUserMgmt from "./table-user-mgmt"
import { KCAutocomplete } from "../../../components/atoms"
import useFormStepperHooks from "../../../hooks/useFormStepperHooks"
import { otherBranch } from "../../../store/actions/fetchData/branch"
import { Pagination } from "flowbite-react"
import { 
    addAdminCabang, 
    editAdminCabang, 
    listAdminCabang,
    deleteAdminCabang } from "../../../store/actions/fetchData/admin-cabang"

const AdminCabang = ({email,adminCabangName}) => {

    const saState = useSelector((state) => state.superAdminReducer)
    const state = useSelector((state) => state.stateReducer)
    const dispatch = useDispatch()
    const [isModal, setIsModal] = useState(false)
    const { inputs } = useInputHooks()
    const [profilePic, setProfilePic] = useState({
        file: "",
        name: "",
        preview: ""
    })
    const [kcDescVal, setKcDescVal] = useState("")
    const { 
        inputsRef, 
        setInputsRef, 
        handleInput, 
        handleEmail, 
        handleName,
        handleAutoComplete,
    } = useInputRefHooks();

    const { 
        bodyListOfUser,
        setBodyListOfUser,
        dataTemp,
        setDataTemp,
        handleSearchChange,
        cari,
        editMode,
        setEditMode,
        referralId,
        setReferralId,
        referralEmail,
        setReferralEmail
    } = useAdminCabangHooks()

    const handleModalEdit = (id) => {
        if(id){
            const dataFiltered = dataTemp?.rows?.filter((e) => e.id === id)[0]
            const kantor = `${dataFiltered.KodeCabang} | ${dataFiltered.Kancab} | ${dataFiltered.kanwil}`
            setInputsRef({
                id: { value: dataFiltered.id },
                kanwil: { isValid: !!dataFiltered.kanwil, value: dataFiltered.kanwil },
                adminCabangEmail: { isValid: !!dataFiltered.adminCabangEmail, value: dataFiltered.adminCabangEmail },
                namaPIC: { isValid: !!dataFiltered.namaPic, value: dataFiltered.namaPic },
                KodeCabang: { isValid: !!dataFiltered.KodeCabang, value: dataFiltered.KodeCabang },
                newAdminCabangEmail: { isValid: !!dataFiltered.adminCabangEmail, value: dataFiltered.adminCabangEmail },
                kantorCabang: kantor
            })
            setKcDescVal(kantor)
        }
        setIsModal(!isModal)
    }


    const handleModal = () => {
        setIsModal(!isModal)
    }

    const closeModal = () => {
        setInputsRef({})
        setKcDescVal()
        setIsModal(false)
        setProfilePic({
            ...profilePic,
            name: "",
            file: "",
            preview: ""
        })
    }

    const onPageChange = (e) => {
        setBodyListOfUser({
            ...bodyListOfUser,
            pageStart: e - 1,
        })
    }

    useEffect(() => {
        dispatch(listAdminCabang(bodyListOfUser, setDataTemp, dataTemp))
        return () => {
            dispatch(saReset())
        }
    }, [bodyListOfUser])

    const handleOnSearch = () => {
        setBodyListOfUser({
            ...bodyListOfUser,
            keyword: cari,
            pageStart: 0
        });
    }

    const handleKeyDown = (event) => {
        if(event.key === "Enter") {
            handleOnSearch()
        }
    }

    return (
    <div>
        {state.showSingleModal === true && (
             <Modal
                closeModal={() => dispatch(showSingleModal(!state.showSingleModal))}
                onClickDelete={() => {
                    dispatch(deleteAdminCabang(referralEmail, referralId, "AdminCabang"))
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
        <NavHeaderAdmin />
        <SideMenuAdmin title="Admin Cabang">
            <div className="admin-page__srch-drp-gmk-wrap gtc-mon-user">
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
                            handleModal()
                            setEditMode(false)
                        }}
                    >
                        <div className="flex flex-row space-x-2 justify-center">
                            <div className="mt-1"><FiPlus /> </div>
                            <div>Tambah Admin Cabang</div>
                        </div>
                    </Button>
                </div>
            </div>
            <div className="user-ref__wrapper">
               <TableUserMgmt 
                 tableType="adminCabang"
                 referralId={referralId}
                 setReferralId={setReferralId}
                 setReferralEmail={setReferralEmail}
                 dataTemp={React.useMemo(() => (dataTemp), [dataTemp])}
                 dispatch={dispatch}
                 setEditMode={setEditMode}
                 handleModalEdit={handleModalEdit}
               />
               {dataTemp && dataTemp?.metadata?.listUserDtoRes?.totalData > 10 ?
                    (
                        <Pagination
                            currentPage={dataTemp?.metadata?.listUserDtoRes?.currentPage + 1 || 1}
                            totalPages={Math.ceil(dataTemp?.metadata?.listUserDtoRes?.totalData / 10) || 10}
                            onPageChange={onPageChange}
                            showIcons={false}
                            layout={window.innerWidth <= 768 ? "navigation" : "pagination"}
                            className="flex items-center justify-center"
                        />
                    ) : ""
               }
            </div>
        <AddAdminCabang 
            email={encryptStr(decryptStr(adminCabangName))}
            picName="Default"
            isModal={isModal}
            closeModal={closeModal}
            inputs={inputs}
            inputsRef={inputsRef}
            setInputsRef={setInputsRef}
            dispatch={dispatch}
            editMode={editMode}
            kcDescVal={kcDescVal} 
            setKcDescVal={setKcDescVal}
            otherProps={{
                handleName,
                handleEmail,
                handleInput,
                handleAutoComplete
            }}
        />
        </SideMenuAdmin>
    </div>
    )
}

const AddAdminCabang = (
    {
        email,
        inputs, 
        inputsRef, 
        setInputsRef,
        dispatch, 
        closeModal, 
        isModal,
        editMode,        
        kcDescVal, 
        setKcDescVal,
        otherProps
    }
) => {
    const inputArr = [
        kcDescVal,
        (editMode) ? inputsRef?.newAdminCabangEmail?.isValid : inputsRef?.adminCabangEmail?.isValid,
        inputsRef?.namaPIC?.isValid
    ]
    const morgateCookie = cookie.get("morgateCookie")
    const cookieIsExist = morgateCookie && JSON.parse(morgateCookie)
    const [kcList, setKcList] = useState([])
    const [kcForm, setKcForm] = useState({
        state: "other"
    })
    const [loadingLoc, setLoadingLoc] = useState({
        onLoading: false,
        failed: false
      })
    const { setInputs } = useFormStepperHooks()

    useEffect(() => {
          dispatch(otherBranch(setKcList, loadingLoc, setLoadingLoc))
      }, [kcForm.state])

    function matchDataKc(state, value) {
        return (
          kcForm.state !== "other" ? state.unitKerja.toLowerCase().indexOf(value.toLowerCase()) !== -1 : state.brdesc.toLowerCase().indexOf(value.toLowerCase()) !== -1
        )
    }
    const handleSubmit = (e) => {
        e.preventDefault()
    }

    return (
        <ModalReferral
            isModal={isModal}
            closeModal={closeModal}
            title={!editMode ? "Tambah Admin Cabang" : "Edit Admin Cabang"}
            editMode={editMode}
        >
            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols mobile:grid-cols-1 gap-6">
                    <div class="col-span">
                        <div className='p-6 pt-2 pb-0 flex-auto max-h-[50vh] overflow-y-auto lg:w-[400px]'>
                            <div className='mb-4'>
                                <div className="mb-2">
                                    <LabelInputTextbox text={"Kantor Wilayah"} />
                                    <span className="sellprops__card__redstar">*</span>
                                </div>
                                <KCAutocomplete
                                    value={kcDescVal}
                                    items={kcList}
                                    getItemValue={(item) => `${item?.branch?.toString().padStart(4, "0")} | ${item?.brdesc} | ${item?.rgdesc}`}
                                    shouldItemRender={matchDataKc}
                                    renderMenu={item => (
                                    <div className="autocompSearch__dropdownWrap">
                                        {item}
                                    </div>
                                    )}
                                    renderItem={(item) =>
                                    <div className="autocompSearch__dropdownItem">
                                        {item?.branch?.toString().padStart(4, "0")} | {item?.brdesc} | {item?.rgdesc}
                                    </div>
                                    }
                                    onChange={(event, val) => setKcDescVal(val)}
                                    wrapperStyle={{ position: "relative" }}
                                    wrapperProps={{
                                        className: "autocompSearch__wrapper"
                                    }}
                                    inputProps={{
                                        placeholder: "Pilih Kantor Wilayah",
                                        className: "autocompSearch__textbox",
                                    }}
                                    onSelect={val => {
                                        setKcDescVal(val);
                                        const valSplit = val.split(" |");
                                        let selectedKc = kcList.filter((e) => { return e.branch.toString() === (+valSplit[0]).toString() })[0];
                                        setInputs({
                                            ...inputs,
                                            ukerCode: { isValid: !!selectedKc?.branch?.toString().padStart(4, "0"), value: selectedKc?.branch?.toString().padStart(4, "0") },
                                            ukerName: { isValid: !!selectedKc?.brdesc, value: selectedKc?.brdesc },
                                            kanwil: { isValid: true, value: selectedKc?.kanwil || selectedKc?.rgdesc}
                                        })
                                    }}
                                    state={kcForm.state}
                                />
                            </div>
                            <div className='mb-4'>
                                <TextboxLabel
                                    topLabel="Nama PIC"
                                    requiredStar={true}
                                    value={inputsRef?.namaPIC?.value}
                                    placeholder="Masukkan Nama PIC"
                                    name="namaPIC"
                                    onChange={otherProps.handleName}
                                    warnText={!inputsRef.namaPIC?.value ? "PIC tidak boleh kosong" : !inputsRef?.namaPIC?.isValid ? inputsRef?.namaPIC?.msgError : ""}
                                />
                            </div>
                            <div className='mb-4'>
                                <TextboxLabel 
                                    topLabel="Email" 
                                    requiredStar={true}
                                    value={editMode ? inputsRef?.newAdminCabangEmail?.value : inputsRef?.adminCabangEmail?.value}
                                    placeholder="Masukkan Email"
                                    name={editMode ? "newAdminCabangEmail" : "adminCabangEmail"}
                                    onChange={otherProps.handleEmail}
                                    warnText={editMode ? !inputsRef.newAdminCabangEmail?.value ? "Email tidak boleh kosong" : !inputsRef.newAdminCabangEmail?.isValid ? inputsRef?.newAdminCabangEmail?.msgError : "" 
                                        : !inputsRef.adminCabangEmail?.value ? "Email tidak boleh kosong" : !inputsRef.adminCabangEmail?.isValid ? inputsRef?.adminCabangEmail?.msgError : ""}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="p-6 w-full">
                    <Button btnTypes="submit" 
                        id="submitRef" 
                        name="submitRef" 
                        className="w-full"
                        acceptedFiles=""
                        disabled={inputArr.filter(Boolean).length !== 3}
                        onClick={() => {
                            if (!editMode) {
                                dispatch(
                                    addAdminCabang(
                                        kcDescVal, 
                                        inputsRef, 
                                        setInputsRef,
                                        closeModal
                                    )
                                )
                            } else {
                                dispatch(
                                    editAdminCabang(
                                        kcDescVal, 
                                        inputsRef,
                                        setInputsRef,
                                        closeModal
                                    )
                                )
                            }
                        }}>{editMode ? "Simpan" : "Tambahkan"}</Button>
                </div>
            </form>
        </ModalReferral>
    )
}

const Snackbar = ({ message, timeout = 5000, otherProps }) => {
    const [visible, setVisible] = useState(false)
    let showSnackbar = localStorage.getItem('snackBarSucces')

    useEffect(() => {
        otherProps.dispatch(listAdminCabang(otherProps.bodyListOfUsers, otherProps.setDataTemps, otherProps.dataTemps))
    }, [showSnackbar])
  
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
      otherProps.dispatch(listAdminCabang(otherProps.bodyListOfUsers, otherProps.setDataTemps, otherProps.dataTemps))
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

export default AdminCabang