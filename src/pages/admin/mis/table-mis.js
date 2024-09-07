import React from 'react'
import { TableCheckbox, TableSalesRefferal, TablePengajuanKPR, TableWishlistAdmin, TableWishlistDeveloper, TableUserRefferalDev, TableHotLeadsManagement, TableCompanyRegistration, CheckboxWishlistDev, CheckboxSalesDev } from '../../../components/molecules';
import { decryptStr } from '../../../helpers/encryptDecrypt';

const TableMIS = ({ tableType, dataTemp, downloadData, setDownloadData, checkProps }) => {
    switch (tableType) {
        case "salesRefferalAdmin":
            return (
                <TableCheckbox
                    tblAdmin
                    checkProps={checkProps}
                    downloadData={downloadData}
                    setDownloadData={setDownloadData}
                    dataTemp={dataTemp?.responseData}
                    header={[
                        {
                            name: "Nama Sales",
                            class: "admin-page__tbl",
                        },
                        {
                            name: "Nama Developer",
                            class: "admin-page__tbl",
                        },
                        {
                            name: "Nama Debitur",
                            class: "admin-page__tbl",
                        },
                        {
                            name: "NIK",
                            class: "admin-page__tbl",
                        },
                        {
                            name: "Jenis Proyek",
                            class: "admin-page__tbl",
                        },
                        {
                            name: "Status Settlement",
                            class: "admin-page__tbl",
                        },
                        {
                            name: "Nominal UTJ",
                            class: "admin-page__tbl",
                        },
                        {
                            name: "Waktu Settlement",
                            class: "admin-page__tbl",
                        },
                        {
                            name: "Plafond Pengajuan",
                            class: "admin-page__tbl",
                        },
                        {
                            name: "Plafond Putusan",
                            class: "admin-page__tbl",
                        },
                        {
                            name: "Tanggal Pengajuan",
                            class: "admin-page__tbl",
                        },
                        {
                            name: "Tanggal Putusan",
                            class: "admin-page__tbl",
                        },
                        {
                            name: "Status",
                            class: "admin-page__tbl",
                        },
                        {
                            name: "Kantor Wilayah",
                            class: "admin-page__tbl",
                        },
                        {
                            name: "Kantor Cabang",
                            class: "admin-page__tbl",
                        },
                        {
                            name: "RM",
                            class: "admin-page__tbl",
                        },
                        {
                            name: "Pemutus",
                            class: "admin-page__tbl",
                        },
                        // {
                        //     name: "Jenis Properti",
                        //     class: "admin-page__tbl",
                        // },
                        {
                            name: "Tipe Properti",
                            class: "admin-page__tbl--right",
                        },
                    ]}
                >
                    {dataTemp?.responseData?.length !== 0 ?
                        (
                            <>
                                {dataTemp?.responseData?.map((data, index) => {
                                    return (
                                        <TableSalesRefferal
                                            index={index}
                                            id={data.id}
                                            salesName={data.salesName}
                                            developerName={data?.developerName?.replace(/['"]+/g, '')}
                                            customerName={data?.customerName}
                                            nik={data?.nik}
                                            plafondPengajuan={data?.plafondPengajuan}
                                            plafondPutusan={data?.plafondPutusan}
                                            createdAt={data?.createdAt}
                                            status={data.status}
                                            jenisProperti={data.jenisProperti}
                                            jenisProyek={data.jenisProyek}
                                            tipeProperti={data.tipeProperti}
                                            tanggalPutusan={data.tanggalPutusan}
                                            branchOffice={data.branchOffice}
                                            regionalBranch={data.regionalBranch}
                                            rm={data.rm}
                                            pemutus={data.pemutus}
                                            statusSettlement={data.statusSettlement}
                                            waktuSettlement={data.waktuSettlement}
                                            nominalUTJ={data.nominalUTJ}
                                            downloadData={downloadData}
                                            setDownloadData={setDownloadData}
                                            isCheck={checkProps.isCheck}
                                            setIsCheck={checkProps.setIsCheck}
                                        />
                                    );
                                })}
                            </>
                        ) : (
                            <tr >
                                <td colspan="16" className="rounded-tr-lg border-l border-r text-center mobile:text-left">Data tidak ditemukan</td>
                            </tr>
                        )
                    }
                </TableCheckbox>
            );
        case "pengajuankprAdmin":
            return (
                <TableCheckbox
                    tblAdmin
                    checkProps={checkProps}
                    downloadData={downloadData}
                    setDownloadData={setDownloadData}
                    dataTemp={dataTemp?.responseData}
                    header={[
                        // {
                        //     name: "Kode Wilayah",
                        //     class: "admin-page__tbl",
                        // },
                        {
                            name: "Kantor Wilayah",
                            class: "admin-page__tbl",
                        },
                        // {
                        //     name: "Kode Cabang",
                        //     class: "admin-page__tbl",
                        // },
                        {
                            name: "Kantor Cabang",
                            class: "admin-page__tbl",
                        },
                        {
                            name: "No. Referensi",
                            class: "admin-page__tbl",
                        },
                        {
                            name: "Nama Debitur",
                            class: "admin-page__tbl",
                        },
                        {
                            name: "NIK",
                            class: "admin-page__tbl",
                        },
                        {
                            name: "Jenis Proyek",
                            class: "admin-page__tbl",
                        },
                        {
                            name: "Nama Proyek",
                            class: "admin-page__tbl",
                        },
                        {
                            name: "Nama Developer",
                            class: "admin-page__tbl",
                        },
                        {
                            name: "Nominal DP",
                            class: "admin-page__tbl",
                        },
                        {
                            name: "Nominal Pengajuan",
                            class: "admin-page__tbl",
                        },
                        {
                            name: "Status Settlement",
                            class: "admin-page__tbl",
                        },
                        {
                            name: "Nominal UTJ",
                            class: "admin-page__tbl",
                        },
                        {
                            name: "Waktu Settlement",
                            class: "admin-page__tbl",
                        },
                        {
                            name: "Plafon Pengajuan",
                            class: "admin-page__tbl",
                        },
                        // {
                        //     name: "Jenis KPR",
                        //     class: "admin-page__tbl",
                        // },                
                        // {
                        //     name: "Pekerjaan Debitur",
                        //     class: "admin-page__tbl",
                        // },
                        // {
                        //     name: "PN Pemeriksa",
                        //     class: "admin-page__tbl",
                        // },
                        // {
                        //     name: "Nama Pemeriksa",
                        //     class: "admin-page__tbl",
                        // },
                        // {
                        //     name: "PN Pemutus",
                        //     class: "admin-page__tbl",
                        // },
                        {
                            name: "Nama Pemutus",
                            class: "admin-page__tbl",
                        },
                        {
                            name: "Nominal Putusan",
                            class: "admin-page__tbl",
                        },
                        {
                            name: "Program Suku Bunga",
                            class: "admin-page__tbl",
                        },
                        {
                            name: "Source",
                            class: "admin-page__tbl",
                        },
                        {
                            name: "Tanggal Pengajuan",
                            class: "admin-page__tbl",
                        },
                        {
                            name: "Tanggal Proses",
                            class: "admin-page__tbl",
                        },
                        {
                            name: "Tanggal Putusan",
                            class: "admin-page__tbl",
                        },
                        {
                            name: "Status",
                            class: "admin-page__tbl",
                        },
                        {
                            name: "RM",
                            class: "admin-page__tbl",
                        },
                        // {
                        //     name: "Pemutus",
                        //     class: "admin-page__tbl",
                        // },
                        // {
                        //     name: "Jenis Properti",
                        //     class: "admin-page__tbl",
                        // },
                        {
                            name: "Tipe Properti",
                            class: "admin-page__tbl--right",
                        },
                    ]}
                >
                    {dataTemp?.responseData?.length !== 0 ?
                        (
                            <>
                                {dataTemp?.responseData?.map((data, index) => {
                                    return (
                                        <TablePengajuanKPR
                                            index={index}
                                            id={data.id}
                                            namaProyek={data.namaProyek}
                                            namaDeveloper={data.namaDeveloper}
                                            nominalPengajuan={data.nominalPengajuan}
                                            nominalDP={data.nominalDP}
                                            statusSettlement={data.statusSettlement}
                                            waktuSettlement={data.waktuSettlement}
                                            nominalUtj={data.nominalUtj}
                                            branchOffice={data.branchOffice}
                                            gimmick={data.gimmick}
                                            namaDebitur={data.namaDebitur}
                                            nik={data.nik}
                                            plafondPengajuan={data.plafondPengajuan}
                                            refNo={data.refNo}
                                            regionalOffice={data.regionalOffice}
                                            rm={data.rm}
                                            source={data.source}
                                            status={data.status}
                                            pemutus={data.pemutus}
                                            nominalPutusan={data.nominalPutusan}
                                            tanggalPengajuan={data.tanggalPengajuan}
                                            tanggalProses={data.tanggalProses}
                                            tanggalPutusan={data.tanggalPutusan}
                                            jenisProperti={data.jenisProperti}
                                            jenisProyek={data.jenisProyek}
                                            tipeProperti={data.tipeProperti}
                                            downloadData={downloadData}
                                            setDownloadData={setDownloadData}
                                            isCheck={checkProps.isCheck}
                                            setIsCheck={checkProps.setIsCheck}
                                        />
                                    );
                                })}
                            </>
                        ) : (
                            <tr >
                                <td colspan="23" className="rounded-tr-lg border-l border-r text-center mobile:text-left">Data tidak ditemukan</td>
                            </tr>
                        )
                    }
                </TableCheckbox>
            );
        case "wishlistAdmin":
            return (
                <TableCheckbox
                    tblAdmin
                    checkProps={checkProps}
                    downloadData={downloadData}
                    setDownloadData={setDownloadData}
                    dataTemp={dataTemp?.responseData}
                    header={[
                        {
                            name: "Visitor",
                            class: "admin-page__tbl",
                        },
                        {
                            name: "Email",
                            class: "admin-page__tbl",
                        },
                        {
                            name: "Proyek",
                            class: "admin-page__tbl",
                        },
                        {
                            name: "Properti",
                            class: "admin-page__tbl",
                        },
                        {
                            name: "Developer",
                            class: "admin-page__tbl",
                        },
                        {
                            name: "No. Handphone",
                            class: "admin-page__tbl",
                        },
                        {
                            name: "Visited Date",
                            class: "admin-page__tbl",
                        },
                        {
                            name: "Status",
                            class: "admin-page__tbl--right",
                        }
                    ]}
                >
                    {dataTemp?.responseData?.length !== 0 ?
                        (
                            <>
                                {dataTemp?.responseData?.map((data, index) => {
                                    return (
                                        <TableWishlistAdmin
                                            index={index}
                                            id={data.id}
                                            developerName={data.developer_name}
                                            email={data.email}
                                            visitorName={data.full_name}
                                            mobileNo={data.mobile_no}
                                            namaProyek={data.nama_proyek}
                                            namaProperti={data.nama_properti}
                                            createdAt={data.created_at}
                                            type={data.type}
                                            downloadData={downloadData}
                                            setDownloadData={setDownloadData}
                                            isCheck={checkProps.isCheck}
                                            setIsCheck={checkProps.setIsCheck}
                                        />
                                    );
                                })}
                            </>
                        ) : (
                            <tr >
                                <td colspan="9" className="rounded-tr-lg border-l border-r text-center mobile:text-left">Data tidak ditemukan</td>
                            </tr>
                        )
                    }
                </TableCheckbox>
            );
        case "wishlistDeveloper":
            return (
                <CheckboxWishlistDev
                    tblAdmin
                    checkProps={checkProps}
                    downloadData={downloadData}
                    setDownloadData={setDownloadData}
                    dataTemp={dataTemp?.responseData}
                    header={[
                        {
                            name: "Visitor",
                            class: "admin-page__tbl",
                        },
                        {
                            name: "Email",
                            class: "admin-page__tbl",
                        },
                        {
                            name: "Proyek",
                            class: "admin-page__tbl",
                        },
                        {
                            name: "Properti",
                            class: "admin-page__tbl",
                        },
                        {
                            name: "No. Handphone",
                            class: "admin-page__tbl",
                        },
                        {
                            name: "Visited Date",
                            class: "admin-page__tbl",
                        },
                        {
                            name: "Status",
                            class: "admin-page__tbl--right",
                        }
                    ]}
                >
                    {dataTemp?.responseData?.length !== 0 ?
                        (
                            <>
                                {dataTemp?.responseData?.map((data, index) => {
                                    return (
                                        <TableWishlistDeveloper
                                            index={index}
                                            id={data.id}
                                            email={data.email}
                                            visitorName={data.full_name}
                                            mobileNo={data.mobile_no}
                                            namaProyek={data.nama_proyek}
                                            namaProperti={data.nama_properti}
                                            tanggal={data.created_at}
                                            type={data.type}
                                            downloadData={downloadData}
                                            setDownloadData={setDownloadData}
                                            isCheck={checkProps.isCheck}
                                            setIsCheck={checkProps.setIsCheck}
                                        />
                                    );
                                })}
                            </>
                        ) : (
                            <tr >
                                <td colspan="8" className="rounded-tr-lg border-l border-r text-center mobile:text-left">Data tidak ditemukan</td>
                            </tr>
                        )
                    }
                </CheckboxWishlistDev>
            );
        case "userRefferalDeveloper":
            return (
                <CheckboxSalesDev
                    tblAdmin
                    checkProps={checkProps}
                    downloadData={downloadData}
                    setDownloadData={setDownloadData}
                    dataTemp={dataTemp?.responseData}
                    header={[
                        {
                            name: "Nama Sales",
                            class: "admin-page__tbl",
                        },
                        {
                            name: "Nama Debitur",
                            class: "admin-page__tbl",
                        },
                        {
                            name: "NIK",
                            class: "admin-page__tbl",
                        },
                        {
                            name: "Jenis Proyek",
                            class: "admin-page__tbl",
                        },
                        {
                            name: "Status Settlement",
                            class: "admin-page__tbl",
                        },
                        {
                            name: "Nominal UTJ",
                            class: "admin-page__tbl",
                        },
                        {
                            name: "Waktu Settlement",
                            class: "admin-page__tbl",
                        },
                        {
                            name: "Plafond Pengajuan",
                            class: "admin-page__tbl",
                        },
                        {
                            name: "Plafond Putusan",
                            class: "admin-page__tbl",
                        },
                        {
                            name: "Tanggal Pengajuan",
                            class: "admin-page__tbl",
                        },
                        {
                            name: "Tanggal Putusan",
                            class: "admin-page__tbl",
                        },
                        {
                            name: "Status",
                            class: "admin-page__tbl",
                        },
                        {
                            name: "Kantor Wilayah",
                            class: "admin-page__tbl",
                        },
                        {
                            name: "Kantor Cabang",
                            class: "admin-page__tbl",
                        },
                        {
                            name: "RM",
                            class: "admin-page__tbl",
                        },
                        {
                            name: "Pemutus",
                            class: "admin-page__tbl",
                        },
                        {
                            name: "Tipe Properti",
                            class: "admin-page__tbl--right",
                        },
                    ]}
                >
                    {dataTemp?.responseData?.length !== 0 ?
                        (
                            <>
                                {dataTemp?.responseData?.map((data, index) => {
                                    return (
                                        <TableUserRefferalDev
                                            index={index}
                                            id={data.id}
                                            namasales={data.salesName}
                                            customerName={data.customerName}
                                            nik={data.nik}
                                            jenisproyek={data.jenisProyek}
                                            plafondpengajuan={data.plafondPengajuan}
                                            plafondputusan={data.plafondPutusan}
                                            tanggalpengajuan={data.createdAt}
                                            tanggalputusan={data.tanggalPutusan}
                                            status={data.status}
                                            regional={data.regionalBranch}
                                            office={data.branchOffice}
                                            rm={data.rm}
                                            pemutus={data.pemutus}
                                            jenisproperti={data.jenisProperti}
                                            typeproperti={data.tipeProperti}
                                            statusSettlement={data.statusSettlement}
                                            waktuSettlement={data.waktuSettlement}
                                            nominalUTJ={data.nominalUTJ}
                                            downloadData={downloadData}
                                            setDownloadData={setDownloadData}
                                            isCheck={checkProps.isCheck}
                                            setIsCheck={checkProps.setIsCheck}
                                        />
                                    );
                                })}
                            </>
                        ) : (
                            <tr >
                                <td colspan="15" className="rounded-tr-lg border-l border-r text-center mobile:text-left">Data tidak ditemukan</td>
                            </tr>
                        )
                    }
                </CheckboxSalesDev>
            );
        case "hotLeadsMgmt":
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
                            name: "Debitur",
                            class: "admin-page__tbl",
                        },
                        {
                            name: "NIK",
                            class: "admin-page__tbl",
                        },
                        {
                            name: "Plafond Pengajuan",
                            class: "admin-page__tbl",
                        },
                        {
                            name: "Plafond Putusan",
                            class: "admin-page__tbl",
                        },
                        {
                            name: "Program Suku Bunga",
                            class: "admin-page__tbl",
                        },
                        {
                            name: "Tanggal Pengajuan",
                            class: "admin-page__tbl",
                        },
                        {
                            name: "Tanggal Putusan",
                            class: "admin-page__tbl",
                        },
                        {
                            name: "Status",
                            class: "admin-page__tbl",
                        },
                        {
                            name: "Kantor Wilayah",
                            class: "admin-page__tbl",
                        },
                        {
                            name: "Kantor Cabang",
                            class: "admin-page__tbl",
                        },
                        {
                            name: "RM",
                            class: "admin-page__tbl",
                        },
                        {
                            name: "Pemutus",
                            class: "admin-page__tbl",
                        },
                        {
                            name: "Developer",
                            class: "admin-page__tbl",
                        },
                        {
                            name: "Nama Proyek",
                            class: "admin-page__tbl",
                        },
                        {
                            name: "Jenis Proyek",
                            class: "admin-page__tbl",
                        },
                        {
                            name: "Tipe Properti",
                            class: "admin-page__tbl--right",
                        }
                    ]}
                >
                    {dataTemp?.responseData?.map((data, index) => {
                        return (
                            <TableHotLeadsManagement
                                index={index}
                                id={data.id}
                                page={dataTemp?.metadata?.currentPage}
                                loanRefferalCompany={data.loanReferralCompany}
                                namaDebitur={data.namaDebitur}
                                nik={data.nik}
                                plafondPengajuan={data.plafondPengajuan}
                                plafondPutusan={data.plafondPutusan}
                                // namaProperti={data.namaProperti}
                                gimmick={data.gimmick}
                                tanggalPengajuan={data.createdDate}
                                tanggalPutusan={data.TanggalPutusan}
                                status={data.status_desc_brispot}
                                regionalOffice={data.regionalOffice}
                                branchOffice={data.branchOffice}
                                // rm={data.rm}
                                // pemutus={data.pemutus}
                                namaDeveloper={data.namaDeveloper}
                                namaProyek={data.namaProyek}
                                jenisProyek={data.jenisProperti}
                                tipeProperti={data.tipeProperti}
                                downloadData={downloadData}
                                setDownloadData={setDownloadData}
                                isCheck={checkProps.isCheck}
                                setIsCheck={checkProps.setIsCheck}
                            />
                        );
                    })}
                </TableCheckbox>
            );
        
        // case "companyRegistration":
        //     return (
        //         <TableCheckbox
        //             tblAdmin
        //             checkProps={checkProps}
        //             downloadData={downloadData}
        //             setDownloadData={setDownloadData}
        //             dataTemp={dataTemp?.responseData}
        //             header={[
        //                 {
        //                     name: "Nomor",
        //                     class: "admin-page__tbl",
        //                 },
        //                 {
        //                     name: "LRC",
        //                     class: "admin-page__tbl",
        //                 },
        //                 {
        //                     name: "Nomor ID",
        //                     class: "admin-page__tbl",
        //                 },
        //                 {
        //                     name: "Aksi",
        //                     class: "admin-page__tbl--right",
        //                 }
        //             ]}
        //         >
        //             {dataTemp?.responseData?.map((data, index) => {
        //                 return (
        //                     <TableCompanyRegistration
        //                         index={index}
        //                         id={data.id}
        //                         loanRefferalCompany={data.namaPartner}
        //                         loanReferralCode={data.uniqueCode}
        //                         downloadData={downloadData}
        //                         setDownloadData={setDownloadData}
        //                         isCheck={checkProps.isCheck}
        //                         setIsCheck={checkProps.setIsCheck}
        //                     />
        //                 );
        //             })}
        //         </TableCheckbox>
        //     );
        default:
            return <></>;

    }
}

export default React.memo(TableMIS)