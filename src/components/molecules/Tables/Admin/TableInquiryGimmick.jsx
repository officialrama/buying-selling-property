import PropTypes from "prop-types";

function Component({
  name,
  biayaAdmin,
  biayaProvisi,
  biayaAdminPersen,
  biayaProvisiPersen,
  fixedRate,
  floatingRate,
  tenorFixedRate,
  status,
  onClickEdit,
  onClickDelete,
  index,
  lastElm,
  gimmickType
}) {
  return (
    <tr key={index}>
      <td className={`admin-tbl__tbl--name-dev ${lastElm === index ? "rounded-bl-lg" : ""}`}>
        <span className="admin-tbl__span">
          {(name)?.length > 30 ? ((name).slice(0, 29) + "...") : (name)}
        </span>
      </td>
      <td className="admin-tbl__tbl">
        {/* Homespost = infolelang & "" = Homespot */}
        <span className="admin-tbl__span">{gimmickType === "" ? "Homespot" : gimmickType === "Homespot" ? "Info Lelang" : "-"}</span>
      </td>
      <td className="admin-tbl__tbl">
        <span className="admin-tbl__span">{biayaAdmin}</span>
      </td>
      <td className="admin-tbl__tbl">
        <span className="admin-tbl__span whitespace-nowrap">{biayaAdminPersen}</span>
      </td>
      <td className="admin-tbl__tbl">
        <span className="admin-tbl__span">{biayaProvisi}</span>
      </td>
      <td className="admin-tbl__tbl">
        <span className="admin-tbl__span whitespace-nowrap">{biayaProvisiPersen}</span>
      </td>
      <td className="admin-tbl__tbl">
        <span className="admin-tbl__span whitespace-nowrap">{fixedRate}</span>
      </td>
      <td className="admin-tbl__tbl">
        <span className="admin-tbl__span whitespace-nowrap">{floatingRate}</span>
      </td>
      <td className="admin-tbl__tbl">
        <span className="admin-tbl__span">{tenorFixedRate}</span>
      </td>
      <td className="admin-tbl__tbl">
        <span className={`admin-tbl__span ${status === "Active" ? "admin-tbl__status-label--active" : "admin-tbl__status-label--deactive"}`}>
          {status}
        </span>
      </td>
      <td
        className={`admin-tbl__tbl border-r ${lastElm === index ? "rounded-br-lg" : ""
          }`}
      >
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
  );
}

Component.propTypes = {
  name: PropTypes.string,
  biayaAdmin: PropTypes.string,
  biayaProvisi: PropTypes.any,
  fixedRate: PropTypes.any,
  floatingRate: PropTypes.any,
  status: PropTypes.string,
  onClickEdit: PropTypes.func,
  onClickDelete: PropTypes.func,
};

Component.defaultProps = {
  name: "",
  biayaAdmin: "",
  biayaProvisi: "",
  fixedRate: "",
  floatingRate: "",
  status: "",
  onClickEdit: [() => { }],
  onClickDelete: [() => { }],
};

export default Component;
