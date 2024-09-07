import PropTypes from "prop-types";

function TableData({ tblAdmin, header, children }) {
  return (
    <div className="overflow-x-auto">
      <table className={`w-full ${tblAdmin ? "admin-table" : ""}`}>
        <thead className="table-data">
          <tr>
            {header.map((headerData, idx) => {
              return (
                <th className={headerData.class} key={idx}>
                  {headerData.name}
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

TableData.propTypes = {
  header: PropTypes.array.isRequired,
};

TableData.defaultProps = {
  header: [{ name: "", class: "" }],
};

export default TableData;
