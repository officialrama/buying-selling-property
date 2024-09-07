import React from 'react'
import { TableData, TableNotaris } from '../../components/molecules';
import { showSingleModal } from '../../store/actions/changeState';

const TableDataAdminCabang = ({     
    tableType,
    dataTemp,
    setEditMode,
    setReferralId,
    handleModalEdit,
    dispatch }) => {
    switch (tableType) {
        case "tableNotaris":
            return (
                <TableData
                    tblAdmin
                    header={[
                        {
                            name: "No",
                            class: "admin-page__tbl--left",
                        },
                        {
                            name: "Nama Notaris",
                            class: "admin-page__tbl",
                        },
                        {
                            name: "Alamat",
                            class: "admin-page__tbl",
                        },
                        {
                            name: "Action",
                            class: "admin-page__tbl--right",
                        },
                    ]}
                    >
                    {dataTemp?.ResponseData?.listNotaris?.length > 0 ? 
                        (
                            <>
                            {dataTemp?.ResponseData?.listNotaris?.map((data, index) => {
                                return (
                                    <TableNotaris
                                        id={data.ID}
                                        index={index}
                                        nama={data.Nama}
                                        alamat={data.Deskripsi}
                                        status={data.Status}
                                        onClickDelete={() => {
                                            setReferralId(data.ID)
                                            dispatch(showSingleModal(true))
                                        }}
                                        onClickEdit={() => {
                                            setEditMode(true)
                                            setReferralId(data.ID)
                                            handleModalEdit(data.ID)
                                        }}
                                    />
                                    );
                                })}
                            </>
                        ) : (
                            <tr >
                                <td colspan="4" className="rounded-tr-lg border-l border-r text-center">Data tidak ditemukan</td>
                            </tr>
                        )
                    }
                </TableData>
            )

    }
}

export default React.memo(TableDataAdminCabang)