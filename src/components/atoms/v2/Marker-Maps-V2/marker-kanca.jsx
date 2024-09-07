import PropTypes from "prop-types";
import { openLink } from "../../../../helpers/newTab";
import ModalDetailMapsV2 from "../../../molecules/Modal/v2/modal-detail-maps";
import ModalDetailKanca from "../../../molecules/Modal/v2/modal-detail-kanca";
import { Card } from "flowbite-react";
import classNames from "classnames";
import _ from "lodash-contrib";
import { AiFillHome } from "react-icons/ai";

function MarkerKanca({ text, onClick, detailProperty, detailKanca, propsIdx }) {
  return (
    <>
      <button className="search-result__markerMapsWrapper" onClick={onClick}>
        <div className={classNames("search-result__markerMapsShadow map-marker", { "bg-[#F87304] map-marker-clicked": propsIdx === detailProperty?.idx })}>
          {/* <AiFillHome size={"30px"} color={"#00529c"} onClick={onClick} /> */}
          <div className="flex justify-center"><img src="/icons/small-icons/logo512.png" alt="homespot logo" width={"20px"} height={"20px"} onClick={onClick}/></div>
          <p>{text?.jenisUker === "KCK" ? text?.unitKerja?.toLowerCase().replace(/(^|\s)\S/g, (match) => match.toUpperCase()) : `KC. ${text?.unitKerja?.toLowerCase().replace(/(^|\s)\S/g, (match) => match.toUpperCase())}`}</p>
        </div>
      </button>

      <div className="search-result__modalMaps__wrapperResult">
        {text?.unitKerja === detailKanca?.unitKerja ? (
          <ModalDetailKanca
            namaKanca={detailKanca?.unitKerja}
            alamatKanca={detailKanca?.alamat}
            telpKanca={detailKanca?.noTelp}
            jenisKanca={detailKanca?.jenisUker}
          />
        ) : <></>}
      </div>
    </>
  );
}

export default MarkerKanca;
