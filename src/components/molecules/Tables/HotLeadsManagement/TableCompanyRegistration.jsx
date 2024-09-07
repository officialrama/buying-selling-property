import { Checkbox } from '../../../molecules'
import PropTypes from "prop-types";
import { MdRemoveRedEye } from 'react-icons/md';
import { FiDownload } from 'react-icons/fi';
function Component({
    index,
    id,
    loanRefferalCompany,
    loanReferralCode,
    page,
    url,
    nomerPks,
    onClickDelete,
    onClickEdit,
    lastElm,
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
                <span className="admin-tbl__span" title={loanRefferalCompany?.length > 17 ? loanRefferalCompany : ""}>{loanRefferalCompany?.length > 17 ? (loanRefferalCompany?.slice(0, 17) + "...") : loanRefferalCompany }</span>
            </td>
            <td className="admin-tbl__tbl">
                <span className="admin-tbl__span">{loanReferralCode ? loanReferralCode : "-"}</span>
            </td>
            <td className="admin-tbl__tbl">
                <span className="admin-tbl__span">{nomerPks ? nomerPks : "-"}</span>
            </td>
            <td className={`admin-tbl__col-icon-wrap--dev flex flex-row gap-x-2 mobile:flex-col h-full`}>
                {/* <MdRemoveRedEye className={"w-6 h-6"} onClick={onClickEdit}/> */}
                <img
                    title="Hapus"
                    src="/icons/small-icons/Delete.svg"
                    alt="icon-delete"
                    onClick={onClickDelete}
                />
                <img
                    title="Edit"
                    src="/icons/small-icons/Edit.svg"
                    alt="icon-edit"
                    onClick={onClickEdit}
                />
                {url !== "-" ? <a href={url}><FiDownload className={"w-6 h-6"} title="Download PKS" /></a> : <FiDownload className={"w-6 h-6"} color="grey" />}
            </td>
        </tr>
    );
}

Component.propTypes = {
    id: PropTypes.string,
    loanRefferalCompany: PropTypes.string,
    loanReferralCode: PropTypes.string
};

Component.defaultProps = {
    id: "",
    loanRefferalCompany: "",
    loanReferralCode: ""
};

export default Component;
