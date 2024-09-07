import React, {useState, useEffect} from "react"
import { NavHeaderAdmin, SideMenuAdmin } from "../../components/organisms"
import { Tab, Tabs } from 'react-tabs-scrollable'
import { AiFillLeftCircle, AiFillRightCircle } from "react-icons/ai"
import { DetailsCard, TextboxLabel, EmptyState } from "../../components/molecules"
import { FiPlus, FiZoomIn } from "react-icons/fi"
import { useDispatch, useSelector } from "react-redux"
import { listAllBanner, editPopup, addPopUp, deleteBanner } from "../../store/actions/fetchData/dynamic-banner"
import ModalReferral from "../../components/molecules/Modal/modal-referral"
import { alphaRegex, emailRegex, invalidStrRegex, passwordRegex, nameRegex, notNamePeopleRegex, phoneNoRegisterRegex, phoneNoRegex } from "../../helpers/regex"
import TableBanner from "./table-banner"
import { saReset } from "../../store/actions/fetchData/superAdminState"
import { Button, Title } from "../../components/atoms"

const DynamicBanner = ({email}) => {
    const [activeTab, setActiveTab] = useState(0)
    const dispatch = useDispatch()
    const [isModalPopUp, setIsModalPopup] = useState(false)
    const [isModalBanner, setIsModalBanner] = useState(false)
    const [editMode, setEditMode] = useState(false)
    const [listPopUp, setListPopUp] = useState([])
    const [listBanner, setListBanner] = useState([])
    const [previewModalPopUp, setPreviewModalPopUp] = useState(false)
    const [previewModalBanner, setPreviewModalBanner] = useState(false)
    const onTabClick = (e, index) => setActiveTab(index)
    const [inputsRef, setInputsRef] = useState({})
    const [inputsBanner, setInputsBanner] = useState({})
    const [cari, setCari] = useState("")
    const saState = useSelector((state) => state.superAdminReducer)
    const state = useSelector((state) => state.stateReducer)
    const [popupPic, setPopupPic] = useState({
        id: null,
        file: null,
        name: null,
        preview: null
    })
    const [bannerPic, setBannerPic] = useState({
        id: null,
        file: null,
        name: null,
        preview: null
    })

    const handleName = event => {
        event.persist();
        if (!nameRegex.test(event.target.value)) {
          setInputsBanner({
            ...inputsBanner,
            [event.target.name]: { isValid: false, value: event.target.value, msgError: "Field Wajib Diisi" },
          })
          setInputsRef({
            ...inputsRef,
            [event.target.name]: { isValid: false, value: event.target.value, msgError: "Field Wajib Diisi" },
          })
        } else if (event.target.value === "" || event.target.value === null){
            setInputsBanner({
                ...inputsBanner,
                [event.target.name]: { isValid: false, value: event.target.value, msgError: "Field Wajib Diisi" },
              })
              setInputsRef({
                ...inputsRef,
                [event.target.name]: { isValid: false, value: event.target.value, msgError: "Field Wajib Diisi" },
              })
        } else {
          setInputsBanner({
            ...inputsBanner,
            [event.target.name]: { isValid: true, value: event.target.value, msgError: "" },
          })
          setInputsRef({
            ...inputsRef,
            [event.target.name]: { isValid: true, value: event.target.value, msgError: "" },
          })
        }
    }

    const handleLink = event => {
        event.persist();
        if(event.target.value == "" || event.target.value === null){
            setInputsBanner({
                ...inputsBanner,
                [event.target.name]: { isValid: false, value: "", msgError: "Field Wajib Diisi" },
            })
            setInputsRef({
                ...inputsRef,
                [event.target.name]: { isValid: false, value: "", msgError: "Field Wajib Diisi" },
            })
        }else{
            setInputsBanner({
                ...inputsBanner,
                [event.target.name]: { isValid: true, value: event.target.value, msgError: "" },
            })
            setInputsRef({
                ...inputsRef,
                [event.target.name]: { isValid: true, value: event.target.value, msgError: "" },
            })
        } 
    }

    const [typeFile, setTypeFile] = useState("")
    useEffect(() => {
        setTypeFile(activeTab === 0 ? "Popup" : "Carousel")
    }, [activeTab])
    useEffect(() => {
        dispatch(listAllBanner(typeFile, listBanner, (typeFile === "Popup" ? setListPopUp : setListBanner)))
    }, [typeFile])

    useEffect(() => {
        if(listPopUp?.[0]){
            setPopupPic({
                ...popupPic,
                preview: listPopUp?.[0]?.ImageUrl
            })
            setInputsRef({
                id: {
                    value: listPopUp?.[0]?.ID
                },
                linkTautan: {
                    value: listPopUp?.[0]?.DirectUrl
                },
                judul: {
                    value: listPopUp?.[0]?.Judul,
                    isValid: (listPopUp?.[0]?.Judul !== "" || listPopUp?.[0]?.Judul !== null) ? true : false
                },
            })
        }
    }, [listPopUp?.[0]])

    const handleModal = (type) => {
        if(type === "popup"){
            if(editMode === false){
                setInputsRef({
                    ...inputsRef,
                    judul: {
                        isValid: false,
                        msgError: "Field Wajib Diisi"
                    }
                })
            }else{
                setInputsRef({
                    id: {
                        value: listPopUp?.[0]?.ID
                    },
                    linkTautan: {
                        value: listPopUp?.[0]?.DirectUrl
                    },
                    judul: {
                        value: listPopUp?.[0]?.Judul,
                        isValid: (listPopUp?.[0]?.Judul !== "" || listPopUp?.[0]?.Judul !== null) ? true : false
                    },
                })
            }
            console.log(inputsRef, editMode)
            setIsModalPopup(!isModalPopUp)
        }else {
            if(editMode === false){
                setInputsBanner({
                    judul: {
                        isValid: false,
                        msgError: "Field Wajib Diisi"
                    }
                })
                setBannerPic({})
            }
            setIsModalBanner(!isModalBanner)
        }
    }

    const handleKeyDown = (event) => {
        if(event.key === "Enter") {
            handleOnSearch()
        }
    }

    const handleOnSearch = () => {
        const filtered = listBanner?.[0]?.filter((item) => {
            const lowVal = cari.toLowerCase()
            const lowRes = item.Judul.toLowerCase()
            return lowRes.includes(lowVal)
        })
        setListBanner([filtered])
    }

    const handleSearchChange = (event) => {
        setCari(event.target.value)
        if(event.target.value === "" || event.target.value === null){
            dispatch(listAllBanner("Carousel", listBanner,  setListBanner))
        }
      }

    const closeModal = () => {
        setIsModalPopup(false)
        setIsModalBanner(false)
        setPreviewModalPopUp(false)
        setInputsBanner({})
        setBannerPic({})
    }

    const popUpSubmit = (type) => {
        const body = {
            ID: inputsRef?.id?.value,
            Judul: inputsRef?.judul?.value,
            Type: "Popup",
            Status: "Draft",
            DirectUrl: inputsRef?.linkTautan?.value,
        }
        if(type === "tambah"){
            body.newImage = popupPic?.preview
            dispatch(addPopUp(email, body, listPopUp, setListPopUp, setIsModalPopup))
        }else{
            if(popupPic?.preview.includes("https") || popupPic?.preview.includes("http")){
                body.oldImage = popupPic?.preview
            }else{
                body.newImage = popupPic?.preview
            }    
            dispatch(editPopup(email, body, listPopUp, setListPopUp, setIsModalPopup))
        }
    }

    const bannerSubmit = (type) => {
        const body = {
            ID: inputsBanner?.id?.value,
            Judul: inputsBanner?.judul?.value,
            Type: "Carousel",
            Status: "Draft",
            DirectUrl: inputsBanner?.linkTautan?.value,
        }
        if(type === "tambah"){
            body.newImage = bannerPic?.preview
            dispatch(addPopUp(email, body, listBanner, setListBanner, setIsModalBanner))
        }else{
            setInputsBanner({})
            setBannerPic({})
            if(bannerPic?.preview.includes("https") || bannerPic?.preview.includes("http")){
                body.oldImage = bannerPic?.preview
            }else{
                body.newImage = bannerPic?.preview
            }
            body.oldImage = bannerPic?.preview
            dispatch(editPopup(email, body, listBanner, setListBanner, setIsModalBanner))
        }
    }

    const publishPopup = (body) => {
        (body.Status === "Active" ? body.Status = "Draft" : body.Status = "Active")
        if(popupPic?.preview.includes("https") || popupPic?.preview.includes("http")){
            body.oldImage = popupPic?.preview
        }else{
            body.newImage = popupPic?.preview
        }
        dispatch(editPopup(email, body, listPopUp, setListPopUp))
    }

    const previewPopUp = () => {
        setPreviewModalPopUp(true)
    }

    const handleFileChange = (event) => {
      const file = event.target.files[0];
      if (file && file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
            setPopupPic({
                file: e.target.result,
                preview: e.target.result
            })
        };
        reader.readAsDataURL(file);
      }
    }

    const handleChangeBanner = (event) => {
      const file = event.target.files[0];
      if (file && file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
            setBannerPic({
                preview: e.target.result
            })
        };
        reader.readAsDataURL(file);
      }
    }

    const bannerOnClickEdit = (id) => {
        const filtered = listBanner?.[0]?.filter((item) => item.ID === id)
        setInputsBanner({
            id: {
                value: filtered?.[0]?.ID
            },
            linkTautan: {
                value: filtered?.[0]?.DirectUrl
            },
            judul: {
                value: filtered?.[0]?.Judul,
                isValid: (filtered?.[0]?.Judul !== "" || filtered?.[0]?.Judul !== null) ? true : false
            },
        })
        setBannerPic({
            preview: `${filtered?.[0]?.ImageUrl}?${Date.now()}`
        })
        setIsModalBanner(true)
        setEditMode(true)
    }

    const bannerOnClickDelete = (id) => {
        dispatch(deleteBanner(email, typeFile, id))
    }

    return (
        <>
            {saState.success === true && (
            <Snackbar message={saState.msgSuccess} otherProps={{
                    type: typeFile,
                    listBanner: listBanner,
                    setListData: (typeFile === "Popup" ? setListPopUp : setListBanner),
                    dispatch: dispatch
                }}/>
            )}
            {previewModalPopUp && (
                <PreviewPopUp 
                    previewModalPopUp={previewModalPopUp} 
                    closeModal={closeModal} 
                    srcBanner={listPopUp?.[0]?.ImageUrl}
                />
            )}
            {isModalBanner && (
                <AddBanner 
                    isModalBanner={isModalBanner}
                    closeModal={closeModal}
                    isEdit={editMode}
                    bannerPic={bannerPic}
                    handleFunction={{
                        handleChangeBanner,
                        bannerSubmit,
                        inputsBanner,
                        handleName,
                        handleLink
                    }}
                />
            )}
            {isModalPopUp && (
                <AddPopUpBanner 
                isModalPopUp={isModalPopUp} 
                closeModal={closeModal} 
                isEdit={editMode}
                popupPic={popupPic}
                data={listPopUp}
                handleFunction={{
                    handleFileChange,
                    popUpSubmit,
                    handleName,
                    handleLink,
                    inputsRef
                }} />
            )}
            <NavHeaderAdmin />
            <SideMenuAdmin title="Banner">
                <div className="pt-4">
                    <Tabs
                        activeTab={activeTab}
                        leftBtnIcon={<><AiFillLeftCircle /></>}
                        rightBtnIcon={<><AiFillRightCircle /></>}
                        tabsScrollAmount={1}
                        onTabClick={onTabClick}
                    >
                        <Tab className="dynamic-banner__nav-tabs">
                            Pop up Banner
                        </Tab>
                        <Tab className="dynamic-banner__nav-tabs">
                            Carrousel Banner
                        </Tab>
                    </Tabs>
                    <div id="content">
                        {activeTab === 0 ? <>
                            <div className="flex justify-between pb-4">
                                <p className="text-[#101828] text-[20px] font-bold">Pop up Banner</p>
                                {listPopUp?.length < 1 && listPopUp?.length !== 7 && (
                                    <button 
                                        className="flex flex-row items-center px-3 py-2 gap-2 rounded-md h-[48px] bg-[#1078CA]"
                                        onClick={() => {
                                            handleModal("popup")
                                            setEditMode(false)
                                        }}
                                    >
                                        <div className="mt-1"><FiPlus color="white"/></div>
                                        <p className="text-white font-bold text-[14px]">Tambah</p>
                                    </button>
                                ) }
                            </div>
                            {listPopUp?.length < 1 ? <EmptyState Header="Kamu Belum Upload Banner" Subheader="Pop up banner yang sudah kamu upload akan muncul di sini" />  : 
                            (
                                <DetailsCard>
                                    <div className="flex">
                                        <div className="grid grid-rows-3 grid-flow-col gap-4 w-full xxl:grid-cols-[11%,80%] xl:grid-cols-[17%,80%] small:grid-cols-[12%,80%] largePc:grid-cols-[12%,80%]">
                                            <div className="relative w-1/5 row-span-3 w-[146px] h-[168px] rounded-lg overflow-hidden">
                                                <img className="object-cover w-full h-full rounded-lg" src={listPopUp?.[0]?.file ? listPopUp?.[0]?.file : listPopUp?.[0]?.ImageUrl} alt="image banner"/>
                                                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity">
                                                    <button className="bg-white rounded-full p-[10px]" onClick={previewPopUp}>
                                                        <FiZoomIn />
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="col-span-2 flex justify-between">
                                                <div clasName="flex flex-col gap-2">
                                                    <p className="text-[#292929] text-[14px] font-semibold">Judul</p>
                                                    <p className="text-[#929393] text-[16px] font-normal">{listPopUp?.[0]?.Judul}</p>
                                                </div>
                                                <button className="flex flex-row gap-4">
                                                    <img src="/icons/small-icons/edit_pencil.svg" alt="edit button" />
                                                    <p className="text-[#1078CA] text-[16px] font-medium" 
                                                        onClick={() => { 
                                                            handleModal("popup") 
                                                            setEditMode(true) 
                                                        }}>Edit</p>
                                                </button>
                                            </div>
                                            <div className="row-span-2 col-span-2 flex flex-col gap-6">
                                                <div className="flex flex-col gap-2">
                                                    <p className="text-[#292929] text-[14px] font-semibold ">Link Tautan</p>
                                                    <p className="text-[#929393] text-[16px] font-normal" >{listPopUp?.[0]?.DirectUrl}</p>
                                                </div>
                                                <div className="flex flex-row justify-start gap-2">
                                                    <Toggle
                                                        title="popup"
                                                        action={() => publishPopup(listPopUp?.[0])}
                                                        checked={listPopUp?.[0]?.Status === "Active" ? true : false}
                                                    />
                                                    <p className="font-medium text-[16px]">Publish Sekarang</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </DetailsCard>
                            )}
                        </> : <>
                            <div className="flex justify-between pb-4">
                                <p className="text-[#101828] text-[20px] font-bold">Carrousel Banner</p>
                                <div className="flex flex-row w-[600px] gap-2">
                                    <div className="w-full h-[48px]">
                                        <TextboxLabel
                                            placeholder="Search nama banner"
                                            onChange={handleSearchChange}
                                            onKeyDown={handleKeyDown}
                                        />
                                    </div>
                                    <button 
                                        className="flex flex-row gap-2 items-center px-3 py-2 rounded-md h-[48px] bg-[#1078CA]"
                                        onClick={() => {
                                            handleModal("carousel")
                                            setEditMode(false)
                                        }}
                                    >
                                        <div className="mt-1"><FiPlus color="white"/></div>
                                        <p className="text-white font-bold text-[14px]">Tambah</p>
                                    </button>
                                </div>
                            </div>
                            {!listBanner ? <EmptyState Header="Kamu Belum Upload Banner" Subheader="Carrousel banner yang sudah kamu upload akan muncul di sini" /> : 
                            (
                                <div>
                                    <TableBanner 
                                        dataTemp={listBanner?.[0]}
                                        dispatch={dispatch}
                                        otherProps={{
                                            bannerOnClickDelete,
                                            bannerOnClickEdit
                                        }}
                                    />
                                </div>
                            )}
                        </>}
                    </div>
                </div>
            </SideMenuAdmin>
        </>
    )
}

