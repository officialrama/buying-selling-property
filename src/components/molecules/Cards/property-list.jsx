import React from "react";
import _ from "lodash-contrib";
import {formatRupiahWord} from "../../../helpers/string";
import {CarouselThumbImage} from "..";
import {openLink} from "../../../helpers/newTab";
import { decryptStr } from "../../../helpers/encryptDecrypt";
// landing-page property nearby & 360

const PropertyList = ({index, data, isVirtual, onClick, resSearch, onClickDelete}) => {

    const handleCarouselClick = (event) => {
        event.stopPropagation(); 
    };

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
        }else {
            return str.toLowerCase().replace(/(^|\s)\S/g, (letter) => letter.toUpperCase());
        }
    };

    const handleLink = () => {
        const propertiSecond = data?.detailProperti?.groupProperti !== null ? decryptStr(data?.detailProperti?.groupProperti)?.split("|")[1] === "PROPERTI_SECONDARY" ? true : false : false
        if(propertiSecond){
            return `/unit-details/${encodeURIComponent(data?.detailProperti?.id)}?secondary=true`
        }else{
            return `/project-details/${encodeURIComponent(data?.project?.id)}`
        }
    }


    return (
        <div key={index} className="h-[346px] px-3"
             onClick={() => {
                const propertiSecond = data?.detailProperti?.groupProperti !== null ? decryptStr(data?.detailProperti?.groupProperti)?.split("|")[1] === "PROPERTI_SECONDARY" ? true : false : false
                window.location.href = handleLink();
                if(propertiSecond){
                        localStorage.setItem("detailUnit", JSON.stringify({
                            "diskonNominal": data?.detailProperti?.diskonNominal,
                            "diskonPersen": data?.detailProperti?.diskonPersen,
                            "hargaAkhir": data?.detailProperti?.hargaAkhir,
                            "hargaProperti": data?.detailProperti?.hargaProperti
                        }
                    ))
                }else{
                    localStorage.setItem("hargaProperti", JSON.stringify({
                            "diskonNominal": data?.detailProperti?.diskonNominal,
                            "diskonPersen": data?.detailProperti?.diskonPersen,
                            "hargaAkhir": data?.detailProperti?.hargaAkhir,
                            "hargaProperti": data?.detailProperti?.hargaProperti
                        }
                    ))
                }
             }}>
            <div
                className="h-full xxl:max-w-[451px] miniPc:max-w-[384px] small:max-w-[318px] smallPc:max-w-[384px] largePc:max-w-[264px] bg-white border border-gray-200 rounded-xl shadow dark:bg-gray-800 dark:border-gray-700 items-center rounded-t-xl">
                <div className="w-full flex-shrink-0 relative" onClick={handleCarouselClick}>
                    <CarouselThumbImage
                        imgSrc={data?.imagesProject}
                        isVirtual={data?.project?.mediaProject?.virtual360Url?.indexOf('http') === -1 ? false : true}
                        imgClassName="h-32 w-[28.1rem]"
                        v360Link={() => openLink(data?.project?.mediaProject?.virtual360Url, true)}
                        virtualClassName="rounded-3xl"
                        diskonPersen={data?.detailProperti?.diskonPersen}
                        diskonNominal={data?.detailProperti?.diskonNominal}
                        dataCluster={data?.totalCluster}
                        secondary={data?.detailProperti?.isPropertiSecond}
                        Classes={'-left-[1.6rem]'}
                    />
                </div>
                <div className="cursor-default flex flex-col justify-between h-[218px]">
                    <div>
                        <div className="flex flex-col mt-3 px-4">
                        {typeof data?.totalUnit !== "undefined" && data?.totalUnit > 1 && (
                            <span className="text-xs text-[#777777]">Mulai dari</span>
                        )}
                        {data?.detailProperti?.diskonNominal !== null  || data?.detailProperti?.diskonPersen !== null ?
                        <div className="flex flex-row">
                            <span className="text-sm text-[#B5B6B6] font-normal line-through">
                            {formatRupiahWord(data?.detailProperti?.hargaProperti)}   
                            </span>
                            <span
                                    // className="text-[#1078CA] px-4 font-bold text-sm tab:text-[10px] smallPc:text-[10px] xxl:text-lg">{formatRupiahWord(data?.project?.kisaranHarga?.split(",")[0]) + " - " + formatRupiahWord(data?.project?.kisaranHarga?.split(",")[1])}</span>
                                    className="text-[#1078CA] px-2 -mt-1 font-bold text-lg">{ formatRupiahWord(data?.detailProperti?.hargaAkhir) }
                                </span>   
                            </div> : <></>}
                            {data?.detailProperti?.hargaAkhir === data?.detailProperti?.hargaProperti && data?.detailProperti?.diskonNominal === null && data?.detailProperti?.diskonPersen === null &&
                            <span
                                    // className="text-[#1078CA] px-4 font-bold text-sm tab:text-[10px] smallPc:text-[10px] xxl:text-lg">{formatRupiahWord(data?.project?.kisaranHarga?.split(",")[0]) + " - " + formatRupiahWord(data?.project?.kisaranHarga?.split(",")[1])}</span>
                                    className="text-[#1078CA] font-bold text-lg">{formatRupiahWord(data?.detailProperti?.hargaAkhir) }
                                </span> 
                            }                           
                            </div>
                        <div className="flex px-4 mt-3">
                            <span
                                className={`font-bold text-base mobile:text-sm tab:text-sm smallPc:text-sm overflow-hidden line-clamp-2`}>{data?.project?.namaProyek}</span>
                        </div>
                    </div>
                    <div className="flex flex-col px-4 mobile:py-6 bottom-0">
                        <span
                            className="text-xs text-[#777777] flex-grow capitalize tab:fontsize__small smallPc:fontsize__small pb-3">{_.isJSON(data?.project?.alamatProperti?.alamat) ? capitalizeEveryWord(JSON.parse(data?.project?.alamatProperti?.alamat)?.kabupaten) : ""}, {_.isJSON(data?.project?.alamatProperti?.alamat) ? capitalizeEveryWord(JSON.parse(data?.project?.alamatProperti?.alamat)?.provinsi) : ""}</span>
                        {typeof data?.totalCluster === 'undefined' ?(
                            <span
                            className="text-xs text-[#777777] tab:fontsize__small smallPc:fontsize__small pb-3">{data?.detailProperti?.jmlKmrTidur} KT • {data?.detailProperti?.jmlKmrMandi} KM • LB {data?.detailProperti?.lb}m2 • LT {data?.detailProperti?.lt}m2
                        </span>
                        ):(
                         <span
                            className="text-xs text-[#777777] tab:fontsize__small smallPc:fontsize__small pb-3">{data?.totalCluster} cluster, {data?.totalUnit} unit
                         </span>)}
                         <div className={`pb-3 ${(data?.detailProperti?.groupProperti !== null ? decryptStr(data?.detailProperti?.groupProperti)?.split("|")[1] === "PROPERTI_SECONDARY" : false) === true ? 'opacity-100' : 'opacity-0'}`}>
                            <div className="bg-[#FCF2D2] rounded-full w-fit p-2">
                                <p className="font-semibold text-[#DEAB10] text-[10px]">Properti Secondary</p>
                            </div>
                         </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PropertyList;
