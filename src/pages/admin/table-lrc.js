import React from 'react'
import { TableCheckbox, TableCompanyRegistration } from '../../components/molecules';
import { showSingleModal } from '../../store/actions/changeState';

const TableLRC = ({ tableType, dataTemp, setEditMode, dispatch, setId, handleModalEdit, downloadData, setDownloadData, checkProps }) => {
    switch (tableType) {
        case "companyRegistration":
            return (
                <TableCheckbox
                    tblAdmin
                    checkProps={checkProps}
                    downloadData={downloadData}
                    setDownloadData={setDownloadData}
                    dataTemp={dataTemp?.responseData}
                    header={[
                        {
                            name: "Nomor",
                            class: "admin-page__tbl",
                        },
                        {
                            name: "LRC",
                            class: "admin-page__tbl",
                        },
                        {
                            name: "Nomor ID",
                            class: "admin-page__tbl",
                        },
                        {
                            name: "Nomor PKS",
                            class: "admin-page__tbl",
                        },
                        {
                            name: "Aksi",
                            class: "admin-page__tbl--right",
                        }
                    ]}
                >
                    {dataTemp?.responseData?.length !== 0 ?
                        (
                            <>
                                {dataTemp?.responseData?.map((data, index) => {
                                    return (
                                        <TableCompanyRegistration
                                            lastElm={dataTemp?.rows?.length - 1}
                                            page={dataTemp?.metadata?.currentPage}
                                            index={index}
                                            id={String(data.id)}
                                            loanRefferalCompany={data.namaPartner}
                                            loanReferralCode={data.uniqueCode}
                                            url={data.url}
                                            nomerPks={data.nomerPks}
                                            downloadData={downloadData}
                                            setDownloadData={setDownloadData}
                                            isCheck={checkProps.isCheck}
                                            setIsCheck={checkProps.setIsCheck}
                                            onClickDelete={() => {
                                                setId(data.uniqueCode)
                                                dispatch(showSingleModal(true));
                                            }}
                                            onClickEdit={() => {
                                                setEditMode(true);
                                                setId(data.uniqueCode);
                                                handleModalEdit(data.uniqueCode);
                                            }}
                                        />
                                    );
                                })}
                            </>
                        ) : (
                            <tr >
                                <td colspan="5" className="rounded-tr-lg border-l border-r text-center mobile:text-left">Data tidak ditemukan</td>
                            </tr>
                        )
                    }
                </TableCheckbox>
            );

        default:
            return <></>;

    }
}

export default React.memo(TableLRC)