import moment from "moment"
import { Toggle } from "../../../atoms"
import { LabelTag } from "../../../molecules"
import { tagCategory } from "../../../../static/articleStaticConst"

function Component ({
    index,
    id,
    tipe,
    judul,
    kategori,
    deskripsi,
    status,
    onClickView,
    onClickEdit,
    onPublish,
    onClickDelete
}){
    return (
        <tr key={id}>
            <td className="border-l">{index+1}</td>
            <td>{tipe === "article" ? "Artikel" : tipe}</td>
            <td>{judul}</td>
            <td><div className="flex justify-center"><LabelTag bgColor={tagCategory.find(tag => tag.name === kategori)?.bgColor} bgColor2={tagCategory.find(tag => tag.name === kategori)?.bgColor2} text={kategori} /></div></td>
            <td>{deskripsi}</td>
            <td>
                <div className="flex justify-center">
                    <Toggle
                        marginTop="mt-0"
                        title={id}
                        action={onPublish}
                        checked={moment(status).isBefore(moment(), 'year, month, day')}
                    />
                </div>
            </td>
            <td className="admin-tbl__tbl border-r">
                <div className="admin-tbl flex flex-row gap-4">
                    <img 
                        className={`admin-tbl__icon ${status === "Deleted" || status === "deleted" ? "opacity-25 cursor-not-allowed" : ""}`}
                        src="/icons/small-icons/Eye-Vicible_Filled.svg"
                        alt="icon-view"
                        width="20"
                        height="20"
                        onClick={status === "Deleted" || status === "deleted" ? null : onClickView}
                    />
                    <img
                        className={`admin-tbl__icon ${status === "Deleted" || status === "deleted" ? "opacity-25 cursor-not-allowed" : ""}`}
                        src="/icons/small-icons/Edit-Gmck.svg"
                        alt="icon-edit"
                        width="20"
                        height="20"
                        onClick={status === "Deleted" || status === "deleted" ? null : onClickEdit}
                    />
                    <img
                        className={`admin-tbl__icon ${status === "Deleted" || status === "deleted" ? "opacity-25 cursor-not-allowed" : ""}`}
                        src="/icons/small-icons/Trash-Gmck.svg"
                        alt="icon-delete"
                        sizes="20"
                        onClick={status === "Deleted" || status === "deleted" ? null : onClickDelete}
                    />
                </div>
            </td>
        </tr>
    )
}

Component.defaultProps = {
    tipe: "",
    judul: "",
    kategori: "",
    deskripsi: "",
}

export default Component