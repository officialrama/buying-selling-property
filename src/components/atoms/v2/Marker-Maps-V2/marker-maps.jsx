import PropTypes from "prop-types";
import { openLink } from "../../../../helpers/newTab";
import ModalDetailMapsV2 from "../../../molecules/Modal/v2/modal-detail-maps";
import classNames from "classnames";
import _ from "lodash-contrib";

function MarkerMapsV2({ text, onClick, detailProperty, propsIdx }) {
  return (
    <>
      <button className="search-result__markerMapsWrapper" onClick={onClick}>
        <div className={classNames("search-result__markerMapsShadow map-marker", { "bg-[#F87304] map-marker-clicked" : propsIdx === detailProperty?.idx })}>
          <p className={classNames("whitespace-nowrap search-result__pinTxt", { "text-white" : propsIdx === detailProperty?.idx })}>{text}</p>
        </div>
      </button>
      <div className="search-result__modalMaps__wrapperResult">
        {propsIdx === detailProperty?.idx ? (
          <ModalDetailMapsV2
            imgSrc={detailProperty?.data?.imagesProject}
            // typeProp={detailProperty?.data}
            propertyName={detailProperty?.data?.project?.namaProyek}
            location={detailProperty?.data?.project?.alamatProperti?.alamat}
            price={detailProperty?.data?.project?.kisaranHarga}
            url360={() => openLink(detailProperty?.data?.project?.mediaProject?.virtual360Url, true)}
            isSlideshow
            isVirtual={_.isNull(detailProperty?.data?.project?.mediaProject?.virtual360Url) ? false : detailProperty?.data?.mediaProject?.virtual360Url}
            likeButton={false}
            idProject={detailProperty?.data?.project?.id}
            diskonPersen={detailProperty?.data?.detailProperti?.diskonPersen}
            diskonNominal={detailProperty?.data?.detailProperti?.diskonNominal}
            dataCluster={detailProperty?.data?.totalCluster}
            hargaAkhir={detailProperty?.data?.detailProperti?.hargaAkhir}
            // tipeProject="cluster"
          />
        ) : <></>}
      </div>
    </>
  );
}

MarkerMapsV2.propTypes = {
  text: PropTypes.string.isRequired,
};

MarkerMapsV2.defaultProps = {
  text: "",
};

export default MarkerMapsV2;
