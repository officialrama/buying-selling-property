import React from "react"
import { TableData } from "../../components/molecules"
import { showSingleModal } from "../../store/actions/changeState"
import { DynamicBannerTable } from "../../components/molecules"

const TableBanner = ({
    dataTemp,
    setEditMode,
    dispatch,
    handleModalEdit,
    otherProps
}) => {

    return (
        <TableData
            tblAdmin
            header={[
                {
                    name: "Urutan Posisi Banner",
                    class: "admin-page__tbl--left",
                },
                {
                    name: "Gambar",
                    class: "admin-page__tbl border-x",
                },
                {
                    name: "Nama Banner",
                    class: "admin-page__tbl",
                },
                {
                    name: "Link Tautan",
                    class: "admin-page__tbl border-x",
                },
                {
                    name: "Aksi",
                    class: "admin-page__tbl--right",
                }
            ]}
        >
            {dataTemp?.length !== 0 ? (
                <>
                    {dataTemp?.map((data, index) => {
                        const gambar = `${data?.ImageUrl}?${Date.now()}`
                        return (
                            <DynamicBannerTable
                                index={index}
                                id={data?.ID}
                                gambar={gambar} 
                                judul={data?.Judul}
                                link={data?.DirectUrl}
                                onClickDelete={() => otherProps.bannerOnClickDelete(data?.ID)}
                                onClickEdit={()=> otherProps.bannerOnClickEdit(data?.ID)}
                            />
                        )
                    })}
                </>
            ) : (
                <tr>
                    <td colspan="5" className="rounded-tr-lg border-l border-r text-center">Data tidak ditemukan</td>
                </tr>
            )}
        </TableData>
    )
}

export default React.memo(TableBanner)