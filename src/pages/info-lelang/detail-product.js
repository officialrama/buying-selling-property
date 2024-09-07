import cookie from "hs-cookie"
import _ from "lodash-contrib"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import useInputHooks from "../../hooks/useInputHooks"
import { useState, useEffect } from "react"
import Lightbox from "react-awesome-lightbox"
import { BackBreadcrumbs, Footer, Image4FrameInfoLelang, DetailsCard, CategoryProp } from "../../components/molecules"
import { decryptStr, encryptStr } from "../../helpers/encryptDecrypt"
import { formatRupiahWord, toTitleCase, trimStr } from "../../helpers/string"
import MiniInfoDetail from "../../components/molecules/Info/MiniInfoDetail/Component"
import InitialsAvatar from "react-initials-avatar"
import { BorderLine, Button } from "../../components/atoms"
import { openLink } from "../../helpers/newTab"
import { Tabs, Tab } from "react-tabs-scrollable"
import { AiFillLeftCircle, AiFillRightCircle } from "react-icons/ai"
import HouseCardSearchResultV2 from "../../components/molecules/Cards/search/v2/house-search-result-v2"
import { Modal, RightPageInfolelang, RightPageProductDetails } from "../../components/organisms"
import { fetchPost } from "../../helpers/fetchApi"
import { projectDetail, unitDetail } from "../../store/actions/fetchData/v2/detailProjectV2"
import { detailInfoLelang, validateProperti } from "../../store/actions/fetchData/info-lelang"
import { deleteSavedProp, saveProperty } from "../../store/actions/fetchData/favoriteProp"
import { Oval } from "react-loader-spinner"
import { ListFacilityType } from "../../static/details/list-facility/type"
import { genClickToGmaps, genStaticMapsUrl } from "../../helpers/staticMaps"
import PropertyInfo from "../../components/atoms/Text/details/property-info"
import Virtual360 from "../../components/atoms/Button/virtual-360/virtual-360"
import Download from "../../components/atoms/Button/download/download"
import SaveLove from "../../components/atoms/Button/save/save-love"
import youtubeEmbed from "youtube-embed"
import ListFaciltyDetail from "../../components/atoms/Text/details/list-facility-detail"
import { showApprovalKprModal } from "../../store/actions/changeModalState"
import { closeModalFail } from "../../store/actions/fetchData/superAdminState"

