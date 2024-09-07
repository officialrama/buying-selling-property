/* eslint-disable eqeqeq */
import PropTypes from "prop-types";
import { formatRupiahNumber, formatRupiahWord } from "../../../../helpers/string";

function Component({
  name,
  email,
  status,
  onClickEdit,
  onClickDelete,
  index,
  type,
  lastElm,
}) {
  const hargaTerendah = name?.propertyPreference?.lowestPricePreference ? name?.propertyPreference?.lowestPricePreference : ""
  const hargaTertinggi = name?.propertyPreference?.highestPricePreference ? name?.propertyPreference?.highestPricePreference : ""
  const adjustedIndex = index + 1
  return (
    <tr key={index}>
             <td className="border-l border-b w-[48px] text-center font-medium text-xs text-[#777777]">
            {adjustedIndex}
            </td>
            <td className="text-center border-b w-[80px] font-medium text-xs text-[#777777] p-2">
        {(type)?.length > 13 ? ((type).slice(0, 12) + "...") : (type)}
      </td>
            <td
        className={`text-center font-medium border-b text-xs text-[#777777] p-2 ${lastElm === index ? "rounded-bl-lg" : ""
          }`}
      >
        {(() => {
          switch (type) {
            case "Sales":
              return <span>{(name?.metadata?.name)?.length > 100 ? ((name?.metadata?.name).slice(0, 99) + "...") : (name?.metadata?.name)}</span>;
            case "developer":
              return <span>{(name?.metadata?.name)?.length > 100 ? ((name?.metadata?.name).slice(0, 99) + "...") : (name?.metadata?.name)}</span>;
            case "visitor":
              return <span>{(name?.metadata?.fullName)?.length > 100 ? ((name?.metadata?.fullName).slice(0, 99) + "...") : (name?.metadata?.fullName)}</span>;
            case "AdminCabang":
              return <span>{
                (name?.metadata?.fullName) ? (name?.metadata?.fullName)?.length > 100 ? (name?.metadata?.fullName).slice(0, 99) + "..." : name?.metadata?.fullName : (name?.metadata?.name)?.length > 100 ? (name?.metadata?.name).slice(0, 99) + "..." : name?.metadata?.name
              }</span>;
            default:
              return <span>{(name?.name)?.length > 100 ? ((name?.name).slice(0, 99) + "...") : (name?.name)}</span>;
          }
        })()}
      </td>
      <td className="text-center border-b font-medium text-xs text-[#777777] p-2">
        <span title={email}>{(email)?.length > 20 ? ((email).slice(0, 19) + "...") : (email)}</span>
      </td>
      <td className="text-center p-2 w-[104px] border-b">
        {(() => {
          switch (status) {
            case "Active":
              return (
                <span
                  className={`admin-tbl__status-label admin-tbl__status-label--Active`}
                >
                  {(status)?.length > 13 ? ((status).slice(0, 12) + "...") : (status)}
                </span>
              );
            case "Registered":
              return (
                <span
                  className={`admin-tbl__status-label admin-tbl__status-label--Registered`}
                >
                  {(status)?.length > 13 ? ((status).slice(0, 12) + "...") : (status)}
                </span>
              );
            default:
              return (
                <span
                  className={`admin-tbl__status-label admin-tbl__status-label--Delete`}
                >
                  {(status)?.length > 13 ? ((status).slice(0, 12) + "...") : (status)}
                </span>
              );
          }
        })()}
      </td>
      <td className="text-center border-b font-medium text-xs text-[#777777] p-2">
        {name?.propertyPreference?.location ? name?.propertyPreference?.location : "-"}
      </td>
      <td className="text-center border-b font-medium text-xs text-[#777777] p-2">
        {`${formatRupiahWord(hargaTerendah)} - ${formatRupiahWord(hargaTertinggi)}`}
      </td>
      <td className={`text-center p-2 border-b border-r ${lastElm === index ? "rounded-br-lg" : ""}`}>
        <div>
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
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  onClickEdit: PropTypes.func.isRequired,
  onClickDelete: PropTypes.func.isRequired,
};

Component.defaultProps = {
  name: "",
  email: "",
  status: "",
  onClickEdit: [() => { }],
  onClickDelete: [() => { }],
};

export default Component;
