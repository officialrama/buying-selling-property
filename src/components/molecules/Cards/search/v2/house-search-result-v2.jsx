import classNames from "classnames";
import _ from "lodash-contrib";
import ContentLoader from "react-content-loader";
import { Link } from "react-router-dom";
import { CarouselThumbImage, CategoryProp, PropFacility } from "../../..";
import { openLink } from "../../../../../helpers/newTab";
import { toTitleCase, trimStr, formatRupiahWord, formatRupiahNumber } from "../../../../../helpers/string";
import { Button } from "../../../../atoms";
const convertRupiah = require("rupiah-format");

const HouseCardSearchResultV2 = ({ index, data, dataImg, isVirtual, onClick, resSearch, onClickDelete }) => {
  const savedProps = window.location.pathname.includes("/profile-user/saved-property");
  // console.log("[DEBUG] dataImg : ", dataImg);
  return (
    <div key={index} className={classNames(
      {
        "shadow bg-white border border-solid border-[#E4E7EC] my-4 rounded-lg" : Boolean(savedProps || window.location.pathname.includes("/product-details"))
      },
      "hs-search-rslt__wrap"
    )}>
      {data ? (
        <>
          <div className="w-[250px] mobile:w-full tab:w-full">
            <CarouselThumbImage
              imgSrc={dataImg}
              isVirtual={isVirtual}
              imgClassName="h-64 mobile:h-32"
              v360Link={() => openLink(data?.mediaProperti?.virtual360Url, true)}
            />
          </div>
          <div
            className={classNames(
              "mobile:mt-[15px] tab:mt-[15px] smallPc:mt-[20px] w-full cursor-pointer"
            )}
            onClick={onClick}
          >
            <div>
              <div className="hs-search-rslt__filter-wrap">
                {data?.project?.tipeProperti && <CategoryProp tipeProperti={data?.project?.tipeProperti ? toTitleCase?.(data?.project?.tipeProperti) : ""} />}
                {data?.lb && <CategoryProp tipeProperti={`Tipe ${data?.lb}`}/>}
                {Boolean(savedProps) && <div className="ml-auto"><img className="admin-tbl__icon" src="/icons/small-icons/Delete.svg" alt="icon-delete" onClick={onClickDelete} /></div>}
              </div>
              <h3 className="hs-search-rslt__property">
                {data?.namaProperti}
              </h3>
              <p className="hs-search-rslt__location">
                {_.isJSON(data?.project?.alamatProperti?.alamat) ? `${(JSON.parse(data?.project?.alamatProperti?.alamat))?.kabupaten}, ${JSON.parse(data?.project?.alamatProperti?.alamat)?.provinsi}` : ""}
              </p>
            </div>
            <div>
            {data?.diskonPersen !== null && data?.diskonPersen !== "" && data?.diskonPersen !== "0" ?
                            <div>
                                <span
                                className="px-2 py-1 mx-0 text-sm tab:text-[10px] smallPc:text-[13px] xxl:text-[15px] bg-[#E84040] text-white font-semibold w-1/5 text-center rounded-xl">{`Hingga ${data?.diskonPersen}%`}</span>
                                <span className=" ml-1 text-[15px] text-[#777777] tab:fontsize__small smallPc:fontsize__small" style={{ textDecoration: 'line-through' }}>{formatRupiahNumber(data?.hargaProperti)}</span>
                            </div>
                            : 

            data?.diskonNominal !== null && data?.diskonNominal !== "" && data?.diskonNominal !== "0" ?
                            <div>
                                <span
                                className="px-2 py-1 mx-0 text-sm tab:text-[10px] smallPc:text-[13px] xxl:text-[15px] bg-[#E84040] text-white font-semibold w-1/5 text-center rounded-xl">{`Hingga ${formatRupiahWord(data?.diskonNominal)}`}</span>
                                <span className=" ml-1 text-[15px] text-[#777777] tab:fontsize__small smallPc:fontsize__small" style={{ textDecoration: 'line-through' }}>{formatRupiahNumber(data?.hargaProperti)}</span>
                            </div>
                            : '' }
              <p className="hs-search-rslt__price">
                {formatRupiahNumber(data?.hargaAkhir)}
              </p>
              <div className="hs-search-rslt__dev-wrap">
                {/* <div>
                  <p className="hs-search-rslt__dev-field">Developer </p>
                  <p className="hs-search-rslt__dev-value">
                    <Link to={`/developer/${data?.project?.id}`}>{trimStr({ string: (_.isJSON(data?.ownedBy) ? JSON.parse(data?.ownedBy)?.name : "-"), maxLength: 25 })}</Link>
                  </p>
                  <p className="hs-search-rslt__dev-field">Project </p>
                  <p className="hs-search-rslt__dev-value">
                    {trimStr({ string: (data?.project?.namaProyek || "-"), maxLength: 25 })}
                  </p>
                </div> */}
                {/* {!window.location.pathname.includes("/project-details") && <div>
                  <Link to={`/product-details/${data.id}`}>
                    <Button
                      buttonColor="blueLight"
                      textColor="blue"
                      className="text-xs"
                    >
                      Lihat Detail
                    </Button>
                  </Link>
                </div>} */}
              </div>
              <div className="hs-search-rslt__fac-price-wrap">
                <div className="hs-search-rslt__fac-wrap">
                  <PropFacility
                    facIcons="/icons/small-icons/Bedroom.svg"
                    facName={
                      data?.jmlKmrTidur + " KT"
                    }
                  />
                  <PropFacility
                    facIcons="/icons/small-icons/Bathroom.svg"
                    facName={
                      data?.jmlKmrMandi + " KM"
                    }
                  />
                  {data?.project?.fasilitasProperti?.garasi && (
                    <PropFacility
                      facIcons="/icons/small-icons/Garage-Car.svg"
                      facName="Garasi"
                    />
                  )}
                  <PropFacility
                    facIcons="/icons/small-icons/LB.svg"
                    facName={data?.lb + " m²"}
                  />
                </div>
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

export default HouseCardSearchResultV2;
