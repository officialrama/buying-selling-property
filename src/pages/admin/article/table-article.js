import React from "react"
import { TableArticleRow } from "../../../components/molecules"
import { showSingleModal } from "../../../store/actions/changeState"
import { useDispatch } from "react-redux"

const TableArticle = ({
    dataTemp,
    onPublish,
    onClickView,
    onClickEdit,
    onClickDelete
}) => {
    const dispatch = useDispatch()

    const header = [
        {
            name: "No",
            class: "admin-page__tbl--left w-[40px]"
        },
        {
            name: "Tipe",
            class: "w-[64px] "
        },
        {
            name: "Judul",
            class: "admin-page__tbl w-[266px] "
        },
        {
            name: "Kategori",
            class: "w-[200px] "
        },
        {
            name: "Deskripsi",
            class: "bg-[#BBDEFA] "
        },
        {
            name: "Terbit",
            class: "admin-page__tbl w-[90px] "
        },
        {
            name: "Action",
            class: "admin-page__tbl--right w-[126px] "
        }
    ]

    return (
        <div className="overflow-x-auto">
            <table className="w-full table-article">
                <thead className="table-data">
                <tr>
                    {header.map((headerData, idx) => {
                    return (
                        <th className={headerData.class} key={idx}>{headerData.name}</th>
                    );
                    })}
                </tr>
                </thead>
                <tbody>
                {dataTemp?.length > 0 ? (
                    <>
                        {dataTemp?.map((data, index) => {
                        return (
                            <TableArticleRow
                                key={index}
                                index={index}
                                id={data.id}
                                tipe={data.type}
                                judul={data.title}
                                kategori={data.category?.name}
                                deskripsi={data.metadata?.description}
                                status={data.published_at}
                                onPublish={() => { 
                                    onPublish({slug: data.slug, publishedDate: data.published_at , state: true})
                                    dispatch(showSingleModal(true))
                                }}
                                onClickView={() => onClickView(data.slug)}
                                onClickEdit={() => onClickEdit(data.slug)}
                                onClickDelete={() => {
                                    onClickDelete({slug: data.slug, state: true})
                                    dispatch(showSingleModal(true))
                                }}
                            />
                        )
                        })}
                    </>
                ) : (
                    <tr>
                        <td colspan="7" className="rounded-tr-lg border-l border-r text-center">Data tidak ditemukan</td>
                    </tr>
                )}
                </tbody>
            </table>
        </div>
    )
}

export default React.memo(TableArticle)