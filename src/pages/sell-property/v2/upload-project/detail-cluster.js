/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { Button, SmallLoading, Textarea } from '../../../../components/atoms';
import { DetailsCard, Dropdown, Footer, TableData, TblListUnit, TextboxLabel } from '../../../../components/molecules';
import { Modal } from '../../../../components/organisms';
import { decryptStr, encryptStr } from '../../../../helpers/encryptDecrypt';
import useFormStepperHooksV2 from '../../../../hooks/v2/useFormStepperHooks';
import useListPropertyHooksV2 from '../../../../hooks/v2/useListPropertyHooks';
import useSellPropsHooksV2 from '../../../../hooks/v2/useSellPropsHooksV2';
import { selectConst } from '../../../../static/selectConst';
import { setPrjGrupProp } from '../../../../store/actions/changeUploadProjectReducer';
import { inquiryUserSellProp } from '../../../../store/actions/fetchData/sellPropState';
import { closeModalFail, closeModalSuccess, showModalSuccess } from '../../../../store/actions/fetchData/superAdminState';
import { clusterDetail } from '../../../../store/actions/fetchData/v2/detailProject';
import { saveEditCluster } from '../../../../store/actions/fetchData/v2/editCluster';
import { listUnit } from '../../../../store/actions/fetchData/v2/listProject';
import { saveProject } from '../../../../store/actions/fetchData/v2/saveProject';


