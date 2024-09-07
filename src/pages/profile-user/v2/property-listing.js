/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { SmallLoading } from "../../../components/atoms";
import { TableData, TblListPropertyV2 } from "../../../components/molecules";
import { Modal, Tabs } from "../../../components/organisms";
import { ProfileUser } from "../../../components/templates";
import useListPropertyHooksV2 from "../../../hooks/v2/useListPropertyHooks";
import { staticConst } from "../../../static/staticConst";
import { closeModalFail, closeModalSuccess } from "../../../store/actions/fetchData/superAdminState";
import { closedProject, listProject, publishProject } from "../../../store/actions/fetchData/v2/listProject";
import { sendProjectBrispot } from "../../../store/actions/fetchData/v2/saveProject";

const PropertyListingV2 = ({ userStatus, email }) => {
  const saState = useSelector((state) => state.superAdminReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { listProp, bodyListProp, setListProp, modalDelete, setModalDelete, id, setId, tabId, setTabId, dataTemp, setDataTemp, onFetchData, setOnFetchData, selectType, setSelectType, modalPublish, setModalPublish } = useListPropertyHooksV2();
  useEffect(() => {
    dispatch(listProject({ ...bodyListProp, email: email }, setListProp, setOnFetchData));
  }, []);

  let [categories] = useState({
    Draft: [],
    Published: [],
    Closed: []
  });

  const [filter, setFilter] = useState({
    listType: staticConst.listingProperty[0],
  });

  const handleSelectDropdown = (data) => {
    setFilter({
      ...filter,
      listType: data,
    });
    dispatch(listProject({ ...bodyListProp, email: email, status: data.value }, setListProp, setOnFetchData));
    switch (data.value) {
      case "draft":
        setTabId(0);
        break;
      case "published":
        setTabId(1);
        break;
      case "closed":
        setTabId(2);
        break;
      default:
        break;
    }
  }

  const handleClickTab = (props) => {
    function inquiryData(status, num) {
      dispatch(listProject({ ...bodyListProp, email: email, status: status }, setListProp, setOnFetchData));
      setFilter({ listType: staticConst.listingProperty[num] });
      setTabId(num);
    }
    switch (props) {
      case 0:
        inquiryData("draft", 0);
        break;
      case 1:
        inquiryData("published", 1);
        break;
      case 2:
        inquiryData("closed", 2);
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

  const handleInputSearchChange = (evt) => {
    setDataTemp({
      ...dataTemp,
      search: evt.target.value,
    });
  };

  const handleOnSearch = () => {
    const tempRows = dataTemp.originalRows.filter((evt) => (
      JSON.stringify(evt).toLowerCase().indexOf(dataTemp.search.toLowerCase()) >= 0
    ));
    setDataTemp({
      ...dataTemp,
      rows: tempRows,
    });
  };

  const handleKeyDown = (evt) => {
    if (evt.key === "Enter") {
      window.scrollTo(0, 0);
      handleOnSearch();
    }
  };

  return (
    <div>
      {modalDelete && <Modal
        closeModal={() => { setModalDelete(false); setId(0); }}
        title="Konfirmasi"
        modalTypes="confirm"
        onConfirm={() => {
          setModalDelete(false);
          dispatch(closedProject({ id: id }));
          dispatch(sendProjectBrispot(id));
        }}
        descBody="Apakah anda yakin ingin menutup item ini?"
      />}
      {modalPublish &&
        <Modal
          closeModal={() => { setModalPublish(false); setId(0); }}
          title="Konfirmasi"
          modalTypes="confirm"
          onConfirm={() => {
            setModalPublish(false);
            dispatch(publishProject({ id: id }));
            dispatch(sendProjectBrispot(id));
          }}
          descBody="Apakah anda yakin ingin mempublish item ini?"
        />
      }
      {selectType &&
        <Modal
          closeModal={() => setSelectType(false)}
          modalTypes="selectJualProperty"
          title="Jual Properti"
        />}
      {saState.success === true || saState.fail === true ? (
        <Modal
          closeModal={() => {
            dispatch(saState.success ? closeModalSuccess() : closeModalFail());
            dispatch(listProject({ ...bodyListProp, email: email }, setListProp, setOnFetchData));
          }}
          modalTypes="modalSF"
          title=""
          titleBody={saState.success ? saState.titleSuccess : saState.fail ? saState.titleFail : ""}
          descBody={saState.success ? saState.msgSuccess : saState.fail ? saState.msgFail : ""}
        />
      ) : <></>}
      <ProfileUser
        title="Listing Properti"
        desc="Daftar properti Anda"
        userStatus={userStatus}
        data={saState.resApi}
      >
        <div className="property-listing__wrapper">
          <Tabs categories={categories} dropdownData={staticConst?.listingProperty} type={filter?.listType} onClickDropdown={handleSelectDropdown} setModalDelete={setModalDelete} setId={setId} handleClickTab={handleClickTab} selectedIndex={tabId} handleInputSearchChange={handleInputSearchChange} handleKeyDown={handleKeyDown} dataTemp={dataTemp} onFetchData={onFetchData} showSellBtn={true} setSelectType={setSelectType}>
            <TableData
              header={[
                { name: "Nama Project", class: "p-3" },
                { name: "Harga", class: "p-3" },
                { name: "Tanggal dibuat", class: "p-3" },
                (tabId === 3 && { name: "", class: "p-3" })
              ]}
            >
              {onFetchData ?
                <tr>
                  <td colSpan="5" className="tabs-profile__loading">
                    <SmallLoading blueColor={true} />
                  </td>
                </tr>
                :
                (dataTemp?.rows?.length > 0 ?
                  (dataTemp?.rows?.map((data, index) => {
                    return (
                      <TblListPropertyV2
                        index={index}
                        name={data?.namaProyek}
                        rangePrice={data?.kisaranHarga}
                        status={data?.status}
                        dateCreated={data?.createdAt}
                        timeCreated={data?.createdAt}
                        onClickEdit={() => {
                          navigate(`/sell-property/v2/upload-project/edit-project/${encodeURIComponent(data?.id)}?status=${data?.status}&from=profile-menu`);
                        }}
                        onClickPublish={() => {
                          setId(data?.id.toString());
                          // console.log("[DEBUG] ID : ", data?.id.toString());
                          setModalPublish(true);
                        }}
                        onClickDelete={() => { setId(data?.id?.toString()); setModalDelete(true); }}
                        isDraft={data?.status === "draft"}
                      />
                    );
                  }))
                  :
                  <tr>
                    <td colSpan="5" className="tabs-profile__loading">
                      <p className="tabs-profile__text-not-found">Data tidak ditemukan</p>
                    </td>
                  </tr>
                )
              }
            </TableData>
          </Tabs>
        </div>
      </ProfileUser>
    </div>
  );
};

export default PropertyListingV2;
