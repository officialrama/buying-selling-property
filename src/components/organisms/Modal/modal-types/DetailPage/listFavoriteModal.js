import { decryptStr } from "../../../../../helpers/encryptDecrypt"
import { formatRupiahWord } from "../../../../../helpers/string"

export const ModalListPropFavorite = ({data, isModal, closeModal, handleCompare}) => {
    console.log(data)
    return (
        <>
            {isModal && (
                <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-black bg-opacity-50">
                    <div className="relative my-auto mx-auto w-[888px] rounded-lg bg-white p-[24px]">
                        <div className="grid grid-cols-2 grid-rows-2 gap-4">
                            <div className="flex flex-row justify-between col-span-2 row-span-2">
                                <div className="flex flex-col gap-2">
                                    <p className="text-[24px] text-[#292929] font-bold">Properti Favorit</p>
                                    <p className="text-[14px] text-[#777777] font-medium">Pilih properti yang ingin kamu bandingkan</p>
                                </div>
                                <button
                                    className="bg-transparent border-0 text-black float-right place-self-center"
                                    onClick={closeModal}
                                >
                                    <img src="/icons/Close_Circle.svg" alt="Close Button" />
                                </button>
                            </div>
                            {
                                data?.data?.map((propertiData, idx) => {
                                    if(decryptStr(data?.sameProperti?.detailProperti?.id) === decryptStr(propertiData?.detailProperti?.id)){
                                        return (
                                            <div id="cardListProps" className="relative group flex flex-row cursor-pointer hover:bg-[#EAEBEB] rounded-lg p-4 cursor-not-allowed">
                                                <div className="w-[113px] h-full flex-shrink-0 pr-4">
                                                    <img className="w-full h-full object-cover rounded-md" alt="img" src={propertiData?.imagesProperti?.[0]?.sharedUrl} />
                                                    <div class="hidden group-hover:block absolute inset-0 bg-[#EAEBEB] opacity-20"></div>
                                                </div>
                                                <div className="flex flex-col">
                                                    {decryptStr(propertiData?.detailProperti?.groupProperti)?.split("|")[1] === "PROPERTI_SECONDARY" && (
                                                        <div className="bg-[#D3D4D4] rounded-full w-fit px-2 py-1">
                                                            <p className="font-semibold text-[#777777] text-[10px]">Properti Secondary</p>
                                                        </div>
                                                    )}
                                                    <p className="font-bold text-[#777777] text-[14px] pt-1">{propertiData?.detailProperti?.namaProperti}</p>
                                                    <p className="font-medium text-[#777777] text-[14px]">{JSON.parse(propertiData?.project?.alamatProperti?.alamat)?.kabupaten}, {JSON.parse(propertiData?.project?.alamatProperti?.alamat)?.provinsi}</p>  {/* max 49 karakter */}
                                                    <p className="font-medium text-[#777777] text-[12px]">{propertiData?.detailProperti?.jmlKmrTidur} KT • {propertiData?.detailProperti?.jmlKmrMandi} KM • LB {propertiData?.detailProperti?.lb}m²</p>
                                                    <p className="font-bold text-[18px] text-[#777777]">{formatRupiahWord(propertiData?.detailProperti?.hargaAkhir)}</p>
                                                </div>
                                            </div>
                                        )
                                    }else{
                                        return (
                                            <div key={idx} id="cardListProps" className="relative flex flex-row cursor-pointer hover:bg-[#DDEFFC] rounded-lg p-4" onClick={() => handleCompare("compare", propertiData?.detailProperti?.id)}>
                                                <div className="w-[113px] h-full flex-shrink-0 pr-4">
                                                    <img className="w-full h-full object-cover rounded-md" alt="img" src={propertiData?.imagesProperti?.[0]?.sharedUrl} />
                                                </div>
                                                <div className="flex flex-col">
                                                    {decryptStr(propertiData?.detailProperti?.groupProperti)?.split("|")[1] === "PROPERTI_SECONDARY" && (
                                                        <div className="bg-[#FCF2D2] rounded-full w-fit px-2 py-1">
                                                            <p className="font-semibold text-[#DEAB10] text-[10px]">Properti Secondary</p>
                                                        </div>
                                                    )}
                                                    <p className="font-bold text-[#292929] text-[14px] pt-1">{propertiData?.detailProperti?.namaProperti}</p>
                                                    <p className="font-medium text-[#777777] text-[14px]">{JSON.parse(propertiData?.project?.alamatProperti?.alamat)?.kabupaten}, {JSON.parse(propertiData?.project?.alamatProperti?.alamat)?.provinsi}</p>  {/* max 49 karakter */}
                                                    <p className="font-medium text-[#777777] text-[12px]">{propertiData?.detailProperti?.jmlKmrTidur} KT • {propertiData?.detailProperti?.jmlKmrMandi} KM • LB {propertiData?.detailProperti?.lb}m²</p>
                                                    <p className="font-bold text-[18px] text-[#1078CA]">{formatRupiahWord(propertiData?.detailProperti?.hargaAkhir)}</p>
                                                </div>
                                            </div>
                                        )
                                    }
                                })
                            }
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}