import PropTypes from "prop-types";

function TableNewGimmick({ tblAdmin, header, children }) {
  return (
    <div className="overflow-x-auto">
      <table className={`w-full ${tblAdmin ? "admin-table" : ""}`}>
        <thead className="table-data">
          <tr>
            {header.map((headerData, idx) => {
              return (
                <th className={`${headerData.class}`} key={idx}>
                  {headerData.topName !== "" ? (
                    <>
                      <div className={`${headerData.topName ? "col-span-2 -ml-20" : ""}`}>
                        {headerData.topName}
                      </div>
                      <div>
                        {headerData.name}
                      </div>
                    </>
                  ) : (
                    <div>
                      {headerData.name}
                    </div>
                  )}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
    </div>
  );
}

TableNewGimmick.propTypes = {
  header: PropTypes.array.isRequired,
};

TableNewGimmick.defaultProps = {
  header: [{ name: "", class: "", topName: "" }],
};

export default TableNewGimmick;
