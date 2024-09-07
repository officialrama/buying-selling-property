import classNames from "classnames";
import _ from "lodash-contrib";
import ContentLoader from "react-content-loader";
import { Link } from "react-router-dom";
import { CarouselThumbImage, CategoryProp, PropFacility, ThumbImageInfoLelang } from "../../..";
import { openLink } from "../../../../../helpers/newTab";
import { formatRupiahWord, toTitleCase, trimStr } from "../../../../../helpers/string";
import { staticConst } from "../../../../../static/staticConst";
import { Button } from "../../../../atoms";
import { validateProperti } from "../../../../../store/actions/fetchData/info-lelang";
import { useDispatch } from "react-redux";


const ProjectPropertiSecondary = ({ index, data, isVirtual, onClick, resSearch, onClickDelete }) => {
  const dispatch = useDispatch();
  const savedProps = window.location.pathname.includes("/profile-user/saved-property");
  return (
    <div key={index} className={classNames(
      {
        "shadow bg-white border border-solid border-[#E4E7EC] my-4 rounded-lg": Boolean(savedProps || window.location.pathname.includes("/product-details"))
      },
      "hs-search-rslt__wrap"
    )}>
      {data ? (
        <>
          <div className="w-[250px] mobile:w-full tab:w-full">
            <ThumbImageInfoLelang
              imgSrc={data?.images}
              statusSold={data?.isSoldOut}
              statusBooked={data?.bookedStatus}
              isVirtual={data?.project?.mediaProject?.virtual360Url?.indexOf('http') === -1 ? false : true}
              imgClassName="h-64 mobile:h-32"
              v360Link={() => openLink(data?.project?.mediaProject?.virtual360Url, true)}
            />
          </div>
          <div
            className={classNames(
              {
                "w-full cursor-default": Boolean(savedProps)
              },
              "mobile:mt-[15px] tab:mt-[15px] smallPc:mt-[20px] w-[100%] cursor-pointer"
            )}
            onClick={onClick}
          >
            <div>
            <div className="hs-search-rslt__filter-wrap">
                {data?.tagCleanDesc && <CategoryProp tipeProperti={data?.tagCleanDesc ? toTitleCase?.(data?.tagCleanDesc) : ""} />}
                {data?.tagHotdealDesc && <CategoryProp tipeProperti={data?.tagHotdealDesc ? toTitleCase?.(data?.tagHotdealDesc) : ""} />}
              </div>
              <h3 className="hs-search-rslt__property-secondary w-[380px] mt-1 cursor-pointer" 
              onClick={() => {
                window.location.href = `properti-secondary/detail/${data?.id}`;
              }}>
                {data?.name}
              </h3>
              <p className="hs-search-rslt__location">
                {data?.addresses?.address + ", " + data?.addresses?.city}
              </p>
            </div>
            {data?.discountType === "persen" ?
                            <div>
                                <span
                                className="px-2 py-1 mx-0 text-sm tab:text-[10px] smallPc:text-[13px] xxl:text-[15px] bg-[#E84040] text-white font-semibold w-1/5 text-center rounded-xl">{`${data?.discountNominal}%`}</span>
                                <span className=" ml-1 text-[15px] text-[#777777] tab:fontsize__small smallPc:fontsize__small" style={{ textDecoration: 'line-through' }}>{formatRupiahWord(data?.priceBefore)}</span>
                            </div>
                            : 
              data?.discountType === "rupiah" ?
                            <div>
                                <span
                                className="px-2 py-1 mx-0 text-sm tab:text-[10px] smallPc:text-[13px] xxl:text-[15px] bg-[#E84040] text-white font-semibold w-1/5 text-center rounded-xl">{`${formatRupiahWord(data?.discountNominal)}`}</span>
                                <span className=" ml-1 text-[15px] text-[#777777] tab:fontsize__small smallPc:fontsize__small" style={{ textDecoration: 'line-through' }}>{formatRupiahWord(data?.priceBefore)}</span>
                            </div>
                            : '' }
              <span
              className="hs-search-rslt__price">{formatRupiahWord(data?.price)}</span>
             <br></br>               
            <div className="hs-search-rslt__dev-wrap mb-0">
              <div>
                <p className="hs-search-rslt__dev-value py-3">
                 Info Lelang BRI
                </p>
              </div>
              <div>
                {/* <Button buttonColor="blueLight" textColor="blue" className="text-xs" onClick={() => window.location.href = `/project-details/${encodeURIComponent(data?.project?.id)}`}>
                  Lihat Detail
                </Button> */}
              </div>
            </div>
            <div className="mt-10 w-[380px] rounded-t-xl flex flex-col border border-solid border-[#B7DFFE] overflow-hidden">
                <div className="flex flex-row justify-between w-full gap-4 p-2 text-xs">
                  <PropFacility
                    facIcons="/icons/small-icons/Bedroom.svg"
                    facName={
                      data?.buildingAssets?.numberOfBedrooms + " KT"
                    }
                  />
                  <PropFacility
                    facIcons="/icons/small-icons/Bathroom.svg"
                    facName={
                      data?.buildingAssets?.numberOfBathrooms + " KM"
                    }
                  />
                  {/* {data?.project?.fasilitasProperti?.garasi && (
                    <PropFacility
                      facIcons="/icons/small-icons/Garage-Car.svg"
                      facName="Garasi"
                    />
                  )} */}
                  <PropFacility
                    facIcons="/icons/small-icons/LB.svg"
                    facName={data?.buildingAssets?.buildingArea + " m²"}
                  />
                </div>
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

export default ProjectPropertiSecondary;
