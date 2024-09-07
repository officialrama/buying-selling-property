import React from 'react';
import TextfieldCopy from '../../../../molecules/Input/Textfield/with-copy';

const CashSubmission = () => {
  return (
    <div className="cash-submission__wrapper__baseModal">
      <div className="cash-submission__wrapper__flexCol">
        <div className="cash-submission__trxId">
          ID TRANSAKSI #2141241241238123712
        </div>
        <div className="cash-submission__wrapper__vaNominalBodyWrapper">
          <div className="cash-submission__wrapper__vaNominalFlexWrapper">
            <div className="cash-submission__wrapper__brivaLogoWrapper">
              <img src="/icons/small-icons/small-bri-logo.svg" alt="bri-logo" />
              <p>Virtual Account</p>
            </div>
            <TextfieldCopy value="1235567834679975" />
          </div>
          <div className="cash-submission__wrapper__vaNominalFlexWrapper">
            <p>Total Nominal Transfer</p>
            <TextfieldCopy value="1235567834679975" />
          </div>
          <div className="cash-submission__trfWarn">
            Transfer sebelum <b>29 Mar 2022 09:48 WIB</b> atau transaksimu akan dibatalkan secara otomatis oleh sistem
          </div>
        </div>
      </div>
    </div>
  );
};

export default CashSubmission;