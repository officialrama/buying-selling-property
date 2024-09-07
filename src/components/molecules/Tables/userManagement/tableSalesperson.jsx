import PropTypes from "prop-types";

function Component({
    id,
    salesName,
    developerName,
    salesEmail,
    salesPhone,
    index,
    onClickEdit,
    onClickDelete,
    status,
}) { 
    return (
        <tr key={index} className="p-3">
            <td className="admin-tbl__tbl--name-dev">
                <span>{salesName}</span>
            </td>
            <td className="p-3">
                <span>{developerName}</span>
            </td>
            <td className="p-3">
                <span>{salesPhone}</span>
            </td>
            <td className="p-3">
                <span>{salesEmail}</span>
            </td>
            <td className="admin-tbl__tbl--name">
                <div className="">
                    <img
                        className={`admin-tbl__icon ${status === "Deleted" || status === 'deleted' ? "opacity-25 cursor-not-allowed" : ""}`}
                        src="/icons/small-icons/Edit.svg"
                        alt="icon-edit"
                        onClick={status === "Deleted" || status === "deleted" ? null : onClickEdit}
                    />
                    <img
                        className={`admin-tbl__icon ${status === "Deleted" || status === 'deleted' ? "opacity-25 cursor-not-allowed" : ""}`}
                        src="/icons/small-icons/Delete.svg"
                        alt="icon-delete"
                        onClick={status === "Deleted" || status === "deleted" ? null : onClickDelete}
                    />
                </div>
            </td>
        </tr>
    );
}

Component.propTypes = {
    salesName: PropTypes.string.isRequired,
    developerName: PropTypes.string.isRequired,
    salesEmail: PropTypes.string.isRequired,
    salesPhone: PropTypes.string.isRequired,
    onClickEdit: PropTypes.func.isRequired,
    onClickDelete: PropTypes.func.isRequired,
};

Component.defaultProps = {
    salesName: "",
    developerName: "",
    salesEmail: "",
    salesPhone: "",
    onClickEdit: [() => { }],
    onClickDelete: [() => { }],
};

export default Component;
