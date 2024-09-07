import React from 'react'
import {PenjualanFinal, TableCheckbox, CheckboxSalesFinal, TableData } from '../../../components/molecules';

const TableFinal = ({tableType, dataTemp, downloadData, setDownloadData, checkProps }) => {
    switch (tableType) {
        case "userReferralFinal":
            return (
                <CheckboxSalesFinal
                checkProps={checkProps}
                downloadData={downloadData}
                setDownloadData={setDownloadData}
                dataTemp={dataTemp?.responseData}
                header={[
                    {
                        name: "NIK",
                        class: "penjualan-final-list__tbl",
                    },
                    {
                        name: "Nama",
                        class: "penjualan-final-list__tbl",
                    },
                    {
                        name: "Jenis Proyek",
                        class: "penjualan-final-list__tbl",
                    },
                    {
                        name: "Tipe Properti",
                        class: "penjualan-final-list__tbl",
                    },
                    {
                        name: "Plafond Pengajuan",
                        class: "penjualan-final-list__tbl",
                    },
                    {
                        name: "Plafond Putusan",
                        class: "penjualan-final-list__tbl",
                    },
                    {
                        name: "Tanggal Pengajuan",
                        class: "penjualan-final-list__tbl",
                    },
                    {
                        name: "Tanggal Putusan",
                        class: "penjualan-final-list__tbl",
                    },
                    {
                        name: "Status",
                        class: "penjualan-final-list__tbl",
                    },
                    {
                        name: "Kantor Wilayah",
                        class: "penjualan-final-list__tbl",
                    },
                    {
                        name: "Kantor Cabang",
                        class: "penjualan-final-list__tbl--right",
                    },
                       ]}
                    >
            
                {dataTemp?.responseData?.map((data, index) => {
                    return (
                        <PenjualanFinal
                            index={index}
                            id={data.id}
                            nik={data.nik}
                            nama={data.customerName}
                            jenisproyek={data.jenisProyek}
                            jenisproperti={data.jenisProperti}
                            typeproperti={data.tipeProperti}
                            plafondpengajuan={data.plafondPengajuan}
                            plafondputusan={data.plafondPutusan}
                            tanggalpengajuan={data.createdAt}
                            tanggalputusan={data.tanggalPutusan}
                            status={data.status}
                            regional={data.regionalBranch}
                            office={data.branchOffice}
                            downloadData={downloadData}
                            setDownloadData={setDownloadData}
                            isCheck={checkProps.isCheck}
                            setIsCheck={checkProps.setIsCheck}
                            
                        />
                    );
                })}


                {/* <PenjualanDraft dispatch={dispatch} tableType="userReferralList" dataTemp={React.useMemo( () => (dataTemp),[dataTemp])} />
        {dataTemp && dataTemp?.rows?.metadata?.totalData > 10 ?
        (
            <div className='flex items-center justify-center'>
                <Pagination
                    bodyListOfUser={bodyListOfUser}
                    setBodyListOfUser={setBodyListOfUser}
                    data={dataTemp?.rows?.responseData}
                    metaData={dataTemp?.rows?.metadata}/>      
            </div>
        ) : ""
        
    } */}
            </CheckboxSalesFinal>
            );
        default:
            return <></>;

    }
}

export default React.memo(TableFinal)