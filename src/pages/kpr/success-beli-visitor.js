import React, {useEffect, useState} from "react";
import { Button } from "../../components/atoms";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Footer } from "../../components/molecules";
import { useDispatch, useSelector } from "react-redux";
import { dokuTriggerVisitor } from "../../store/actions/fetchData/uploadFile";
import { showModalRating } from "../../store/actions/changeState";
import { Modal, SnackBar } from "../../components/organisms";

function SuccesBeliVisitor(){
    const [queryParam] = useSearchParams();
    const [condition, setCondition] = useState("")
    const stateModal = useSelector((state) => state.stateReducer);
    const showRating = localStorage.getItem('ratingModal');
    const navigate = useNavigate();
    const dispatch = useDispatch();

useEffect(() => {
   const id = queryParam.get("id").replaceAll(/\s/g, "+")
   dispatch(dokuTriggerVisitor(id,setCondition))
}, []);

useEffect(() => {
  if (condition !== "") {
    setTimeout(() => {
      navigate(`/profile-user/list-pengajuan-kpr`)
    }, 15000);
  }
}, [condition]);

useEffect(() => {
  if (showRating === 'true') {
    const modalTimeout = setTimeout(() => {
      dispatch(showModalRating(true));
    }, 5000);

    return () => clearTimeout(modalTimeout);
  }
}, [showRating]);

return (
  <div>
    {condition === "00" ?(
    <div className="kprApproval__pages__done__bodyWrapper">
      <SnackBar message="Terima kasih, penilaianmu berhasil dikirim!"/>
      {stateModal.showModalRating === true && (
      <Modal
        closeModal={() => dispatch(showModalRating(!stateModal.showModalRating))}
        modalTypes="ratingReview"
        title=""
        disableScroll={false}
      />
    )}
      <div className="kprApproval__pages__done__wrapper">
        <div className="kprApproval__pages__done__circle">
        <img src="/images/success-pengajuan.png" alt="icon-park_success" />
        </div>
        <p className="kprApproval__pages__done__title">Berhasil</p>
              <p className="kprApproval__pages__done__desc">Pengajuan pembelian KPR Anda telah berhasil di ajukan, Invoice akan dikirimkan ke email yang terdaftar. Mohon untuk menunggu, kami akan segera menghubungi Anda.</p>
              <Button onClick={() => navigate(`/profile-user/list-pengajuan-kpr`)} buttonColor="blue" textColor="white" fullWidth={false} paddingSize={"padding-1"}>
              Lihat List Pengajuan KPR
              </Button>
      </div>
    </div>)
    : (
    <div></div>
    )}
    {condition === "99" ?(
    <div className="kprApproval__pages__done__bodyWrapper">
    <div className="kprApproval__pages__done__wrapper">
      <div className="kprApproval__pages__done__fail items-center">
        <img src="https://storage.googleapis.com/artifacts.concrete-plasma-244309.appspot.com/homespot/popupFailed/icon-park_error.png" alt="icon-park_failed" />
      </div>
      <p className="kprApproval__pages__done__title">Gagal</p>
      <p className="kprApproval__pages__done__desc">Pengajuan KPR Anda Gagal. Mohon maaf coba ulangi lagi.</p>
            <Button onClick={() => navigate(`/profile-user/list-pengajuan-kpr`)} buttonColor="blue" textColor="white" fullWidth={false} paddingSize={"padding-1"}>
              Lihat List Pengajuan KPR
            </Button>
    </div>
  </div> ): ""}

    <Footer />
        </div>
      );
    };

export default SuccesBeliVisitor
