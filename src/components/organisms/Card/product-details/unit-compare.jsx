import _ from "lodash-contrib"
import React, { useEffect, useState } from "react"
import Slider from "react-slick"
import { formatRupiahWord, trimStr } from "../../../../helpers/string"
import { DetailsCard } from "../../../molecules"
import InitialsAvatar from "react-initials-avatar"
import { GmapsDetail } from "../.."
import { listFasilitas } from "../../../../static/v2/detail-project/typeFasilitas"
import { decryptStr } from "../../../../helpers/encryptDecrypt"
import { openLink } from "../../../../helpers/newTab"


const UnitCompare =({data, fasData, images, dev, dispatch}) => {
    const [isSecondary, setIsSecondary] = useState(false)
    const [readMore, setReadMore] = useState({
        informasi: false,
        fasKes: false,
    })
    const [activeCategory, setActiveCategory] = useState("semua")
    const [currentLngLat, setCurrentLngLat] = useState({
        longitude: 0,
        latitude: 0
    })
    const [mapsState, setMapsState] = useState({
        center: {
            lat: -6.22472,
            lng: 106.80778,
        },
        address: "",
        zoom: 17,
        gestureHandling: "cooperative",
    })
    const [isDiscount, setIsDiscount] = useState(false)

    useEffect(() => {
        setIsSecondary(data?.detailProperti?.groupProperti ? decryptStr(data?.detailProperti?.groupProperti)?.split("|")[1] === "PROPERTI_SECONDARY" ? true : false : false)
        setMapsState({
            ...mapsState,
            center: {
                lat: data?.project?.alamatProperti?.latitude ? Number(data?.project?.alamatProperti?.latitude) : 0,
                lng: data?.project?.alamatProperti?.longitude ? Number(data?.project?.alamatProperti?.longitude) : 0
            },
            address: data?.project?.alamatProperti?.alamat ? JSON.parse(data?.project?.alamatProperti?.alamat)?.alamat ?? "" : "",
            zoom: 17,
        })
        if(data?.detailProperti?.diskonPersen !== null && data?.detailProperti?.diskonPersen > 0 || data?.detailProperti?.diskonNominal !== null && data?.detailProperti?.diskonNominal > 0){
            setIsDiscount(prev => !prev)
        }
    }, [data])

    useEffect(() => {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function (position) {
            setCurrentLngLat({
                longitude: position.coords.longitude,
                latitude: position.coords.latitude,
            })
          })
        } else {
          console.error("Geolocation is not supported in this browser.")
        }
    }, [])

    const SliderSettings = {
        arrows: false,
        dots: true,
        infinite: true,
        autoplay: true,
        autoplaySpeed: 5000,
        speed: 1000,
        slidesToShow: 1,
        slidesToScroll: 1,
        dotsClass: "slick-dots slick-thumb-compare",
        appendDots: dots => <ul>{dots}</ul>,
        customPaging: (i) => {
            return <div className="dot"></div>;
        },
    }

    const templateImages = images?.map((image, idx) => {
        return (
            <div key={idx} className="w-full h-[336px]">
                <a target="_blank">
                    <img src={image.sharedUrl} alt="unit-images" className="w-full h-full rounded-[1rem]" />
                </a>
            </div>
        )
    })

    const filteredFasilitasAkses = () => {
        return fasData?.fasAksesProperti?.filter(field => {
          switch (activeCategory) {
            case 'transportasi':
              return field.tipeFasilitas === 'Halte' || field.tipeFasilitas === 'Gerbang Tol' || field.tipeFasilitas === 'Stasiun';
            case 'sekolah_universitas':
              return field.tipeFasilitas === 'Sekolah' || field.tipeFasilitas === 'Universitas';
            case 'fasilitas_umum':
              return field.tipeFasilitas === 'Taman' || field.tipeFasilitas === 'Apotek' || field.tipeFasilitas === 'Rumah Ibadah' || field.tipeFasilitas === 'Restoran' || field.tipeFasilitas === 'Pasar' || field.tipeFasilitas === 'Rumah Sakit';
            case 'hiburan':
              return field.tipeFasilitas === 'Mall' || field.tipeFasilitas === 'Kolam Renang' || field.tipeFasilitas === 'Bioskop' || field.tipeFasilitas === 'Gym';
            default:
              return true;
          }
        })
    }


    const filteredListFasilitas = filteredFasilitasAkses()
    const [seeAllFasilitas, setSeeAllFasilitas] = useState(false)
    const splitListFasilitasMobile = seeAllFasilitas ? filteredListFasilitas : filteredListFasilitas?.slice(0,5)
    const allFasilitas = () => {
        if(filteredListFasilitas.filter(Boolean).length > 5)
            setSeeAllFasilitas((prevState) => !prevState)
        setReadMore(prev => ({...prev, fasKes: !prev['fasKes']}))
    }

    const handleBrosur = () => {
        openLink(data?.brosurUrl, true)
    }
    const handleFilter = (category) => {
        setActiveCategory(category);
    }

    return (
        <>
            <div className="w-full flex flex-col pb-8">
                <div id="image-compare" className="pb-8">
                    <Slider {...SliderSettings}>{templateImages}</Slider>
                </div>
                <div className="flex flex-row justify-between">
                    <div className="flex justify-center items-center">
                        {isDiscount ? (
                            <>
                                <span className="prj-detail-v2__informationProperti__oldPrice">{formatRupiahWord(data?.detailProperti?.hargaProperti)}</span>
                                <span className="prj-detail-v2__informationProperti__price">{formatRupiahWord(data?.detailProperti?.hargaAkhir)}</span>
                            </>
                        ) : (<>
                            <span className="prj-detail-v2__informationProperti__price">{formatRupiahWord(data?.detailProperti?.hargaAkhir)}</span>
                        </>)}
                    </div>
                    {!isSecondary && (
                        <button className="flex items-center px-4 py-3 border border-solid border-[#1078CA] rounded-md w-fit h-[48px]" onClick={handleBrosur}>
                            <p className="text-[#1078CA] font-bold text-[16px]">Download Brosur</p>
                        </button>
                    )}
                </div>
                <div className="flex flex-col gap-2" id="title">
                    <div className="">
                    </div>    
                    <div className="pb-4">
                        <p className="font-semibold text-black text-2xl line-clamp-2">{data?.detailProperti?.namaProperti}</p>
                        <p className="font-medium text-[#777777] text-base">
                            { _.isJSON(data?.project?.alamatProperti?.alamat) ?
                                JSON?.parse(data?.project?.alamatProperti?.alamat)?.kecamatan + ", " + JSON?.parse(data?.project?.alamatProperti?.alamat)?.provinsi
                                : "-"
                            }
                        </p>
                        <div className={`pt-4 ${isSecondary ? "opacity-100" : "opacity-0"}`}>
                            <div className="bg-[#FCF2D2] rounded-full w-fit p-2">
                                <p className="font-semibold text-[#DEAB10] text-[10px]">Properti Secondary</p>
                            </div>
                        </div>
                    </div>
                    <hr width="100%" size="1" color="#D3D4D4"/>
                </div>
                <div className="flex flex-col gap-2 pt-6" id="informasiProperti">
                    <p className="font-bold text-[#292929] text-xl">Informasi Properti</p>
                    <p className={`font-medium text-[#777777] text-base text-justify ${!readMore.informasi ? 'line-clamp-5': ''}`}>
                        {data?.detailProperti?.deskripsiProperti}
                    </p>
                    {data?.detailProperti?.deskripsiProperti?.length > 335  && (
                        <div className="flex flex-row gap-2 justify-end font-bold text-[#1078CA] text-base">
                        <button onClick={()=>setReadMore(prev => ({...prev, informasi: !prev['informasi']})) } >{readMore.informasi ? "Sembunyikan" : "Baca Selengkapnya"}</button>
                        <img src="/icons/small-icons/detail-page/chevron_down.svg" alt="cursor dropdown" className={`transform transition-transform ${readMore.informasi ? 'rotate-180' : ''}`} />
                        </div>
                    )}
                </div>
                <div className="gap-2" id="developer">
                    <p className="text-[#292929] text-[16px] font-bold py-4">{isSecondary ? "Kantor Cabang" : "Developer"}</p>
                    <DetailsCard>
                        <div className="gtid grid-cols-1 w-full">
                            <div className="prod-detail__pages__property__detailBuying__left__dev-info__profile-dev">
                                <InitialsAvatar
                                    className="prod-detail__pages__property__detailBuying__left__dev-info__profile-pic"
                                    name={
                                        isSecondary 
                                          ? data?.adminCabang?.kancab || '-' 
                                          : dev?.metadata?.name || dev?.metadata?.fullName || '-'
                                      }
                                />
                                <div className="prod-detail__pages__property__detailBuying__left__dev-info__name">
                                    <p>{isSecondary ? data?.adminCabang?.kancab : trimStr({string: dev?.metadata?.name ? dev?.metadata?.name : dev?.metadata?.fullName, maxLength: 50})}</p>
                                    <p className="prod-detail__pages__property__detailBuying__left__dev-info__location">{isSecondary ? data?.adminCabang?.kanwil : _.isJSON(dev?.metadata?.address) ? JSON?.parse?.(dev?.metadata?.address)?.provinsi : dev?.metadata?.address}</p>
                                </div>
                            </div>
                        </div>
                    </DetailsCard>
                </div>
                <div className="gap-2">
                    <p className="text-[#292929] text-[16px] font-bold py-4">Spesifikasi</p>
                    <div className="border rounded-xl border-[#D3D4D4]">
                        <div className="flex p-4">
                            <div className="flex flex-col gap-4 w-1/3 p-4 border-r border-transparent">
                                <div className="flex flex-row gap-2 items-center">
                                    <img src="/icons/small-icons/LT_Normal.svg"/>
                                    <div className="font-medium text-sm text-gray-900 text-nowrap line-clamp-1">{data?.detailProperti?.lt} m²</div>
                                </div>
                        
                                <div className="flex flex-row gap-2 items-center">
                                    <img src="/icons/small-icons/properti-secondary/Vectorshower.svg"/>
                                    <div className="font-medium text-sm text-gray-900 text-nowrap line-clamp-1">{data?.detailProperti?.jmlKmrMandi} Kamar Mandi</div>
                                </div>
                                {
                                    data?.detailProperti?.kelengkapanProperti?.dapur ? (
                                        <div className="flex flex-row gap-2 items-center">
                                            <img src="/icons/small-icons/kitchen.svg"/>
                                            <div className="font-medium text-sm text-gray-900 text-nowrap line-clamp-1">Dapur</div>
                                        </div>
                                    ) : null
                                }
                                <div className="flex flex-row gap-2 items-center">
                                    <img src="/icons/small-icons/electricity.svg"/>
                                    <div className="font-medium text-sm text-gray-900 text-nowrap line-clamp-1 text-center">{data?.detailProperti?.informasiProperti?.dayaListrik} kwH</div>
                                </div>
                                <div className="flex flex-row gap-2 items-center">
                                    <img src="/icons/small-icons/house_normal.svg"/>
                                    <div className="font-medium text-sm text-gray-900 text-nowrap line-clamp-1">{data?.detailProperti?.informasiProperti?.hadapRumah.toUpperCase()}</div>
                                </div>
                            </div>
                            <div className="flex flex-col gap-4 w-1/3 p-4 border-r border-l border-[#D3D4D4]">
                                <div className="flex flex-row gap-2 items-center">
                                    <img src="/icons/small-icons/LB_Normal.svg"/>
                                    <div className="font-medium text-sm text-gray-900 text-nowrap line-clamp-1">{data?.detailProperti?.lb} m²</div>
                                </div>
                                {
                                    data?.detailProperti?.parkirMobil ? (
                                        <div className="flex flex-row gap-2 items-center">
                                            <img src="/icons/small-icons/properti-secondary/Vectorgarage.svg"/>
                                            <div className="font-medium text-sm text-gray-900 text-nowrap line-clamp-1">Carport</div>
                                        </div>
                                    ) : null
                                }
                                {
                                    data?.detailProperti?.kelengkapanProperti?.jalurPDAM ? (
                                        <div className="flex flex-row gap-2 items-center">
                                            <img src="/icons/small-icons/detail-page/pdam_detail.svg"/>
                                            <div className="font-medium text-sm text-gray-900 text-nowrap line-clamp-1">Jalur PDAM</div>
                                        </div>
                                    ) : null
                                }
                                {
                                    data?.detailProperti?.kelengkapanProperti?.ruangKerja ? (
                                        <div className="flex flex-row gap-2 items-center">
                                            <img src="/icons/small-icons/detail-page/study_room.svg"/>
                                            <div className="font-medium text-sm text-gray-900 text-nowrap line-clamp-1">Ruang Kerja</div>
                                        </div>
                                    ) : null
                                }
                                <div className="flex flex-row gap-2 items-center">
                                    <img src="/icons/small-icons/detail-page/note_detail.svg"/>
                                    <div className="font-medium text-sm text-gray-900 text-nowrap line-clamp-1">Dokumen {data?.detailProperti?.informasiProperti?.sertifikat.toUpperCase()}</div>
                                </div>
                            </div>
                            <div className="flex flex-col gap-4 w-1/3 p-4 border-r border-transparent">
                                <div className="flex flex-row gap-2 items-center">
                                    <img src="/icons/small-icons/properti-secondary/Vectorbeedroom.svg"/>
                                    <div className="font-medium text-sm text-gray-900 text-nowrap line-clamp-1">{data?.detailProperti?.jmlKmrTidur} Kamar Tidur</div>
                                </div>
                                {
                                    data?.detailProperti?.kelengkapanProperti?.ruangKeluarga ? (
                                        <div className="flex flex-row gap-2 items-center">
                                            <img src="/icons/small-icons/detail-page/Living_Room_detail.svg"/>
                                            <div className="font-medium text-sm text-gray-900 text-nowrap line-clamp-1">Ruang Keluarga</div>
                                        </div>
                                    ) : null
                                }
                                {
                                    data?.detailProperti?.kelengkapanProperti?.jalurTelepone ? (
                                        <div className="flex flex-row gap-2 items-center">
                                            <img src="/icons/small-icons/properti-secondary/Vectorsambungan_telepon.svg"/>
                                            <div className="font-medium text-sm text-gray-900 text-nowrap line-clamp-1">Sambungan Telepon</div>
                                        </div>
                                    ) : null
                                }
                                <div className="flex flex-row gap-2 items-center">
                                    <img src="/icons/small-icons/house_normal.svg"/>
                                    <div className="font-medium text-sm text-gray-900 text-nowrap line-clamp-1">Dibangun Tahun {data?.detailProperti?.informasiProperti?.tahunBangun}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="gap-3 w-full">
                    <h1 className="font-bold text-[20px] pt-4">Akses & Fasilitas</h1>
                    <div className="flex flex-wrap gap-2 top-16 h-fit pb-3">
                        <button className={`flex items-center px-4 py-2 font-medium text-sm rounded-[16px] border border-solid w-fit ${activeCategory === "semua" ? 'bg-[#DDEFFC] text-[#1078CA] font-semibold' : 'bg-[#ffffff] text-[#777777] border-[#D3D4D4] '}`} onClick={() => handleFilter("semua")}><p className="flex items-center whitespace-nowrap">Semua</p></button>
                        <button className={`flex items-center px-4 py-2 font-medium text-sm rounded-[16px] border border-solid w-fit ${activeCategory === "transportasi" ? 'bg-[#DDEFFC] text-[#1078CA] rounded-[16px] font-semibold' : 'bg-[#ffffff] text-[#777777] border-[#D3D4D4] '}`} onClick={() => handleFilter("transportasi")}><p className="flex items-center whitespace-nowrap">Transportasi</p></button>
                        <button className={`flex items-center px-4 py-2 font-medium text-sm rounded-[16px] border border-solid w-fit ${activeCategory === "sekolah_universitas" ? 'bg-[#DDEFFC] text-[#1078CA] rounded-[16px] font-semibold' : 'bg-[#ffffff] text-[#777777] border-[#D3D4D4] '}`} onClick={() => handleFilter("sekolah_universitas")}><p className="flex items-center whitespace-nowrap">Sekolah & Universitas</p></button>
                        <button className={`flex items-center px-4 py-2 font-medium text-sm rounded-[16px] border border-solid w-fit ${activeCategory === "fasilitas_umum" ? 'bg-[#DDEFFC] text-[#1078CA] rounded-[16px] font-semibold' : 'bg-[#ffffff] text-[#777777] border-[#D3D4D4]'}`} onClick={() => handleFilter("fasilitas_umum")}><p className="flex items-center whitespace-nowrap">Fasilitas Umum</p></button>
                        <button className={`flex items-center px-4 py-2 font-medium text-sm rounded-[16px] border border-solid w-fit ${activeCategory === "hiburan" ? 'bg-[#DDEFFC] text-[#1078CA] rounded-[16px] font-semibold' : 'bg-[#ffffff] text-[#777777] border-[#D3D4D4]'}`} onClick={() => handleFilter("hiburan")}><p className="flex items-center whitespace-nowrap">Hiburan</p></button>
                    </div>
                    <div className="p-4 grid grid-cols-1 gap-3 border rounded-xl border-[#D3D4D4]">
                        {splitListFasilitasMobile?.map((field, index) => {
                            const facility = listFasilitas.type[field?.tipeFasilitas?.replaceAll(" ", "")]
                            return (
                                <div key={index} className="flex flex-row gap-2 justify-between items-center w-full">
                                    <div className="flex flex-row items-center">
                                        <img src={facility?.img} alt={facility?.text} />
                                        <p className="font-medium text-[#292929] whitespace-nowrap px-4 w-[180px] text-sm">{field.namaFas}</p>
                                    </div>
                                    <p className="font-medium text-[#929393] whitespace-nowrap text-start text-sm w-[57px]">{field.jarakWaktuTempuh} {field.satuan}</p>
                                </div>
                            )
                        })}
                        { splitListFasilitasMobile?.length < 1 && (
                            <div className="flex flex-col gap-4 items-center">
                                <img alt="noAkses&Fasilitas" src="/images/No_Akses_Fasilitas.svg" />
                                <p className="font-medium text-[#666666] whitespace-nowrap text-sm">Informasi terkait Akses & Fasilitas belum tersedia</p>
                            </div>
                        )}
                        { filteredListFasilitas?.filter(Boolean).length > 5 && (
                            <div className="flex flex-row gap-2 justify-center items-center cursor-pointer" onClick={allFasilitas}>
                                <p className="font-bold text-[#1078CA] text-[14px]">{!seeAllFasilitas ? "Tampilkan Semua" : "Sembunyikan"}</p>
                                <img src="/icons/small-icons/detail-page/chevron_down.svg" alt="cursor dropdown" className={`transform transition-transform ${readMore.fasKes ? 'rotate-180' : ''}`}/>
                            </div> 
                        )}
                    </div>
                </div>
                <div className="gap-2" id="alamat">
                    <p className="text-[20px] font-bold text-[#292929] py-4">Alamat</p>
                    { data?.project?.alamatProperti && (
                        <GmapsDetail
                            mapsState={mapsState}
                            lat= {Number(data?.project?.alamatProperti?.latitude)}
                            lng= {Number(data?.project?.alamatProperti?.longitude)}
                            origin= {currentLngLat}
                            proyek={data?.project?.namaProyek}
                            alamat={ _.isJSON(data?.project?.alamatProperti?.alamat) ? JSON.parse(data?.project?.alamatProperti?.alamat)?.alamat : "" }
                            mobile={false}
                    />
                    )}
                </div>
            </div>
        </>
    )
}

export default UnitCompare