import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setCashSubmission, setKprSubmission } from '../../../../../../store/actions/changeRadioState';
import { Button } from '../../../../../atoms';
import { ChoosePaymentMethod } from '../../../../../molecules';

const Component = ({ projectId, from }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [select, setSelect] = useState({
    unit: false,
    cluster: false
  });
  let urlNextBtn;

  useEffect(() => {
    /* eslint-disable react-hooks/exhaustive-deps */
    dispatch(setCashSubmission(false));
    dispatch(setKprSubmission(true));
  }, []);

  if(select.unit && (!from && !projectId)) {
    urlNextBtn = "/sell-property/v2/upload-project/detail-unit"
  } else if(select.unit  && !!from && !!projectId) {
    urlNextBtn = `/sell-property/v2/upload-project/detail-unit?from=${from}&prjId=${projectId}`
  } else if (select.cluster && (!from && !projectId)) {
    urlNextBtn = "/sell-property/v2/upload-project/detail-cluster"
  } else if (select.cluster && !!from && !!projectId) {
    urlNextBtn = `/sell-property/v2/upload-project/detail-cluster?from=${from}&prjId=${projectId}`
  }

  return (
    <div>
      <div className="payment-method__wrapper__baseModal">
        <div className="payment-method__wrapper__flexWrapper">
          <ChoosePaymentMethod imgSrc="/icons/upload-listing.svg" imgAlt="uploadListing" text="Unit" checked={select.unit} onChange={() => setSelect({ unit: true })} />
          <ChoosePaymentMethod imgSrc="/icons/upload-proyek.svg" imgAlt="uploadProyek" text="Cluster" checked={select.cluster} onChange={() => setSelect({ cluster: true })} />
        </div>
      </div>
      <Button buttonColor="blue" textColor="white" fullWidth={true} paddingSize={"padding-1"} onClick={() => navigate(urlNextBtn)} disabled={!select.unit && !select.cluster}>
        Lanjutkan
      </Button>
    </div>
  );
};

export default Component;