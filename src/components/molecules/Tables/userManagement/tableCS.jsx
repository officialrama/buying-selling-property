import PropTypes from "prop-types"

function Component({
    id,
    index,
    kanwil,
    namaPic,
    adminCabangEmail,
    kantorCabang,
    status,
    onClickEdit,
    onClickDelete
}) {
    return (
        <tr key={index} className="p-3">
            <td className="admin-tbl__tbl--name-dev w-1/5">
                <span>{kanwil}</span>
            </td>
            <td className="border-x p-3 w-1/5">
                <span>{kantorCabang}</span>
            </td>
            <td className="border-x p-3 w-1/5">
                <span>{namaPic}</span>
            </td>
            <td className="border-x p-3 w-1/5">
                <span>{adminCabangEmail}</span>
            </td>
            <td className={`admin-tbl__tbl border-r w-[8%]`}>
                <div className="admin-tbl flex flex-row gap-4 p-4 -ml-5">
                    <img
                        className={`admin-tbl__icon ${status === "Deleted" || status === "deleted" ? "opacity-25 cursor-not-allowed" : ""}`}
                        src="/icons/small-icons/Edit-Gmck.svg"
                        alt="icon-edit"
                        onClick={status === "Deleted" || status === "deleted" ? null : onClickEdit}
                    />
                    <img
                        className={`admin-tbl__icon ${status === "Deleted" || status === "deleted" ? "opacity-25 cursor-not-allowed" : ""}`}
                        src="/icons/small-icons/Trash-Gmck.svg"
                        alt="icon-delete"
                        onClick={status === "Deleted" || status === "deleted" ? null : onClickDelete}
                    />
                </div>
            </td>
        </tr>
    )
}

Component.propTypes = {
    kanwil: PropTypes.string.isRequired,
    adminCabangEmail: PropTypes.string.isRequired,
    namaPic: PropTypes.string.isRequired,
    kodeCabang: PropTypes.string.isRequired,
    onClickEdit: PropTypes.func.isRequired,
    onClickDelete: PropTypes.func.isRequired
}

Component.defaultProps = {
    kanwil: "",
    adminCabangEmail: "",
    namaPic: "",
    kodeCabang: "",
    onClickEdit: [()=> {}],
    onClickDelete: [()=> {}]
}

export default Component;