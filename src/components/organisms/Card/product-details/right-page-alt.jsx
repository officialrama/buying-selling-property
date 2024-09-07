import React from 'react';
import { Button } from '../../../atoms';

const RightPageProductDetailsAlt = () => {
  return (
    <div>
      <div className="prod-detail__pages__property__detailBuying__right__purchase-type__wrapper">
        <div className="prod-detail__pages__property__detailBuying__right__purchase-type__text-wrap">
          <p className="prod-detail__pages__property__detailBuying__right__purchase-type__title">Pilih Tipe Pembelian</p>
          <p className="prod-detail__pages__property__detailBuying__right__purchase-type__detail">Pilih tipe pembelian sesuai kemampuan finansial kamu</p>
        </div>
        <div className="prod-detail__pages__property__detailBuying__right__purchase-type__btn-wrap">
          <Button buttonColor="blue" textColor="white" fullWidth={true} paddingSize={"padding-0"}>
            <p>Ajukan Pembelian Cash</p>
          </Button>
          <Button buttonColor="orange" textColor="white" fullWidth={true} paddingSize={"padding-0"}>
            <p>Ajukan Pembelian KPR</p>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RightPageProductDetailsAlt;