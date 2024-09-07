import classNames from "classnames";
import moment from "moment";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { Color } from "../../../theme/color/color";
import { decryptStr } from "../../../../helpers/encryptDecrypt";
import _ from "lodash-contrib";
import { formatRupiahNumber } from "../../../../helpers/string";
function Component({
  data,
  index,
}) {
  const colorMap = {
    "Dalam Proses": { color: "#EAEBEB"},
    "Telah Diputus": { color: "#27AE60"},
    "Dicairkan": { color: "#DDEFFC"},
    "Proses Pencairan": { color: "#FEEDDF"}, 
    "Pencairan Gagal": { color: "#FCE7E7"}, 
    "Pengajuan Ditolak": { color: "#C61818"}, 
  };
  const [colorBadges, setColorBadges] = useState("")
  useEffect(() => {
      const categoryId = data?.statusDescBrispot;
      if (colorMap[categoryId]) {
        setColorBadges(colorMap[categoryId].color);
      } else {
        setColorBadges("");
      }
  }, []);
  return (
    
    <tr key={index} className={classNames("border-b border-solid", `border-[${Color.grayLine}]`)}>
      <td className="pengajuan-kpr-list__tbl-data text-[#777777] text-xs">{index+1}</td>
      <td className="pengajuan-kpr-list__tbl-data text-[#777777] text-xs">{data?.namaDebitur}</td>
      <td className="pengajuan-kpr-list__tbl-data text-[#777777] text-xs">{data?.kodeReferral ? data?.kodeReferral : "-"}</td>
      <td className="pengajuan-kpr-list__tbl-data text-[#777777] text-xs">{data?.namaProperti}</td>
      <td className="pengajuan-kpr-list__tbl-data text-[#777777] text-xs">{formatRupiahNumber(data?.hargaProperti)}</td>
      <td className="pengajuan-kpr-list__tbl-data text-[#292929]"><p className={`border text-xs font-semibold bg-[${colorBadges}] rounded-[40px] px-2 py-1 justify-center items-center text-center whitespace-nowrap ${data?.statusDescBrispot === "Pengajuan Ditolak" ? "text-[#FFFF]" : "text-[#292929]"}`}>{data?.statusDescBrispot ? data?.statusDescBrispot : "-"}</p></td>
      <td className="pengajuan-kpr-list__tbl-data text-[#777777] text-xs">{data?.refNoPengajuanBrispot ? data?.refNoPengajuanBrispot : "-"}</td>
      <td className="pengajuan-kpr-list__tbl-data text-[#1078CA] font-bold text-xs cursor-pointer" onClick={() => window.location.href= `/customer-service/detail-pengajuan-cs/${data?.id}` } >Lihat Detail</td>
      {/* {data.nik && data.refNoPengajuanBrispot &&
        <td className="pengajuan-kpr-list__tbl-data">
          <Button buttonColor={btnState.btnColor} textColor={btnState.txtColor} onClick={() => {
            btnState.txt !== "Updated" && dispatch(kprTrackPrakarsa({ refNo: data.refNoPengajuanBrispot, nik: decryptStr(data.nik), propertiId: data.propertyId }, btnState, setBtnState))
          }}>
            {btnState.txt}
          </Button>
        </td>
      } */}
    </tr>
  );
}

Component.propTypes = {
  data: PropTypes.any.isRequired,
};

Component.defaultProps = {
  data: {},
};

export default Component;
