import React from "react"
import moment from "moment"
import 'moment/locale/id'
import { UploadPropertiSecondary } from "../../../components/organisms"
import { DetailsCard } from "../../../components/molecules"
import { listFasilitas } from "../../../static/v2/detail-project/typeFasilitas"

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


const Ringkasan = ({
    inputs,
    dataAddress,
    files,
    newFieldAkses,
    fasAksesPropertiDto
}) => {
    return(
        <>
        <div className="sellpropsV2__wrapper">
            <DetailsCard className="sellpropsV2__card__wrapper">
                <div className="properti-secondary__wrapper">
                    <p className="properti-secondary__title pb-4">Ringkasan Properti Secondary</p>
                    <div>
                        <p className="properti-secondary__title_2">Detail Properti</p>
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
                                <p className="properti-secondary__content">
                                    {
                                        inputs?.statusDiscount?.value === "persentase"
                                        ? inputs?.percentageValue?.value + "%"
                                        : inputs?.statusDiscount?.value === "nominal"
                                        ? <CurrencyFormatter value={inputs?.nominalValue?.value}/>
                                        : "-"
                                    }
                                </p>
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
                                <p className="properti-secondary__content">{"+62"+inputs?.noHpPic?.value}</p>
                            </div>
                        </div>
                        <hr className="pb-6"/>
                        <p className="properti-secondary__title_2">Alamat</p>
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
                                <p className="properti-secondary__title_content">Alamat Lengkap</p>
                                <p className="properti-secondary__content">{inputs?.alamatLengkap?.isValid ? inputs?.alamatLengkap?.value : "-"}</p>
                            </div>
                        </div>
                        <hr className="pb-6"/>
                        <p className="properti-secondary__title_2">Deskripsi</p>
                        <div className="flex flex-col pb-2">
                            <p className="properti-secondary__title_content">Deskripsi</p>
                            <p className="properti-secondary__content">{inputs?.deskripsi?.value}</p>
                        </div>
                        <hr className="pb-6"/>
                        <p className="properti-secondary__title_2">Informasi Properti</p>
                        <div className="grid grid-cols-2 gap-4 mt-4 pb-4">
                            <div className="flex flex-col pb-2">
                                <p className="properti-secondary__title_content">Luas Tanah</p>
                                <p className="properti-secondary__content">{inputs?.lt?.value}</p>
                            </div>
                            <div className="flex flex-col pb-2">
                                <p className="properti-secondary__title_content">Luas Bangunan</p>
                                <p className="properti-secondary__content">{inputs?.lb?.value}</p>
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
                        <hr className="pb-6"/>
                        <p className="properti-secondary__title_2">Kelengkapan Rumah</p>
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
                        <hr className="pb-6"/>
                        <p className="properti-secondary__title_2">Akses & Fasilitas</p>
                        <div className="grid grid-cols-2 gap-x-6 gap-y-4 pb-6">
                            {fasAksesPropertiDto.length > 0 && fasAksesPropertiDto?.map((field, index) => {
                                const facility = listFasilitas.type[field.tipeFasilitas.value.name.replaceAll(" ", "")]
                                return (
                                        <div key={index} className="flex flex-row gap-2 justify-between items-center w-full">
                                            <div className="flex flex-row items-center">
                                                <img src={facility?.img} alt={facility?.text} />
                                                <p className="font-medium text-[#292929] whitespace-nowrap px-4 w-[180px] text-sm">{field.namaFas.value}</p>
                                            </div>
                                            <p className="font-medium text-[#929393] whitespace-nowrap text-start text-sm w-[57px]">{field.jarakWaktuTempuh.value} {field.satuan.name}</p>
                                        </div>
                                    )
                            })}
                            {newFieldAkses.length > 0 && newFieldAkses?.map((field, index) => {
                                const facility = listFasilitas.type[field.tipeFasilitas.value.name.replaceAll(" ", "")]
                                return (
                                        <div key={index} className="flex flex-row gap-2 justify-between items-center w-full">
                                            <div className="flex flex-row items-center">
                                                <img src={facility?.img} alt={facility?.text} />
                                                <p className="font-medium text-[#292929] whitespace-nowrap px-4 w-[180px] text-sm">{field.namaFas.value}</p>
                                            </div>
                                            <p className="font-medium text-[#929393] whitespace-nowrap text-start text-sm w-[57px]">{field.jarakWaktuTempuh.value} {field.satuan.value.name === '' ? 'Km' : field.satuan.value.name}</p>
                                        </div>
                                    )
                            })}
                        </div>
                        <hr className="pb-6"/>
                        <p className="properti-secondary__title_2">Foto Properti</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 gap-y-[14px] mt-4">
                            {
                                files.map((item, index) => {
                                    return (
                                        <div key={index}>
                                            <img src={item.preview} alt={`Image ${index + 1}`} className="w-full rounded-lg h-auto" />
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </DetailsCard>
        </div>
        </>
    )
}

export default Ringkasan