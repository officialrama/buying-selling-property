import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setCashSubmission, setKprSubmission } from '../../../../../../store/actions/changeRadioState';
import { prjReset } from '../../../../../../store/actions/changeUploadProjectReducer';
import { Button } from '../../../../../atoms';
import { ChoosePaymentMethod } from '../../../../../molecules';

const Component = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [select, setSelect] = useState({
    uploadListing: false,
    uploadProyek: false
  });

  useEffect(() => {
    /* eslint-disable react-hooks/exhaustive-deps */
    dispatch(setCashSubmission(false));
    dispatch(setKprSubmission(true));
    setSelect({ ...select, uploadProyek: true })
  }, []);

  return (
    <div>
      <div className="payment-method__wrapper__baseModal">
        <div className="payment-method__wrapper__flexWrapper">
          <ChoosePaymentMethod imgSrc="/icons/upload-listing.svg" imgAlt="uploadListing" text="Upload Listing" checked={select.uploadListing} onChange={() => { }} disabled="true" />
          <ChoosePaymentMethod imgSrc="/icons/upload-proyek.svg" imgAlt="uploadProyek" text="Upload Proyek" checked={select.uploadProyek} onChange={() => { }} />
        </div>
      </div>
      <Button buttonColor="blue" textColor="white" fullWidth={true} paddingSize={"padding-1"}
        onClick={() => { 
          dispatch(prjReset());
          navigate("/sell-property/v2/upload-project");
        }}
      >
        Lanjutkan
      </Button>
    </div>
  );
};

export default Component;