import React from "react"
import moment from "moment"
import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import 'moment/locale/id'
import { UploadPropertiSecondary, NavHeader } from "../../../components/organisms"
import { Button } from "../../../components/atoms"
import { projectDetail } from "../../../store/actions/fetchData/detail-properti-secondary"
import { inquiryUserSellProp } from "../../../store/actions/fetchData/sellPropState"
import useFormStepperHooksV2 from "../../../hooks/v2/useFormStepperHooks"
import useSellPropsHooksV2 from "../../../hooks/v2/useSellPropsHooksV2"
import {
    ModalDetail
} from './components'

const CurrencyFormatter = ({value}) => {
    try {
      const formatter = new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'idr',
      });
      const formattedValue = formatter.format(value);
  
      return <span>{formattedValue.replace(/\,00$/, '')}</span>;
    } catch (error) {
      console.error('Error formatting currency:', error.message);
      return <span>Error</span>
    }
}

const dataAddress = []
const files = []
const inputs = []

const Ringkasan = ({
    userStatus,
    isViewMode,
    email
}) => {
    const { id } = useParams()
    const dispatch = useDispatch()
    const uploadProjectState = useSelector((state) => state.uploadProjectReducer)
    const [isModal, setIsModal] = useState(false)
    const { 
        files, 
        setFiles, 
        setImgFiles,
        dropdownVal, 
        setDropdownVal } = useSellPropsHooksV2()
    const { 
        inputs, 
        setInputs, 
        handleInputChange, 
        handleCheckboxChange, 
        handleRadioDropChange, 
        handleLetterNumberInput,
        handleAllCharInput, 
        handleAltInput, 
        handleRangePrice,
        initiateStateV2, 
        initiateState,
        handleDateInput,
        handleDateInputChange,
        handleCurrency,
        handleNumberInput,
        handleAreaCode } = useFormStepperHooksV2()

    const [dataAddress, setDataAddress] = useState({
        address: "",
        rt: "",
        rw: "",
        posCode: "",
        province: "",
        subDistrict: "",
        district: "",
        urbanVillage: "",
        lng: "",
        lat: ""
    })
    const [loadingFile, setLoadingFile] = useState(false)
    const [isView, setIsView] = useState(false)

    useEffect(() => {
        dispatch(inquiryUserSellProp(email))
        dispatch(projectDetail(
            {
              email: email,
              setInputs: setInputs,
              projectId: id,
              setDataWithVal: initiateStateV2, 
              setData: initiateState, 
              setImgFiles: setImgFiles, 
              setDataAddress: setDataAddress, 
              setLoadingFile: setLoadingFile,
              dropdownVal: dropdownVal,
              setDropdownVal: setDropdownVal,
            }
            )
        )
        setIsView(isViewMode)
    },[])

    const handleModal = (event) => {
        setIsModal(true)
    }

    const closeModal = (event) => {
       setIsModal(!isModal)
    }

    console.table(inputs)

    return(
        <>
        <NavHeader />
        <Breadcrumbs />
        <div className="properti-secondary__edit-properti__wrapper">
            <p className="properti-secondary__title pb-4">Detail Properti Secondary</p>
            <div>
                <div className="flex justify-between">
                    <p className="properti-secondary__title_2">Detail Properti</p>
                    { !isView && <>
                        <div className="properti-secondary__edit-properti__button-wrap">
                            <img src="/icons/small-icons/properti-secondary/Vector_buttonPen.svg" alt="image"/>
                            <button 
                                className="properti-secondary__edit-properti__button"
                                onClick={() => {
                                    handleModal()
                                }}
                            >Ubah Data</button>
                        </div>
                    </>}
                </div>
                <div className="grid grid-cols-2 gap-4 mt-4 pb-4">
                    <div className="flex flex-col pb-2">
                        <p className="properti-secondary__title_content">Tipe Properti</p>
                        <p className="properti-secondary__content">{ inputs?.tipeProperti?.value.replace(/\b\w/g, (char) => char.toUpperCase()) }</p>
                    </div>
                    <div className="flex flex-col pb-2">
                        <p className="properti-secondary__title_content">Nama Properti</p>
                        <p className="properti-secondary__content">{inputs?.namaProyek?.value}</p>
                    </div>
                    <div className="flex flex-col pb-2">
                        <p className="properti-secondary__title_content">Harga Awal</p>
                        <p className="properti-secondary__content">{ <CurrencyFormatter value={inputs?.hargaProperti?.value}/> }</p>
                    </div>
                    <div className="flex flex-col pb-2">
                        <p className="properti-secondary__title_content">Harga Akhir</p>
                        <p className="properti-secondary__content">{(inputs?.hargaAkhir?.value) ?  <CurrencyFormatter value={inputs?.hargaAkhir?.value} />: "-" }</p>
                    </div>
                    <div className="flex flex-col pb-2">
                        <p className="properti-secondary__title_content">Diskon</p>
                        <p className="properti-secondary__content">{
                            (inputs?.statusDiscount?.isValid) ? (inputs?.statusDiscount?.value === "persentase") 
                            ? inputs?.percentageValue?.value + "%"
                            : (inputs?.statusDiscount?.value === "" )
                            ? "-"
                            : <CurrencyFormatter value={inputs?.nominalValue?.value}/>
                            : "-"}</p>
                    </div>
                    <div className="flex flex-col pb-2">
                        <p className="properti-secondary__title_content">Nama PIC</p>
                        <p className="properti-secondary__content">{inputs?.namaPIC?.value}</p>
                    </div>
                    <div className="flex flex-col pb-2">
                        <p className="properti-secondary__title_content">Tanggal Akhir Diskon</p>
                        <p className="properti-secondary__content">{
                            inputs?.endDateDiscount?.value
                            ? moment(inputs?.endDateDiscount?.value).locale('id').format("DD MMMM YYYY")
                            : "-"
                        }</p>
                    </div>
                    <div className="flex flex-col pb-2">
                        <p className="properti-secondary__title_content">No. Handphone PIC</p>
                        <p className="properti-secondary__content">{inputs?.noHpPic?.value}</p>
                    </div>
                </div>
                <hr className="pb-2"/>
                <div className="flex justify-between">
                    <p className="properti-secondary__title_2">Alamat</p>
                    { !isView && <>
                        <div className="properti-secondary__edit-properti__button-wrap">
                            <img src="/icons/small-icons/properti-secondary/Vector_buttonPen.svg" alt="image"/>
                            <button className="properti-secondary__edit-properti__button">Ubah Data</button>
                        </div>
                    </>}
                </div>
                <div className="grid grid-cols-2 gap-4 mt-4 pb-4">
                    <div className="flex flex-col pb-2">
                        <p className="properti-secondary__title_content">Provinsi</p>
                        <p className="properti-secondary__content">{dataAddress?.province}</p>
                    </div>
                    <div className="flex flex-col pb-2">
                        <p className="properti-secondary__title_content">Kabupaten/Kota</p>
                        <p className="properti-secondary__content">{dataAddress?.district}</p>
                    </div>
                    <div className="flex flex-col pb-2">
                        <p className="properti-secondary__title_content">Kecamatan</p>
                        <p className="properti-secondary__content">{dataAddress?.subDistrict}</p>
                    </div>
                    <div className="flex flex-col pb-2">
                        <p className="properti-secondary__title_content">Kelurahan</p>
                        <p className="properti-secondary__content">{dataAddress?.urbanVillage}</p>
                    </div>
                    <div className="flex flex-col pb-2">
                        <p className="properti-secondary__title_content">RT</p>
                        <p className="properti-secondary__content">{dataAddress?.rw}</p>
                    </div>
                    <div className="flex flex-col pb-2">
                        <p className="properti-secondary__title_content">RW</p>
                        <p className="properti-secondary__content">{dataAddress?.rw}</p>
                    </div>
                    <div className="flex flex-col pb-2">
                        <p className="properti-secondary__title_content">Kode Pos</p>
                        <p className="properti-secondary__content">{dataAddress?.posCode}</p>
                    </div>
                    <div className="flex flex-col pb-2">
                        <p className="properti-secondary__title_content">Koordinat</p>
                        <p className="properti-secondary__content">{inputs?.longLat}</p>
                    </div>
                    <div className="flex flex-col pb-2">
                        <p className="properti-secondary__title_content">alamat Lengkap</p>
                        <p className="properti-secondary__content">{inputs?.alamatLengkap?.isValid ? inputs?.alamatLengkap.value : "-"}</p>
                    </div>
                </div>
                <hr className="pb-2"/>
                <div className="flex justify-between">
                    <p className="properti-secondary__title_2">Deskripsi</p>
                    { !isView && <>
                        <div className="properti-secondary__edit-properti__button-wrap">
                            <img src="/icons/small-icons/properti-secondary/Vector_buttonPen.svg" alt="image"/>
                            <button className="properti-secondary__edit-properti__button">Ubah Data</button>
                        </div>
                    </>}
                </div>
                <div className="flex flex-col pb-2">
                    <p className="properti-secondary__title_content">Deskripsi</p>
                    <p className="properti-secondary__content">{inputs?.deskripsi?.value}</p>
                </div>
                <hr className="pb-2"/>
                <p className="properti-secondary__title_2">Informasi Properti</p>
                <div className="grid grid-cols-2 gap-4 mt-4 pb-4">
                    <div className="flex flex-col pb-2">
                        <p className="properti-secondary__title_content">Luas Tanah</p>
                        <p className="properti-secondary__content">{inputs?.lt?.value} m2</p>
                    </div>
                    <div className="flex flex-col pb-2">
                        <p className="properti-secondary__title_content">Luas Bangunan</p>
                        <p className="properti-secondary__content">{inputs?.lb?.value} m2</p>
                    </div>
                    <div className="flex flex-col pb-2">
                        <p className="properti-secondary__title_content">Kamar Tidur</p>
                        <p className="properti-secondary__content">{inputs?.jmlKmrTidur?.value}</p>
                    </div>
                    <div className="flex flex-col pb-2">
                        <p className="properti-secondary__title_content">Kamar Mandi</p>
                        <p className="properti-secondary__content">{inputs?.jmlKmrMandi?.value}</p>
                    </div>
                    <div className="flex flex-col pb-2">
                        <p className="properti-secondary__title_content">Jumlah Lantai</p>
                        <p className="properti-secondary__content">{inputs?.jmlLantai?.value}</p>
                    </div>
                    <div className="flex flex-col pb-2">
                        <p className="properti-secondary__title_content">Kamar Pembantu</p>
                        <p className="properti-secondary__content">{inputs?.kamarPembantu?.value}</p>
                    </div>
                    <div className="flex flex-col pb-2">
                        <p className="properti-secondary__title_content">Garasi</p>
                        <p className="properti-secondary__content">{inputs?.garasi?.isValid ? inputs?.garasi?.value : "0"}</p>
                    </div>
                    <div className="flex flex-col pb-2">
                        <p className="properti-secondary__title_content">Hadap</p>
                        <p className="properti-secondary__content">{inputs?.hadapRumah?.value}</p>
                    </div>
                    <div className="flex flex-col pb-2">
                        <p className="properti-secondary__title_content">Tahun Bangunan</p>
                        <p className="properti-secondary__content">{inputs?.tahunBangun_value?.value}</p>
                    </div>
                    <div className="flex flex-col pb-2">
                        <p className="properti-secondary__title_content">Daya Listrik</p>
                        <p className="properti-secondary__content">{inputs?.dayaListrik?.value}</p>
                    </div>
                    <div className="flex flex-col pb-2">
                        <p className="properti-secondary__title_content">Sertifikat</p>
                        <p className="properti-secondary__content">{inputs?.sertifikat?.value ? inputs?.sertifikat?.value.toUpperCase() : "-"}</p>
                    </div>
                </div>
                <hr className="pb-2"/>
                <div className="flex justify-between">
                    <p className="properti-secondary__title_2">Kelengkapan Rumah</p>
                    { !isView && <>
                        <div className="properti-secondary__edit-properti__button-wrap">
                            <img src="/icons/small-icons/properti-secondary/Vector_buttonPen.svg" alt="image"/>
                            <button className="properti-secondary__edit-properti__button">Ubah Data</button>
                        </div>
                    </>}
                </div>
                <div className="grid grid-cols-2 gap-4 mt-4 pb-4">
                    <div className="flex flex-col pb-2">
                        <p className="properti-secondary__title_content">Dapur</p>
                        <p className="properti-secondary__content">{inputs?.dapur ? "Ya" : "Tidak"}</p>
                    </div>
                    <div className="flex flex-col pb-2">
                        <p className="properti-secondary__title_content">Ruang Keluarga</p>
                        <p className="properti-secondary__content">{inputs?.ruangKeluarga ? "Ya" : "Tidak"}</p>
                    </div>
                    <div className="flex flex-col pb-2">
                        <p className="properti-secondary__title_content">Ruang Kerja</p>
                        <p className="properti-secondary__content">{inputs?.ruangKerja ? "Ya" : "Tidak"}</p>
                    </div>
                    <div className="flex flex-col pb-2">
                        <p className="properti-secondary__title_content">Jalur Listrik</p>
                        <p className="properti-secondary__content">{inputs?.jalurListrik ? "Ya" : "Tidak"}</p>
                    </div>
                    <div className="flex flex-col pb-2">
                        <p className="properti-secondary__title_content">Jalur Telepon</p>
                        <p className="properti-secondary__content">{inputs?.jalurTelepon ? "Ya" : "Tidak"}</p>
                    </div>
                    <div className="flex flex-col pb-2">
                        <p className="properti-secondary__title_content">Jalur PDAM</p>
                        <p className="properti-secondary__content">{inputs?.jalurPDAM ? "Ya" : "Tidak"}</p>
                    </div>
                </div>
                <hr className="pb-2"/>
                <div className="flex justify-between">
                    <p className="properti-secondary__title_2">Akses</p>
                    { !isView && <>
                        <div className="properti-secondary__edit-properti__button-wrap">
                            <img src="/icons/small-icons/properti-secondary/Vector_buttonPen.svg" alt="image"/>
                            <button className="properti-secondary__edit-properti__button">Ubah Data</button>
                        </div>
                    </>}
                </div>
                <div className="grid grid-cols-2 gap-4 mt-4 pb-4">
                    <div className="flex flex-col pb-2">
                        <p className="properti-secondary__title_content">Rumah Sakit</p>
                        <p className="properti-secondary__content">{inputs?.rumahSakit ? "Ya" : "Tidak"}</p>
                    </div>
                    <div className="flex flex-col pb-2">
                        <p className="properti-secondary__title_content">Mall</p>
                        <p className="properti-secondary__content">{inputs?.mall ? "Ya" : "Tidak"}</p>
                    </div>
                    <div className="flex flex-col pb-2">
                        <p className="properti-secondary__title_content">Pasar</p>
                        <p className="properti-secondary__content">{inputs?.pasar ? "Ya" : "Tidak"}</p>
                    </div>
                    <div className="flex flex-col pb-2">
                        <p className="properti-secondary__title_content">Restoran</p>
                        <p className="properti-secondary__content">{inputs?.restoran ? "Ya" : "Tidak"}</p>
                    </div>
                    <div className="flex flex-col pb-2">
                        <p className="properti-secondary__title_content">Halte</p>
                        <p className="properti-secondary__content">{inputs?.halte ? "Ya" : "Tidak"}</p>
                    </div>
                    <div className="flex flex-col pb-2">
                        <p className="properti-secondary__title_content">Gym</p>
                        <p className="properti-secondary__content">{inputs?.gym ? "Ya" : "Tidak"}</p>
                    </div>
                    <div className="flex flex-col pb-2">
                        <p className="properti-secondary__title_content">Jalan Tol</p>
                        <p className="properti-secondary__content">{inputs?.jalanTol ? "Ya" : "Tidak"}</p>
                    </div>
                    <div className="flex flex-col pb-2">
                        <p className="properti-secondary__title_content">Bank/ATM</p>
                        <p className="properti-secondary__content">{inputs?.bankAtm ? "Ya" : "Tidak"}</p>
                    </div>
                    <div className="flex flex-col pb-2">
                        <p className="properti-secondary__title_content">Farmasi</p>
                        <p className="properti-secondary__content">{inputs?.farmasi ? "Ya" : "Tidak"}</p>
                    </div>
                    <div className="flex flex-col pb-2">
                        <p className="properti-secondary__title_content">Bioskop</p>
                        <p className="properti-secondary__content">{inputs?.bioskop ? "Ya" : "Tidak"}</p>
                    </div>
                    <div className="flex flex-col pb-2">
                        <p className="properti-secondary__title_content">Stasiun</p>
                        <p className="properti-secondary__content">{inputs?.stasiun ? "Ya" : "Tidak"}</p>
                    </div>
                    <div className="flex flex-col pb-2">
                        <p className="properti-secondary__title_content">SPBU</p>
                        <p className="properti-secondary__content">{inputs?.spbu ? "Ya" : "Tidak"}</p>
                    </div>
                    <div className="flex flex-col pb-2">
                        <p className="properti-secondary__title_content">Sekolah</p>
                        <p className="properti-secondary__content">{inputs?.sekolah ? "Ya" : "Tidak"}</p>
                    </div>
                    <div className="flex flex-col pb-2">
                        <p className="properti-secondary__title_content">Taman</p>
                        <p className="properti-secondary__content">{inputs?.taman ? "Ya" : "Tidak"}</p>
                    </div>
                    <div className="flex flex-col pb-2">
                        <p className="properti-secondary__title_content">Rumah Ibadah</p>
                        <p className="properti-secondary__content">{inputs?.rumahIbadah ? "Ya" : "Tidak"}</p>
                    </div>
                    <div className="flex flex-col pb-2">
                        <p className="properti-secondary__title_content">Bandara</p>
                        <p className="properti-secondary__content">{inputs?.bandara ? "Ya" : "Tidak"}</p>
                    </div>
                </div>
                <hr className="pb-2"/>
                <div className="flex justify-between">
                    <p className="properti-secondary__title_2">Fasilitas</p>
                    { !isView && <>
                        <div className="properti-secondary__edit-properti__button-wrap">
                            <img src="/icons/small-icons/properti-secondary/Vector_buttonPen.svg" alt="image"/>
                            <button className="properti-secondary__edit-properti__button">Ubah Data</button>
                        </div>
                    </>}
                </div>
                <div className="grid grid-cols-2 gap-4 mt-4 pb-4">
                    <div className="flex flex-col pb-2">
                        <p className="properti-secondary__title_content">Furnished</p>
                        <p className="properti-secondary__content">{inputs?.furnished ? "Ya" : "Tidak"}</p>
                    </div>
                    <div className="flex flex-col pb-2">
                        <p className="properti-secondary__title_content">Kolam Renang</p>
                        <p className="properti-secondary__content">{inputs?.kolamRenang ? "Ya" : "Tidak"}</p>
                    </div>
                    <div className="flex flex-col pb-2">
                        <p className="properti-secondary__title_content">Lift</p>
                        <p className="properti-secondary__content">{inputs?.lift ? "Ya" : "Tidak"}</p>
                    </div>
                    <div className="flex flex-col pb-2">
                        <p className="properti-secondary__title_content">Penghijauan</p>
                        <p className="properti-secondary__content">{inputs?.penghijauan ? "Ya" : "Tidak"}</p>
                    </div>
                    <div className="flex flex-col pb-2">
                        <p className="properti-secondary__title_content">Club House</p>
                        <p className="properti-secondary__content">{inputs?.clubHouse ? "Ya" : "Tidak"}</p>
                    </div>
                    <div className="flex flex-col pb-2">
                        <p className="properti-secondary__title_content">Keamanan</p>
                        <p className="properti-secondary__content">{inputs?.keamanan ? "Ya" : "Tidak"}</p>
                    </div>
                    <div className="flex flex-col pb-2">
                        <p className="properti-secondary__title_content">Garasi</p>
                        <p className="properti-secondary__content">{inputs?.garasi?.isValid ? "Ya" : "Tidak"}</p>
                    </div>
                    <div className="flex flex-col pb-2">
                        <p className="properti-secondary__title_content">Sambungan Telepon</p>
                        <p className="properti-secondary__content">{inputs?.jalurTelepon ? "Ya" : "Tidak"}</p>
                    </div>
                </div>
                <hr className="pb-2"/>
                <div className="flex justify-between">
                    <p className="properti-secondary__title_2">Foto Properti</p>
                    { !isView && <>
                        <div className="properti-secondary__edit-properti__button-wrap">
                            <img src="/icons/small-icons/properti-secondary/Vector_buttonPen.svg" alt="image"/>
                            <button className="properti-secondary__edit-properti__button">Ubah Data</button>
                        </div>
                    </>}
                </div>
                {/* <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 gap-y-[14px] mt-4"> */}
                <div className={ 
                    isView ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 gap-y-[14px] mt-4 pb-32"
                    : "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 gap-y-[14px] mt-4"
                }>
                    { files.length > 0 &&
                        files.map((item, index) => {
                            return (
                                <div key={index}>
                                    <img src={item.preview} alt={`Image ${index + 1}`} className="w-full rounded-lg h-auto" />
                                </div>
                            )
                        })
                    }
                    {
                        files.length == 0 &&
                        <div>
                            <img src="#" alt="image properti" className="w-full rounded-lg h-auto" />
                        </div>
                    }
                </div>
            </div>
        </div>
        {
            !isView &&
            <>
            <div class="flex justify-end space-x-2 gap-2 pb-8 mx-56">
                <button class="px-4 py-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-100 focus:outline-none">
                    Batal
                </button>        
                <button class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none">
                    Simpan
                </button>
            </div>
            </>
        }
        {/* <ModalDetail 
            inputs= {inputs}
            setInputs= {setInputs}
            closeModal= {closeModal()}
        /> */}
        </>
    )
}

const Breadcrumbs = () => {
    return (
      <div className="prod-detail__pages__breadcrumb__nav__wrapper pt-12 ml-40">
        <p className="prod-detail__pages__breadcrumb__nav__textGray font-bold">Home</p>
        <img src="/icons/small-icons/chevron_right_small.svg" alt="chevron" />
        <p className="prod-detail__pages__breadcrumb__nav__textGray font-bold">Profil</p>
        <img src="/icons/small-icons/chevron_right_small.svg" alt="chevron" />
        <p className="prod-detail__pages__breadcrumb__nav__textGray">...</p>
        <img src="/icons/small-icons/chevron_right_small.svg" alt="chevron" />
        <p className="prod-detail__pages__breadcrumb__nav__textGray">Detail Properti Secondary</p>
      </div>
    )
}


const ModalAlamat = ({

}) => {

}

const ModalDeskripsi = ({

}) => {

}

const ModalInfoProperti = ({

}) => {

}

const ModalCheckbox = ({
typeCheckbox,
setInputs
}) => {

}

const ModalFoto = ({

}) => {

}

export default Ringkasan