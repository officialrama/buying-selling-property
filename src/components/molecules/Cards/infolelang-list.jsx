import React, { useEffect, useState } from "react";
import _ from "lodash-contrib";
import {formatRupiahWord} from "../../../helpers/string";
import {CarouselThumbImage, ThumbImageInfoLelang} from "..";
import {openLink} from "../../../helpers/newTab";
// landing-page property nearby & 360

const InfolelangList = ({index, data}) => {
    const handleCarouselClick = (event) => {
        event.stopPropagation();
    };

    const ellipsisText = (text, maxLength) => {
        if (text.length <= maxLength) {
          return text;
        }
        return text.substring(0, maxLength) + '...';
      };


    return (
        <div key={index} className="pl-7 relative h-[346px]"
             onClick={() => window.location.href = `/properti-secondary/detail/${encodeURIComponent(data?.id)}`}>
            <div
                className="xxl:max-w-[384px] miniPc:max-w-[384px] smallPc:max-w-[384px] largePc:max-w-[264px] bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 items-center h-80 rounded-t-xl">
                <div className="w-full flex-shrink-0" onClick={handleCarouselClick}>
                <ThumbImageInfoLelang
                    imgSrc={data?.images}
                    statusSold={data?.isSoldOut}
                    statusBooked={data?.bookedStatus}
                    isVirtual={data?.project?.mediaProject?.virtual360Url?.indexOf('http') === -1 ? false : true}
                    imgClassName="h-32 w-[28.1rem]"
                    v360Link={() => openLink(data?.project?.mediaProject?.virtual360Url, true)}
                    diskonTipe={data?.discountType}
                    diskonNominal={data?.discountNominal}
                    />
                </div>
                <div className="cursor-default">
                    <div className="flex flex-col mt-3 px-4">
                    {data?.price !== data?.priceBefore ?
                    <div className="flex flex-row">
                        <span className="text-sm text-[#B5B6B6] font-normal line-through">
                         {formatRupiahWord(data?.priceBefore)}   
                        </span>
                        <span
                                // className="text-[#1078CA] px-4 font-bold text-sm tab:text-[10px] smallPc:text-[10px] xxl:text-lg">{formatRupiahWord(data?.project?.kisaranHarga?.split(",")[0]) + " - " + formatRupiahWord(data?.project?.kisaranHarga?.split(",")[1])}</span>
                                className="text-[#1078CA] px-2 -mt-1 font-bold text-lg">{ formatRupiahWord(data?.price) }
                            </span>  
                        </div>
                          : <span
                                // className="text-[#1078CA] px-4 font-bold text-sm tab:text-[10px] smallPc:text-[10px] xxl:text-lg">{formatRupiahWord(data?.project?.kisaranHarga?.split(",")[0]) + " - " + formatRupiahWord(data?.project?.kisaranHarga?.split(",")[1])}</span>
                                className="text-[#1078CA] font-bold text-lg">{formatRupiahWord(data?.price) }
                            </span>
                        }                          
                        </div>
                    <div className="flex px-4 mt-6">
                        <span
                            className={`font-bold text-base mobile:text-sm tab:text-sm smallPc:text-sm overflow-hidden`}>{ellipsisText(data?.name, 40)}</span>
                    </div>
                    <div className="landing-page__custom-box absolute flex flex-col px-4 py-11 mobile:py-5 gap-6 mobile:gap-4">
                        <span
                            className="text-xs text-[#777777] flex-grow capitalize tab:fontsize__small smallPc:fontsize__small">{data?.addresses?.city}, {data?.addresses?.province}</span>
                        {typeof data?.totalCluster === 'undefined' ?(
                            <span
                            className="text-xs text-[#777777] tab:fontsize__small smallPc:fontsize__small">{data?.buildingAssets?.numberOfBedrooms} KT • {data?.buildingAssets?.numberOfBathrooms} KM • LB {data?.buildingAssets?.buildingArea}m2 • LT {data?.buildingAssets?.surfaceArea}m2
                        </span>
                        ):(
                         <span
                            className="text-xs text-[#777777] tab:fontsize__small smallPc:fontsize__small">{data?.totalCluster} cluster, {data?.totalUnit} unit
                         </span>)}                        
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InfolelangList;
