import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCashSubmission, setKprSubmission } from '../../../../../store/actions/changeRadioState';
import { ChoosePaymentMethod } from '../../../../molecules';

const PaymentMethod = () => {
  const stateRadio = useSelector(stateRadio => stateRadio.radioReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    /* eslint-disable react-hooks/exhaustive-deps */
    dispatch(setCashSubmission(false));
    dispatch(setKprSubmission(true));
  }, []);

  return (
    <div className="payment-method__wrapper__baseModal">
      <div className="payment-method__wrapper__flexWrapper">
        <ChoosePaymentMethod imgSrc="https://storage.googleapis.com/artifacts.concrete-plasma-244309.appspot.com/homespot/payment/cash.svg" imgAlt="cash" text="Pengajuan Pembelian Cash" checked={stateRadio.cashSubmission} onChange={() => { dispatch(setCashSubmission(!stateRadio.cashSubmission)) }} disabled="true" />
        <ChoosePaymentMethod imgSrc="https://storage.googleapis.com/artifacts.concrete-plasma-244309.appspot.com/homespot/payment/emojione-monotone_credit-card.svg" imgAlt="KPR" text="Pengajuan Pembelian KPR" checked={stateRadio.kprSubmission} onChange={() => { dispatch(setKprSubmission(!stateRadio.kprSubmission)) }} />
      </div>
    </div>
  );
};

export default PaymentMethod;