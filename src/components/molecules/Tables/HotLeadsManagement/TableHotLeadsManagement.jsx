import { Checkbox } from '../../../molecules'
import PropTypes from "prop-types";
import moment from 'moment/moment';
function Component({
    index,
    id,
    loanRefferalCompany,
    namaDebitur,
    nik,
    plafondPengajuan,
    plafondPutusan,
    // namaProperti,
    gimmick,
    tanggalPengajuan,
    tanggalPutusan,
    status,
    regionalOffice,
    branchOffice,
    // rm,
    // pemutus,
    namaDeveloper,
    namaProyek,
    jenisProyek,
    tipeProperti,
    lastElm,
    page,
    downloadData,
    setDownloadData,
    isCheck,
    setIsCheck
}) {

    const handleCheckboxChange = (e) => {
        if (e.target.checked === true) {
            setDownloadData(downloadData => [...downloadData, id]);
            setIsCheck([...isCheck, index]);
        } else {
            setIsCheck(isCheck.filter(item => item !== index));
            setDownloadData(downloadData.filter(item => item !== id));
        }
    };

    return (
        <tr key={index}>
            <td className={`admin-tbl__tbl--name-dev`}>
                <Checkbox name="data1" checked={downloadData.includes(id)} onChange={handleCheckboxChange} />
            </td>
            <td className={`admin-tbl__tbl`}>
                <span className="admin-tbl__span">{(page * 10) + (index + 1)}</span>
            </td>
            <td className={`admin-tbl__tbl`}>
                <span className="admin-tbl__span">{loanRefferalCompany}</span>
            </td>
            <td className="admin-tbl__tbl">
                <span className="admin-tbl__span">{namaDebitur ? namaDebitur : "-"}</span>
            </td>
            <td className={`admin-tbl__tbl`}>
                <span className="admin-tbl__span">{nik ? nik : "-"}</span>
            </td>
            <td className="admin-tbl__tbl">
                <span className="admin-tbl__span">{plafondPengajuan ? `Rp. ${new Intl.NumberFormat("id-ID").format(plafondPengajuan)}` : "-"}</span>
            </td>
            <td className="admin-tbl__tbl">
                <span className="admin-tbl__span">{plafondPutusan ? `Rp. ${new Intl.NumberFormat("id-ID").format(plafondPutusan)}` : "-"}</span>
            </td>
            {/* <td className="admin-tbl__tbl">
                <span className="admin-tbl__span">{namaProperti ? namaProperti : ""}</span>
            </td> */}
            <td className="admin-tbl__tbl">
                <span className="admin-tbl__span">{gimmick ? gimmick : "-"}</span>
            </td>
            <td className="admin-tbl__tbl">
                <span className="admin-tbl__span">{tanggalPengajuan ? moment(tanggalPengajuan).format("DD MMM YYYY") : "-"}</span>
            </td>
            <td className="admin-tbl__tbl">
                <span className="admin-tbl__span">{tanggalPutusan ? moment(tanggalPutusan).format("DD MMM YYYY") : "-"}</span>
            </td>
            <td className="admin-tbl__tbl">
                <span className="admin-tbl__span">{status ? status : "-"}</span>
            </td>
            <td className="admin-tbl__tbl">
                <span className="admin-tbl__span">{regionalOffice ? regionalOffice : "-"}</span>
            </td>
            <td className="admin-tbl__tbl">
                <span className="admin-tbl__span">{branchOffice ? branchOffice : "-"}</span>
            </td>
            <td className="admin-tbl__tbl">
                <span className="admin-tbl__span">{/* {rm ? rm : "-"} */}</span>
            </td>
            <td className="admin-tbl__tbl">
                <span className="admin-tbl__span">{/* {pemutus ? pemutus : "-"} */}</span>
            </td>
            <td className="admin-tbl__tbl">
                <span className="admin-tbl__span">{namaDeveloper ? namaDeveloper : "-"}</span>
            </td>
            <td className="admin-tbl__tbl">
                <span className="admin-tbl__span">{namaProyek ? namaProyek : "-"}</span>
            </td>
            <td className="admin-tbl__tbl">
            <span className="admin-tbl__span">{jenisProyek === "subsidi" ? "Subsidi" : "Komersial"}</span>
            </td>
            <td className="admin-tbl__col-icon-wrap--dev">
                <span className="admin-tbl__span">{tipeProperti ? tipeProperti : "-"}</span>
            </td>
        </tr>
    );
}
Component.propTypes = {
    salesName: PropTypes.string,
    metadata: PropTypes.string,
    status: PropTypes.string,
    jenisProperti: PropTypes.string,
    tipeProperti: PropTypes.string
};

Component.defaultProps = {
    salesName: "",
    metadata: "",
    status: "",
    jenisProperti: "",
    tipeProperti: ""
};
export default Component;