function Toggle({ title, action, checked }) {
    return (
        <label for={title} className=" inline-flex relative items-center cursor-pointer">
            <input type="checkbox" value="" id={title} className="sr-only peer" checked={checked} onChange={action} />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
        </label>
    )
}

const AddPopUpBanner = ({
    isModalPopUp,
    closeModal,
    isEdit,
    popupPic,
    data,
    handleFunction
}) => {
    const [openPreview, setOpenPreview] = useState(false)

    return (
        <ModalReferral
            isModal={isModalPopUp}
            closeModal={closeModal}
            title={!isEdit ? "Tambah Pop up" : "Edit Pop up"}
        >
            <form onSubmit={(e) =>  e.preventDefault()}>
                <div className="flex flex-row gap-6 w-[660px] px-6 pt-6">
                    <div>
                        <div className="relative w-[146px] h-[168px] flex items-center justify-center">
                            {popupPic?.preview ? (
                                <div className="rounded-lg w-full h-full flex flex-col items-center justify-center text-center space-y-2">
                                    <input accept="image/*" id="file-upload" type="file" className="hidden" onChange={handleFunction.handleFileChange} />
                                    <label for="file-upload" className="cursor-pointer w-full h-full object-cover">
                                        <img className="mx-auto w-full h-full object-cover rounded-lg" src={popupPic?.preview} alt="img-icon" />
                                    </label>
                                </div>
                            ) : (
                                <div className="border border-dashed border-[#1078CA] rounded-lg w-full h-full flex flex-col items-center justify-center text-center space-y-2">
                                    <input accept="image/*" id="file-upload" type="file" className="hidden" onChange={handleFunction.handleFileChange} />
                                    <img className="mx-auto" src="/icons/small-icons/properti-secondary/Vector_uploadsecondary.svg" alt="img-icon" />
                                    <label for="file-upload" className="cursor-pointer">
                                        <div className="font-bold text-[12px] text-[#292929]">Upload foto di sini</div>
                                        <div className="font-medium text-[12px] text-[#777777]">Maksimal 1.5MB</div>
                                        <div className="font-medium text-[12px] text-[#777777]">Ukuran 700 x 800</div>
                                    </label>
                                </div>
                            )}
                            
                        </div>
                    </div>
                    <div className="flex flex-col gap-4 w-[80%]">
                        <div className="gap-2 w-full">
                            <p className="font-semibold text-[14px] text-[#292929]">Judul</p>
                            <TextboxLabel 
                                placeholder="Masukkan Judul"
                                value={handleFunction.inputsRef?.judul?.value}
                                onChange={handleFunction.handleName}
                                warnText={handleFunction.inputsRef?.judul?.msgError}
                                name="judul"
                            />
                        </div>
                        <div className="gap-2 w-full">
                            <p className="font-semibold text-[14px] text-[#292929]">Link Tautan</p>
                            <TextboxLabel 
                                placeholder="Masukkan Link Tautan"
                                value={handleFunction.inputsRef?.linkTautan?.value}
                                name="linkTautan"
                                onChange={handleFunction.handleLink}
                            />
                        </div>
                    </div>
                </div>
                <div className="w-[660px] py-6">
                    {!!popupPic?.preview && (
                        <>
                            {openPreview && (
                                <div className="w-full h-[800px] object-cover p-6">
                                    <img className="w-full h-full object-cover" src={popupPic?.preview} alt="img-icon" />
                                </div>
                            )}
                            <div className="flex justify-center">
                                <div className="flex flex-row gap-2 border-[#1078CA] border rounded-lg justify-center text-center px-[16px] py-[12px]">
                                    <button className="text-[#1078CA] text-[16px] font-bold" onClick={() => setOpenPreview(!openPreview)}>Preview</button>
                                    <img alt="chevron" src={openPreview ? '/icons/small-icons/detail-page/chevron_up_black.svg' : '/icons/small-icons/detail-page/chevron_down_black.svg'} />
                                </div>
                            </div>
                        </>
                    )}
                </div>
                <div className="flex justify-end shadow-lg px-[24px] pb-[24px] pt-[16px]">
                    <div className="px-[16px] py-[12px] bg-[#1078CA] rounded-lg justify-center text-center">
                        <Button btnTypes="submit" 
                            id="submitRef" 
                            name="submitRef" 
                            className="w-full"
                            acceptedFiles=""
                            disabled={!handleFunction.inputsRef?.judul?.isValid}
                            onClick={() => {
                                if (!isEdit) {
                                    handleFunction.popUpSubmit("tambah")
                                } else {
                                    handleFunction.popUpSubmit("edit")
                                }
                            }}>{isEdit ? "Simpan" : "Tambahkan"}
                        </Button>
                    </div>
                </div>
            </form>
        </ModalReferral>
    )
}

