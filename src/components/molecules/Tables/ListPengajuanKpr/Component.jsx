import classNames from "classnames";
import moment from "moment";
import PropTypes from "prop-types";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { personalDataConst } from "../../../../static/personal-data/personal-data";
import { kprTrackPrakarsa } from "../../../../store/actions/fetchData/kpr";
import { Button } from "../../../atoms";
import { Color } from "../../../theme/color/color";
import { decryptStr } from "../../../../helpers/encryptDecrypt";
import _ from "lodash-contrib";
import { formatRupiahNumber } from "../../../../helpers/string";
const convertRupiah = require("rupiah-format");
function Component({
  data,
  index,
}) {
  const dispatch = useDispatch();
  const [btnState, setBtnState] = useState({
    btnColor: "blue",
    txtColor: "white",
    txt: "Tracking"
  })
  const developerName = data?.developerName ? JSON.parse(data?.developerName) : ""
  return (
    
    <tr key={index} className={classNames("border-b border-solid", `border-[${Color.grayLine}]`)}>
      <td>{index+1}</td>
      <td className="pengajuan-kpr-list__tbl-data">{decryptStr(data?.kpr?.refNoPengajuanBrispot) || "-"}</td>
      <td className="pengajuan-kpr-list__tbl-data">{decryptStr(data?.kpr?.name) || "-"}</td>
      {data?.kpr?.paymentMethod === "PaidInfolelang" ? <td className="pengajuan-kpr-list__tbl-data">{`${data?.infolelang?.namaProperti}`}</td>
      :
      <td className="pengajuan-kpr-list__tbl-data">{`${data?.projectName ? data?.projectName : "No Project"}, ${data?.clusterName || "No Cluster"}, ${data?.propertiName ? data?.propertiName : "No Properti"}`}</td>}
      <td className="pengajuan-kpr-list__tbl-data">{data?.kpr?.paymentMethod === "PaidInfolelang" ? data?.infolelang?.alamat || "-" : data?.projectLocation?.provinsi ? data?.projectLocation?.provinsi : "-"}</td>
      <td className="pengajuan-kpr-list__tbl-data">{data?.kpr?.paymentMethod === "PaidInfolelang" ? "Info Lelang BRI" : developerName.name || '-'}</td>
      <td className="pengajuan-kpr-list__tbl-data">{data?.kpr?.createdAt ? moment.unix(data?.kpr?.createdAt / 1000).format("DD MMM YYYY") : "-"}</td>
      <td className="pengajuan-kpr-list__tbl-data">{data?.kpr?.updatedAt ? moment.unix(data?.kpr?.updatedAt / 1000).format("DD MMM YYYY") : "-"}</td>
      <td className="pengajuan-kpr-list__tbl-data">{decryptStr(data?.kpr?.ukerName) || "-"}</td>
      <td className="pengajuan-kpr-list__tbl-data">{_.isNull(data?.kpr?.jumlahPinjaman) ? "-" : formatRupiahNumber(data?.kpr?.jumlahPinjaman)}</td>
      <td className="pengajuan-kpr-list__tbl-data">{_.isNull(data?.kpr?.approvalPlafondBrispot) ? "-" : formatRupiahNumber(data?.kpr?.approvalPlafondBrispot)}</td>
      <td className="pengajuan-kpr-list__tbl-data" style={{ color: '#F37021' }}>{data?.kpr?.statusDescBrispot || "-"}</td>
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
