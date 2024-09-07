import moment from 'moment';
import _ from 'lodash-contrib';
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';
import FieldSummaryData from '../../components/atoms/Text/personal-data/field-personal-data';
import { formatRupiah, formatRupiahWord } from '../../helpers/string';
import { personalDataConst } from '../../static/personal-data/personal-data';
import { NavHeaderSales, Modal } from '../../components/organisms';
import { DetailsCard, Footer, MenuItems } from '../../components/molecules';
import { buyerPengajuan, dokuPayment, userInvoiceKpr } from '../../store/actions/fetchData/salesReferral';
import { Button } from 'flowbite-react';
import DokuPayment from '../../components/organisms/Modal/modal-types/Payment/Component';
import { showUserPaymentModal } from '../../store/actions/changeModalState';
import { useNavigate } from 'react-router-dom';

function SummaryBuyer() {
  const navigate = useNavigate();
  const [dataKPR, setDataKPR] = useState("");
  // const [dataDoku, setDataDoku] = useState("");
  const stateModal = useSelector((stateModal) => stateModal.modalReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [state, setState] = useState({
    value: '',
    copied: false,
  });
  useEffect(() => {
    dispatch(userInvoiceKpr(dataKPR, setDataKPR));
  }, []);
  // useEffect(() => {
  //   if (dataKPR !== "") {
  //     dispatch((dataKPR, dataDoku, setDataDoku));
  //   }
  // }, [dataKPR]);


  return (

    <div>
      {stateModal.showUserPaymentModal === true ? (
        <Modal
          closeModal={() => {
            dispatch(
              showUserPaymentModal(!stateModal.showUserPaymentModal)
            );
          }}
          modalTypes="DokuPayment"
          title="Payment"
          otherProps={dataKPR?.responseData?.url_doku}
        />
      ) : (
        <></>
      )}
      <div className='kprApproval__pages__wrapper'>
    <div className='flex flex-row gap-6'>
    <div className="mobile:hidden flex flex-col gap-3">
    <MenuItems name={"Informasi Pribadi"} href={"#informasi-pribadi"}/>
     </div>
      <div id="informasi-pribadi" className="p-4 border border-[#D3D4D4] rounded-lg w-[660px]">
        <p className='text-[20px] leading-[30px] font-bold text-[#292929]'>Informasi Pribadi</p>
        <div className='grid grid-cols-2 gap-6'>
          <FieldSummaryData field="Nama Lengkap " value={dataKPR?.responseData?.name} />
          <FieldSummaryData field="Email" value={dataKPR?.responseData?.email} />
          <FieldSummaryData field="Expired Date" value={moment(dataKPR?.responseData?.expired_date)?.format("DD-MM-YYYY")} />
          <FieldSummaryData field="Nama Properti" value={dataKPR?.responseData?.nama_properti} />
          <FieldSummaryData field="UTJ" value={formatRupiah(dataKPR?.responseData?.amount)} />
        </div>
      </div>
        </div>
        <div className='flex justify-end items-end pt-2 mr-40'>
          <Button 
            className="text-[#1078CA] bg-[#FFFF] sm:w-[202px] sm:h-[48px] font-bold border-[#1078CA] border-[2px] w-[30%] mobile:w-[30%]"
            paddingSize={"padding-1"}
            onClick={() => {
              dispatch(showUserPaymentModal(!stateModal.showUserPaymentModal));
            }}
          >
            Bayar Sekarang
          </Button>
          </div>
          </div>
      <div className='h-[23.5rem]'></div>
      <Footer />
    </div>
  );
};



export default SummaryBuyer