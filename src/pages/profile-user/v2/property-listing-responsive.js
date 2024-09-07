/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ResponsiveListProperty, Pagination } from "../../../components/molecules";
import { Modal, Tabs } from "../../../components/organisms";
import { ProfileUser } from "../../../components/templates";
import { decryptStr } from "../../../helpers/encryptDecrypt";
import useListPropertyHooksV2 from "../../../hooks/v2/useListPropertyHooks";
import { staticConst } from "../../../static/staticConst";
import {
  prjReset,
  setPrjClsInfoDto,
  setPrjInfo,
} from "../../../store/actions/changeUploadProjectReducer";
import {
  closeModalFail,
  closeModalSuccess,
} from "../../../store/actions/fetchData/superAdminState";
import {
  closedProject,
  listProject,
  publishProject,
} from "../../../store/actions/fetchData/v2/listProject";
// import { initConsoleObservable } from "@datadog/browser-core";
import {
  fetchNextPage,
  fetchPage,
  nextPage,
  nextPageJumper,
  prevPage,
  removePaginationData,
  resetPaginationPage,
} from "../../../store/actions/paginationAction";
import body from "../../../components/molecules/Form/body";
import { sendProjectBrispot } from "../../../store/actions/fetchData/v2/saveProject";

const PropertyListingResponsive = ({ userStatus, email }) => {
  const saState = useSelector((state) => state.superAdminReducer);
  const pagination = useSelector((state) => state.paginationReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    listProp,
    bodyListProp,
    setBodyListProp,
    setListProp,
    modalDelete,
    setModalDelete,
    id,
    setId,
    tabId,
    setTabId,
    dataTemp,
    setDataTemp,
    onFetchData,
    setOnFetchData,
    selectType,
    setSelectType,
    modalPublish,
    setModalPublish,
  } = useListPropertyHooksV2();

  useEffect(() => {
    dispatch(
      fetchPage({
        ...bodyListProp,
        pageStart: 0,
        email: email,
        status: tabId === 0 ? "draft" : tabId === 1 ? "published" : "closed",
      })
    );

    dispatch(
      fetchNextPage({
        ...bodyListProp,
        pageStart: 1,
        email: email,
        status: tabId === 0 ? "draft" : tabId === 1 ? "published" : "closed",
      })
    );

    dispatch(setPrjInfo({}));
    dispatch(setPrjClsInfoDto({}));

    return () => {
      dispatch(setPrjInfo({}));
      dispatch(setPrjClsInfoDto({}));
    };
  }, [bodyListProp.status.pageStart]);

  let [categories] = useState({
    Draft: [],
    Published: [],
    Closed: [],
  });

  const [filter, setFilter] = useState({
    listType: staticConst.listingProperty[0],
  });

  const handleSelectDropdown = (data) => {
    setFilter({
      ...filter,
      listType: data,
    });
    // dispatch(
    //     listProject(
    //         {...bodyListProp, pageStart: 0, email: email, status: data.value},
    //         setListProp,
    //         setOnFetchData
    //     )
    // );

    dispatch(
      fetchPage({
        ...bodyListProp,
        pageStart: 0,
        email: email,
        status: data.value,
      })
    );

    dispatch(
      fetchNextPage({
        ...bodyListProp,
        pageStart: 1,
        email: email,
        status: data.value,
      })
    );

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
  };

  const handleClickTab = (props) => {
    function inquiryData(status, num) {
      const newBodyRequest = {
        email: pagination.email,
        status: status,
        pageStart: pagination.pageStart,
        sortBy: pagination.sortBy,
        sortDirection: pagination.sortDirection,
      };

      const newBodyRequestNext = {
        email: pagination.email,
        status: status,
        pageStart: pagination.nextPageJumper,
        sortBy: pagination.sortBy,
        sortDirection: pagination.sortDirection,
      };

      dispatch(fetchPage(newBodyRequest));
      dispatch(fetchNextPage(newBodyRequestNext));

      setFilter({ listType: staticConst.listingProperty[num] });
      setTabId(num);
      setBodyListProp({ ...bodyListProp, status: status });
      dispatch(resetPaginationPage());
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
  };


  const handleInputSearchChange = (evt) => {
    // setDataTemp({
    //     ...dataTemp,
    //     search: evt.target.value,
    // });

    dispatch({
      type: "SET_PAGE_SEARCH",
      payload: evt.target.value,
    });
  };

  const handleOnSearch = () => {
    // const tempRows = dataTemp.originalRows.filter(
    //     (evt) => JSON.stringify(evt).toLowerCase().indexOf(dataTemp.search.toLowerCase()) >= 0
    // );
    // setDataTemp({
    //     ...dataTemp,
    //     rows: tempRows,
    // });
  };

  const handleKeyDown = (evt) => {
    if (evt.key === "Enter") {
      window.scrollTo(0, 0);
      handleOnSearch();
    }
  };

  const handleNextPage = () => {

    const newStatus = tabId === 0 ? "draft" : tabId === 1 ? "published" : "closed";

    const newBodyRequest = {
      email: pagination.bodyRequest.email,
      status: newStatus,
      pageStart: pagination.currentPage + 1,
      sortBy: pagination.bodyRequest.sortBy,
      sortDirection: pagination.bodyRequest.sortDirection,
    };

    const newBodyRequestNext = {
      email: pagination.bodyRequest.email,
      status: newStatus,
      pageStart: pagination.currentPage + 2,
      sortBy: pagination.bodyRequest.sortBy,
      sortDirection: pagination.bodyRequest.sortDirection,
    };

    // dispatch(listProject(bodyListProp, setListProp, setOnFetchData))
    dispatch(fetchPage(newBodyRequest));
    dispatch(fetchNextPage(newBodyRequestNext));
    dispatch(nextPage());
  };

  const handlePrevPage = () => {
    const newStatus = tabId === 0 ? "draft" : tabId === 1 ? "published" : "closed";

    const newBodyRequest = {
      email: pagination.bodyRequest.email,
      status: newStatus,
      pageStart: pagination.currentPage - 1,
      sortBy: pagination.bodyRequest.sortBy,
      sortDirection: pagination.bodyRequest.sortDirection,
    };

    const newBodyRequestNext = {
      email: pagination.bodyRequest.email,
      status: newStatus,
      pageStart: pagination.nextPageJumper - 1,
      sortBy: pagination.bodyRequest.sortBy,
      sortDirection: pagination.bodyRequest.sortDirection,
    };

    dispatch(prevPage());
    dispatch(fetchPage(newBodyRequest));
    dispatch(fetchNextPage(newBodyRequestNext));
  };

  return (
    <div>
      {modalDelete && (
        <Modal
          closeModal={() => {
            setModalDelete(false);
            setId(0);
          }}
          title="Konfirmasi"
          modalTypes="confirm"
          onConfirm={async () => {
            setModalDelete(false);
            dispatch(closedProject({ id: decryptStr(id) }));
            dispatch(sendProjectBrispot(id));
            dispatch(
              removePaginationData({
                id: decryptStr(id),
                data: pagination?.data,
              })
            );

            dispatch(
              fetchPage({
                ...bodyListProp,
                pageStart: 0,
                email: email,
                status: tabId === 0 ? "draft" : tabId === 1 ? "published" : "closed",
              })
            );
          }}
          descBody="Apakah anda yakin ingin menutup item ini?"
        />
      )}
      {modalPublish && (
        <Modal
          closeModal={() => {
            setModalPublish(false);
            setId(0);
          }}
          title="Konfirmasi"
          modalTypes="confirm"
          onConfirm={() => {
            setModalPublish(false);
            dispatch(publishProject({ id: decryptStr(id) }));
            dispatch(sendProjectBrispot(id));
            dispatch(
              removePaginationData({
                id: decryptStr(id),
                data: pagination?.data,
              })
            );

            dispatch(
              fetchPage({
                ...bodyListProp,
                pageStart: 0,
                email: email,
                status: tabId === 0 ? "draft" : tabId === 1 ? "published" : "closed",
              })
            );
          }}
          descBody="Apakah anda yakin ingin mempublish item ini?"
        />
      )}
      {selectType && (
        <Modal
          closeModal={() => setSelectType(false)}
          modalTypes="selectJualProperty"
          title="Jual Properti"
        />
      )}
      {saState.success === true || saState.fail === true ? (
        <Modal
          closeModal={() => {
            dispatch(saState.success ? closeModalSuccess() : closeModalFail());
            dispatch(
              listProject(
                {
                  ...bodyListProp,
                  pageStart: 0,
                  status: tabId === 0 ? "draft" : tabId === 1 ? "published" : "closed",
                },
                setListProp,
                setOnFetchData
              )
            );
          }}
          modalTypes="modalSF"
          title=""
          titleBody={saState.success ? saState.titleSuccess : saState.fail ? saState.titleFail : ""}
          descBody={saState.success ? saState.msgSuccess : saState.fail ? saState.msgFail : ""}
        />
      ) : (
        <></>
      )}
      <ProfileUser
        title="Listing Properti"
        desc="Daftar properti Anda"
        userStatus={userStatus}
        data={saState?.resApi?.responseData?.[0]}
      >
        <div className="property-listing__wrapper">
          <Tabs
            categories={categories}
            dropdownData={staticConst?.listingProperty}
            type={filter?.listType}
            onClickDropdown={handleSelectDropdown}
            setModalDelete={setModalDelete}
            setId={setId}
            handleClickTab={handleClickTab}
            selectedIndex={tabId}
            handleInputSearchChange={handleInputSearchChange}
            handleKeyDown={handleKeyDown}
            dataTemp={dataTemp}
            onFetchData={pagination.loading}
            showSellBtn={true}
            setSelectType={setSelectType}
          >
            <ResponsiveListProperty
              header={[
                { name: "Nama Project", class: "p-3" },
                { name: "Harga", class: "p-3" },
                { name: "Tanggal dibuat", class: "p-3" },
                tabId === 3 && { name: null, class: "p-3" },
              ]}
              isLoading={pagination.loading}
              content={
                !pagination.loading
                  ? pagination?.data?.responseData
                      ?.filter((item) =>
                        item?.namaProyek?.toLowerCase().includes(pagination.search)
                      )
                      .map((data, index) => {
                        return {
                          index,
                          name: data?.namaProyek,
                          rangePrice: data?.kisaranHarga,
                          status: data?.status,
                          dateCreated: data?.createdAt,
                          timeCreated: data?.createdAt,
                          onClickEdit: () => {
                            dispatch(prjReset());
                            navigate(
                              `/sell-property/v2/upload-project/edit-project/${encodeURIComponent(
                                data?.id
                              )}?status=${data?.status}&from=profile-menu`
                            );
                          },
                          onClickPublish: () => {
                            setId(data?.id.toString());
                            setModalPublish(true);
                          },
                          onClickDelete: () => {
                            setId(data?.id?.toString());
                            setModalDelete(true);
                          },
                          isDraft: data?.status === "draft",
                        };
                      })
                  : []
              }
            />
            <Pagination
              bodyListOfUser={bodyListProp}
              setBodyListOfUser={setBodyListProp}
              data={dataTemp?.rows}
              metaData={saState?.resApi?.metadata?.listUserDtoRes}
              handleNextPage={handleNextPage}
              handlePrevPage={handlePrevPage}
            />
          </Tabs>
        </div>
      </ProfileUser>
    </div>
  );
};

export default PropertyListingResponsive;
