import PropTypes from "prop-types"

function Component({
    namaKjjp,
    alamat,
    index,
    onClickEdit,
    onClickDelete,
    status,
}) {
    return (
        <tr key={index} className="p-3">
            <td className="admin-tbl__tbl--name-dev w-1/12">
                <span>{index+1}</span>
            </td>
            <td className="p-3 w-1/4">
                <span>{namaKjjp}</span>
            </td>
            <td className="p-3 w-1/2">
                <span>{alamat}</span>
            </td>
            <td className="admin-tbl__tbl--name w-1/12">
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
    namaKjjp: PropTypes.string.isRequired,
    alamat: PropTypes.string.isRequired,
    onClickEdit: PropTypes.func.isRequired,
    onClickDelete: PropTypes.func.isRequired
}

Component.defaultProps = {
    namaKjjp: "",
    alamat: "",
    onClickEdit: [() => {}],
    onClickDelete: [() => {}],
}

export default Component