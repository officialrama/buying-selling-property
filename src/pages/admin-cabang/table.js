import React from 'react'
import { TableData, TableListKjjp } from '../../components/molecules'
import { showSingleModal } from '../../store/actions/changeState'

const TablesAdminCabang = ({
    tableType,
    dataTemp,
    setEditMode,
    setReferralId,
    handleModalEdit,
    dispatch
}) => {
    switch(tableType) {
        case "listKjpp" :
            return (
                <TableData
                    tblAdmin
                    header={[
                        {
                            name: "No",
                            class: "admin-page__tbl--left",
                        },
                        {
                            name: "Nama KJPP",
                            class: "admin-page__tbl",
                        },
                        {
                            name: "Alamat",
                            class: "admin-page__tbl",
                        },
                        {
                            name: "Actions",
                            class: "admin-page__tbl--right",
                        }
                    ]}
                >
                    {dataTemp?.ResponseData?.listKjpp?.length > 0 ? 
                        (
                            <>
                            {dataTemp?.ResponseData?.listKjpp?.map((data, index) => {
                                return (
                                    <TableListKjjp
                                        id={data.ID}
                                        index={index}
                                        namaKjjp={data.Nama}
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

        default:
            return <></>
    }
}

export default React.memo(TablesAdminCabang)