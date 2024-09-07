import classNames from "classnames"
import moment from "moment"
import { Fragment } from "react"
import { RiGalleryUploadFill } from "react-icons/ri"
import { formatRupiahNumber } from "../../../../helpers/string"
import { TextColor } from "../../../theme/text/text"
// import ResponsiveTableData from "../Responsive/Component"
import SmallLoading from "../../../atoms/SmallLoading/Component"
// import { Toggle } from "../../../atoms"

function ListingPropertySecond ({className, header, content, isLoading}) {
    content = content?.map
        ? content. map((content, index) => {
            let {
                name,
                rangePrice,
                dateCreated,
                isPublish,
                onClickEdit,
                onClickView,
                onClickDelete,
                onClickPublish,
                onClickUnPublish,
                modifiedAt
            } = content
            let tableRowContent = [
                <p>{index+1}</p>,
                <p
                    className={classNames(
                        "font-bold whitespace-normal text-[0.875rem] mobile:line-clamp-2 tab:line-clamp-2",
                        `text-[${TextColor.black}]`
                    )}
                >
                    {name}
                </p>,
                <p>
                    { rangePrice?.includes(',') ? formatRupiahNumber(rangePrice?.split(",")[0]) : formatRupiahNumber(rangePrice)}
                </p>,
                <Fragment>
                    <p className="whitespace-normal">
                        {moment.unix(dateCreated / 1000).format("DD MMMM YYYY")}
                    </p>
                </Fragment>,
                <>
                {header.tabIndex === 0 && (
                    <Toggle 
                        title="Draft"
                        action={onClickPublish}
                        checked={isPublish}
                    />
                )}
                 {header.tabIndex === 1 && (
                    <Toggle 
                        title="Draft"
                        action={onClickUnPublish}
                        checked={isPublish}
                    />
                )}
                {header.tabIndex === 2 && (
                    <Fragment>
                        <p className="whitespace-normal">
                        {moment.unix(modifiedAt / 1000).format("DD MMMM YYYY")}
                        </p>
                    </Fragment>
                )}
                </>,
                <div className="admin-tbl flex flex-row gap-4 p-4 -ml-5">
                    { header.tabIndex === 2 && (<img
                            className={`admin-tbl__icon`}
                            src="/icons/small-icons/Eye-Vicible_Filled.svg"
                            alt="icon-eye"
                            style={{height: '20px', width: '24px'}}
                            onClick={onClickView}
                        />)}
                    { header.tabIndex !== 2 && (
                        <>
                            <img
                                className={`admin-tbl__icon`}
                                src="/icons/small-icons/Edit-Gmck.svg"
                                alt="icon-edit"
                                onClick={onClickEdit}
                            />
                            <img
                                className={`admin-tbl__icon`}
                                src="/icons/small-icons/Trash-Gmck.svg"
                                alt="icon-delete"
                                onClick={onClickDelete}
                            />
                        </>
                    )}
                </div>
            ]
            return tableRowContent;
        })
        : []

    return (
        <ResponsiveTableData className={className} header={header.header} row={content} isLoading={isLoading} />
    )  
}

function Toggle({ title, action, checked }) {
    return (
        <label for={title} class=" inline-flex relative items-center cursor-pointer">
            <input type="checkbox" value="" id={title} class="sr-only peer" checked={checked} onChange={action} />
            <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
        </label>
    )
}

function ResponsiveTableData({ className, header, row, isLoading }) {
  let content;
  let fullColSpan = header?.length ? header.length : 1;
  if (isLoading)
    content = (
      <tr>
        <td colSpan={fullColSpan} className="tabs-profile__loading">
          <SmallLoading blueColor={true} />
        </td>
      </tr>
    );
  else if (row?.length ? row.length == 0 : true)
    content = (
      <tr>
        <td colSpan={fullColSpan} className="tabs-profile__loading">
          <p className="tabs-profile__text-not-found">Data tidak ditemukan</p>
        </td>
      </tr>
    );
  else
    content = row.map((contents, idx) => (
    //   <tr key={idx}>
    //     {contents.map
    //       ? contents.map((content, idx) => (
    //           <td>
    //             { <div className="content-wrapper place-content-center">
    //               {header[idx]?.name ? (
    //                 <div className="sm:mobile-header">{header[idx].name}</div>
    //               ) : null}
    //               <div className={header[idx]?.name ? "content" : "content-fullw"}>{content}</div>
    //             </div>}
    //           </td>
    //         ))
    //       : null}
    //   </tr>
    <tr key={idx}>
        {contents.map
            ? contents.map((content, idx) => (
                <td key={idx}>
                {header[idx]?.name === "Nama Properti" ? (
                    <div className="content-wrapper">
                        {header[idx]?.name ? (
                            <div className="sm:mobile-header">{header[idx].name}</div>
                        ) : null}
                        <div className={header[idx]?.name ? "content" : "content-fullw"}>
                            {content}
                        </div>
                    </div>
                ) : (
                    <div className="content-wrapper place-content-center">
                        {header[idx]?.name ? (
                            <div className="sm:mobile-header">{header[idx].name}</div>
                        ) : null}
                        <div className={header[idx]?.name ? "content" : "content-fullw"}>
                            {content}
                        </div>
                    </div>
                )}
                </td>
            ))
            : null}
    </tr>

    ));
  return (
    <div className="overflow-x-auto">
      <table className={`responsive-table ${className}`}>
        <thead>
          <tr>
            {header.map((headerData, idx) => (
              <th className={headerData.class} key={idx}>
                <span>{headerData.name}</span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>{content}</tbody>
      </table>
    </div>
  );
}


export default ListingPropertySecond