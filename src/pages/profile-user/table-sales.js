import React from 'react'
import { TableData, TblListSales } from '../../components/molecules';
import { decryptStr } from "../../helpers/encryptDecrypt";
import { toTitleCase } from '../../helpers/string';
import useRegSalesHooks from '../../hooks/useRegSalesHooks';
import { showSingleModal } from '../../store/actions/changeState';

const TableSales = ({ tableType, dataTemp, setEditMode, dispatch, setReferralId, handleModalEdit }) => {
    switch (tableType) {
        case "salesRefferal":
            return (
                <TableData
                tblAdmin
                    header={[
                        { name: "Nama Sales", class: "admin-page__tbl--left" },
                        { name: "Email", class: "admin-page__tbl" },
                        { name: "Nomor HP", class: "admin-page__tbl" },
                        { name: "Tanggal Daftar", class: "admin-page__tbl" },
                        { name: "Aksi", class: "admin-page__tbl--right" },
                    ]}
                >

                    {dataTemp?.dataRows?.map((data, index) => {
                        return (
                            <TblListSales
                                index={index}
                                salesName={data.salesName}
                                salesEmail={data.salesEmail}
                                salesPhone={data.salesPhone}
                                createdAt={data.createdAt}
                                status={toTitleCase(data.status)}
                                onClickDelete={() => {
                                    setReferralId(data.id)
                                    dispatch(showSingleModal(true));
                                }}
                                onClickEdit={() => {
                                    setEditMode(true);
                                    setReferralId(data.id);
                                    handleModalEdit(data.id);
                                }}
                            />
                        );
                    })}

                </TableData>
            );
        default:
            return <></>;

    }
}

export default React.memo(TableSales)