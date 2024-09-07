import React from 'react'
import { 
    TableSalesperson,
    TableAdminCabang,   
    TableCS,
    TableData 
} from '../../../components/molecules';
import { showSingleModal } from '../../../store/actions/changeState';
import { decryptStr } from '../../../helpers/encryptDecrypt';

const TableUserMgmt = ({ tableType, dataTemp, setEditMode, dispatch, setReferralId, setReferralEmail, setReferralName, handleModalEdit }) => {
    switch (tableType) {
        case "salesPerson":
            return (
                <TableData
                    tblAdmin
                    header={[
                        {
                            name: "Nama Sales",
                            class: "admin-page__tbl--left",
                        },
                        {
                            name: "Nama Developer",
                            class: "admin-page__tbl",
                        },
                        {
                            name: "Nomor HP",
                            class: "admin-page__tbl",
                        },
                        {
                            name: "Email",
                            class: "admin-page__tbl",
                        },
                        {
                            name: "Aksi",
                            class: "admin-page__tbl--right",
                        },
                    ]}
                >
                    {dataTemp?.rows?.map((data, index) => {
                        return (
                            <TableSalesperson
                                lastElm={dataTemp?.rows?.length - 1}
                                index={index}
                                id={data.id}
                                salesName={data.salesName}
                                developerName={data.metadata}
                                salesEmail={data.salesEmail}
                                salesPhone={data.salesPhone}
                                status={data.status}
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

        case "adminCabang":
            return (
                <TableData
                    tblAdmin
                    header={[
                        {
                            name: "Kantor Wilayah",
                            class: "admin-page__tbl--left",
                        },
                        {
                            name: "Kantor Cabang",
                            class: "admin-page__tbl",
                        },
                        {
                            name: "PIC",
                            class: "admin-page__tbl",
                        },
                        {
                            name: "Email",
                            class: "admin-page__tbl",
                        },
                        {
                            name: "Aksi",
                            class: "admin-page__tbl--right",
                        },
                    ]}
                >
                    {dataTemp?.rows?.length !== 0 ? 
                        (
                            <>
                                {dataTemp?.rows?.map((data, index) => {
                                return (
                                    <TableAdminCabang
                                        lastElm={dataTemp?.rows?.length - 1}
                                        id={data.id}
                                        index={index}
                                        kanwil={data.kanwil}
                                        adminCabangEmail={data.adminCabangEmail}
                                        namaPic={data.namaPic}
                                        kantorCabang={data.Kancab}
                                        status={data.status}
                                        onClickDelete={() => {
                                            setReferralId(data.id)
                                            setReferralEmail(data.adminCabangEmail)
                                            dispatch(showSingleModal(true))
                                        }}
                                        onClickEdit={() => {
                                            setEditMode(true);
                                            setReferralId(data.id);
                                            handleModalEdit(data.id);
                                        }}
                                    />
                                    );
                                })}
                            </>
                        ) : (
                            <tr >
                                <td colspan="5" className="rounded-tr-lg border-l border-r text-center">Data tidak ditemukan</td>
                            </tr>
                        )
                    }
                </TableData>
            );

        case "cs":
            return (
                <TableData
                    tblAdmin
                    header={[
                        {
                            name: "Kantor Wilayah",
                            class: "admin-page__tbl--left w-1/5",
                        },
                        {
                            name: "Kantor Cabang",
                            class: "admin-page__tbl border-x w-1/5",
                        },
                        {
                            name: "PIC",
                            class: "admin-page__tbl border-x w-1/5",
                        },
                        {
                            name: "Email",
                            class: "admin-page__tbl border-x w-1/5",
                        },
                        {
                            name: "Action",
                            class: "admin-page__tbl--right text-center w-[8%]",
                        },
                    ]}
                >
                    {dataTemp?.rows?.length !== 0 ? 
                        (
                            <>
                                {dataTemp?.rows?.map((data, index) => {
                                return (
                                    <TableCS
                                        lastElm={dataTemp?.rows?.length - 1}
                                        id={data.id}
                                        index={index}
                                        kanwil={data.kanwil}
                                        adminCabangEmail={data.csEmail}
                                        namaPic={data.namaPic}
                                        kantorCabang={data.Kancab}
                                        status={data.status}
                                        onClickDelete={() => {
                                            setReferralId(data.id)
                                            setReferralName(data.namaPic)
                                            setReferralEmail(data.csEmail)
                                            dispatch(showSingleModal(true))
                                        }}
                                        onClickEdit={() => {
                                            setEditMode(true);
                                            setReferralId(data.id);
                                            handleModalEdit(data.id);
                                        }}
                                    />
                                    );
                                })}
                            </>
                        ) : (
                            <tr >
                                <td colspan="5" className="rounded-tr-lg border-l border-r text-center">Data tidak ditemukan</td>
                            </tr>
                        )
                    }
                </TableData>
            );

        default:
            return <></>;

    }
}

export default React.memo(TableUserMgmt)