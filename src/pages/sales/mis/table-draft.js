import cookie from 'hs-cookie';
import _ from 'lodash';
import React from 'react'
import { TableData, PenjualanDraft, Checkbox } from '../../../components/molecules';
import { decryptStr, encryptStr } from '../../../helpers/encryptDecrypt';
import { toTitleCase } from '../../../helpers/string';
import { showApprovalKprModal } from '../../../store/actions/changeModalState';
import { showSingleModal } from '../../../store/actions/changeState';
import { projectDetail } from '../../../store/actions/fetchData/v2/detailProjectV2';

const TableDraft = ({ setDraftId, dispatch, stateModal, tableType, dataTemp, email, setPropertiId, setSalesReferralId }) => {
    switch (tableType) {
        case "userReferral":
            return (
                <TableData
                header={[
                    {
                        name: "Nama",
                        class: "admin-page__tbl--left",
                    },
                    {
                        name: "Nomor Handphone",
                        class: "admin-page__tbl",
                    },
                    {
                        name: "Kode Properti",
                        class: "admin-page__tbl",
                    },
                    {
                        name: "Tanggal Penjualan",
                        class: "admin-page__tbl",
                    },
                    {
                        name: "Aksi",
                        class: "admin-page__tbl--right",
                    },
                ]}
            >
                {dataTemp?.rows?.responseData?.map((data, index) => {
                
                    return (
                        <PenjualanDraft
                            index={index}
                            name={data.name}
                            mobileNo={data.mobileNo}
                            propertiID={data.propertiID}
                            createdAt={data.createdAt}
                            status={toTitleCase(data.status)}
                            onClickEdit={() => {
                                setDraftId(data.id);
                                setPropertiId(data.propertiID)
                                setSalesReferralId(data.id)
                                dispatch(showApprovalKprModal(!stateModal.showApprovalKprModal));
                                window.localStorage.setItem( "dataDraft", JSON.stringify({ idDraft: data.id, name: data.name, mobileNo: data.mobileNo }));
                            }}
                            onClickDelete={() => {
                                setDraftId(data.id);
                                dispatch(showSingleModal(true));
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

export default React.memo(TableDraft)