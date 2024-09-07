import classNames from "classnames";
import _ from "lodash-contrib";
import ContentLoader from "react-content-loader";
import { Link } from "react-router-dom";
import { CarouselThumbImage } from "../../..";
import { openLink } from "../../../../../helpers/newTab";
import { formatRupiahWord, trimStr } from "../../../../../helpers/string";
import { staticConst } from "../../../../../static/staticConst";
import { Button } from "../../../../atoms";
import { decryptStr } from "../../../../../helpers/encryptDecrypt";


const ProjectSearchResult = ({ index, data, isVirtual, onClick, resSearch, onClickDelete, typeSearch }) => {
  const savedProps = window.location.pathname.includes("/profile-user/saved-property");
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
  return (
    <div key={index} className={classNames(
      {
        "shadow bg-white border border-solid border-[#E4E7EC] my-4 rounded-l-xl": Boolean(savedProps || window.location.pathname.includes("/product-details"))
      },
      "hs-search-rslt__wrap"
    )}>
      {data ? (
        <>
          <div className="mobile:w-full w-[350px] tab:w-full">
            <CarouselThumbImage
              Classes='left-5'
              imgSrc={data?.imagesProject}
              isVirtual={data?.project?.mediaProject?.virtual360Url?.indexOf('http') === -1 ? false : true}
              imgClassName="h-64 mobile:h-32 rounded-xl"
              v360Link={() => openLink(data?.project?.mediaProject?.virtual360Url, true)}
              diskonNominal={data?.detailProperti?.diskonNominal}
              diskonPersen={data?.detailProperti?.diskonPersen}
              dataCluster={data?.totalCluster}
            />
          </div>
          <div
            className={classNames(
              {
                "w-full cursor-default": Boolean(savedProps)
              },
              "mobile:mt-[15px] tab:mt-[15px] smallPc:mt-[20px] w-[100%] -ml-5 cursor-pointer"
            )}
            onClick={onClick}
          >

              <div className="flex flex-col mt-3 px-4">
                     {typeSearch !== 'second' && (data?.totalCluster > 0 || data?.totalUnit > 1) &&   
                    <span className="text-xs text-[#777777]">
                        Mulai dari
                    </span>}
                    {data?.detailProperti?.diskonPersen !== null && data?.detailProperti?.diskonPersen !== "" && data?.detailProperti?.diskonPersen !== "0" &&
                    <div className="flex flex-row">
                        <span className="text-sm text-[#B5B6B6] font-normal line-through">
                         {formatRupiahWord(data?.detailProperti?.hargaProperti)}   
                        </span>
                        <span
                                // className="text-[#1078CA] px-4 font-bold text-sm tab:text-[10px] smallPc:text-[10px] xxl:text-lg">{formatRupiahWord(data?.project?.kisaranHarga?.split(",")[0]) + " - " + formatRupiahWord(data?.project?.kisaranHarga?.split(",")[1])}</span>
                                className="text-[#1078CA] px-2 -mt-1 font-bold text-lg">{ formatRupiahWord(data?.detailProperti?.hargaAkhir) }
                            </span>  
                        </div>}
                       {data?.detailProperti?.diskonNominal !== null && data?.detailProperti?.diskonNominal !== "" && data?.detailProperti?.diskonNominal !== "0" &&
                       <div className="flex flex-row">
                        <span className="text-sm text-[#B5B6B6] font-normal line-through">
                        {formatRupiahWord(data?.detailProperti?.hargaProperti)}   
                        </span>
                        <span
                                // className="text-[#1078CA] px-4 font-bold text-sm tab:text-[10px] smallPc:text-[10px] xxl:text-lg">{formatRupiahWord(data?.project?.kisaranHarga?.split(",")[0]) + " - " + formatRupiahWord(data?.project?.kisaranHarga?.split(",")[1])}</span>
                                className="text-[#1078CA] px-2 -mt-1 font-bold text-lg">{ formatRupiahWord(data?.detailProperti?.hargaAkhir) }
                            </span>   
                        </div>}
                        {data?.detailProperti?.hargaAkhir === data?.detailProperti?.hargaProperti && data?.detailProperti?.diskonNominal === null && data?.detailProperti?.diskonPersen === null &&
                          <span
                                // className="text-[#1078CA] px-4 font-bold text-sm tab:text-[10px] smallPc:text-[10px] xxl:text-lg">{formatRupiahWord(data?.project?.kisaranHarga?.split(",")[0]) + " - " + formatRupiahWord(data?.project?.kisaranHarga?.split(",")[1])}</span>
                                className="text-[#1078CA] font-bold text-lg">{formatRupiahWord(data?.detailProperti?.hargaAkhir) }
                            </span> 
                         }                           
                        </div>
                        <div className="flex px-4 mt-6">
                        <span
                            className={`font-bold text-base mobile:text-sm tab:text-sm smallPc:text-sm overflow-hidden`} onClick={() =>  window.location.href = `/project-details/${encodeURIComponent(data?.project?.id)}`}>{data?.project?.namaProyek}</span>
                    </div>
                    <div className="landing-page__custom-box flex flex-col px-4 py-6 mobile:py-6 gap-3 mobile:gap-4">
                        <span
                            className="text-xs text-[#777777] flex-grow capitalize tab:fontsize__small smallPc:fontsize__small">{_.isJSON(data?.project?.alamatProperti?.alamat) ? capitalizeEveryWord(JSON.parse(data?.project?.alamatProperti?.alamat)?.kabupaten) : ""}, {_.isJSON(data?.project?.alamatProperti?.alamat) ? capitalizeEveryWord(JSON.parse(data?.project?.alamatProperti?.alamat)?.provinsi) : ""}</span>
                        {typeof data?.totalCluster === 'undefined' ?(
                            <span
                            className="text-xs text-[#777777] tab:fontsize__small smallPc:fontsize__small">{data?.detailProperti?.jmlKmrTidur} KT • {data?.detailProperti?.jmlKmrMandi} KM • LB {data?.detailProperti?.lb}m2 • LT {data?.detailProperti?.lt}m2
                        </span>
                        ):(
                         <span
                            className="text-xs text-[#777777] tab:fontsize__small smallPc:fontsize__small">{data?.totalCluster} cluster, {data?.totalUnit} unit
                         </span>)}
                         {decryptStr(data?.detailProperti?.groupProperti)?.split("|")[1] === "PROPERTI_SECONDARY" && (
                            <div className="bg-[#FCF2D2] rounded-full w-fit p-2">
                                <p className="font-semibold text-[#DEAB10] text-[10px]">Properti Secondary</p>
                            </div>
                         )}                    
                    </div>
                            
          </div>
        </>
      ) : (
        <></>
      )}
      {!data && !resSearch ?
        (<>
          <ContentLoader
            width={700}
            height={300}
            viewBox="0 0 700 300"
            backgroundColor="#f5f5f5"
            foregroundColor="#dbdbdb"
          >
            <rect x="4" y="8" rx="3" ry="3" width="7" height="288" />
            <rect x="6" y="289" rx="3" ry="3" width="669" height="8" />
            <rect x="670" y="9" rx="3" ry="3" width="6" height="285" />
            <rect x="55" y="42" rx="16" ry="16" width="274" height="216" />
            <rect x="412" y="113" rx="3" ry="3" width="102" height="7" />
            <rect x="402" y="91" rx="3" ry="3" width="178" height="6" />
            <rect x="405" y="139" rx="3" ry="3" width="178" height="6" />
            <rect x="416" y="162" rx="3" ry="3" width="102" height="7" />
            <rect x="405" y="189" rx="3" ry="3" width="178" height="6" />
            <rect x="5" y="8" rx="3" ry="3" width="669" height="7" />
            <rect x="406" y="223" rx="14" ry="14" width="72" height="32" />
            <rect x="505" y="224" rx="14" ry="14" width="72" height="32" />
            <rect x="376" y="41" rx="3" ry="3" width="231" height="29" />
          </ContentLoader>
        </>)
        :
        <></>
      }
      {!data && resSearch?.responseCode === "99" ?
        <p className="hs-search-rslt__notfound">Data tidak ditemukan.</p>
        :
        <></>
      }
    </div>
  );
};

export default ProjectSearchResult;
