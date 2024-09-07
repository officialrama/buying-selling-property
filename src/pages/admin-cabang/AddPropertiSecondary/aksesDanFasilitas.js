import { useDispatch, useSelector } from "react-redux"
import { DetailsCard, Dropdown, DropdownFasilitas, Textbox, TextboxDropdownFasilitas } from "../../../components/molecules"
import { jarakWaktuTempuhConst, typeFasilitasConst } from "../../../static/fasilitas-akses/fasilitasAksesConst"
import { showSingleModal } from "../../../store/actions/changeState"
import { useState } from "react"
import { Modal, SnackBar } from "../../../components/organisms"
import { encryptStr } from "../../../helpers/encryptDecrypt"
import { deleteFasilitasSecondary } from "../../../store/actions/fetchData/admin-cabang"

const AksesDanFasilitas = ({ 
    inputs,
    dropdownVal, 
    fasAksesPropertiDto, 
    newFieldAkses,
    handleDeleteNewField,
    handleAddField,
    handleAdditionalFieldChange }) => {
    const [id , setId] = useState("")
    const dispatch = useDispatch()
    const state = useSelector((state) => state.stateReducer)

    return (
        <>
            <div className='z-50'>
                <SnackBar message="Berhasil menghapus fasilitas/akses" status={fasAksesPropertiDto} />
            </div>
            {state.showSingleModal === true && (
                <Modal
                closeModal={() => dispatch(showSingleModal(!state.showSingleModal))}
                onClickDelete={() => {
                    dispatch(showSingleModal(!state.showSingleModal));
                    dispatch(deleteFasilitasSecondary(inputs?.idProject, id))
                }}
                modalTypes="deleteFasilitas"
                />
            )}
            <div className="sellpropsV2__wrapper min-h-screen">
                <DetailsCard className="sellpropsV2__card__wrapper">
                <div className="sellpropsV2__card__wrapper-content">
                    <p className="sellpropsV2__title pb-3">Fasilitas & Akses</p>
                    <div className='flex flex-col gap-4 justify-start'>
                    {fasAksesPropertiDto.map((field, index) => (
                    <div key={index} className="flex flex-row gap-4 py-3 w-[940px]">
                        <div className='flex flex-col gap-3'>
                            <p className='text-xs font-semibold whitespace-nowrap'>Kategori</p>
                            <div className='w-[200px]'>
                                <Dropdown
                                    value={field?.kategori?.value}
                                    data={typeFasilitasConst}
                                    placeholder={'Pilih Tipe Fasilitas'}
                                />
                            </div>
                        </div>
                        <div className='flex flex-col gap-3'>
                            <p className='text-xs font-semibold whitespace-nowrap'>Tipe Fasilitas/Akses</p>
                            <div className='w-[220px]'>
                                <DropdownFasilitas
                                    data={dropdownVal.options}
                                    value={field?.tipeFasilitas?.value}
                                    placeholder="Pilih Tipe Fasilitas/Akses"
                                />
                            </div>
                        </div>
                        <div className='flex flex-col gap-3'>
                            <p className='text-xs font-semibold whitespace-nowrap'>Nama Fasilitas/Akses</p>
                            <div className='w-[260px]'>
                            <Textbox
                                placeholder="Masukan Nama Fasilitas / Akses"
                                typeInput="text"
                                value={field?.namaFas?.value}
                                maxLength={100}
                            />
                            </div>
                        </div>
                        <div className='flex flex-col gap-3'>
                            <p className='text-xs font-semibold whitespace-nowrap'>Jarak/Waktu Tempuh</p>
                            <div className='flex flex-row w-[124px]'>
                                <TextboxDropdownFasilitas
                                valueInput={field?.jarakWaktuTempuh?.value}
                                maxLength={2}
                                value={field?.satuan?.value}
                                data={jarakWaktuTempuhConst}
                                />
                            </div>
                        </div>
                        <button className='text-[#777777] text-3xl w-[40px] h-[44px] pt-8 pr-2' 
                        onClick={() => dispatch(showSingleModal(true))
                        (setId(field?.id))
                        }>X</button>
                    </div>
                    ))}
                    {newFieldAkses.map((field, index) => (
                    <div key={index} className="flex flex-row gap-4 py-3 w-[940px]">
                        <div className='flex flex-col gap-3'>
                        <p className='text-xs font-semibold whitespace-nowrap'>Kategori</p>
                        <div className='w-[200px]'>
                            <Dropdown
                                value={field?.kategori?.value}
                                data={typeFasilitasConst}
                                onChange={(selectedValue) => {
                                handleAdditionalFieldChange(index, 'kategori', selectedValue)}}
                                placeholder={'Pilih Tipe Fasilitas'}
                            />
                        </div>
                            </div>
                        <div className='flex flex-col gap-3'>
                            <p className='text-xs font-semibold whitespace-nowrap'>Tipe Fasilitas/Akses</p>
                            <div className="w-[220px]">
                                <DropdownFasilitas
                                data={field.filteredTipeFasilitas || []}
                                value={field?.tipeFasilitas?.value}
                                onChange={(selectedValue) => {
                                    handleAdditionalFieldChange(index, 'tipeFasilitas', selectedValue)}}
                                placeholder="Pilih Tipe Fasilitas/Akses"
                                />
                            </div>
                        </div>
                        <div className='flex flex-col gap-3'>
                            <p className='text-xs font-semibold whitespace-nowrap'>Nama Fasilitas/Akses</p>
                            <div className='w-[260px]'>
                                <Textbox
                                    placeholder="Masukan Nama Fasilitas / Akses"
                                    typeInput="text"
                                    value={field?.namaFas?.value}
                                    onChange={(e) => handleAdditionalFieldChange(index, 'namaFas', e.target.value)}
                                    maxLength={100}
                                />
                            </div>
                        </div>
                        <div className='flex flex-col gap-3'>
                            <p className='text-xs font-semibold whitespace-nowrap'>Jarak/Waktu Tempuh</p>
                            <div className='flex flex-row w-[124px]'>
                                <TextboxDropdownFasilitas
                                onValueChange={(e) => handleAdditionalFieldChange(index, 'jarakWaktuTempuh', e.target.value)}
                                onChange={(selectedValue) => {handleAdditionalFieldChange(index, 'satuan', selectedValue)}}
                                valueInput={field?.jarakWaktuTempuh?.value}
                                maxLength={2}
                                placeholderDropdown={jarakWaktuTempuhConst?.[0].name}
                                value={field?.satuan?.value}
                                data={jarakWaktuTempuhConst}
                                />
                            </div>
                        </div>
                        <button className='text-[#777777] text-3xl w-[40px] h-[44px] pt-8 pr-2' onClick={() => handleDeleteNewField(index)}>X</button>
                    </div>
                    ))}
                        <div>
                            <button className='border border-[#1078CA] text-[#1078CA] whitespace-nowrap font-bold rounded-lg h-[40px] text-sm px-4' onClick={handleAddField}>+ Tambah Fasilitas & Akses</button>
                        </div>
                    </div>
                </div>
                </DetailsCard>
            </div>
        </>
    )
}

export default AksesDanFasilitas