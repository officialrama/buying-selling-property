import React from "react";
import { TableData } from "../../components/molecules";
import { TableDeveloper } from "../../components/molecules";
import { decryptStr, encryptStrFe } from "../../helpers/encryptDecrypt";
import { useDispatch } from "react-redux";
import { showSingleModal } from "../../store/actions/changeState";
const rupiahformat = require("rupiah-format");

const TableListDeveloper = ({ dataTemp, setEmail }) => {
    const dispatch = useDispatch();
    const onClickView = (email) => {
        window.location.href = `/admin/user-management/developer/${encodeURIComponent(encryptStrFe(email)).toString()}`;
    };

    return (
        <TableData
            tblAdmin
            header={[
                {
                    name: "Logo",
                    class: "admin-page__tbl--left",
                },
                {
                    name: "Nama Developer",
                    class: "admin-page__tbl",
                },
                {
                    name: "Nama Grup Developer",
                    class: "admin-page__tbl",
                },
                {
                    name: "Alamat",
                    class: "admin-page__tbl",
                },
                {
                    name: "PIC Developer",
                    class: "admin-page__tbl",
                },
                {
                    name: "Email Developer",
                    class: "admin-page__tbl",
                },
                {
                    name: "Range Harga Unit",
                    class: "admin-page__tbl",
                },
                {
                    name: "Buyback",
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
                            const hargadeveloper = data?.metadata?.rangeHargaUnit?.split("-");
                            return (
                                <TableDeveloper
                                    lastElm={dataTemp?.rows?.length - 1}
                                    onClickView={onClickView}
                                    index={index}
                                    logo="/icons/small-icons/Image.svg"
                                    developerName={data?.metadata?.name}
                                    groupName={data?.metadata?.groupName}
                                    address={data?.metadata?.address}
                                    developerPIC={data?.metadata?.picDeveloper}
                                    email={decryptStr(data?.email)}
                                    rangePrice={data?.metadata?.rangeHargaUnit ? `${rupiahformat.convert(hargadeveloper[0])} - ${rupiahformat.convert(hargadeveloper[1])} ` : "-"}
                                    status={data?.status}
                                    buyBack={data?.isBuyBack}
                                    onClickDelete={() => {
                                        dispatch(showSingleModal(true));
                                        setEmail(decryptStr(data?.email));
                                    }}
                                />
                            );
                        })}
                    </>
                ) : (
                    <tr >
                        <td colspan="7" className="rounded-tr-lg border-l border-r text-center">Data tidak ditemukan</td>
                    </tr>
                )
            }
        </TableData>
    )
}

export default React.memo(TableListDeveloper);