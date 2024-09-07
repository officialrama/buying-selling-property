/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useLayoutEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  Modal,
  NavHeaderAdmin,
  SideMenuAdmin
} from "../../../components/organisms";
import { DeveloperAdmin } from "../../../components/templates";
import { closeModalFail, closeModalSuccess, closeModalSuccessRdr, saReset } from "../../../store/actions/fetchData/superAdminState";

const Developer = ({ action }) => {
  const { email } = useParams();
  const state = useSelector((state) => state.stateReducer);
  const saState = useSelector((state) => state.superAdminReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [cancelModal, setCancelModal] = useState(false);
  const [buyback, setBuyback] = useState("adaBuyback")
  const handleBuyback = (event) => {
    setBuyback(event.target.value);

  };
  useEffect(() => {
    if (saState.redirect) {
      dispatch(closeModalSuccess());
      return navigate(-1);
    }
  }, [saState.redirect]);

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
    return () => {
      dispatch(saReset());
    };
  }, []);
  return (
    <div>
      {saState.success === true && (
        <Modal
          closeModal={() => dispatch(closeModalSuccessRdr())}
          modalTypes="modalSF"
          title=""
          titleBody={saState.titleSuccess}
          descBody={saState.msgSuccess}
        />
      )}
      {saState.fail === true && (
        <Modal
          closeModal={() => dispatch(closeModalFail())}
          modalTypes="modalSF"
          title=""
          titleBody={saState.titleFail}
          descBody={saState.msgFail}
        />
      )}
      {cancelModal &&
        <div className={`${cancelModal ? "block" : "hidden"}`}>
          <Modal
            closeModal={() => setCancelModal(false)}
            title="Konfirmasi"
            modalTypes="confirm"
            onConfirm={() => navigate(-1)}
            descBody={`Apakah anda yakin ingin membatalkan ${saState.editMode ? "edit" : "tambah" } developer?`}
          />
        </div>
      }
      <NavHeaderAdmin />
      <SideMenuAdmin title={email ? "Details" : "Tambah Developer"} action={action}>
        <DeveloperAdmin state={state} saState={saState} setCancelModal={setCancelModal} handleBuyback={handleBuyback} buyback={buyback} setBuyback={setBuyback} />
      </SideMenuAdmin>
    </div>
  );
};

export default Developer;
