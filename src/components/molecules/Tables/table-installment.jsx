import { useState } from "react";
import { formatRupiah, formatRupiahNumber } from "../../../helpers/string";
import { Pagination } from 'flowbite-react';

function TableInstallment({ tableData }) {
  const [currentPage, setCurrentPage] = useState(1)
  return (
    <div className="kprSim__pages__right__installmentDetails__topWrapper">
      <table className="kprSim__pages__right__installmentDetails__wrapper">
        <thead>
          <tr className="kprSim__pages__right__installmentDetails__table__header-wrap bg-[#F8F9F9]">
            <th className="kprSim__pages__right__installmentDetails__table__cell--center">Bulan</th>
            <th className="kprSim__pages__right__installmentDetails__table__cell">Sisa Pinjaman</th>
            <th className="kprSim__pages__right__installmentDetails__table__cell">
              Total Angsuran
            </th>
            {/* <th className="kprSim__pages__right__installmentDetails__table__cell">
              Bunga
            </th> */}
          </tr>
        </thead>
        <tbody>
        {tableData
              ?.slice(
                (currentPage === 1 ? 0 : 13) + Math.max(currentPage - 2, 0) * 12,
                (currentPage === 1 ? 13 : 13) + Math.max(currentPage - 1, 0) * 12
              )
            .map((data, index) => {
            return (
              <tr
                key={index}
                className="kprSim__pages__right__installmentDetails__table__body-wrap"
              >
                <td className="kprSim__pages__right__installmentDetails__table__cell--center">
                  {data.bulan}
                </td>
                <td className="kprSim__pages__right__installmentDetails__table__cell">
                  {formatRupiahNumber(data.sisaPinjaman)}
                </td>
                <td className="kprSim__pages__right__installmentDetails__table__cell">
                  {formatRupiahNumber(data.angsuran)}
                </td>
                {/* <td className="kprSim__pages__right__installmentDetails__table__cell">
                  {data.bunga}
                </td> */}
              </tr>
            );
          })}
      </tbody>
      </table>
      <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil(tableData.length / 13)}
        onPageChange={setCurrentPage}
        showFirstButton
        showLastButton
        className="flex items-center justify-center mt-4"
      />
    </div>
  );
}

export default TableInstallment;
