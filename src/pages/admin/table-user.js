import React from "react";
import { TableData } from "../../components/molecules";
import { MonitoringUserStatus } from "../../components/molecules";
import { decryptStr } from "../../helpers/encryptDecrypt";
import { toTitleCase } from "../../helpers/string";
import { useDispatch } from "react-redux";
import { showSingleModal } from "../../store/actions/changeState";

const TableUser = ({ dataTemp, setEmail, setTypeUser }) => {
  const dispatch = useDispatch();

  return (
    <div className="my-4">
    <table className="w-full">
      <thead className="">
        <tr className="bg-[#BBDEFA] text-sm text-[#292929] font-semibold ">
          <th className="border-l p-3 text-center rounded-tl-lg ">No</th>
          <th className="text-center">Tipe</th>
          <th className="text-center">Nama</th>
          <th className="text-center">Email</th>
          <th className="text-center">Status</th> 
          <th className="text-center">Preferensi Lokasi</th> 
          <th className="text-center">Preferensi Harga</th> 
          <th className="text-center w-[80px] rounded-tr-lg">Aksi</th>
        </tr>
      </thead>
      <tbody>
      {dataTemp?.rows?.length !== 0 ?
        (
          <>
            {dataTemp?.rows?.map((data, index) => {
              return (
                <MonitoringUserStatus
                  lastElm={dataTemp?.rows?.length - 1}
                  index={index}
                  type={decryptStr(data.type)}
                  name={data}
                  email={decryptStr(data.email)}
                  status={data.status}
                  onClickDelete={() => {
                    dispatch(showSingleModal(true));
                    setEmail(decryptStr(data.email));
                    (decryptStr(data?.type) && setTypeUser(toTitleCase(decryptStr(data?.type))));
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
      </tbody>
    </table>
  </div>
  )
}

export default React.memo(TableUser);