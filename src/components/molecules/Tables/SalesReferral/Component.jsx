import moment from "moment";
import PropTypes from "prop-types";

function Component({
  salesName,
  salesEmail,
  salesPhone,
  createdAt,
  index,
  onClickEdit,
  onClickDelete,
  status,
}) {
  return (
    <tr key={index}  className="p-3">
      <td className="admin-tbl__tbl--name-dev">
        <span>{salesName}</span>
      </td>
      <td className="p-3">
        <span>{salesEmail}</span>
      </td>
      <td className="p-3">
        <span>{salesPhone}</span>
      </td>
      {/* <td className="tbl-user-ref__header">
        <span>{}</span>
      </td> */}
      <td className="p-3">
        <span>{moment(createdAt).format("DD MMM YYYY hh:mm A")}</span>
      </td>
      <td className="border-b border-r">
        <div className="">
          <img
            className= {`admin-tbl__icon ${status === "Deleted" || status === 'deleted' ? "opacity-25 cursor-not-allowed" : ""}`}
            src="/icons/small-icons/Edit.svg"
            alt="icon-edit"
           onClick={status === "Deleted" || status === "deleted" ? null: onClickEdit }
          />
          <img
            className={`admin-tbl__icon ${status === "Deleted" || status === 'deleted' ? "opacity-25 cursor-not-allowed" : ""}`}
            src="/icons/small-icons/Delete.svg"
            alt="icon-delete"
            onClick={status === "Deleted" || status === "deleted" ? null: onClickDelete}
          />
        </div>
      </td>
    </tr>
  );
}

Component.propTypes = {
  nameUser: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  noHp: PropTypes.string.isRequired,
  nameSales: PropTypes.string.isRequired,
  tanggalPengajuan: PropTypes.string.isRequired,
  onClickEdit: PropTypes.func.isRequired,
  onClickDelete: PropTypes.func.isRequired,
};

Component.defaultProps = {
  nameUser: "",
  email: "",
  noHp: "",
  nameSales: "",
  tanggalPengajuan: "",
  onClickEdit: [() => {}],
  onClickDelete: [() => {}],
};

export default Component;
