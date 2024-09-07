import classNames from "classnames";
import moment from "moment";
import PropTypes from "prop-types";
import { RiGalleryUploadFill } from "react-icons/ri";
import { formatRupiah, toTitleCase } from "../../../../../helpers/string";
import { Color } from "../../../../theme/color/color";
import { TextColor } from "../../../../theme/text/text";

function Component({
  name,
  rangePrice,
  status,
  dateCreated,
  onClickEdit,
  onClickDelete,
  index,
  isDraft,
  onClickPublish
}) {
  return (
    <tr
      key={index}
      className={classNames(
        "border-b border-solid",
        `border-[${Color.grayLine}]`
      )}
    >
      <td className="p-3 align-middle largePc:w-[30%]">
        <div className="smallPc:flex largePc:flex flex-row mobile:w-[50vw] tab:w-[50vw] gap-2">
          <div className="place-self-center">
            <p
              className={classNames(
                "font-bold whitespace-normal text-[0.875rem] mobile:line-clamp-2 tab:line-clamp-2",
                `text-[${TextColor.black}]`
              )}
            >
              {name}
            </p>
          </div>
        </div>
      </td>
      <td className="p-3 align-middle w-[25%] whitespace-pre">{formatRupiah(rangePrice.split(",")[0]) + '\ns/d \n' + formatRupiah(rangePrice.split(",")[1])}</td>
      <td className="p-3 align-middle">
        <p className="whitespace-normal">{moment.unix(dateCreated / 1000).format("DD MMM YYYY")}</p>
        <p className="whitespace-normal">{moment.unix(dateCreated / 1000).format("hh:mm A")}</p>
      </td>
      {status !== "closed" &&
        <td className="p-3 justify-end align-middle">
          <div className="flex flex-row gap-3 mobile:w-[12vw] place-content-end">
            <img title="Edit" className="cursor-pointer" src="/icons/small-icons/Edit.svg" alt="icon-edit" onClick={onClickEdit} />
            <img title="Hapus" className="cursor-pointer" src="/icons/small-icons/Delete.svg" alt="icon-delete" onClick={onClickDelete} />
            {isDraft && <RiGalleryUploadFill title="Publish" className="cursor-pointer w-6 h-6" onClick={onClickPublish} />}
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
  rangePrice: PropTypes.string.isRequired,
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
  rangePrice: "",
  status: "",
  dateCreated: "",
  timeCreated: "",
  onClickEdit: [() => { }],
  onClickDelete: [() => { }],
};

export default Component;
