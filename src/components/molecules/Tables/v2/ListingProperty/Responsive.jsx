import classNames from "classnames";
import moment from "moment";
import { Fragment } from "react";
import ResponsiveTable from "../../Responsive/Component";
import { RiGalleryUploadFill } from "react-icons/ri";
import { formatRupiah } from "../../../../../helpers/string";
import { TextColor } from "../../../../theme/text/text";

function ResponsiveListingProperty({ className, header, content, isLoading }) {
  content = content?.map
    ? content.map((c, i) => {
        let {
          name,
          rangePrice,
          status,
          dateCreated,
          onClickEdit,
          onClickDelete,
          isDraft,
          onClickPublish,
        } = c;
        let tableRowContent = [
          <p
            className={classNames(
              "font-bold whitespace-normal text-[0.875rem] mobile:line-clamp-2 tab:line-clamp-2",
              `text-[${TextColor.black}]`
            )}
          >
            {name}
          </p>,
          <p className="break-all">
            {formatRupiah(rangePrice.split(",")[0])}
            <br />
            {"s/d"}
            <br />
            {formatRupiah(rangePrice.split(",")[1])}
          </p>,
          <Fragment>
            <p className="whitespace-normal">
              {moment.unix(dateCreated / 1000).format("DD MMM YYYY")}
            </p>
            <p className="whitespace-normal">{moment.unix(dateCreated / 1000).format("hh:mm A")}</p>
          </Fragment>,
        ];
        if (status !== "closed")
          tableRowContent.push(
            <div className="flex flex-row gap-3 place-content-end">
              <img
                title="Edit"
                className="cursor-pointer"
                src="/icons/small-icons/Edit.svg"
                alt="icon-edit"
                onClick={onClickEdit}
              />
              <img
                title="Hapus"
                className="cursor-pointer"
                src="/icons/small-icons/Delete.svg"
                alt="icon-delete"
                onClick={onClickDelete}
              />
              {isDraft && (
                <RiGalleryUploadFill
                  title="Publish"
                  className="cursor-pointer w-6 h-6"
                  onClick={onClickPublish}
                />
              )}
            </div>
          );
        return tableRowContent;
      })
    : [];

  return (
    <ResponsiveTable className={className} header={header} row={content} isLoading={isLoading} />
  );
}

export default ResponsiveListingProperty;
