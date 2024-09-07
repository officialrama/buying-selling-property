import { Checkbox } from '../../../molecules'
import PropTypes from "prop-types";
import moment from 'moment/moment';
function Component({
    index,
    id,
    namaProyek,
    namaDeveloper,
    nominalPengajuan,
    nominalDP,
    nominalUtj,
    statusSettlement,
    waktuSettlement,
    branchOffice,
    gimmick,
    namaDebitur,
    nik,
    plafondPengajuan,
    refNo,
    regionalOffice,
    rm,
    pemutus,
    nominalPutusan,
    source,
    status,
    tanggalPengajuan,
    tanggalProses,
    tanggalPutusan,
    jenisProperti,
    jenisProyek,
    tipeProperti,
    lastElm,
    downloadData,
    setDownloadData,
    isCheck,
    setIsCheck
}) {

    const handleCheckboxChange = (e) => {
        if (e.target.checked === true) {
            // const data = {
            //     regionalOffice: regionalOffice ? regionalOffice : "-",
            //     branchOffice: branchOffice ? branchOffice : "-",
            //     refNo: refNo,
            //     namaDebitur: namaDebitur,
            //     nik: nik,
            //     jenisProyek: jenisProyek ? jenisProyek : "-",
            //     plafondPengajuan: plafondPengajuan ? `Rp. ${new Intl.NumberFormat("id-ID").format(plafondPengajuan)}` : "-",
            //     pemutus: pemutus ? pemutus : "-",
            //     nominalPutusan: nominalPutusan ? `Rp. ${new Intl.NumberFormat("id-ID").format(nominalPutusan)}` : "-" ,
            //     gimmick: gimmick,
            //     source: source,
            //     tanggalPengajuan: tanggalPengajuan ? moment(tanggalPengajuan).format("DD MMM YYYY") : "-",
            //     tanggalProses: tanggalProses ? moment(tanggalProses).format("DD MMM YYYY") : "-",
            //     tanggalPutusan: tanggalPutusan ? moment(tanggalPutusan).format("DD MMM YYYY") : "-",
            //     status: status ? status : "-",
            //     rm: rm ? rm : "-",
            //     jenisProperti: jenisProperti === "subsidi" ? "Subsidi" : "Komersial",
            //     tipeProperti: tipeProperti,
            //     index: index
            // }
            // setDownloadData(downloadData => [...downloadData, data]);
            // setIsCheck([...isCheck, data?.index]);
            setDownloadData(downloadData => [...downloadData, id]);
            setIsCheck([...isCheck, index]);
        } else {
            setIsCheck(isCheck.filter(item => item !== index));
            setDownloadData(downloadData.filter(item => item !== id));
            // setIsCheck(isCheck.filter(item => item !== index));
            // setDownloadData(downloadData.filter(item => item?.index !== index));
        }
    };

    return (
        <tr key={index}>
            <td className={`admin-tbl__tbl--name-dev`}>
                <Checkbox name="data1" checked={downloadData.includes(id)} onChange={handleCheckboxChange} />
            </td>
            {/* <td className={`admin-tbl__tbl`}>
                <span className="admin-tbl__span">
                    Kode Wilayah
                </span>
            </td> */}
            <td className="admin-tbl__tbl">
                <span className="admin-tbl__span">{regionalOffice ? regionalOffice : "-"}</span>
            </td>
            {/* <td className="admin-tbl__tbl">
                <span className="admin-tbl__span">Kode Cabang</span>
            </td> */}
            <td className="admin-tbl__tbl">
                <span className="admin-tbl__span">{branchOffice ? branchOffice : "-"}</span>
            </td>
            <td className="admin-tbl__tbl">
                <span className="admin-tbl__span">{refNo}</span>
            </td>
            <td className="admin-tbl__tbl">
                <span className="admin-tbl__span">{namaDebitur}</span>
            </td>
            <td className="admin-tbl__tbl">
                <span className="admin-tbl__span">{nik}</span>
            </td>
            <td className="admin-tbl__tbl">
                <span className="admin-tbl__span">{jenisProperti === "subsidi" ? "Subsidi" : "Komersial"}</span>
            </td>
            <td className="admin-tbl__tbl">
                <span className="admin-tbl__span">{namaProyek ? namaProyek : "-"}</span>
            </td>
            <td className="admin-tbl__tbl">
                <span className="admin-tbl__span">{namaDeveloper ? namaDeveloper : "-"}</span>
            </td>
            <td className="admin-tbl__tbl">
                <span className="admin-tbl__span">{nominalDP ? `Rp. ${new Intl.NumberFormat("id-ID").format(nominalDP)}` : "-"}</span>
            </td>
            <td className="admin-tbl__tbl">
                <span className="admin-tbl__span">{nominalPengajuan ? `Rp. ${new Intl.NumberFormat("id-ID").format(nominalPengajuan)}` : "-"}</span>
            </td>
            <td className="admin-tbl__tbl">
                <span className="admin-tbl__span">{statusSettlement ? statusSettlement : ""}</span>
            </td>
            <td className="admin-tbl__tbl">
                <span className="admin-tbl__span">{nominalUtj ? `Rp. ${new Intl.NumberFormat("id-ID").format(nominalUtj)}` : "-"}</span>
            </td>
            <td className="admin-tbl__tbl">
                <span className="admin-tbl__span">{waktuSettlement ? moment(waktuSettlement).format("DD MMM YYYY HH:MM:SS") : "-"}</span>
            </td>
            <td className="admin-tbl__tbl">
                <span className="admin-tbl__span">{plafondPengajuan ? `Rp. ${new Intl.NumberFormat("id-ID").format(plafondPengajuan)}` : "-"}</span>
            </td>
            {/* <td className="admin-tbl__tbl">
                <span className="admin-tbl__span">Jenis KPR</span>
            </td>
            <td className="admin-tbl__tbl">
                <span className="admin-tbl__span">Pekerjaan Debitur</span>
            </td>
            <td className="admin-tbl__tbl">
                <span className="admin-tbl__span">PN Pemeriksa</span>
            </td>
            <td className="admin-tbl__tbl">
                <span className="admin-tbl__span">Nama Pemeriksa</span>
            </td>
            <td className="admin-tbl__tbl">
                <span className="admin-tbl__span">PN Pemutus</span>
            </td> */}
            <td className="admin-tbl__tbl">
                <span className="admin-tbl__span">{pemutus ? pemutus : "-"}</span>
            </td>
            <td className="admin-tbl__tbl">
                <span className="admin-tbl__span">{nominalPutusan ? `Rp. ${new Intl.NumberFormat("id-ID").format(nominalPutusan)}` : "-"}</span>
            </td>
            <td className="admin-tbl__tbl">
                <span className="admin-tbl__span">{gimmick}</span>
            </td>
            <td className="admin-tbl__tbl">
                <span className="admin-tbl__span">{source}</span>
            </td>
            <td className="admin-tbl__tbl">
                <span className="admin-tbl__span">{tanggalPengajuan ? moment.utc(tanggalPengajuan).utcOffset("0").format("DD MMM YYYY") : "-"}</span>
            </td>
            <td className="admin-tbl__tbl">
                <span className="admin-tbl__span">{tanggalProses ? moment(tanggalProses).format("DD MMM YYYY") : "-"}</span>
            </td>
            <td className="admin-tbl__tbl">
                <span className="admin-tbl__span">{tanggalPutusan ? moment(tanggalPutusan).format("DD MMM YYYY") : "-"}</span>
            </td>
            <td className="admin-tbl__tbl">
                <span className="admin-tbl__span">{status ? status : "-"}</span>
            </td>
            <td className="admin-tbl__tbl">
                <span className="admin-tbl__span">{rm ? rm : "-"}</span>
            </td>
            {/* <td className="admin-tbl__tbl">
                <span className="admin-tbl__span">{pemutus ? pemutus : "-"}</span>
            </td> */}
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
