import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../../components/atoms';
import { Footer } from '../../components/molecules';
import CopyToClipboard from 'react-copy-to-clipboard';
import { useDispatch, useSelector } from 'react-redux';
import { Modal } from '../../components/organisms';
import { showModalRating, showSingleModal } from '../../store/actions/changeState';
import Snackbar from '../../components/organisms/Modal/modal-types/SnackBar/Component';

const DoneSubmitVisitorKpr = () => {
  const dispatch = useDispatch();
  const stateModal = useSelector((state) => state.stateReducer);
  const showRating = localStorage.getItem('ratingModal');
  const navigate = useNavigate();
  const [state, setState] = useState({
    value: '',
    copied: false,
  });

  const handleCopy = () => {
    setState({ ...state, copied: true });
  };

  const generateBrivaNew = JSON.parse(localStorage.getItem("setItemBrivaNew"));

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
      <Snackbar message="Terima kasih, penilaianmu berhasil dikirim!"/>
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
          <p className="kprApproval__pages__done__desc">Form pengajuan KPR berhasil diajukan. Silakan melakukan pembayaran ke nomor BRIVA di bawah ini</p>
          <div className="kprApproval__pages__done__virtualAccount">
            <div className="kprApproval__pages__done__virtualAccountDetails">
              <div className="kprApproval__pages__done__virtualAccountLabel">Nomor BRIVA</div>
              <div className="kprApproval__pages__done__virtualAccountNumber">{generateBrivaNew?.data?.responseData?.brivaNo}{generateBrivaNew?.data?.responseData?.custCode}</div>
            </div>
            <div className='kprApproval__pages__done_virtualAccountCopy'>
              <div className='kprApproval__pages__done__copyButtonWrapper'>
                <CopyToClipboard text={`${generateBrivaNew?.data?.responseData?.brivaNo}${generateBrivaNew?.data?.responseData?.custCode}`} onCopy={() => setState({copied:true})}>
                    <button className="kprApproval__pages__done__copyButton">
                      <img src="/icons/small-icons/copy.svg" alt="icon-copy" />
                    </button>
                </CopyToClipboard>
              </div>
            </div>
          </div>
          {state.copied ? <span className='kprApproval__pages__done__successMessage'>Berhasil Tersalin</span> : null}
          <Button onClick={() => navigate("/profile-user/list-pengajuan-kpr")} buttonColor="bluefigma" textColor="white" fullWidth={true} paddingSize={"padding-1"}>
            Ke Halaman Pengajuan
          </Button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default DoneSubmitVisitorKpr;
