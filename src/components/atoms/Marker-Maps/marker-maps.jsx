import PropTypes from "prop-types";
import { ModalDetailMaps } from "../../molecules";
import { openLink } from "../../../helpers/newTab";
const convertRupiah = require("rupiah-format");
function MarkerMaps({ text, onClick, detailProperty, propsIdx }) {
  return (
    <>
      <button className="search-result__markerMapsWrapper" onClick={onClick}>
        <div className="search-result__markerMapsShadow map-marker">
          <p className="whitespace-nowrap">{convertRupiah.convert(text)}</p>
        </div>
      </button>

      <div className="search-result__modalMaps__wrapperResult">
        {propsIdx === detailProperty?.idx && (
          <ModalDetailMaps
            imgSrc={detailProperty?.data?.imagesProperti}
            typeProp={detailProperty?.data}
            propertyName={detailProperty?.data?.detailProperti?.namaProperti}
            location={detailProperty?.data?.project?.alamatProperti.alamat}
            price={detailProperty?.data?.detailProperti?.hargaProperti}
            url360={() => openLink(detailProperty?.data?.detailProperti?.mediaProperti?.virtual360Url, true)}
            isSlideshow
            isVirtual = {detailProperty?.data?.detailProperti?.mediaProperti?.virtual360Url ? true : false}
            likeButton={false}
          />
        )}
      </div>
    </>
  );
}

MarkerMaps.propTypes = {
  text: PropTypes.string.isRequired,
};

MarkerMaps.defaultProps = {
  text: "",
};

export default MarkerMaps;
