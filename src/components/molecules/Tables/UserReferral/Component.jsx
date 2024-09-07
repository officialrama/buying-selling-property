import PropTypes from "prop-types";
import { Checkbox } from '../../../molecules'
import moment from "moment";
import rupiahFormat from "rupiah-format";
function Component({
  index,
  id,
  nik,
  namasales,
  customerName,
  jenisproperti,
  jenisproyek,
  typeproperti,
  plafondpengajuan,
  plafondputusan,
  tanggalpengajuan,
  tanggalputusan,
  status,
  regional,
  office,
  rm,
  pemutus,
  nominalUTJ,
  statusSettlement,
  waktuSettlement,
  dataTemp,
  checkProps,
  downloadData,
  setDownloadData,
  isCheck,
  setIsCheck
}) {
  const handleCheckboxChange = (e) => {
    if (e.target.checked === true) {
      // const data = {
      //     index: index,
      //     namasales: namasales,
      //     namadebitur: namadebitur,
      //     nik, nik,
      //     jenisproyek: jenisproyek ? jenisproyek : "-",
      //     plafondpengajuan: new Intl.NumberFormat("id-ID").format(plafondpengajuan),
      //     plafondputusan: new Intl.NumberFormat("id-ID").format(plafondputusan),
      //     tanggalpengajuan: moment(tanggalpengajuan).format("DD MMM YYYY"),
      //     tanggalputusan: tanggalputusan ? moment(tanggalputusan).format("DD MMM YYYY") : "-",
      //     status: status,
      //     regional: regional ? regional : "-",
      //     branchoffice: office ? office : "-",
      //     rm: rm ? rm : "-",
      //     pemutus: pemutus ? pemutus : "-",
      //     jenisproperti: jenisproperti,
      //     typeproperti: typeproperti,

      // }
      setDownloadData(downloadData => [...downloadData, id]);
      setIsCheck([...isCheck, index]);
    } else {
      setIsCheck(isCheck.filter(item => item !== index));
      setDownloadData(downloadData.filter(item => item !== id));
    }
  };


  return (
    <tr className="penjualan-final-list__wrapper">
      <td className={`admin-tbl__tbl--name-dev`}>
        <Checkbox name="data1" checked={downloadData.includes(id)} onChange={handleCheckboxChange} />
      </td>
      <td className="penjualan-final-list__header ">
        <span>{namasales}</span>
      </td>
      <td className="penjualan-final-list__header ">
        <span>{customerName}</span>
      </td>
      <td className="penjualan-final-list__header">
        <span>{nik}</span>
      </td>
      <td className="penjualan-final-list__header ">
        <span>{jenisproperti}</span>
      </td>
      <td className="admin-tbl__tbl">
        <span className="admin-tbl__span">{statusSettlement ? statusSettlement : ""}</span>
      </td>
      <td className="admin-tbl__tbl">
        <span className="admin-tbl__span">{nominalUTJ ? `Rp. ${new Intl.NumberFormat("id-ID").format(nominalUTJ)}` : "-"}</span>
      </td>
      <td className="admin-tbl__tbl">
        <span className="admin-tbl__span">{waktuSettlement ? moment(waktuSettlement).format("DD MMM YYYY HH:MM:SS") : "-"}</span>
      </td>
      <td className="penjualan-final-list__header ">
        <span>Rp. {new Intl.NumberFormat("id-ID").format(plafondpengajuan)}</span>
      </td>
      <td className="penjualan-final-list__header ">
        <span>Rp. {new Intl.NumberFormat("id-ID").format(plafondputusan)}</span>
      </td>
      <td className="penjualan-final-list__header ">
        <span>{moment.utc(tanggalpengajuan).utcOffset("0").format("DD MMM YYYY")}</span>
      </td>
      <td className="penjualan-final-list__header ">
        <span>{tanggalputusan ? moment(tanggalputusan).format("DD MMM YYYY") : "-"}</span>
      </td>
      <td className="penjualan-final-list__header ">
        <span>{status ? status : "-"}</span>
      </td>
      <td className="penjualan-final-list__header ">
        <span>{regional ? regional : "-"}</span>
      </td>
      <td className="penjualan-final-list__header">
        <span>
          {office ? office : "-"}</span>
      </td>
      <td className="penjualan-final-list__header ">
        <span>{rm ? rm : "-"}</span>
      </td>
      <td className="penjualan-final-list__header">
        <span>
          {pemutus ? pemutus : "-"}</span>
      </td>
      <td className="penjualan-final-list__col-icon-wrap--dev">
        <span>{typeproperti}</span>
      </td>
    </tr>
  );
}

Component.propTypes = {
  nik: PropTypes.string.isRequired,
  nama: PropTypes.string.isRequired,
  mobileNo: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  jenisproyek: PropTypes.func.isRequired,
  plafondpengajuan: PropTypes.func.isRequired,
  plafondputusan: PropTypes.func.isRequired,
  createdAt: PropTypes.func.isRequired,
  tanggalputusan: PropTypes.func.isRequired,
  status: PropTypes.func.isRequired,
  regional: PropTypes.func.isRequired,
  office: PropTypes.func.isRequired,
  rm: PropTypes.func.isRequired,
  pemutus: PropTypes.func.isRequired,
  jenisproperti: PropTypes.func.isRequired,
  typeproperti: PropTypes.func.isRequired,
};

Component.defaultProps = {
  nik: "",
  nama: "",
  mobileNo: "",
  email: "",
  jenisproyek: "",
  plafondpengajuan: "",
  plafondputusan: "",
  createdAt: "",
  tanggalputusan: "",
  status: "",
  regional: "",
  office: "",
  rm: "",
  pemutus: "",
  jenisproperti: "",
  typeproperti: "",

};

export default Component;
