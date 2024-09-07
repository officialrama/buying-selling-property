/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { HouseCardSearchResult, HouseCardWishlist } from "../../components/molecules";
import { Modal } from "../../components/organisms";
import { ProfileUser } from "../../components/templates";
import { deleteSavedProp, inquiryListFavProp } from "../../store/actions/fetchData/favoriteProp";
import { closeModalFail, closeModalSuccess } from "../../store/actions/fetchData/superAdminState";
import { encryptStr, decryptStr } from "../../helpers/encryptDecrypt";

const SavedProperty = ({ userStatus, email }) => {
  let navigate = useNavigate();
  const saState = useSelector((state) => state.superAdminReducer);
  const dispatch = useDispatch();
  const [listProp, setListProp] = useState([]);
  const [notFound, setNotFound] = useState(false);
  const [cancelModal, setCancelModal] = useState({
    state: false,
    id: 0
  });

  function changeLocation(placeToGo){
    navigate(placeToGo, { replace: true });
    if(window){
        window.location.reload();
    }
  }  
  useEffect(() => {
    dispatch(inquiryListFavProp(email, setListProp, setNotFound));
  }, [])

  // console.log(listProp)
  return (
    <ProfileUser
      title="Properti Tersimpan"
      desc="Atur profil kamu disini"
      userStatus={userStatus}
      data={saState.resApi && saState.resApi?.responseData && saState.resApi?.responseData[0]}
    >
      {cancelModal.state &&
        <div className={`${cancelModal.state ? "block" : "hidden"}`}>
          <Modal
            closeModal={() => setCancelModal({ ...cancelModal, state: false })}
            title="Konfirmasi"
            modalTypes="confirm"
            onConfirm={() => {
              // console.log("cancelModal : ", cancelModal);
              setCancelModal({ ...cancelModal, state: false });
              dispatch(deleteSavedProp(email, encryptStr(decryptStr(cancelModal?.id))));
            }}
            descBody="Apakah anda yakin ingin menghapus item ini?"
          />
        </div>
      }
      {saState.success === true && (
        <Modal
          closeModal={() => {
            dispatch(closeModalSuccess());
            listProp?.length === 1 && changeLocation(true);
            dispatch(inquiryListFavProp(email, setListProp));
          }}
          modalTypes="modalSF"
          title=""
          titleBody={saState.titleSuccess}
          descBody={saState.msgSuccess}
        />
      )}
      {saState.fail === true && (
        <Modal
          closeModal={() => { 
            dispatch(closeModalFail());
            dispatch(inquiryListFavProp(email, setListProp));
          }}
          modalTypes="modalSF"
          title=""
          titleBody={saState.titleFail}
          descBody={saState.msgFail}
        />
      )}
      {(listProp || []).map((data, idx) => (
        <HouseCardWishlist index={idx} data={data} isVirtual={data?.project?.mediaProject?.virtual360Url ? data?.project?.mediaProject?.virtual360Url.indexOf('http') === -1 ? false : true : false} resSearch={true} onClickDelete={() => setCancelModal({ state: true, id: data?.detailProperti?.id})} />
      ))}
      {notFound && <p className="saved-prop__dnf">Data tidak ditemukan</p>}

    </ProfileUser>
  );
};

export default SavedProperty;
