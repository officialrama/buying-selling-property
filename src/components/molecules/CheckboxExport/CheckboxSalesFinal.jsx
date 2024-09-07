import { React ,useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Checkbox } from "../../molecules";
function CheckboxSalesFinal({  tblAdmin, checkProps, downloadData, setDownloadData, dataTemp, header, children }) {
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    let count = 0;
    dataTemp?.map(data =>{
      if(downloadData?.includes(data.id)){
        count++;
      }
    })

    if(dataTemp !== 0 && count === dataTemp?.length){
      setChecked(true)
    } else {
      setChecked(false)
    }
  },[downloadData,dataTemp])

  const handleCheckboxAll = (e) => {
    if (e.target.checked === true) {

      // checkProps.setIsCheckAll(true);
      // checkProps.setIsCheck([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
      // setDownloadData([])

      dataTemp?.map(data =>{
        if(!downloadData?.includes(data.id)){
          setDownloadData(downloadData => [...downloadData, data.id])
        }
      }) 

    } else {
      checkProps.setIsCheckAll(false);
      checkProps.setIsCheck([]);
      setDownloadData([]);
    }
  }

  return (
    <div className="overflow-x-auto">
      <table className={`w-full ${tblAdmin ? "admin-table" : ""}`}>
        <thead className="table-data">
          <tr>
            <th className="admin-page__tbl--left">
              <Checkbox name="data1" checked={checked} onChange={(e) => handleCheckboxAll(e)} />
            </th>
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

CheckboxSalesFinal.propTypes = {
  header: PropTypes.array.isRequired,
};

CheckboxSalesFinal.defaultProps = {
  header: [{ name: "", class: "" }],
};

export default CheckboxSalesFinal;
