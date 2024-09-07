import PropTypes from "prop-types";
import { openLink } from "../../../../helpers/newTab";
import ModalDetailMapsV2 from "../../../molecules/Modal/v2/modal-detail-maps";
import classNames from "classnames";
import _ from "lodash-contrib";
import { ModalDetailInfoLelang } from "../../../molecules";

function MarkerInfoLelang({ text, onClick, detailProperty, propsIdx }) {
  return (
    <>
      <button className="search-result__markerMapsWrapper" onClick={onClick}>
        <div className={classNames("search-result__markerMapsShadow map-marker", { "bg-[#F87304] map-marker-clicked" : propsIdx === detailProperty?.idx })}>
          <p className={classNames("whitespace-nowrap search-result__pinTxt", { "text-white" : propsIdx === detailProperty?.idx })}>{text}</p>
        </div>
      </button>
      <div className="search-result__modalMaps__wrapperResult">
        {propsIdx === detailProperty?.idx ? (
          <ModalDetailInfoLelang
            imgSrc={detailProperty?.data?.images}
            // typeProp={detailProperty?.data}
            propertyName={detailProperty?.data?.name}
            location={detailProperty?.data?.addresses?.province}
            price={detailProperty?.data?.price}
            // url360={() => openLink(detailProperty?.data?.project?.mediaProject?.virtual360Url, true)}
            isSlideshow
            // isVirtual={_.isNull(detailProperty?.data?.project?.mediaProject?.virtual360Url) ? false : detailProperty?.data?.mediaProject?.virtual360Url}
            bookedStatus={detailProperty?.data?.bookedStatus}
            idProject={detailProperty?.data?.id}
            // tipeProject="cluster"
          />
        ) : <></>}
      </div>
    </>
  );
}

MarkerInfoLelang.propTypes = {
  text: PropTypes.string.isRequired,
};

MarkerInfoLelang.defaultProps = {
  text: "",
};

export default MarkerInfoLelang;
