import React, { Fragment, useEffect, useRef, useState } from "react"
import { NavHeaderAdmin, SideMenuAdmin } from "../../../components/organisms"
import DatePicker from "react-date-picker"
import { Breadcrumb } from "flowbite-react"
import { useNavigate, useParams } from "react-router-dom"
import { Button, RadioButtonWithLabel, Textarea } from "../../../components/atoms"
import { TextboxLabel, Dropdown } from "../../../components/molecules"
import useInputHooks from "../../../hooks/useInputHooks"
import { RichTextEditor } from "../../../components/organisms"
import { useDispatch, useSelector } from "react-redux"
import { CreateArticle,  updateArticle, ListCategories, DetailArticle, DetailArticleAdmin } from "../../../store/actions/fetchData/article-fetch"
import { MdOutlineClear } from "react-icons/md"
import { upperFirst } from "lodash-contrib"
import ConfirmationV2 from "../../../components/organisms/Modal/modal-types/Confirmation/ComfirmationV2"
import { showSingleModal } from "../../../store/actions/changeState"

const AddArticle = ({
    email,
    isEdit
}) => {
    const state = useSelector((state) => state.stateReducer)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {slug} = useParams()
    const {
        inputs,
        setInputs,
        handleInputChange,
        handleDateInputChange
    } = useInputHooks()
    const [typeContent, setTypeContent] = useState("article")
    const [titleLength, setTitleLength] = useState({
        meta: 0,
        judul: 0
    })
    const [highlighted, setHighlighted] = useState(false)
    const [thumbnail, setThumbnail] = useState({
        preview: null,
        newImage: null,
        msgError: ""
    })
    const refThumbnailPic = useRef(null)
    const [listCategories, setListCategories] = useState([])

    useEffect(() => {
        setInputs({...inputs, typeContent: "article"})
        dispatch(ListCategories(listCategories, setListCategories))
    }, [])

    useEffect(() => {
        dispatch(DetailArticleAdmin(slug, setInputs, setTypeContent, setHighlighted, setThumbnail))
    }, [isEdit])

    const handleTypeContent = (type) => {
        setTypeContent(type)
        setInputs({...inputs, typeContent: type})
    }

    const handleHighlighted = () => {
        setInputs({...inputs, highlighted: !highlighted})
        setHighlighted(prev => !prev)
    }

    useEffect(() => {
        setTitleLength((prev) => ({
          ...prev,
          judul: inputs?.judul?.length ?? prev.judul,
          meta: inputs?.metaDescription?.length ?? prev.meta
        }))
    }, [inputs?.judul, inputs?.metaDescription])

    const [modalProps, setModalProps] = useState({
        title: "",
        description: "",
        confirmText: "",
        cancelText: ""
    })
    const handleSubmitModal = () => {
        if(isEdit){
            setModalProps({
                title: "Simpan Perubahan?",
                description: `Pastikan ${typeContent === "article" ? "Artikel" : "Video"} sudah benar dan sesuai. `,
                confirmText: "Ya, Simpan",
                cancelText: "Periksa Ulang"
            })
        }else{
            setModalProps({
                title: `Tambahkan ${typeContent === "article" ? "Artikel" : "Video"} Ini?`,
                description: `Pastikan detail ${typeContent === "article" ? "Artikel" : "Video"} sudah benar dan sesuai.`,
                confirmText: "Ya, Tambahkan",
                cancelText: "Periksa Ulang"
            })
        }
        dispatch(showSingleModal(!state.showSingleModal))
    }

    const handleSubmit = () => {
        if(isEdit){
            dispatch(updateArticle(inputs, slug, navigate))
        }else{
            dispatch(CreateArticle(inputs, navigate))
        }
        dispatch(showSingleModal(!state.showSingleModal))
    }

    const handleURLSlug = (event) => {
        event.persist()
        if(event.target.value == ""){
            setInputs({
                ...inputs,
                [event.target.name]: {
                    isValid: false,
                    value: event.target.value.replace(/\s/, ""),
                    msgError: "Format URL Slug tidak sesuai"
                }
            })
        }else{
            setInputs({
                ...inputs,
                [event.target.name]: {
                    isValid: !!event.target.value.replace(/\s/, ""),
                    value: event.target.value.replace(/\s/, ""),
                    msgError: ""
                }
            })
        }
      };

    const inputValidation = [
        titleLength.judul >= 5 && titleLength.judul <= 70 ? true : false,
        inputs?.urlSlug?.isValid,
        thumbnail?.msgError !== "Ukuran foto lebih dari 1.5 MB" ? true : false
    ]

    return (
        <>
            {state.showSingleModal === true && (
                <ConfirmationV2 
                    title={modalProps.title}
                    description={modalProps.description}
                    closeModal={() => dispatch(showSingleModal(!state.showSingleModal))}
                    onClicConfirmation={handleSubmit}
                    confirmText={modalProps.confirmText}
                    cancelText={modalProps.cancelText}
                />
            )}
            <NavHeaderAdmin />
            <SideMenuAdmin bottomBtn={
                { 
                    onClick: handleSubmitModal, 
                    title: isEdit ? "Simpan" : "Tambahkan",
                    disable: inputValidation.filter(Boolean).length !== 3,
                    buttonColor: inputValidation.filter(Boolean).length !== 3 ? "disabled" : null,
                    textColor: inputValidation.filter(Boolean).length !== 3 ? "disabled" : null,
                }
            }>
                <div className="flex flex-col gap-6">
                    <div id="breadcrumb">
                        <Breadcrumb>
                            <span className="font-semibold text-sm text-[#1078CA] cursor-pointer" onClick={() => navigate("/admin/homespot-update")}>Homespot Update</span>
                            <Breadcrumb.Item>
                                <p className="font-medium text-sm text-[#777777]">{isEdit ? "Ubah" : "Tambah"} Artikel atau Video</p>
                            </Breadcrumb.Item>
                        </Breadcrumb>
                    </div>
                    <div className="flex flex-col gap-4" id="content">
                        <div className="flex flex-col gap-2">
                            <p className="font-semibold text-xs text-[#292929]">Pilih salah satu<span className="text-[#E84040]">*</span></p>
                            <div className="flex flex-row gap-6">
                                <RadioButtonWithLabel
                                    text="Artikel"
                                    name="article"
                                    checkColor="blueFigma"
                                    onChange={(e) => handleTypeContent(e.target.name)}
                                    checked={typeContent === "article"}
                                />
                                <RadioButtonWithLabel
                                    text="Video"
                                    name="video"
                                    checkColor="blueFigma"
                                    onChange={(e) => handleTypeContent(e.target.name)}
                                    checked={typeContent === "video"}
                                />
                            </div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <p className="font-semibold text-xs text-[#292929]">Judul {upperFirst(typeContent === "article" ? "Artikel" : typeContent)}<span className="text-[#E84040]">*</span></p>
                            <div className="flex flex-col gap-[6px]">
                                <TextboxLabel 
                                    name="judul"
                                    value={inputs?.judul}
                                    onChange={handleInputChange}
                                    invalid={titleLength?.judul > 70 || titleLength?.judul < 5}
                                    placeholder={`Masukkan Judul ${upperFirst(typeContent === "article" ? "Artikel" : typeContent)}`}
                                />
                                <div className={`flex justify-between font-medium text-xs ${titleLength?.judul > 70 || titleLength?.judul < 5 ? "text-[#E84040]" : "text-[#777777]"} `}>
                                    <p>Min. 5, max. 70 karakter</p>
                                    <p>{titleLength?.judul} / 70</p>
                                </div>
                            </div>
                        </div>
                        <div className="grid grid-flow-row grid-cols-3 gap-3">
                            <div className="flex flex-col gap-2">
                                <p className="font-semibold text-xs text-[#292929]">Kategori<span className="text-[#E84040]">*</span></p>
                                <Dropdown 
                                    placeholder="Pilih Kategori"
                                    value={{name: inputs?.kategori?.name}}
                                    data={listCategories}
                                    onChange={(val) =>  {
                                        setInputs({...inputs, kategori:{ id: val?.id, name: val?.name }})
                                    } }
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <p className="font-semibold text-xs text-[#292929]">Nama Penulis<span className="text-[#E84040]">*</span></p>
                                <TextboxLabel 
                                    name="namaPenulis"
                                    value={inputs?.namaPenulis}
                                    onChange={handleInputChange}
                                    placeholder="Masukkan Nama Penulis"
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <p className="font-semibold text-xs text-[#292929]">Tanggal Terbit<span className="text-[#E84040]">*</span></p>
                                <DatePicker
                                    name="tanggalTerbit"
                                    onChange={(e) => {
                                        handleDateInputChange(e, "tanggalTerbit");
                                    }}
                                    value={inputs?.tanggalTerbit ? new Date(inputs?.tanggalTerbit) : null}
                                    onChangeRaw={(e) => e.preventDefault()}
                                    minDate={new Date()}
                                    format="dd-MM-yyyy"
                                    locale="id-ID"
                                    calendarIcon={<img
                                        className="dropdown__arrowDown"
                                        src="/icons/small-icons/arrow-down.svg"
                                        alt="dropdown"
                                      />}
                                    clearIcon={<MdOutlineClear/>}
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <p className="font-semibold text-xs text-[#292929]">Meta Keyword<span className="text-[#E84040]">*</span></p>
                                <TextboxLabel 
                                    name="metaKeyword"
                                    value={inputs?.metaKeyword}
                                    onChange={handleInputChange}
                                    placeholder="Masukkan Meta Keyword"
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <p className="font-semibold text-xs text-[#292929]">Cannonical<span className="text-[#E84040]">*</span></p>
                                <TextboxLabel 
                                    name="cannonical"
                                    value={inputs?.cannonical}
                                    onChange={handleInputChange}
                                    placeholder="Masukkan Cannonical"
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <p className="font-semibold text-xs text-[#292929]">URL Slug<span className="text-[#E84040]">*</span></p>
                                <TextboxLabel 
                                    name="urlSlug"
                                    value={inputs?.urlSlug?.value}
                                    onChange={handleURLSlug}
                                    placeholder="Masukkan URL Slug"
                                    invalid={!inputs?.urlSlug?.isValid}
                                    warnText={inputs?.urlSlug?.msgError}
                                />
                            </div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <p className="font-semibold text-xs text-[#292929]">Meta Description<span className="text-[#E84040]">*</span></p>
                            <div className="flex flex-col gap-[6px]">
                                <Textarea 
                                    placeholder="Masukan Meta Description"
                                    name="metaDescription"
                                    onChange={handleInputChange}
                                    value={inputs?.metaDescription}
                                    invalid={titleLength?.meta > 160}
                                />
                                <div className={`flex justify-between font-medium text-xs ${titleLength?.meta > 160 ? "text-[#E84040]" : "text-[#777777]"} `}>
                                    <p>Max. 160 karakter</p>
                                    <p>{titleLength?.meta} / 160</p>
                                </div>
                            </div>
                        </div>
                        <div id="isiArtikel" className="flex flex-col gap-2">
                            <p className="font-semibold text-xs text-[#292929]">Isi Artikel<span className="text-[#E84040]">*</span></p>
                            <RichTextEditor 
                                inputs={inputs}
                                initialData={inputs?.articleContent}
                                setInputs={setInputs} />
                        </div>
                        {typeContent === "video" ? <>
                            <div className="flex flex-col gap-2">
                                <p className="font-semibold text-xs text-[#292929]">URL Video<span className="text-[#E84040]">*</span></p>
                                <TextboxLabel 
                                    name="urlVideo"
                                    value={inputs?.urlVideo}
                                    placeholder="Masukkan URL Video"
                                    onChange={handleInputChange}
                                />
                            </div>
                        </> : <></>}
                        <div className="flex flex-col gap-2">
                            <p className="font-semibold text-xs text-[#292929]">Gambar Thumbnail<span className="text-[#E84040]">*</span></p>
                            {typeContent === "article" ? <>
                                <div className="flex flex-row justify-start gap-2">
                                    <Toggle title="highlited" action={handleHighlighted} checked={highlighted}/>
                                    <p className="font-medium text-md text-[#000000]">Tandai sebagai konten highlight</p>
                                </div>
                            </> : <></>}
                            <div className="relative flex items-center justify-start">
                                {thumbnail?.preview ? (
                                    <div className="rounded-lg w-[340px] h-full flex flex-col items-center justify-center text-center space-y-2 py-3">
                                        <input accept="image/*" id="file-banner-upload" type="file" className="hidden" />
                                        <label for="file-banner-upload" className="cursor-pointer w-full h-full object-cover">
                                            <img className="mx-auto w-full h-full object-cover rounded-lg" src={thumbnail?.preview} alt="img-icon" />
                                        </label>
                                    </div>
                                ) : (
                                    <div className={`flex flex-col w-[340px] h-[190px] items-center justify-center border ${thumbnail?.msgError !== "" ? "border-[#E84040]" : "border-[#1078CA]"}  rounded-lg border-dashed  py-3`}>
                                        <img className="mx-auto objec-cover" src="/images/default_img.png" alt="img-icon" />
                                    </div>
                                )}
                            </div>
                            <Button
                                btnTypes="upload"
                                buttonColor="blueFigmaBorderOnly"
                                textColor="bluefigma"
                                className="profile-page__button cursor-pointer w-[340px]"
                                referenceUpload={refThumbnailPic}
                                nameUpload="thumbnail"
                                acceptedFiles=".jpg,.png,.jpeg"
                                onChangeUpload={(e) => {
                                    const fileName = e.target.files[0].name.toString();
                                    const extFile = fileName.substr(fileName.lastIndexOf(".") + 1, fileName.length).toLowerCase()
                                    const filterExtArray = [extFile !== "jpg", extFile !== "jpeg", extFile !== "png"]
                                    if (filterExtArray.indexOf(false) === -1) {
                                        dispatch(setThumbnail({ msgError: `Format file *.${extFile} tidak didukung`}))
                                    } else {
                                    Array.from(e.target.files).forEach((file) => {
                                            if(file.size > 1500000){
                                                setThumbnail({msgError: "Ukuran foto lebih dari 1.5 MB"})
                                            } else {
                                                const reader = new FileReader()
                                                reader.onload = (event) => {
                                                    const base64String = event.target.result
                                                    dispatch(
                                                        setThumbnail({ preview: base64String, newImage: base64String, msgError: "" }),
                                                        setInputs({...inputs, thumbnail: base64String})
                                                    )
                                                }
                                                reader.readAsDataURL(file)
                                            }
                                        })
                                    }
                                }}
                            >
                                Upload Foto
                            </Button>
                            <div>
                                <p className={`font-medium text-xs ${thumbnail?.msgError !== "" ? "text-[#E84040]" : "text-[#777777]"}`}>
                                    {thumbnail?.msgError !== "" ? "Ukuran file melebihi 1.5 MB" : "Rasio foto 16:9, maksimal 1.5 MB"}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </SideMenuAdmin>
        </>
    )
}


function Toggle({ title, action, checked }) {
    return (
        <label for={title} class="inline-flex relative items-center cursor-pointer">
            <input type="checkbox" value="" id={title} class="sr-only peer" checked={checked} onChange={action} />
            <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
        </label>
    )
}

export default AddArticle