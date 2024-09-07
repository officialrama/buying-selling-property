import { Color } from "../../../theme/color/color";
import PropTypes from "prop-types";
import classNames from "classnames";
import { TextColor } from "../../../theme/text/text";
import moment from "moment";
import { toTitleCase } from "../../../../helpers/string";
const convertRupiah = require("rupiah-format");

function Component({
  thumbSrc,
  name,
  address,
  price,
  status,
  dateCreated,
  timeCreated,
  onClickEdit,
  onClickDelete,
  index,
}) {
  return (
    <tr
      key={index}
      className={classNames(
        "border-b border-solid",
        `border-[${Color.grayLine}]`
      )}
    >
      <td className="p-3 align-middle largePc:w-[40%]">
        <div className="smallPc:flex largePc:flex flex-row mobile:w-[50vw] tab:w-[50vw] gap-2">
          {/* <img className="rounded-lg w-12" src={thumbSrc} alt="img-thumbnail" /> */}
          <div className="place-self-center">
            <p
              className={classNames(
                "font-bold whitespace-normal text-[0.875rem] mobile:line-clamp-2 tab:line-clamp-2",
                `text-[${TextColor.black}]`
              )}
            >
              {name}
            </p>
            <p
              className={classNames(
                "font-normal whitespace-normal  text-[0.75rem] mobile:line-clamp-2 tab:line-clamp-2",
                `text-[${TextColor.grayDesc}]`
              )}
            >
              {address}
            </p>
          </div>
        </div>
      </td>
      <td className="p-3 align-middle">{convertRupiah.convert(price)}</td>
      <td className="p-3 align-middle">{toTitleCase(status)}</td>
      <td className="p-3 align-middle">
        <p className="whitespace-normal">{moment.unix(dateCreated / 1000).format("DD MMM YYYY")}</p>
        <p className="whitespace-normal">{moment.unix(dateCreated / 1000).format("hh:mm A")}</p>
      </td>
      {status !== "deleted" &&
        <td className="p-3 justify-end align-middle">
          <div className="flex flex-row gap-3 mobile:w-[12vw] place-content-end">
            <img className="cursor-pointer" src="/icons/small-icons/Edit.svg" alt="icon-edit" onClick={onClickEdit} />
            <img className="cursor-pointer" src="/icons/small-icons/Delete.svg" alt="icon-delete" onClick={onClickDelete} />
          </div>
        </td>
      }
    </tr>
  );
}

Component.propTypes = {
  thumbSrc: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  dateCreated: PropTypes.string.isRequired,
  timeCreated: PropTypes.string.isRequired,
  onClickEdit: PropTypes.func.isRequired,
  onClickDelete: PropTypes.func.isRequired,
};

Component.defaultProps = {
  thumbSrc: "",
  name: "",
  address: "",
  price: "",
  status: "",
  dateCreated: "",
  timeCreated: "",
  onClickEdit: [() => { }],
  onClickDelete: [() => { }],
};

export default Component;
