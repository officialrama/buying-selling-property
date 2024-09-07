import React, { useEffect, useState } from "react"
import Carousel from "react-grid-carousel"
import _ from "lodash-contrib";
import {formatRupiahNumber, formatRupiahWord} from "../../../helpers/string";
import {CarouselThumbImage} from "../../molecules";
import {openLink} from "../../../helpers/newTab";
import { encryptStr } from "../../../helpers/encryptDecrypt";

const CarouselDetail = ({isProject, property, typeCarousel, is360, cols = false}) => {
    const [ imgCount, setImgCount ] = useState()
    useEffect(() => {
        setImgCount({
            ...imgCount,
            current: 1,
            total: 4
        })
    }, [])
    
    return (
        <div className="landing-page city-carousel relative">
            <Carousel
                cols={cols}
                rows={1}
                gap={0}
                loop
                hideArrow={ (property?.properties ? (property?.properties !== null && property?.properties?.length < 5) : (property?.length < 5)) }
            >
                {typeCarousel === "recommendation" ? (
                    property?.map((data, idx) => {
                        return (
                            <Carousel.Item key={idx}>
                                <PropertyList
                                    isType={typeCarousel}
                                    isProject={isProject}
                                    index={idx}
                                    data={data}
                                    onClick={false}
                                    resSearch={false}
                                />
                            </Carousel.Item>
                        )
                    })
                ) : (
                    property?.properties?.map((propertyData, idx) => {
                        const images = property?.propertiImagesMap;
                        return (
                            <Carousel.Item key={idx}>
                                <PropertyList
                                    isType={typeCarousel}
                                    isProject={isProject}
                                    index={idx}
                                    data={propertyData}
                                    images={images}
                                    onClick={false}
                                    resSearch={false}
                                />
                            </Carousel.Item>
                        );
                    })
                )}
            </Carousel>
        </div>
    )
}

