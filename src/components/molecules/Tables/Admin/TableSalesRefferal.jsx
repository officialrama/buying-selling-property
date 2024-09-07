import { Checkbox } from '../../../molecules'
import PropTypes from "prop-types";
import moment from 'moment';
function Component({
    id,
    salesName,
    developerName,
    customerName,
    nik,
    plafondPengajuan,
    plafondPutusan,
    createdAt,
    status,
    jenisProperti,
    jenisProyek,
    tipeProperti,
    tanggalPutusan,
    branchOffice,
    regionalBranch,
    rm,
    pemutus,
    nominalUTJ,
    statusSettlement,
    waktuSettlement,
    index,
    lastElm,
    downloadData,
    setDownloadData,
    isCheck,
    setIsCheck
}) {

    const handleCheckboxChange = (e) => {
        if (e.target.checked === true){
            // const data = {
            //     salesName: salesName,
            //     developer: developerName,
            //     customerName: customerName,
            //     nik: nik,
            //     plafondPengajuan: `Rp. ${new Intl.NumberFormat("id-ID").format(plafondPengajuan)}` ,
            //     plafondPutusan: `Rp. ${new Intl.NumberFormat("id-ID").format(plafondPutusan)}` ,
            //     createdAt: moment(createdAt).format("DD MMM YYYY"),
            //     status: status,
            //     jenisProperti: jenisProperti,
            //     tipeProperti: tipeProperti,
            //     jenisProyek: jenisProyek ? jenisProyek : "-",
            //     tanggalPutusan: tanggalPutusan ? moment(tanggalPutusan).format("DD MMM YYYY") : "-",
            //     branchOffice: branchOffice ? branchOffice : "-",
            //     regionalBranch: regionalBranch ? regionalBranch : "-",
            //     rm: rm ? rm : "-",
            //     pemutus: pemutus ? pemutus : "-",
            //     index: index
            // }
            //  setDownloadData(downloadData => [...downloadData, data]);
            setDownloadData(downloadData => [...downloadData, id]);
            setIsCheck([...isCheck, index]);
        } else {
            setIsCheck(isCheck.filter(item => item !== index));
            setDownloadData(downloadData.filter(item => item !== id));
            // setDownloadData(downloadData.filter(item => item?.index !== index));
        }
    };

    return (
        <tr key={index}>
            <td className={`admin-tbl__tbl--name-dev`}>
                <Checkbox name="data1" checked={downloadData.includes(id)} onChange={handleCheckboxChange} />
            </td>
            <td className={`admin-tbl__tbl`}>
                <span className="admin-tbl__span">
                    {salesName}
                </span>
            </td>
            <td className="admin-tbl__tbl">
                <span className="admin-tbl__span">{developerName}</span>
            </td>
            <td className="admin-tbl__tbl">
                <span className="admin-tbl__span">{customerName}</span>
            </td>
            <td className="admin-tbl__tbl">
                <span className="admin-tbl__span">{nik}</span>
            </td>
            <td className="admin-tbl__tbl">
                <span className="admin-tbl__span">{jenisProperti === "subsidi" ? "Subsidi" : "Komersial"}</span>
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
            <td className="admin-tbl__tbl">
                <span className="admin-tbl__span">Rp. {new Intl.NumberFormat("id-ID").format(plafondPengajuan)}</span>
            </td>
            <td className="admin-tbl__tbl">
                <span className="admin-tbl__span">Rp. {new Intl.NumberFormat("id-ID").format(plafondPutusan)}</span>
            </td>
            <td className="admin-tbl__tbl">
                <span className="admin-tbl__span">{moment(createdAt).format("DD MMM YYYY")}</span>
            </td>
            <td className="admin-tbl__tbl">
                <span className="admin-tbl__span">{tanggalPutusan ? moment(tanggalPutusan).format("DD MMM YYYY") : "-"}</span>
            </td>
            <td className="admin-tbl__tbl">
                <span className="admin-tbl__span">{status}</span>
            </td>
            <td className="admin-tbl__tbl">
                <span className="admin-tbl__span">{regionalBranch ? regionalBranch : "-"}</span>
            </td>
            <td className="admin-tbl__tbl">
                <span className="admin-tbl__span">{branchOffice ? branchOffice : "-"}</span>
            </td>
            <td className="admin-tbl__tbl">
                <span className="admin-tbl__span">{rm ? rm : "-"}</span>
            </td>
            <td className="admin-tbl__tbl">
                <span className="admin-tbl__span">{pemutus ? pemutus : "-"}</span>
            </td>
            {/* <td className="admin-tbl__tbl">
                <span className="admin-tbl__span">{jenisProperti === "subsidi" ? "Subsidi" : "Komersial"}</span>
            </td> */}
            <td className="admin-tbl__col-icon-wrap--dev">
                <span className="admin-tbl__span">{tipeProperti}</span>
            </td>
        </tr>
    );
}
Component.propTypes = {
    salesName: PropTypes.string,
    developerName: PropTypes.string,
    customerName: PropTypes.string,
    status: PropTypes.string,
    jenisProperti: PropTypes.string,
    tipeProperti: PropTypes.string
};

Component.defaultProps = {
    salesName: "",
    developerName: "",
    customerName: "",
    status: "",
    jenisProperti: "",
    tipeProperti: ""
};
export default Component;
