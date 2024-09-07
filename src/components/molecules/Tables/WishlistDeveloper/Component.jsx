import { Checkbox } from '../../../molecules'
import PropTypes from "prop-types";
import moment from "moment";
function Component({
    id,
    email,
    visitorName,
    mobileNo,
    namaProyek,
    namaProperti,
    index,
    createdAt,
    tanggal,
    type,
    downloadData,
    setDownloadData,
    isCheck,
    setIsCheck
}) {

    const handleCheckboxChange = (e) => {
        if (e.target.checked === true) {
            // const data = {
            //     visitorName: visitorName,
            //     email: email,
            //     namaProyek: namaProyek,
            //     namaProperti: namaProperti,
            //     mobileNo: mobileNo ? mobileNo.replace("+62|", "0") : "-",
            //     tanggal: tanggal ? moment(tanggal).format("DD MMM YYYY") : "-" ,
            //     type: type ? type : "-",
            //     index: index
            // }
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
                <span className="admin-tbl__span">
                    {visitorName}
                </span>
            </td>
            <td className="admin-tbl__tbl">
                <span className="admin-tbl__span">{email}</span>
            </td>
            <td className="admin-tbl__tbl">
                <span className="admin-tbl__span">{namaProyek}</span>
            </td>
            <td className="admin-tbl__tbl">
                <span className="admin-tbl__span">{namaProperti}</span>
            </td>
            <td className="admin-tbl__tbl">
                <span className="admin-tbl__span">{mobileNo.replace("+62|", "0")}</span>
            </td>
            <td className="admin-tbl__tbl">
                <span className="admin-tbl__span">{tanggal ? moment(tanggal).format("DD MMM YYYY") : "-" }</span>
            </td>
            <td className="admin-tbl__col-icon-wrap--dev">
            <span className="admin-tbl__span">
                    {type === "wishlist" ? <div className='text-xs px-3 bg-orange-200 text-orange-500 rounded-full'>Wishlist</div> : <div className='text-xs text-center px-3 bg-blue-200 text-blue-800 rounded-full'>View</div>}
                </span>
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
