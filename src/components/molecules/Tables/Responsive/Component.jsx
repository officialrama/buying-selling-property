import SmallLoading from "../../../atoms/SmallLoading/Component";

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
      <tr key={idx}>
        {contents.map
          ? contents.map((content, idx) => (
              <td>
                <div className="content-wrapper">
                  {header[idx]?.name ? (
                    <div className="mobile-header">{header[idx].name}</div>
                  ) : null}
                  <div className={header[idx]?.name ? "content" : "content-fullw"}>{content}</div>
                </div>
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

export default ResponsiveTableData;
