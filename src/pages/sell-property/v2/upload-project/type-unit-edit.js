/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { Button, SmallLoading } from '../../../../components/atoms';
import { DetailsCard, Footer, TableData, TblListUnit } from '../../../../components/molecules';
import { Modal } from "../../../../components/organisms";
import useListPropertyHooksV2 from "../../../../hooks/v2/useListPropertyHooks";
import { setPrjGrupProp } from "../../../../store/actions/changeUploadProjectReducer";
import { closeModalSuccess, showModalSuccess } from "../../../../store/actions/fetchData/superAdminState";
import { projectDetail } from "../../../../store/actions/fetchData/v2/detailProject";
import { listCluster } from "../../../../store/actions/fetchData/v2/listProject";

const TypeUnitEdit = ({ editMode, isDeleteProp, setIsDeleteProp, email }) => {
  const { id } = useParams();
  const [queryParam] = useSearchParams();
  const [showAddProp, setShowAddProp] = useState(false);
  const { modalDelete, setModalDelete, setId, onFetchData, setOnFetchData, listClusterUnit, setListClusterUnit } = useListPropertyHooksV2();
  const saState = useSelector((state) => state.superAdminReducer);
  const uploadProjectState = useSelector((state) => state.uploadProjectReducer);
  const stateSellProp = useSelector(state => state.sellPropertyReducer);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const group = "#USER#|#TYPE#|#PRJNAME#";
  let groupAfter = "";
  groupAfter = group.replace("#USER#", "PRJ").replace("#TYPE#", stateSellProp.devName.replace(/\W/g, "").toUpperCase()).replace("#PRJNAME#", uploadProjectState?.projectInfo?.project?.namaProyek?.replace(/\W/g, "").toUpperCase());
  // console.log("[DEBUG] groupAfter : ", groupAfter);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  useEffect(() => {
    if (window.location.pathname.includes("/edit-property")) {
      dispatch(listCluster({
        id: id,
        setListClusterUnit: setListClusterUnit,
        setOnFetchData: setOnFetchData
      }));
      dispatch(projectDetail({
        projectId: id,
        email: email
      }));
      dispatch(setPrjGrupProp(groupAfter));
    } else {
      dispatch(listCluster({
        id: uploadProjectState?.idProperty,
        setListClusterUnit: setListClusterUnit,
        setOnFetchData: setOnFetchData
      }));
    }
  }, [window.location.pathname.includes("/edit-property")]);
  return (
    <div>
      {saState.success && editMode ?
        <Modal
          closeModal={() => {
            dispatch(closeModalSuccess());
            navigate(-1, { replace: true })
          }}
          modalTypes="modalSF"
          title=""
          titleBody={saState.titleSuccess}
          descBody={saState.msgSuccess}
        /> : <></>
      }
      {showAddProp &&
        <Modal
          closeModal={() => setShowAddProp(false)}
          modalTypes="selectAddProperty"
          title="Tambah Unit / Cluster"
          from={window.location.pathname.includes("/edit-property") ? "editProperty" : ""}
          projectId={id}
        />}
      {modalDelete && <Modal
        closeModal={() => { setModalDelete(false); setId(0); }}
        onClickDelete={() => {
          setModalDelete(false);
          !editMode && setIsDeleteProp(true);
          dispatch(showModalSuccess("Cluster Dihapus", "Cluster berhasil dihapus"));
        }}
        modalTypes="deleteConfirm"
        title="Konfirmasi"
      />}
      <div className="sellpropsV2__wrapper">
        <div className="sellpropsV2__text-wrapper">
          <p className="sellpropsV2__title">Daftar Properti Anda</p>
        </div>
        <DetailsCard className="sellpropsV2__card__wrapper">
          <div className="sellpropsV2__card__wrapper-content">

            <div className="flex flex-row gap-4 justify-between">
              <p className="sellpropsV2__card__title mobile:text-lg">List Properti</p>
              <div>
                <Button buttonColor="orange" textColor="white" onClick={() => setShowAddProp(true)} >
                  <div className="flex flex-row mobile:text-xs">
                    <p>Tambah Properti</p>
                    <span className="m-auto ml-2"><AiOutlinePlus /></span>
                  </div>
                </Button>
              </div>
            </div>
            <div>
              <div>
                <TableData
                  header={[
                    { name: "Nama", class: "p-3" },
                    { name: "Stok", class: "p-3" },
                    { name: "Tipe", class: "p-3" },
                    { name: "Status", class: "p-3" },
                    { name: "Tersimpan", class: "p-3" },
                    { name: "Terlihat", class: "p-3" },
                    { name: "", class: "p-3" }
                  ]}
                >
                  {onFetchData ?
                    <tr>
                      <td colSpan="4" className="tabs-profile__loading">
                        <SmallLoading blueColor={true} />
                      </td>
                    </tr>
                    :
                    <></>}
                  {!onFetchData && listClusterUnit?.length !== 0 ?
                    listClusterUnit?.map((data, index) => {
                      return (
                        <TblListUnit
                          no={data?.id}
                          index={index}
                          nama={data?.name || data?.namaProperti}
                          stok={data?.stockUnits !== null && data?.stockUnits !== "" && data?.stockUnits !== 0 ? data.stockUnits : 0 }
                          tipe={data?.isCluster ? "cluster" : "unit"}
                          status={data?.status}
                          wishlist={data?.wishlistCounter !== null && data?.wishlistCounter !== "" && data?.wishlistCounter !== 0 ? data.wishlistCounter : 0 }
                          view={data?.viewedCounter !== null && data?.viewedCounter !== "" && data?.viewedCounter !== 0 ? data.viewedCounter : 0}
                          projectId={data?.projectId}
                          from="editProperty"
                          onClickEdit={() => {
                            navigate(`/sell-property/v2/upload-project/edit-unit/${data?.id}?prjId=${data?.projectId}&clsId=${data?.clusterId === -1 ? null : data?.clusterId}&group=${data?.groupProperti}&from=${queryParam?.get("from") === "profile-menu" ? "profile-menu" : "add-property"}`);
                          }}
                          onClickDelete={() => { setId(data?.id); setModalDelete(true); }}
                        />
                      )
                    })
                    :
                    <></>
                  }
                </TableData>
                {!onFetchData && listClusterUnit?.length === 0 ?
                  <div className="my-8">
                    <img className="mx-auto mb-2" src="/icons/empty-list-unit.svg" alt="list-unit-empty" />
                    <p className="mx-auto text-center">Silakan tambahkan tipe unit untuk proyek ini</p>
                  </div>
                  : <></>}
              </div>
            </div>
          </div>
        </DetailsCard>
        {editMode &&
          <div className="sellpropsV2__button-next-prev-list-prop">
            <Button buttonColor="blueLight" textColor="blue" fullWidth={true} paddingSize={"padding-0"}
              onClick={() => {
                dispatch(showModalSuccess("Iklan Proyek Berhasil Ditayangkan", "Selamat, Iklan anda sudah ditayangkan. "));
              }}
            >
              Simpan
            </Button>
            <Button buttonColor="blue" textColor="white" fullWidth={true} paddingSize={"padding-0"}
              onClick={() => {
                dispatch(showModalSuccess("Iklan Proyek Berhasil Dibuat", "Iklan anda berhasil disimpan. "));
              }}
            >
              Tayangkan
            </Button>
          </div>
        }
      </div>
      {editMode &&
        <div className="mt-10">
          <Footer />
        </div>
      }
    </div>
  );
};

export default TypeUnitEdit;