/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SmallLoading } from "../../components/atoms";
import { TableData, TblListPengajuanKpr } from "../../components/molecules";
import { Modal, Tabs } from "../../components/organisms";
import { ProfileUser } from "../../components/templates";
import { statusMapListKPR } from "../../helpers/statusMapping";
import useListPropertyHooks from "../../hooks/useListPropertyHooks";
import { personalDataConst } from "../../static/personal-data/personal-data";
import { staticConst } from "../../static/staticConst";
import { deleteProperty, inquiryListingProperty, listKprProperty } from "../../store/actions/fetchData/inquiryProp";
import { closeModalSuccess } from "../../store/actions/fetchData/superAdminState";
import moment from "moment";

const ListPengajuanKpr = ({ userStatus, email }) => {
  const saState = useSelector((state) => state.superAdminReducer);
  const dispatch = useDispatch();
  const { bodyListPengajuanKpr, listProp, setListProp, modalDelete, setModalDelete, id, setId, tabId, setTabId, dataTemp, setDataTemp, onFetchData, setOnFetchData } = useListPropertyHooks();
  useEffect(() => {
    dispatch(listKprProperty({ ...bodyListPengajuanKpr, email: email }, setListProp, setOnFetchData));
  }, []);

  let [categories] = useState({
    "Draft": [],
    "Dalam Proses": [],
    "Telah Diputus": [],
    "Proses Pencairan": [],
    "Dicairkan": [],
    "Pencairan Gagal": [],
    "Pengajuan Ditolak": []
  });

  const [filter, setFilter] = useState({
    listType: staticConst.listPengajuanKpr[0],
  });

  // const handleSelectDropdown = (data) => {
  //   setFilter({
  //     ...filter,
  //     listType: data,
  //   });
  //   dispatch(listKprProperty({ ...bodyListPengajuanKpr, email: email, status: data.value }, setListProp, setOnFetchData));
  //   switch (data.value) {
  //     case "on_draft":
  //       setTabId(0);
  //       break;
  //     case "on_reviewed":
  //       setTabId(1);
  //       break;
  //     case "on_approved":
  //       setTabId(2);
  //       break;
  //     case "on_disbursement_process":
  //       setTabId(3);
  //       break;
  //     case "on_disbursed":
  //       setTabId(4);
  //       break;
  //     case "on_disbursed_failed":
  //       setTabId(5);
  //       break;
  //     case "on_rejected":
  //       setTabId(6);
  //       break;
  //     default:
  //       break;
  //   }
  // }

  const handleClickTab = (props) => {
    function inquiryData(status, num) {
      dispatch(listKprProperty({ ...bodyListPengajuanKpr, email: email, status: status }, setListProp, setOnFetchData));
      setFilter({ listType: staticConst.listPengajuanKpr[num] });
      setTabId(num);
    }
    switch (props) {
      case 0:
        inquiryData("on_draft", 0);
        break;
      case 1:
        inquiryData("on_reviewed", 1);
        break;
      case 2:
        inquiryData("on_approved", 2);
        break;
      case 3:
        inquiryData("on_disbursement_process", 3);
        break;
      case 4:
        inquiryData("on_disbursed", 4);
        break;
      case 5:
        inquiryData("on_disbursed_failed", 5);
        break;
      case 6:
        inquiryData("on_rejected", 6);
        break;
      default:
        break;
    }
  }

  useEffect(() => {
    setDataTemp({
      ...dataTemp,
      originalRows: listProp?.res?.responseData,
      rows: listProp?.res?.responseData,
    });
  }, [listProp?.res]);

  // const handleInputSearchChange = (evt) => {
  //   setDataTemp({
  //     ...dataTemp,
  //     search: evt.target.value,
  //   });
  // };


  // const handleOnSearch = () => {
  //   const tempRows = dataTemp.originalRows.filter((evt) => (
  //     JSON.stringify(evt?.no).toLowerCase().indexOf(dataTemp?.search.toLowerCase()) >= 0 ||
  //     JSON.stringify(evt?.refNoPengajuanBrispot || "").toLowerCase().indexOf(dataTemp.search.toLowerCase()) >= 0 ||
  //     JSON.stringify(evt?.name).toLowerCase().indexOf(dataTemp?.search.toLowerCase()) >= 0 ||
  //     JSON.stringify('-').toLowerCase().indexOf(dataTemp?.search.toLowerCase()) >= 0 ||
  //     JSON.stringify('-').toLowerCase().indexOf(dataTemp?.search.toLowerCase()) >= 0 ||
  //     JSON.stringify('-').toLowerCase().indexOf(dataTemp?.search.toLowerCase()) >= 0 ||
  //     JSON.stringify(moment.unix(evt?.createdAt / 1000).format("DD MMM YYYY")).toLowerCase().indexOf(dataTemp.search.toLowerCase()) >= 0 ||
  //     JSON.stringify(moment.unix(evt?.updatedAt / 1000).format("DD MMM YYYY")).toLowerCase().indexOf(dataTemp.search.toLowerCase()) >= 0 ||
  //     JSON.stringify(evt?.ukerName.toLowerCase()).indexOf(dataTemp?.search.toLowerCase()) >= 0 ||
  //     JSON.stringify('-').toLowerCase().indexOf(dataTemp?.search.toLowerCase()) >= 0 ||
  //     JSON.stringify(evt?.approvalPlafondBrispot || "").toLowerCase().indexOf(dataTemp.search.toLowerCase()) >= 0 ||
  //     JSON.stringify(statusMapListKPR?.(evt?.status)).toLowerCase().indexOf(dataTemp?.search.toLowerCase()) >= 0 ||
  //     JSON.stringify(evt?.notes || "").toLowerCase().indexOf(dataTemp.search.toLowerCase()) >= 0
  //   ));

  //   setDataTemp({
  //     ...dataTemp,
  //     rows: tempRows,
  //   });
  // };

  // const handleKeyDown = (evt) => {
  //   if (evt.key === "Enter") {
  //     handleOnSearch();
  //   }
  // };

  return (
    <div>
      {modalDelete && <Modal
        closeModal={() => { setModalDelete(false); setId(0); }}
        onClickDelete={() => {
          setModalDelete(false);
          dispatch(deleteProperty(id, setId));
        }}
        modalTypes="deleteConfirm"
        title="Konfirmasi"
      />}
      {saState.success === true || saState.fail === true ? (
        <Modal
          closeModal={() => {
            dispatch(closeModalSuccess());
            dispatch(inquiryListingProperty({ ...bodyListPengajuanKpr, email: email }, setListProp, setOnFetchData));
          }}
          modalTypes="modalSF"
          title=""
          titleBody={saState.success ? saState.titleSuccess : saState.fail ? saState.titleFail : ""}
          descBody={saState.success ? saState.msgSuccess : saState.fail ? saState.msgFail : ""}
        />
      ) : <></>}
      <ProfileUser
        title="List Pengajuan KPR"
        desc="Daftar Pengajuan KPR Anda"
        userStatus={userStatus}
        data={saState.resApi && saState.resApi?.responseData && saState.resApi?.responseData[0]}
      >
        <div className="property-listing__wrapper">
          {/* <Tabs categories={categories} dropdownData={staticConst?.listPengajuanKpr} type={filter?.listType} setModalDelete={setModalDelete} setId={setId} handleClickTab={handleClickTab} selectedIndex={tabId} dataTemp={dataTemp} onFetchData={onFetchData} showSellBtn={false}> */}

            <TableData
              header={[
                { name: "No", class: "pengajuan-kpr-list__header" },
                { name: "No Referensi", class: "pengajuan-kpr-list__header" },
                { name: "Nama", class: "pengajuan-kpr-list__header" },
                { name: "Nama Properti", class: "pengajuan-kpr-list__header" },
                { name: "Lokasi Properti", class: "pengajuan-kpr-list__header" },
                { name: "Nama Developer", class: "pengajuan-kpr-list__header" },
                { name: "Tanggal Pengajuan", class: "pengajuan-kpr-list__header" },
                { name: "Tanggal Putusan", class: "pengajuan-kpr-list__header" },
                { name: "Nama Uker", class: "pengajuan-kpr-list__header" },
                { name: "Plafond Pengajuan", class: "pengajuan-kpr-list__header" },
                { name: "Harga Properti", class: "pengajuan-kpr-list__header" },
                { name: "Status", class: "pengajuan-kpr-list__header" },
                { name: "", class: "pengajuan-kpr-list__header" },
              ]}
            >
              {onFetchData ?
                <tr>
                  <td colSpan="14" className="tabs-profile__loading">
                    <SmallLoading blueColor={true} />
                  </td>
                </tr>
                :
                (dataTemp?.rows?.length > 0 ?
                  (dataTemp?.rows?.map((data, index) => {
                    if (!data?.kpr) {
                      return (
                        <tr>
                          <td colSpan="14" className="tabs-profile__loading">
                            <p className="tabs-profile__text-not-found">Data tidak ditemukan</p>
                          </td>
                        </tr>
                      )
                    } else {
                      return (
                        <TblListPengajuanKpr
                          index={index}
                          data={data}
                        />
                      );
                    }
                  }))
                  :
                  <tr>
                    <td colSpan="14" className="tabs-profile__loading">
                      <p className="tabs-profile__text-not-found">Data tidak ditemukan</p>
                    </td>
                  </tr>
                )
              }
            </TableData>

          {/* </Tabs> */}
        </div>
      </ProfileUser>
    </div>
  );
};

export default ListPengajuanKpr;