const DetailProduct =({email, emailView, userStatus}) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { id } = useParams()
    const { inputs, setInputs } = useInputHooks()
    const [activeTab, setActiveTab] = useState(0)
    const [gimmickOptions, setGimmickOptions] = useState([])
    const onTabClick = (e, index) => setActiveTab(index)
    const [dataInputCalc, setDataInputCalc] = useState({
        gimmick: {
            value: {
                biayaAdminNominal: 0,
                biayaProvisiNominal: 0,
                tenorFixedRate: 0,
                fixedRate: 0,
                floatingRate: 0,
                tenor: 0,
                name: "Pilih Program Suku Bunga",
            }
        }
    })
    const [infoLelangData, setInfoLelangData] = useState(null)
    const [unitListData, setUnitListData] = useState(null)
    const [loadingDtlUnit, setLoadingDtlUnit] = useState(false)
    const [showLargeImg, setShowLargeImg] = useState(false)
    const [listImgSrc, setListImgSrc] = useState([])
    const [saveState, setSaveState] = useState(false)
    const [showListPropCompare, setShowListPropCompare] = useState(false)
    const [startIndexImg, setStartIndexImg] = useState(0)
    const [buildingAssets, setBuildingAssets] = useState([])
    const [filteredAccessPlaces, setFilteredAccessPlaces] = useState([])
    const [filteredFacilities, setFilteredFacilities] = useState([])
    const saState = useSelector((state) => state.superAdminReducer)
    const stateModal = useSelector((stateModal) => stateModal.modalReducer)

    useEffect(() => {
        dispatch(detailInfoLelang(id, setInfoLelangData))
      }, [])

    useEffect(() => {
        window.scrollTo(0, 0);
        try {
          fetchPost(
            `${process.env.REACT_APP_URL_MORTGAGE_API}/mes/api/v1/promo/listGimmick`,
            {
              status: "active",
              pageStart: 1,
              sortBy: "createdAt",
              sortDirection: "desc",
              nameSearch: "",
              gimmickType:"Homespot",
            }
          )
            .then((res) => {
              if (res.data.responseCode === "00") {
                setGimmickOptions(res?.data?.responseData);
              }
            })
            .catch((err) => console.log("Error List Program Suku Bunga : " + err));
        } catch (error) {
          console.log(error.error);
        }
    }, [])

    useEffect(() => {
        if(infoLelangData?.responseData?.images){
            infoLelangData?.responseData?.images?.map((data) => {
                const imgSrc = data.filename.replace('https://sandbox.partner.api.bri.co.id/v1.0/info-lelang/v1/file?subdir', 'https://sandbox.partner.api.bri.co.id/v1.0/info-lelang/file?subdir')
                return setListImgSrc(listImgSrc => [...listImgSrc, {url: imgSrc}])
            })
        }
    }, [infoLelangData?.responseData?.images])

    const filteringData = [
        { 
            accessPlaces: [
                "Rumah Sakit",
                "Jalan Tol",
                "Sekolah",
                "Mall",
                "Bank/ATM",
                "Taman",
                "Pasar",
                "Farmasi",
                "Rumah Ibadah",
                "Restoran",
                "Bioskop",
                "Bar",
                "Halte",
                "Stasiun",
                "Bandara",
                "SPBU",
                "GYM"
            ]
        },
        {
            facilities: [
                "Furnished",
                "Kolam renang",
                "Sambungan telepon",
                "Keamanan",
                "Lift",
                "Garasi",
                "Gym",
                "Taman",
                "Parkir/Cartport",
            ]
        }
    ]

    useEffect(() => {
        if (!_.isNull(infoLelangData)) {
          setInputs({
            ...inputs,
            hargaProperti: {
              value: infoLelangData?.responseData?.priceBefore === 0 ? infoLelangData?.responseData?.price : infoLelangData?.responseData?.priceBefore
            },
            hargaAkhir:{
              value: infoLelangData?.responseData?.price
            }
          })
          let akses = infoLelangData?.responseData?.accessPlaces?.filter(
            data => filteringData[0].accessPlaces.includes(data.name))
          let fasilitas = infoLelangData?.responseData?.facilities?.filter(
            data => filteringData[1].facilities.includes(data.name))

            setFilteredAccessPlaces(akses)
            setFilteredFacilities(fasilitas)
        }
      }, [infoLelangData])

    useEffect(() => {
        if(filteredAccessPlaces){
            const dataMapped = filteredAccessPlaces.map((data) => {
                if(data.status === "Ada"){
                    return {[data.name]: true}
                }else{
                    return {[data.name]: false}
                }
            })
            const res = {akses: dataMapped}
            setBuildingAssets(res)
        }
    }, [filteredAccessPlaces])

    useEffect(() => {
        if(filteredFacilities){
            const dataMapped = filteredFacilities.map((data) => {
                if(data.status === "Ada"){
                    return {[data.name]: true}
                }else{
                    return {[data.name]: false}
                }
            })
            const res = {fasilitas: dataMapped}
            setBuildingAssets(prevData => [prevData, res])
        }
    }, [filteredFacilities])

    const convertToTypeKey = (key) => {
        let typeKey = key.replace(/\//g, '')
        typeKey = typeKey.split(' ').map((word, index) => index === 0 ? word.toLowerCase() : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join('')
        typeKey = typeKey.replace(/bankatm/g, 'bankATMsecond')
        typeKey = typeKey.replace(/taman/g, 'tamanSecond')
        typeKey = typeKey.replace(/jalanTol/g, 'tolSecond')
        typeKey = typeKey.replace(/pasar/g, 'pasarSecond')
        typeKey = typeKey.replace(/stasiun/g, 'stasiunKeretaSecond')
        return typeKey;
    }

    const showImg = (index) => {
        setStartIndexImg(index)
        setShowLargeImg(true)
    }
    return (
        <div>
            {stateModal.showApprovalKprModal === true ? (
                    <Modal
                    closeModal={() => {
                        dispatch(
                        showApprovalKprModal(!stateModal.showApprovalKprModal));
                    }}
                    modalTypes="kprSubmission"
                    title="Pengajuan Pembelian KPR"
                    data={infoLelangData}
                    otherProps={{ gimmickOptions, dataInputCalc, setDataInputCalc }}
                    />
                ) : (
                    <div></div>
                )}
            {saState.fail === true && (
                    <Modal
                    closeModal={() => dispatch(closeModalFail())}
                    modalTypes="modalSF"
                    title=""
                    titleBody={saState.titleFail}
                    descBody={saState.msgFail}
                    />
                )}
            {showLargeImg && <Lightbox showTitle={false} images={listImgSrc} onClose={() => setShowLargeImg(false)} startIndex={startIndexImg} />}
            <div className="prj-detail__wrapper">
                <div className="prj-detail__breadcrumNav mb-5">
                    <BackBreadcrumbs onClick={()=> navigate(-1)} />
                </div>
                <Image4FrameInfoLelang
                    dataImg={infoLelangData?.responseData?.images}
                    onClickImg0={() => showImg(0)}
                    onClickImg1={() => showImg(1)}
                    onClickImg2={() => showImg(2)}
                    onClickImg3={() => showImg(3)}
                />
                <div className="prj-detail__content">
                    <div className="prj-detail__pageLeft">
                        <div className="prj-detail__detailPrjWrap" style={{gap: "0.5rem"}}>
                            <div className="prj-detail__namePrjWrap">
                                <div className="hs-search-rslt__filter-wrap mb-2">
                                    {/* {infoLelangData?.responseData?.tagHotdealDesc && <CategoryProp tipeProperti={infoLelangData?.responseData?.tagHotdealDesc ? toTitleCase?.(infoLelangData?.responseData?.tagHotdealDesc) : ""} />}
                                    {infoLelangData?.responseData?.tagCleanDesc && <CategoryProp tipeProperti={infoLelangData?.responseData?.tagCleanDesc ? toTitleCase?.(infoLelangData?.responseData?.tagCleanDesc) : ""} />} */}
                                </div>
                                <p className="prj-detail__namePrj">{infoLelangData?.responseData?.name}</p>
                                <p className="prj-detail__locPrj">{ infoLelangData?.responseData?.addresses ?
                                    infoLelangData.responseData.addresses.city + ", " + infoLelangData.responseData.addresses.province
                                    : "-"}
                                </p>
                            </div>
                            {infoLelangData?.responseData?.discountType === "persen" ?
                            <div>
                                <span
                                className="px-2 py-1 mx-0 text-sm tab:text-[10px] smallPc:text-[13px] xxl:text-[15px] bg-[#E84040] text-white font-semibold w-1/5 text-center rounded-xl">{`${infoLelangData?.responseData?.discountNominal}%`}</span>
                                <span className=" ml-1 text-[15px] text-[#777777] tab:fontsize__small smallPc:fontsize__small" style={{ textDecoration: 'line-through' }}>{formatRupiahWord(infoLelangData?.responseData?.priceBefore)}</span>
                            </div>
                            : infoLelangData?.responseData?.discountType === "rupiah" ?
                            <div>
                                <span
                                className="px-2 py-1 mx-0 text-sm tab:text-[10px] smallPc:text-[13px] xxl:text-[15px] bg-[#E84040] text-white font-semibold w-1/5 text-center rounded-xl">{`${formatRupiahWord(infoLelangData?.responseData?.discountNominal)}`}</span>
                                <span className=" ml-1 text-[15px] text-[#777777] tab:fontsize__small smallPc:fontsize__small" style={{ textDecoration: 'line-through' }}>{formatRupiahWord(infoLelangData?.responseData?.priceBefore)}</span>
                            </div>
                            : '' }
                            <div className="prj-detail__priceWrap">
                                {infoLelangData?.responseData?.price === undefined ? "" :
                                    <p className="prj-detail__price text-[#1078CA]">{formatRupiahWord(infoLelangData?.responseData?.price)}</p>
                                }
                            </div>
                            <div className="prj-detail__informasiRumahWrap my-3">
                                <div className="grid grid-cols-2 gap-4">
                                    <ListFaciltyDetailV2 type={{
                                        text: infoLelangData?.responseData?.buildingAssets?.numberOfBedrooms + " Kamar",
                                        img: "/icons/small-icons/properti-secondary/Vectorbeedroom.svg"
                                    }} />
                                    <ListFaciltyDetailV2 type={{
                                        text: infoLelangData?.responseData?.buildingAssets?.numberOfBathrooms + " Kamar Mandi",
                                        img: "/icons/small-icons/properti-secondary/Vectorshower.svg"
                                    }} />
                                    <ListFaciltyDetailV2 type={{
                                        text: infoLelangData?.responseData?.buildingAssets?.surfaceArea + " m²",
                                        img: "/icons/small-icons/properti-secondary/LT_Normal.svg"
                                    }} />
                                    <ListFaciltyDetailV2 type={{
                                        text: infoLelangData?.responseData?.buildingAssets?.buildingArea + " m²",
                                        img: "/icons/small-icons/properti-secondary/LB_Normal.svg"
                                    }} />
                                    <ListFaciltyDetailV2 type={{
                                        text: infoLelangData?.responseData?.buildingAssets?.carport + " Mobil",
                                        img: "/icons/small-icons/properti-secondary/Vectorgarage.svg"
                                    }} />
                                </div>
                            </div>
                        </div>
                        {!_.isNull(infoLelangData) && !loadingDtlUnit ?
                        <div className="prj-detail__detailCluster mt-5">
                            <div className="prod-detail__pages__property__detailBuying__left__description__wrapper">
                                <p className="prod-detail__pages__property__detailBuying__left__description__titleDesc">
                                Deskripsi
                                </p>
                                <p className="prod-detail__pages__property__detailBuying__left__description__desc">
                                {infoLelangData?.responseData?.description}
                                </p>
                                {infoLelangData?.responseData?.detailProperti?.inDevelopment && infoLelangData?.responseData?.detailProperti?.inDevelopment === true ? ( <p className="prod-detail__pages__property__detailBuying__left__description__desc">*Properti masih dalam tahap pembangunan</p>) : ""}
                            </div>
                            <div className="prj-detail__informasiRumahWrap">
                                { buildingAssets?.[0]?.akses.some(item => {
                                    const value = Object.values(item)[0]
                                    return value === true
                                }) &&
                                    <DetailsCard title="Akses">
                                        <div className="grid grid-cols-3 gap-4">
                                            {buildingAssets?.[0]?.akses && 
                                                buildingAssets?.[0]?.akses.map((item, index) => {
                                                    const key = Object.keys(item)[0]
                                                    const value = item[key]
                                                    if (value) {
                                                        const typeKey = convertToTypeKey(key)
                                                        if (ListFacilityType.type[typeKey]) {
                                                            return <ListFaciltyDetailV2 key={index} type={ListFacilityType.type[typeKey]} />
                                                        }
                                                    }
                                                })
                                            }
                                        </div>
                                    </DetailsCard>
                                }
                                { buildingAssets?.[1]?.fasilitas.some(item => {
                                    const value = Object.values(item)[0]
                                    return value === true
                                }) && 
                                    <DetailsCard title="Fasilitas">
                                        <div className="grid grid-cols-3 gap-4">
                                            {buildingAssets?.[1]?.fasilitas && 
                                                    buildingAssets?.[1]?.fasilitas.map((item, index) => {
                                                        const key = Object.keys(item)[0]
                                                        const value = item[key]
                                                        if (value) {
                                                            const typeKey = convertToTypeKey(key)
                                                            if (ListFacilityType.infoLelangFacilities[typeKey]) {
                                                                return <ListFaciltyDetailV2 key={index} type={ListFacilityType.infoLelangFacilities[typeKey]} />
                                                            }
                                                        }
                                                    })
                                                }
                                        </div>
                                    </DetailsCard>
                                }
                                <DetailsCard title="Informasi Properti">
                                <div className="grid grid-cols-2 gap-4">
                                    <PropertyInfo title="Tipe Properti" value={infoLelangData?.responseData?.subCategoryName ? (toTitleCase(infoLelangData?.responseData?.subCategoryName)) : "-"} />
                                    <PropertyInfo title="Luas Tanah" value={infoLelangData?.responseData?.buildingAssets?.surfaceArea + " m²"} />
                                    <PropertyInfo title="Luas Bangunan" value={infoLelangData?.responseData?.buildingAssets?.buildingArea + " m²"} />
                                    <PropertyInfo title="Kamar Tidur" value={infoLelangData?.responseData?.buildingAssets?.numberOfBedrooms + " Kamar"} />
                                    <PropertyInfo title="Kamar Mandi" value={infoLelangData?.responseData?.buildingAssets?.numberOfBathrooms  + " Kamar Mandi"} />
                                    <PropertyInfo title="Sertifikat" value={(infoLelangData?.responseData?.buildingAssets?.certificateTypeName)?.toUpperCase()} />
                                    <PropertyInfo title="Jumlah Lantai" value={infoLelangData?.responseData?.buildingAssets?.numberOfFloors ? infoLelangData?.responseData?.buildingAssets?.numberOfFloors + " Lt" : '-'} />
                                    <PropertyInfo title="Kondisi Properti" value="Bekas" />
                                    <PropertyInfo title="Daya Listrik" value={infoLelangData?.responseData?.buildingAssets?.electricalPower ? infoLelangData?.responseData?.buildingAssets?.electricalPower + " kwh" : '-'} />
                                    <PropertyInfo title="Hadap" value={infoLelangData?.responseData?.buildingAssets?.direction ? toTitleCase(infoLelangData?.responseData?.buildingAssets?.direction) : '-'} />
                                    {(infoLelangData?.responseData?.buildingAssets?.carport !== 0) && <PropertyInfo title="Jumlah Garasi" value="1" />}
                                    <PropertyInfo title="Tahun Bangun" value={infoLelangData?.responseData?.buildingAssets?.buildYear} />
                                </div>
                                </DetailsCard>
                                <DetailsCard title="Alamat">
                                <div className="prod-detail__pages__property__detailBuying__left__address__colWrapper">
                                    <div className="prod-detail__pages__property__detailBuying__left__address__addressWrapper">
                                    <img
                                        className="prod-detail__pages__property__detailBuying__left__address__icon"
                                        src="/icons/small-icons/properti-secondary/VectorpinV2.svg"
                                        alt="pin-icon"
                                    />
                                    <p className="prod-detail__pages__property__detailBuying__left__description__desc">
                                        {infoLelangData?.responseData?.addresses?.address ? infoLelangData?.responseData?.addresses?.address : ""}
                                    </p>
                                    </div>
                                    {infoLelangData?.responseData?.addresses &&
                                    <img
                                        className="cursor-pointer mt-3"
                                        src={genStaticMapsUrl({
                                        size: "600x200",
                                        lat: Number(infoLelangData?.responseData?.addresses?.longitude),
                                        lng: Number(infoLelangData?.responseData?.addresses?.langitude)
                                        })}
                                        alt="gmaps-product-detail"
                                        onClick={() => {
                                            openLink(genClickToGmaps({ lat: Number(infoLelangData?.responseData?.addresses?.longitude), lng: Number(infoLelangData?.responseData?.addresses?.langitude) }), true)
                                        }}
                                    />
                                    }
                                </div>
                                </DetailsCard>
                                <div className="prj-detail__detailPrj">
                                    {cookie.get("morgateCookie") &&
                                    (decryptStr(JSON.parse(cookie.get("morgateCookie"))?.userType) !== "developer" ?
                                        <DetailsCard title="Pengembang">
                                        <div className="prod-detail__pages__property__detailBuying__left__dev-info__wrapper">
                                            <div className="prod-detail__pages__property__detailBuying__left__dev-info__profile-dev">
                                            <InitialsAvatar
                                                className="prod-detail__pages__property__detailBuying__left__dev-info__profile-pic"
                                                name={infoLelangData?.responseData?.contacts?. picName ? infoLelangData?.responseData?.contacts?. picName : "-"}
                                            />
                                            <div className="prod-detail__pages__property__detailBuying__left__dev-info__name pl-1">
                                                <p>{trimStr({ string: _.isJSON(infoLelangData?.responseData?.[0]?.metadataUser) ? (JSON?.parse(infoLelangData?.responseData?.[0]?.metadataUser)?.name).toString() : "Info Lelang", maxLength: 50 })}</p>
                                                <p className="prod-detail__pages__property__detailBuying__left__dev-info__location">
                                                {infoLelangData?.responseData?.contacts?. picName ? infoLelangData?.responseData?.contacts?. picName : "-"}
                                                </p>
                                            </div>
                                            <div className="prod-detail__pages__property__detailBuying__left__dev-info__wa-btn">
                                                <Button buttonColor="greenWA" textColor="white" fullWidth={false} paddingSize={"padding-5"} onClick={() => openLink(`https://api.whatsapp.com/send?phone=${infoLelangData?.responseData?.contacts?.picPhone}`, true)}>
                                                <div className="flex flex-row gap-2 justify-center">
                                                    <img src="/icons/small-icons/whatsapp.svg" alt="wa-icon" />
                                                    <p>WhatsApp</p>
                                                </div>
                                                </Button>
                                            </div>
                                            </div>
                                        </div>
                                        </DetailsCard>
                                        :
                                        <></>)
                                    }
                                </div>
                            </div>
                        </div> 
                        :
                        _.isNull(infoLelangData) && loadingDtlUnit ?
                        <div className="prj-detail__loaderWrap">
                            <Oval
                                wrapperclassName="loader__oval"
                                ariaLabel="loading-indicator"
                                height={100}
                                width={100}
                                strokeWidth={5}
                                color="#00529C"
                                secondaryColor="#bbd7f0"
                            />
                        </div>
                        : <></>
                        }
                    </div>
                    <div className="prj-detail__pageRight">
                        <>
                            <RightPageInfolelang
                                gimmickOptions={gimmickOptions}
                                hargaAkhir={inputs?.hargaAkhir?.value}
                                hargaProperti={inputs?.hargaProperti?.value}
                                allData={infoLelangData?.responseData}
                                dataInputCalc={dataInputCalc}
                                setDataInputCalc={setDataInputCalc}
                                setShowListPropCompare={setShowListPropCompare}
                                bookedStat={infoLelangData?.responseData?.bookedStatus}
                                soldoutStat={infoLelangData?.responseData?.isSoldOut}
                            />
                        </>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

const ListFaciltyDetailV2 = ({type}) => {
    return(
        <div className="prod-detail__pages__property__detailBuying__left__list-facility__wrapper">
            <div className="prod-detail__pages__property__detailBuying__left__list-facility__title">
                <img className="place-self-center w-5" src={type !== "" ? type.img : ""} alt="icons" />
                <p className="prod-detail__pages__property__detailBuying__left__list-facility__text font-normal">{type !== "" ? type.text : ""}</p>
            </div>
        </div>
    )
}

export default DetailProduct