const AddBanner = ({
    isModalBanner,
    bannerPic,
    closeModal,
    isEdit,
    handleFunction
}) => {

    const [contentList, setContentList] = useState([{id: 1}])
    const addNewContent = () => {
        setContentList([...contentList, { id: contentList.length + 1 }]);
    }
    const [openPreview, setOpenPreview] = useState(false)
    // const Content = ({id}) => {
    //     return (
    //         <div key={id} className="flex flex-row gap-4 w-[660px] p-4">
    //             <>
    //                 <div className="relative w-[40%] h-[168px] flex items-center justify-center">
    //                     {bannerPic?.preview ? (
    //                         <div className="rounded-lg w-full h-full flex flex-col items-center justify-center text-center space-y-2">
    //                             <input accept="image/*" id="file-banner-upload" type="file" className="hidden" onChange={handleFunction.handleChangeBanner}  />
    //                             <label for="file-banner-upload" className="cursor-pointer w-full h-full object-cover">
    //                                 <img className="mx-auto w-full h-full object-cover rounded-lg" src={bannerPic?.preview} alt="img-icon" />
    //                             </label>
    //                         </div>
    //                     ) : (
    //                         <div className="flex flex-col w-full h-full items-center justify-center border border-[#1078CA] rounded-lg border-dashed ">
    //                             <input type="file" accept="image/*" id="file-banner-upload" className="hidden" onChange={handleFunction.handleChangeBanner}/>
    //                             <img className="mx-auto" src="/icons/small-icons/properti-secondary/Vector_uploadsecondary.svg" alt="img-icon" />
    //                             <label for="file-banner-upload" className="cursor-pointer">
    //                                 <div className="font-bold text-[12px] text-[#292929]">Upload foto di sini</div>
    //                                 <div className="font-medium text-[12px] text-[#777777]">Maksimal 1.5MB</div>
    //                                 <div className="font-medium text-[12px] text-[#777777]">Ukuran 700 x 800</div>
    //                             </label>
    //                         </div>
    //                     )}
    //                 </div>
    //             </>
    //             <div className="flex flex-col gap-6 w-[60%]">
    //                 <div className="gap-2 w-full">
    //                     <p className="font-semibold text-[14px] text-[#292929]">Judul</p>
    //                     <TextboxLabel 
    //                         placeholder="Masukkan Judul"
    //                         value={handleFunction?.inputsBanner?.judul?.value}
    //                         onChange={handleFunction.handleName}
    //                         name="judul"
    //                     />
    //                 </div>
    //                 <div className="gap-2 w-full">
    //                     <p className="font-semibold text-[14px] text-[#292929]">Link Tautan</p>
    //                     <TextboxLabel 
    //                         placeholder="Masukkan Link Tautan"
    //                         value={handleFunction?.inputsBanner?.linkTautan?.value}
    //                         onChange={handleFunction.handleLink}
    //                         name="linkTautan"
    //                     />
    //                 </div>
    //             </div>
    //         </div>
    //     )
    // }

    return (
        <>
            {isModalBanner && (
                <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-black bg-opacity-50">
                    <div className="relative w-auto my-auto mx-auto max-w-[1180px]">
                    <div className="w-full rounded-lg bg-white">
                        <div className="flex items-start justify-between px-5 py-3 border-b border-solid border-gray-300 rounded-t mobile:mt-[50%]">
                            <div className="place-self-center">
                                <Title
                                    className="fontsize__most_smallest fontcolor__blue fontweight__bold"
                                    text={!isEdit ? "Tambah Carrousel" : "Edit Carrousel"}
                                />
                            </div>
                            <button
                                className="bg-transparent border-0 text-black float-right place-self-center"
                                onClick={closeModal}
                            >
                                <img src="/icons/Close_Circle.svg" alt="Close Button" />
                            </button>
                        </div>
                        {/* content */}
                        <form onSubmit={(e) => e.preventDefault()}>
                            {/* {contentList.map(content => (
                                <Content key={content.id} id={content.id} />
                            ))} */}
                            <div className={`flex flex-row gap-4 ${openPreview ?  'w-[1164px]':'w-[660px]'} p-6`}>
                                <>
                                    <div className="relative w-[40%] h-[168px] flex items-center justify-center">
                                        {bannerPic?.preview ? (
                                            <div className="rounded-lg w-full h-full flex flex-col items-center justify-center text-center space-y-2">
                                                <input accept="image/*" id="file-banner-upload" type="file" className="hidden" onChange={handleFunction.handleChangeBanner}  />
                                                <label for="file-banner-upload" className="cursor-pointer w-full h-full object-cover">
                                                    <img className="mx-auto w-full h-full object-cover rounded-lg" src={bannerPic?.preview} alt="img-icon" />
                                                </label>
                                            </div>
                                        ) : (
                                            <div className="flex flex-col w-full h-full items-center justify-center border border-[#1078CA] rounded-lg border-dashed ">
                                                <input type="file" accept="image/*" id="file-banner-upload" className="hidden" onChange={handleFunction.handleChangeBanner}/>
                                                <img className="mx-auto" src="/icons/small-icons/properti-secondary/Vector_uploadsecondary.svg" alt="img-icon" />
                                                <label for="file-banner-upload" className="cursor-pointer">
                                                    <div className="font-bold text-[12px] text-[#292929]">Upload foto di sini</div>
                                                    <div className="font-medium text-[12px] text-[#777777]">Maksimal 1.5MB</div>
                                                    <div className="font-medium text-[12px] text-[#777777]">Ukuran 700 x 800</div>
                                                </label>
                                            </div>
                                        )}
                                    </div>
                                </>
                                <div className="flex flex-col gap-6 w-[60%]">
                                    <div className="gap-2 w-full">
                                        <p className="font-semibold text-[14px] text-[#292929]">Judul</p>
                                        <TextboxLabel 
                                            placeholder="Masukkan Judul"
                                            value={handleFunction?.inputsBanner?.judul?.value}
                                            onChange={handleFunction.handleName}
                                            name="judul"
                                            warnText={handleFunction?.inputsBanner?.judul?.msgError}
                                        />
                                    </div>
                                    <div className="gap-2 w-full">
                                        <p className="font-semibold text-[14px] text-[#292929]">Link Tautan</p>
                                        <TextboxLabel 
                                            placeholder="Masukkan Link Tautan"
                                            value={handleFunction?.inputsBanner?.linkTautan?.value}
                                            onChange={handleFunction.handleLink}
                                            name="linkTautan"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className={`${openPreview ?  'w-[1164px]':'w-[660px]'} p-6`} >
                                {!!bannerPic?.preview && (
                                    <>
                                        {openPreview && (
                                            <div className="w-[1116px] h-full object-cover p-6">
                                                <img className="w-full h-full object-cover" src={bannerPic?.preview} alt="img-icon" />
                                            </div>
                                        )}
                                        <div className="flex justify-center">
                                            <div className="flex flex-row gap-2 border-[#1078CA] border rounded-lg justify-center text-center px-[16px] py-[12px]">
                                                <button className="text-[#1078CA] text-[16px] font-bold" onClick={() => setOpenPreview(!openPreview)}>Preview</button>
                                                <img alt="chevron" src={openPreview ? '/icons/small-icons/detail-page/chevron_up_black.svg' : '/icons/small-icons/detail-page/chevron_down_black.svg'} />
                                            </div>
                                        </div>
                                    </>
                                )}
                            </div>
                            <div className="flex flex-row shadow-lg px-[24px] pb-[24px] pt-[16px] gap-3">
                                {/* <div className="w-full px-[16px] py-[12px] bg-white border border-[#1078CA] rounded-lg justify-center text-center">
                                    <button className="text-[#1078CA] text-[16px] font-bold" onClick={addNewContent} >Tambah Banner</button>
                                </div> */}
                                <div className="w-full px-[16px] py-[12px] bg-[#1078CA] rounded-lg justify-center text-center">
                                    <Button btnTypes="submit" 
                                        id="submitRef" 
                                        name="submitRef" 
                                        className="w-full"
                                        acceptedFiles=""
                                        disabled={!handleFunction?.inputsBanner?.judul?.isValid}
                                        onClick={() => {
                                            if (!isEdit) {
                                                handleFunction.bannerSubmit("tambah")
                                            } else {
                                                handleFunction.bannerSubmit("edit")
                                            }
                                        }}>{isEdit ? "Simpan" : "Tambahkan"}
                                    </Button>
                                </div>
                            </div>
                        </form>
                    </div> 
                    </div>
                </div>
            )}
        </>
    )
}

const PreviewPopUp = ({previewModalPopUp, closeModal, srcBanner}) => {
    return (
        <ModalReferral
            isModal={previewModalPopUp}
            closeModal={closeModal}
            title="Banner"
        >
            <div className="flex p-6 w-[672px] h-full">
                <div className="w-full h-full object-cover overflow-hidden">
                    <img className="w-full h-full object-cover" alt="banner" src={srcBanner}/>
                </div>
            </div>
        </ModalReferral>
    )
}

const Snackbar = ({ message, timeout = 5000, otherProps }) => {
    const [visible, setVisible] = useState(false)
    let showSnackbar = localStorage.getItem('snackBarSucces')

    useEffect(() => {
        otherProps.dispatch(listAllBanner(otherProps.type, otherProps.listBanner, otherProps.setListData))
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
      otherProps.dispatch(listAllBanner(otherProps.type, otherProps.listBanner, otherProps.setListData))
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

export default DynamicBanner