const PropertyList = ({isProject, index, data, images, isType, onClick}) => {

    let keys = (isType === "recommendation" ? null : Object.keys(images) )
    const imageRecommendation = [
        {sharedUrl: (data?.imageUrl) ? data?.imageUrl : data?.imagesProject?.[0]?.sharedUrl}
    ]
    
    const image = (isType === "recommendation" ? imageRecommendation : images[keys[0]] )

    const handleCarouselClick = (event) => {
        event.stopPropagation()
    };

    let diskon
    if(isType === "recommendation" && isProject){
        diskon = {
            persen: (data?.properiPrep?.maxDiscountPersen) ?  data?.properiPrep?.maxDiscountPersen : "0",
            nominal: (data?.properiPrep?.maxDiscountNominal) ?  data?.properiPrep?.maxDiscountNominal : "0",
            isDiscount: (data?.properiPrep?.maxDiscountPersen !== "0" && data?.properiPrep?.maxDiscountPersen !== "" && data?.properiPrep?.maxDiscountPersen !== null) || (data?.properiPrep?.maxDiscountNominal !== "0" && data?.properiPrep?.maxDiscountNominal !== "" && data?.properiPrep?.maxDiscountNominal !== null)
        }
    }else if(isType === "recommendation" && !isProject){
        diskon = {
            persen: (data?.diskonPersen) ? data?.diskonPersen : "0",
            nominal: (data?.diskonNominal) ? data?.diskonNominal : "0",
            isDiscount: (data?.diskonPersen !== "0" && data?.diskonPersen !== "" && data?.diskonPersen !== null) || (data?.diskonNominal !== "0" && data?.diskonNominal !== "" && data?.diskonNominal !== null)
        }
    }else{
        diskon = {
            persen: (data?.diskonPersen) ? data?.diskonPersen : "0",
            nominal: (data?.diskonNominal) ? data?.diskonNominal : "0",
            isDiscount: (data?.diskonPersen !== "0" && data?.diskonPersen !== "" && data?.diskonPersen !== null) || (data?.diskonNominal !== "0" && data?.diskonNominal !== "" && data?.diskonNominal !== null)
        }
    }


    const capitalizeEveryWord = (str) => {
        if (str === "DKI JAKARTA") {
            return "DKI Jakarta";
        }else if (str === "Daerah Khusus Ibukota Jakarta"){
            return "DKI Jakarta";
        }else if (str === "Daerah Istimewa Yogyakarta"){
            return "D.I. Yogyakarta"
        }else if (str === "D.I. YOGYAKARTA") {
            return "D.I. Yogyakarta";
        }else if (str === "Special Region of Yogyakarta") {
            return "D.I. Yogyakarta";
        } else {
            return str
        }
    };

    const goToDetail = () => {
        if(isProject && isType === "recommendation"){
            window.location.href = `/project-details/${encodeURIComponent(encryptStr(data?.id.toString()))}?fromrecommendation=true`
                localStorage.setItem("hargaProperti", JSON.stringify({
                    "diskonNominal": diskon?.nominal,
                    "diskonPersen": diskon?.persen,
                    "hargaAkhir": data?.properiPrep?.hargaAkhir,
                    "hargaProperti": data?.properiPrep?.hargaProperti
                }
            ))
        } else if (!isProject && isType === "recommendation"){
            window.location.href = `/unit-details/${encodeURIComponent(encryptStr(data?.idProperti.toString()))}?fromneosearch=true`
                localStorage.setItem("detailUnit", JSON.stringify({
                    "diskonNominal": diskon?.nominal,
                    "diskonPersen": diskon?.persen,
                    "hargaAkhir": data?.hargAkhir,
                    "hargaProperti": data?.hargaProperti
                }
            ))
        } else if (isProject && isType !== "recommendation" ) {
            window.location.href = `/unit-details/${encodeURIComponent(data?.id)}`
                localStorage.setItem("detailUnit", JSON.stringify({
                    "diskonNominal": diskon?.nominal,
                    "diskonPersen": diskon?.persen,
                    "hargaAkhir": data?.hargaAkhir,
                    "hargaProperti": data?.hargaProperti
                }
            ))
        }
    }

    const handle360 = (type) => {
        if(type !== "link"){
            if(isProject){
                if(isType !== "recommendation"){
                    return data?.mediaProperti?.virtual360Url?.indexOf('http') === -1 || data?.mediaProperti?.virtual360Url === null ? false : true
                }else if(isType === "recommendation") {
                    return data?.mediaProject?.virtual360Url?.indexOf('http') === -1 || data?.mediaProject?.virtual360Url === null ? false : true
                }else{
                    return false
                }
            }else{
                if(isType === "recommendation"){
                    return false
                }
            }
        }else{
            if(isProject){
                if(isType !== "recommendation"){
                    openLink(data?.mediaProperti?.virtual360Url, true)
                }else if(isType === "recommendation") {
                    openLink(data?.mediaProject?.virtual360Url, true)
                }else{
                    return null
                }
            }else{
                if(isType === "recommendation"){
                    openLink(data?.mediaProject?.virtual360Url, true)
                }
            }
        }
    }

    // console.log(`handle 360 function detector as ${isType}`, handle360())

    return (
        <div key={index} className="relative max-h-[346px] px-3" onClick={() => goToDetail()}>
            <div 
                className={`
                    max-w-sm
                    xxl:max-w-[318px]
                    miniPc:max-w-[318px]
                    smallPc:max-w-[318px]
                    largePC:max-w-[220px]
                    bg-white border 
                    border-gray-200 
                    rounded-lg shadow 
                    dark:bg-gray-800 
                    dark:border-gray-700 
                    items-center 
                    ${isType === "recommendation" ? "h-[300px]" : "h-80"} rounded-t-xl`
                }
            >
                <div className="relative w-full flex-shrink-0" onClick={handleCarouselClick}>
                    <CarouselThumbImage
                        imgSrc={image}
                        isDetail={true}
                        isVirtual={handle360("virtual")}
                        v360Link={() => handle360("link")}
                        imgClassName="h-32 w-96"
                        virtualClassName="rounded-3xl"
                        diskonPersen={diskon?.persen}
                        diskonNominal={diskon?.nominal}
                        Classes={'-left-[1.65rem]'}
                    />
                </div>
                <div className="cursor-default">
                    <div className="flex flex-row gap-2 mt-3 px-4">
                        {diskon?.isDiscount ? (
                        <>
                        <span className="text-[#B5B6B6] font-light text-sm tab:text-[10px] smallPc:text-[10px] xxl:text-md line-through">{ formatRupiahWord(data?.hargaProperti || data?.properiPrep?.hargaProperti) }</span>                            
                        <span className="text-[#1078CA] font-bold text-sm tab:text-[10px] smallPc:text-[10px] xxl:text-lg">{ isType === "recommendation" ? formatRupiahWord(data?.hargAkhir || data?.properiPrep?.hargaAkhir ) : formatRupiahWord(data?.hargaAkhir || data?.properiPrep?.hargaAkhir ) }</span>
                        </>) : (
                            <>
                            <span className="text-[#1078CA] font-bold text-sm tab:text-[10px] smallPc:text-[10px] xxl:text-lg">{ isType === "recommendation" ? formatRupiahWord(data?.hargAkhir || data?.properiPrep?.hargaAkhir ) : formatRupiahWord(data?.hargaAkhir || data?.properiPrep?.hargaAkhir ) }</span>
                            </>
                        )}                            
                    </div>
                    <div className="flex flex-col gap-1 mt-6 px-4">
                        { isType === "recommendation" ? (
                            <span className={`font-bold text-base tab:text-sm smallPc:text-sm overflow-hidden`}>{(data?.namaProperti) ? data?.namaProperti : data?.namaProyek }</span>
                        ) : (
                            <>
                                <span className={`font-bold text-base tab:text-sm smallPc:text-sm overflow-hidden`}>{`Tipe ${data?.lb}`}</span>
                                <span className={`font-medium text-base tab:text-sm smallPc:text-sm text-[#777777] text-[12px] overflow-hidden`}>{data?.namaProperti}</span>
                            </>
                        ) }
                    </div>
                    <div className={`landing-page__custom-box absolute flex flex-col px-4 ${isType === "recommendation" ? "mt-2" : "mt-8"} `} >
                        { isType === "recommendation" ? (
                            <span
                            className="text-xs text-[#777777] flex-grow capitalize tab:fontsize__small smallPc:fontsize__small">{ isProject ? (_.isJSON(data?.alamatProperti?.alamat) ? JSON.parse(data?.alamatProperti?.alamat)?.kabupaten + ", " + capitalizeEveryWord(JSON.parse(data?.alamatProperti?.alamat)?.provinsi) : "-") : (JSON.parse(data?.alamat) ? JSON.parse(data?.alamat)?.kabupaten + ", " + capitalizeEveryWord(JSON.parse(data?.alamat)?.provinsi) : "-")}</span>
                        ) : (
                            <span
                            className="text-xs text-[#777777] flex-grow capitalize tab:fontsize__small smallPc:fontsize__small">{_.isJSON(data?.project?.alamatProperti?.alamat) ? capitalizeEveryWord(JSON.parse(data?.project?.alamatProperti?.alamat)?.provinsi) : ""}</span>
                        )
                        }
                        { isProject ? (
                                isType === "recommendation" ? (
                                    <span
                                    className="text-xs text-[#777777] tab:fontsize__small smallPc:fontsize__small mt-4">{ data?.totalCluster } Cluster, { data?.totalUnit } Unit</span>
                                ) : (
                                    <span
                                    className="text-xs text-[#777777] tab:fontsize__small smallPc:fontsize__small mt-4">{ (isType === "properti" ? data?.jmlKmrTidur : data?.kt) } KT • { isType === "properti" ? data?.jmlKmrMandi : data?.km } KM • LB {data?.lb}m² • LT {data?.lt}m²</span>
                                )
                            ) : (
                                <span
                                className="text-xs text-[#777777] tab:fontsize__small smallPc:fontsize__small mt-4">{ (isType === "recommendation" ? data?.kt : data?.jmlKmrTidur) } KT • { isType === "recommendation" ? data?.km : data?.jmlKmrMandi} KM • LB {data?.lb}m² • LT {data?.lt}m²</span>
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CarouselDetail