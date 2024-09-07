import PropTypes from "prop-types";
import { Checkbox } from '../../../molecules'
import moment from "moment";
import { propTypes } from "react-grid-carousel";

function Component({
  name,
  mobileNo,
  propertiID,
  createdAt,
  status,
  onClickEdit,
  onClickDelete
}) {
  return (
    <tr className="tbl-sales-ref__wrapper">
      <td className="admin-tbl__tbl--name-dev">
        <span className="p-3">{name}</span>
      </td>
      <td className="p-3">
        <span>{mobileNo}</span>
      </td>
      <td className="p-3">
        <span>{propertiID}</span>
      </td>
      <td className="p-3">
        <span>{moment(createdAt).format("DD MMM YYYY hh:mm A")}</span>
      </td>
      <td className="border-b border-r">
        <div className="">
        <img
            className= {`admin-tbl__icon ${status === "Deleted" || status === 'deleted' ? "opacity-25 cursor-not-allowed" : ""}`}
            src="/icons/small-icons/Edit.svg"
            alt="icon-edit"
           onClick={status === "Edit" || status === "edit" ? null: onClickEdit }
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
  name: PropTypes.string,
  mobileNo: PropTypes.string,
  propertiID: PropTypes.string,
  createdAt: PropTypes.string,
  onClickEdit: PropTypes.func.isRequired,
  onClickDelete: PropTypes.func.isRequired,
};

Component.defaultProps = {
  name: "",
  mobileNo: "",
  propertiID: "",
  createdAt: "",
  onClickEdit: [() => {}],
  onClickDelete: [() => {}],
};

export default Component;
