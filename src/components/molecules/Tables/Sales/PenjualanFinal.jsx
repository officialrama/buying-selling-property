import PropTypes from "prop-types";
import { Checkbox } from '../../../molecules'
import moment from "moment";
import rupiahFormat from "rupiah-format";
function Component({
  index,
  id,
  nik,
  nama,
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
  dataTemp,
  checkProps,
  downloadData,
  setDownloadData,
  isCheck,
  setIsCheck
}) {
  const handleCheckboxChange = (e) => {
    if (e.target.checked === true){
        // const data = {
        //     index: index,
        //     nik, nik,
        //     nama: nama,
        //     jenisproyek: jenisproyek ? jenisproyek : "-",
        //     jenisproperti: jenisproperti,
        //     typeproperti: typeproperti,
        //     plafondpengajuan: new Intl.NumberFormat("id-ID").format(plafondpengajuan),
        //     plafondputusan: new Intl.NumberFormat("id-ID").format(plafondputusan),
        //     tanggalpengajuan: moment(tanggalpengajuan).format("DD MMM YYYY"),
        //     tanggalputusan: tanggalputusan ? moment(tanggalputusan).format("DD MMM YYYY") : "-",
        //     status: status,
        //     regional: regional ? regional : "-",
        //     branchoffice: office ? office : "-"
            
        // }
        setDownloadData(downloadData => [...downloadData, id]);
        setIsCheck([...isCheck, index]);
    } else {
        setIsCheck(isCheck.filter(item => item !== index));
        setDownloadData(downloadData.filter(item => item !== id));
    }
};

  const utcTanggalPengajuan = moment.utc(tanggalpengajuan).utcOffset("0");

  return (
    <tr className="penjualan-final-list__wrapper">
    <td className={`penjualan-final-list__header rounded-tl-lg border-l`}>
         <Checkbox name="data1" checked={downloadData.includes(id)} onChange={handleCheckboxChange} />
     </td>
      <td className="penjualan-final-list__header">
        <span>{nik}</span>
      </td>
      <td className="penjualan-final-list__header ">
        <span>{nama}</span>
      </td>
      <td className="penjualan-final-list__header ">
        <span>{jenisproperti}</span>
      </td>
      <td className="penjualan-final-list__header ">
        <span>{typeproperti}</span>
      </td>
      <td className="penjualan-final-list__header ">
        <span>Rp{new Intl.NumberFormat("id-ID").format(plafondpengajuan)}</span>
      </td>
      <td className="penjualan-final-list__header ">
        <span>Rp{new Intl.NumberFormat("id-ID").format(plafondputusan)}</span>
      </td>
      <td className="penjualan-final-list__header ">
        <span>{utcTanggalPengajuan.format("DD MMM YYYY")}</span>
      </td>
      <td className="penjualan-final-list__header ">
        <span>{tanggalputusan ? moment(tanggalputusan).format("DD MMM YYYY") : "-"}</span>
      </td>
      <td className="penjualan-final-list__header ">
        <span>{status}</span>
      </td>
      <td className="penjualan-final-list__header ">
        <span>{regional ? regional : "-"}</span>
      </td>
      <td className="penjualan-final-list__col-icon-wrap--dev">
        <span>{office ? office : "-"}</span>
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
  jenisproperti: PropTypes.func.isRequired,
  typeproperti: PropTypes.func.isRequired,
  plafondpengajuan: PropTypes.func.isRequired,
  plafondputusan: PropTypes.func.isRequired,
  createdAt: PropTypes.func.isRequired,
  tanggalputusan: PropTypes.func.isRequired,
  status: PropTypes.func.isRequired,
  regional: PropTypes.func.isRequired,
  office: PropTypes.func.isRequired,
};

Component.defaultProps = {
  nik: "",
  nama: "",
  mobileNo: "",
  email: "",
  jenisproyek:"",
  jenisproperti:"",
  typeproperti:"",
  plafondpengajuan:"",
  plafondputusan:"",
  createdAt:"",
  tanggalputusan:"",
  status:"",
  regional:"",
  office:""
  
};

export default Component;
