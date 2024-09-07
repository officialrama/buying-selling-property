import PropTypes from "prop-types"

function Component({
    id,
    index,
    gambar,
    judul,
    link,
    onClickEdit,
    onClickDelete,
    status = "Active"
}){
    return (
        <tr key={index} className="p-2">
            <td className="admin-tbl__tbl--name-dev w-[11%]">
                <span>{index+1}</span>
            </td>
            <td className="border-x p-2 w-[11%] justify-center items-center">
                <div className="w-[120px] object-cover">
                    <img alt="gambar" src={gambar} key={id}/>
                </div>
            </td>
            <td className="p-2 w-1/5">
                <span>{judul}</span>
            </td>
            <td className="border-x p-2 w-1/5">
                <span>{link.length > 49 ? link.substring(0,49) + "..." : link}</span>
            </td>
            <td className={`admin-tbl__tbl border-r w-[5%]`}>
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

Component.defaultProps = {
    gambar: "",
    judul: "",
    link: "",
    onClickEdit: [()=> {}],
    onClickDelete: [()=> {}]
}

export default Component;