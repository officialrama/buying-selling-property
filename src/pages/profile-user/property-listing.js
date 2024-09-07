/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { SmallLoading } from "../../components/atoms";
import { TableData, TblListProperty } from "../../components/molecules";
import { Modal, Tabs } from "../../components/organisms";
import { ProfileUser } from "../../components/templates";
import useListPropertyHooks from "../../hooks/useListPropertyHooks";
import { staticConst } from "../../static/staticConst";
import { deleteProperty, inquiryListingProperty } from "../../store/actions/fetchData/inquiryProp";
import { closeModalFail, closeModalSuccess } from "../../store/actions/fetchData/superAdminState";


const PropertyListing = ({ userStatus, email }) => {
  const saState = useSelector((state) => state.superAdminReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { bodyListProp, listProp, setListProp, modalDelete, setModalDelete, id, setId, tabId, setTabId, dataTemp, setDataTemp, onFetchData, setOnFetchData } = useListPropertyHooks();
  useEffect(() => {
    dispatch(inquiryListingProperty({ ...bodyListProp, email: email }, setListProp, setOnFetchData));
  }, []);

  let [categories] = useState({
    Sale: [],
    Sold: [],
    Deleted: [],
  });

  const [filter, setFilter] = useState({
    listType: staticConst.listingProperty[0],
  });

  const handleSelectDropdown = (data) => {
    setFilter({
      ...filter,
      listType: data,
    });
    dispatch(inquiryListingProperty({ ...bodyListProp, email: email, status: data.value }, setListProp, setOnFetchData));
    switch (data.value) {
      case "sale":
        setTabId(0);
        break;
      case "sold":
        setTabId(1);
        break;
      case "deleted":
        setTabId(2);
        break;
      default:
        break;
    }
  }

  const handleClickTab = (props) => {
    function inquiryData(status, num) {
      dispatch(inquiryListingProperty({ ...bodyListProp, email: email, status: status }, setListProp, setOnFetchData));
      setFilter({ listType: staticConst.listingProperty[num] });
      setTabId(num);
    }
    switch (props) {
      case 0:
        inquiryData("sale", 0);
        break;
      case 1:
        inquiryData("sold", 1);
        break;
      case 2:
        inquiryData("deleted", 2);
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
      JSON.stringify(evt.detailProperti.detailProperti.nama).toLowerCase().indexOf(dataTemp.search.toLowerCase()) >= 0 ||
      JSON.stringify(JSON.parse?.(evt?.detailProperti?.alamatProperti?.alamat)?.alamat).toLowerCase().indexOf(dataTemp.search.toLowerCase()) >= 0
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
            dispatch(saState.success ? closeModalSuccess() : closeModalFail());
            dispatch(inquiryListingProperty({ ...bodyListProp, email: email }, setListProp, setOnFetchData));
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
          <Tabs categories={categories} dropdownData={staticConst?.listingProperty} type={filter?.listType} onClickDropdown={handleSelectDropdown} setModalDelete={setModalDelete} setId={setId} handleClickTab={handleClickTab} selectedIndex={tabId} handleInputSearchChange={handleInputSearchChange} handleKeyDown={handleKeyDown} dataTemp={dataTemp} onFetchData={onFetchData} showSellBtn={true}>
            <TableData
              header={[
                { name: "Alamat", class: "p-3" },
                { name: "Harga", class: "p-3" },
                { name: "Status", class: "p-3" },
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
                      <TblListProperty
                        index={index}
                        name={data?.detailProperti?.detailProperti?.nama}
                        address={JSON.parse(data?.detailProperti?.alamatProperti?.alamat)?.alamat}
                        price={data?.detailProperti?.detailProperti?.hargaProperti}
                        status={data?.detailProperti?.status}
                        dateCreated={data?.detailProperti?.createdAt}
                        timeCreated={data?.detailProperti?.createdAt}
                        onClickEdit={() => {
                          navigate(`/property/edit/${data?.detailProperti.id}`);
                        }}
                        onClickDelete={() => { setId(data?.detailProperti.id); setModalDelete(true); }}
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

export default PropertyListing;