const DetailCluster = ({ userStatus, email, editMode }) => {
  const { id } = useParams();
  const [queryParam] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const saState = useSelector((state) => state.superAdminReducer);
  const uploadProjectState = useSelector((state) => state.uploadProjectReducer);
  const stateSellProp = useSelector(state => state.sellPropertyReducer);
  const { inputs, setInputs, handleLetterNumberInput, handleAllCharInput, handleNumberInput, handleRadioDropChange, modalConfirm, setModalConfirm} = useFormStepperHooksV2();
  const { dropdownVal, setDropdownVal } = useSellPropsHooksV2();
  const { modalDelete, setModalDelete, setId, listClusterUnit, setListClusterUnit, onFetchData, setOnFetchData } = useListPropertyHooksV2();
  const [editCluster, setEditCluster] = useState(false);
  const groupPrj = "#USER#|#TYPE#|#PRJNAME#";
  let groupPrjAfter = "";
  // console.log("[DEBUG] CLUSTER - Grup project : ", uploadProjectState?.groupProperti);
  if (userStatus === "developer") {
    groupPrjAfter = groupPrj.replace("#USER#", "PRJ").replace("#TYPE#", stateSellProp.devName.replace(/\W/g, "").toUpperCase()).replace("#PRJNAME#", uploadProjectState?.projectInfo?.namaProyek?.value?.replace(/\W/g, "").toUpperCase());
  }
  useEffect(() => {
    if (queryParam?.get("from") === "editProperty") {
      dispatch(inquiryUserSellProp(email));
      dispatch(setPrjGrupProp(groupPrjAfter));
    }
  }, [email]);

  useEffect(() => {
    if (queryParam?.get("from") === "editProperty") {
      dispatch(setPrjGrupProp(groupPrjAfter));
    }
  }, [stateSellProp?.devName]);
  function RedStar() {
    return <span className="sellpropsV2__card__redstar">*</span>;
  }
  function InfoProyekItemWrap({ title, item }) {
    return (
      <div className="sellpropsV2__card__form-col__wrapper grid-tpl-col">
        <p className={`sellpropsV2__card__form-col__title-25 mb-auto mt-2`}>
          {title}
        </p>
        <div>
          {item}
        </div>
      </div>
    )
  }
  const inputDetailProjectArr = [
    inputs?.namaCluster?.isValid,
    inputs?.deskripsiCluster?.isValid
  ];
  useEffect(() => {
    if (window.location.pathname.includes("/edit-cluster")) {
      setEditCluster(false);
      dispatch(clusterDetail({ projectId: encryptStr(decryptStr(queryParam?.get("prjId"))), clusterId: encryptStr(decryptStr(id)), setInputs: setInputs, setDropdownVal: setDropdownVal }));
      dispatch(listUnit({ projectId: encryptStr(decryptStr(queryParam?.get("prjId"))), clusterId: encryptStr(decryptStr(id)), setListClusterUnit: setListClusterUnit, setOnFetchData: setOnFetchData }));
      setDropdownVal({
        ...dropdownVal,
        statusCluster: selectConst.statusCluster.filter((e) => e.value === uploadProjectState?.clusterInfoDto?.status)[0]
      });
      // console.log("uploadProjectState : ", uploadProjectState)
    } else {
      setEditCluster(true);
    }
  }, [window.location.pathname.includes("/edit-cluster")]);

  return (
    <div>
      
      <div>
        {saState.success && <Modal
          closeModal={() => {
            dispatch(closeModalSuccess());
            navigate(-1);
            window.scrollTo(0, 0);
          }}
          modalTypes="modalSF"
          title=""
          titleBody={saState.titleSuccess}
          descBody={saState.msgSuccess}
        />}
        {saState.fail === true && <Modal
          closeModal={() => {
            dispatch(closeModalFail());
          }}
          modalTypes="modalSF"
          title=""
          titleBody={saState.titleFail}
          descBody={saState.msgFail}
        />}
        {modalDelete && <Modal
          closeModal={() => { setModalDelete(false); setId(0); }}
          onClickDelete={() => {
            setModalDelete(false);
            dispatch(showModalSuccess("Cluster Dihapus", "Cluster berhasil dihapus"));
          }}
          modalTypes="deleteConfirm"
          title="Konfirmasi"
        />}
        {modalConfirm && <Modal
          modalTypes="confirm"
          closeModal={() => setModalConfirm(false)}
          onConfirm={() => navigate(-1)}
          descBody={"Apakah anda yakin akan membuang perubahan?"} 
          title="Konfirmasi"/>
        }
      </div>
      <div className="sellpropsV2__wrapper">
        <div className="sellpropsV2__text-wrapper">
          <p className="sellpropsV2__title">
            {!window.location.pathname.includes("/edit-cluster") ? "Detail Cluster" : "Edit Cluster"}
          </p>
        </div>
        <DetailsCard className="sellpropsV2__card__wrapper">
          <div className="sellpropsV2__card__wrapper-content">
            {!window.location.pathname.includes("/edit-cluster") ?
              <p className="sellpropsV2__card__title">Informasi Cluster {RedStar()}</p>
              :
              <div className="flex flex-row gap-4 justify-between mb-4">
                <p className="sellpropsV2__card__title mb-0">Informasi Cluster {RedStar()}</p>
                <Button
                  buttonColor="orangeBorder"
                  textColor="orange"
                  className="add-admin__btn-bottom--edit mr-0"
                  onClick={() => setEditCluster(!editCluster)}
                  paddingSize="padding-0"
                >
                  <span className="flex gap-2">
                    <img src="/icons/small-icons/edit-orange.svg" alt="edit" />
                    Edit
                  </span>
                </Button>
              </div>
            }
            {InfoProyekItemWrap({
              title: "Nama Cluster",
              item: [
                <TextboxLabel 
                      placeholder="Nama Cluster" 
                      typeInput="text" 
                      name="namaCluster" 
                      value={inputs?.namaCluster?.value} 
                      invalid={!inputs?.namaCluster?.isValid} 
                      invalidTxt={inputs?.namaCluster?.msgError} 
                      onChange={handleLetterNumberInput} 
                      disabled={!editCluster} 
                      maxLength={100} />]
            })}
            {InfoProyekItemWrap({
              title: "Deskripsi Cluster",
              item: [
                <>
                  <Textarea
                    placeholder="Tulis deskripsi cluster"
                    resize={true}
                    rows={6}
                    name="deskripsiCluster"
                    value={inputs?.deskripsiCluster?.value}
                    maxLength={5000}
                    warnText={inputs?.deskripsiCluster?.msgError}
                    invalid={!inputs?.deskripsiCluster?.isValid}
                    invalidTxt={inputs?.deskripsiCluster?.msgError}
                    onChange={handleLetterNumberInput}
                    disabled={!editCluster}
                  />
                </>
              ]
            })}
            {InfoProyekItemWrap({
              title: "Jumlah Unit",
              item: [<TextboxLabel placeholder="Jumlah Unit" typeInput="text" name="jumlahUnit" value={inputs?.jumlahUnit?.value} invalid={!inputs?.jumlahUnit?.isValid} invalidTxt={inputs?.jumlahUnit?.msgError} onChange={handleNumberInput} maxLength={5} disabled={true} />]
            })}
            {window.location.pathname.includes("/edit-cluster") && InfoProyekItemWrap({
              title: "Status",
              item: [
                <div className="w-[30%] mobile:w-full">
                  <Dropdown
                    value={dropdownVal.statusCluster}
                    onChange={(value) => {
                      setDropdownVal({ ...dropdownVal, statusCluster: value });
                      handleRadioDropChange("statusCluster", value.value);
                    }}
                    data={selectConst.statusCluster}
                    warnText={inputs?.statusCluster?.msgError}
                    showOptions={!editCluster ? false : true}
                  />
                </div>
              ]
            })}
          </div>
        </DetailsCard>
        {window.location.pathname.includes("/edit-cluster") && <DetailsCard className="sellpropsV2__card__wrapper">
          <div className="sellpropsV2__card__wrapper-content">
            <div className="flex flex-row gap-4 justify-between">
              <p className="sellpropsV2__card__title">List Unit</p>
              <div>
                <Button buttonColor="orange" textColor="white" onClick={() => {
                  if (queryParam?.get("from") === "editProperty") {
                    navigate(`/sell-property/v2/upload-project/detail-unit?from=editProperty&clsId=${encodeURIComponent(id)}`);
                  } else {
                    navigate(`/sell-property/v2/upload-project/detail-unit?clsId=${encodeURIComponent(id)}`);
                  }
                }} >
                  <div className="flex flex-row">
                    <p>Tambah Unit</p>
                    <span className="m-auto ml-2"><AiOutlinePlus /></span>
                  </div>
                </Button>
              </div>
            </div>
            <div>
              <div>
                <TableData
                  header={[
                    { name: "No", class: "p-3" },
                    { name: "Nama", class: "p-3" },
                    { name: "Stok", class: "p-3" },
                    { name: "Tipe", class: "p-3" },
                    { name: "Status", class: "p-3" },
                    { name: "Tersimpan", class: "p-3" },
                    { name: "Terlihat", class: "p-3" },
                    { name: "", class: "p-3" }
                  ]}
                >
                  {onFetchData &&
                    <tr>
                      <td colSpan="5" className="tabs-profile__loading">
                        <SmallLoading blueColor={true} />
                      </td>
                    </tr>
                  }
                  {!onFetchData && listClusterUnit.length !== 0 && listClusterUnit.map((data, index) => {
                    return (
                      <TblListUnit
                        index={index}
                        no={data?.id}
                        nama={data?.namaProperti}
                        stok={data?.stockUnits !== null && data?.stockUnits !== "" && data?.stockUnits !== 0 ? data.stockUnits : 0 }
                        status={data?.status}
                        tipe="unitCluster"
                        wishlist={data?.wishlistCounter !== null && data?.wishlistCounter !== "" && data?.wishlistCounter !== 0 ? data.wishlistCounter : 0 }
                        view={data?.viewedCounter !== null && data?.viewedCounter !== "" && data?.viewedCounter !== 0 ? data.viewedCounter : 0}
                        onClickEdit={() => {
                          navigate(`/sell-property/v2/upload-project/edit-unit/${encodeURIComponent(data?.id)}?prjId=${encodeURIComponent(data?.projectId)}&clsId=${data?.clusterId === -1 ? null : encodeURIComponent(data?.clusterId)}&group=${data?.groupProperti}&from=${queryParam?.get("from") === "profile-menu" ? "profile-menu" : "add-property"}`);
                        }}
                        onClickDelete={() => { setId(data?.id); setModalDelete(true); }}
                      />
                    )
                  })}
                </TableData>
                {!onFetchData && listClusterUnit.length === 0 &&
                  <div className="my-8">
                    <img className="mx-auto mb-2" src="/icons/empty-list-unit.svg" alt="list-unit-empty" />
                    <p className="mx-auto text-center">Silakan tambahkan tipe unit untuk proyek ini</p>
                  </div>
                }
              </div>
            </div>
          </div>
        </DetailsCard>}
      </div>
      <div className="sellprops__button-next-prev" >
        <Button buttonColor="blueLight" textColor="blue" fullWidth={true} paddingSize={"padding-0"} onClick={() => setModalConfirm(true)}>
          Kembali
        </Button>
        <Button buttonColor="blue" textColor="white" fullWidth={true} paddingSize={"padding-0"} disabled={inputDetailProjectArr.filter(Boolean).length !== 2} onClick={() => {
          if (!window.location.pathname.includes("/edit-cluster")) {
            dispatch(saveProject({ 
              prjId: uploadProjectState?.idProperty, 
              clsId: (!id ? 0 : id), 
              inputs: { ...inputs, ...uploadProjectState?.projectInfo }, 
              dataAddress: uploadProjectState?.address, 
              addressJsonData: uploadProjectState?.addressJson, 
              brochureFile: uploadProjectState?.brosurProjectId === "" ? uploadProjectState?.brochure?.file : null, 
              prjPhoto: uploadProjectState?.imageProjectId === "" ? uploadProjectState?.projectPhoto : null, 
              userName: email, 
              group: groupPrjAfter, 
              clusterData: inputs, 
              listPropData: [], 
              type: "cluster" ,
              brosurProjectId: uploadProjectState?.brosurProjectId,
              imageProjectId: uploadProjectState?.imageProjectId
            }))
          } else {
            dispatch(saveEditCluster({ inputs: inputs, status: inputs?.statusCluster?.value, id: encryptStr(decryptStr(id)) }));
          }
        }}>
          Simpan
        </Button>
      </div>
      <Footer />
    </div>
  );
};

export default DetailCluster;