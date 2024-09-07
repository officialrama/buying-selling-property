import _ from 'lodash-contrib';
import PropTypes from "prop-types";

function Component({
  lastElm,
  index,
  logo,
  developerName,
  address,
  developerPIC,
  email,
  rangePrice,
  onClickDelete,
  onClickView,
  status,
  buyBack,
  groupName
}) {
  return (
    <tr key={index}>
      <td
        className={`admin-tbl__tbl--name-dev ${lastElm === index ? "rounded-bl-lg" : ""
          }`}
      >
        <img src={logo} alt="logo" />
      </td>
      <td className="admin-tbl__tbl">
        <span className="admin-tbl__span" title={developerName}>{developerName?.length > 13 ? (developerName?.slice(0, 13) + "...") : developerName}</span>
      </td>
      <td className="admin-tbl__tbl">
        <span className="admin-tbl__span" title={groupName}>{groupName?.length > 13 ? (groupName?.slice(0, 13) + "...") : groupName}</span>
      </td>
      <td className="admin-tbl__tbl">
        <span className="admin-tbl__span">{address?.length > 13 ? (_.isJSON(address) ? JSON?.parse?.(address)?.alamat?.slice(0, 13) + "..." : address?.slice(0, 13) + "...") : address}</span>
      </td>
      <td className="admin-tbl__tbl">
        <span className="admin-tbl__span">{developerPIC?.length > 13 ? (developerPIC?.slice(0, 13) + "...") : developerPIC}</span>
      </td>
      <td className="admin-tbl__tbl">
        <span className="admin-tbl__span" title={email}>{email?.length > 13 ? (email?.slice(0, 13) + "...") : email}</span>
      </td>
      <td className="admin-tbl__tbl">
        <span className="admin-tbl__span">{rangePrice?.length > 13 ? (rangePrice?.slice(0, 13) + "...") : rangePrice}</span>
      </td>
      <td className="admin-tbl__tbl">
        <span className="admin-tbl__span">{buyBack === true ? 'Ya' : 'Tidak'}</span>
      </td>
      <td
        className={`admin-tbl__col-icon-wrap--dev ${lastElm === index ? "rounded-br-lg" : ""
          }`}
      >
        <div className="admin-tbl__icon-wrap">
          <img
            className={`admin-tbl__icon ${status === "Deleted" || status === "deleted" ? "opacity-25 cursor-not-allowed" : ""}`}
            src="/icons/small-icons/Edit.svg"
            alt="icon-edit"
            onClick={status === "Deleted" || status === "deleted" ? null : () => onClickView(email)}
          />
          <img
            className={`admin-tbl__icon ${status === "Deleted" || status === "deleted" ? "opacity-25 cursor-not-allowed" : ""}`}
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
  lastElm: PropTypes.number,
  index: PropTypes.any,
  logo: PropTypes.string,
  developerName: PropTypes.string,
  address: PropTypes.string,
  developerPIC: PropTypes.string,
  email: PropTypes.string,
  rangePrice: PropTypes.string,
  onClickView: PropTypes.func.isRequired,
  onClickDelete: PropTypes.func.isRequired,
};

Component.defaultProps = {
  lastElm: 0,
  index: 0,
  logo: "",
  developerName: "",
  address: "",
  developerPIC: "",
  email: "",
  rangePrice: "",
  onClickView: [() => { }],
  onClickDelete: [() => { }],
};

export default Component;
