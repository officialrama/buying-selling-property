import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../../components/atoms';
import { Footer } from '../../components/molecules';
import CopyToClipboard from 'react-copy-to-clipboard';
import { showModalRating } from '../../store/actions/changeState';
import { Modal, SnackBar } from '../../components/organisms';
import { useDispatch, useSelector } from 'react-redux';

const DoneNoUtj = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const stateModal = useSelector((state) => state.stateReducer);
  const showRating = localStorage.getItem('ratingModal');
  const [state, setState] = useState({
    value: '',
    copied: false,
  });
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
       <SnackBar message="Terima kasih, penilaianmu berhasil dikirim!"/>
      {stateModal.showModalRating === true && (
      <Modal
        closeModal={() => dispatch(showModalRating(!stateModal.showModalRating))}
        modalTypes="ratingReview"
        title=""
        disableScroll={false}
      />
    )}
      <div className="kprApproval__pages__done__bodyWrapper">
        <div className="kprApproval__pages__done__wrapper">
          <div className="kprApproval__pages__done__circle">
            <img src="/images/success-pengajuan.png" alt="icon-park_success" />
          </div>
          <p className="kprApproval__pages__done__title">Form Pengajuan KPR Berhasil</p>
          <p className="kprApproval__pages__done__desc">Form pengajuan KPR berhasil diajukan. kami akan segera menghubungi anda.</p>
          <Button onClick={() => navigate("/profile-user/list-pengajuan-kpr")} buttonColor="bluefigma" textColor="white" fullWidth={true} paddingSize={"padding-1"}>
            Ke Halaman Pengajuan
          </Button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default DoneNoUtj;
