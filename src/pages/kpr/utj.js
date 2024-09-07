import classNames from 'classnames';
import { Accordion } from 'flowbite-react';
import { AccordionPanel } from 'flowbite-react/lib/esm/components/Accordion/AccordionPanel';
import { AccordionTitle } from 'flowbite-react/lib/esm/components/Accordion/AccordionTitle';
import React, { useEffect, useState } from 'react';
import { CurrencyInput, CurrencyInputCalc } from '../../components/atoms';
import FieldSummaryData from '../../components/atoms/Text/personal-data/field-personal-data';
import { TextColor } from '../../components/theme/text/text';
import useWindowDimensions from '../../utils/dimensions';
import NeoFieldSummaryData from '../../components/atoms/Text/personal-data/neo-field-personal-data';

const UtjKpr = ({ inputs, selectedOption, setInputs, setSelectedOption, handleOptionChange }) => {
  const { width } = useWindowDimensions();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleUtj = (value, name) => {
    if(isNaN(Number(value))){
      setInputs({
        ...inputs,
        [name]: {isValid: false, value: value, msgError: "UTJ tidak boleh kosong"},
      })
    } else {
      setInputs({
        ...inputs, [name]: { isValid: true, value: value, msgError: "" },
      });
    }
  };

  return (
    <div>
    <div className="kprApproval__pages__summary__wrapper border border-[#D3D4D4] rounded-lg">
      <div className={classNames("flex mobile:block flex-col")}>
        <span className='font-bold text-2xl'>Pembayaran Uang Tanda Jadi (UTJ)</span>
        <div>
        <span className='font-semibold text-xs mt-4'>Metode Pembayaran</span>
        </div>
        <div className="flex flex-row mobile:flex-col mr-0 mb-4 gap-4 mt-3">
          <div className="bg-white justify-between border-[1px] rounded-xl w-[200px] h-[84px] mr-4 mb-4 p-4">
            <div className="flex items-center mt-[10px]">
              <input
                type="radio"
                className="form-radio h-4 w-4 text-indigo-600"
                name="briva"
                id="briva"
                value="briva"
                checked={selectedOption === 'briva'}
                onChange={handleOptionChange}
              />
              <label htmlFor="briva" className="ml-2 cursor-pointer">
                {selectedOption !== 'briva' ? 
                 <img src="/icons/small-icons/BRIVA-nonActive.svg" alt="bri-logo"/>
                 : 
                 <img src="/icons/small-icons/BRIVA-Active.svg" alt="bri-logo"/>
                  }
                <p className='mt-[10px]'>Virtual Account</p>
              </label>
            </div>
          </div>
          <div className="bg-white justify-between border-[1px] rounded-xl w-[200px] h-[84px] mr-4 mb-4 p-4">
            <div className="flex items-center mb-2">
              <input
                type="radio"
                className="form-radio h-4 w-4 text-indigo-600"
                name="options"
                id="doku"
                value="doku"
                checked={selectedOption === 'doku'}
                onChange={handleOptionChange}
              />
              <label htmlFor="doku" className="ml-2 cursor-pointer">
              {selectedOption !== 'doku' ? 
              <img src="/icons/small-icons/Debit-nonActive.svg" alt="payment-gateway" />
               :
              <img src="/icons/small-icons/Debit-Active.svg" alt="payment-gateway" />
              }
                <p>Credit Card</p>
              </label>
            </div>
          </div>
        </div>
      <div className='mb-10'>
        <span className='font-semibold text-xs mb-3'>Nominal UTJ</span>
        <NeoFieldSummaryData value={
            <><CurrencyInputCalc
            className="textbox-label__currency"
            name="utj"
            value={inputs?.utj?.value}
            placeholder="0"
            decimalsLimit={2}
            groupSeparator="."
            decimalSeparator=","
            maxLength={16}
            onValueChange={(value) => handleUtj(value, "utj")}
            allowNegativeValue={false} 
            />
            <span>{!inputs?.utj?.isValid ? (
              <p className="text-[#F04438] prod-detail__pages__property">
                {inputs?.utj?.msgError}
              </p>
            ) : (
              <span className="prod-detail__pages__property"></span>
            )}</span></>
              
        }/>
      </div>
         </div>
      <h1><b>Cara Pembayaran</b></h1>
        {selectedOption === 'briva' ? (
          <div>
            <Accordion>
              <AccordionPanel className='border-b4'>
                <br/>
                <AccordionTitle>
                  ATM BRI
                </AccordionTitle>
                <br/>
                <Accordion.Content>
                  <p className="text-gray-500 dark:text-gray-400">
                    1. Pada ATM, Pilih Transaksi Lain, kemudian pilih pembayaran.
                  </p>
                  <p className="mb-2 text-gray-500 dark:text-gray-400">
                    2. Kemudian Pilih Lainnya, lalu pilih BRIVA.
                  </p>
                  <p className="mb-2 text-gray-500 dark:text-gray-400">
                    3. Masukkan nomor BRIVA dan nominal pembayaran.
                  </p>
                  <p className="mb-2 text-gray-500 dark:text-gray-400">
                    4. Konfirmasi Jumlah Pembayaran dan selesaikan pembayaran.
                  </p>
                </Accordion.Content>
              </AccordionPanel>
              <br/>
              <AccordionPanel className='border-b4'>
                <AccordionTitle>
                  Internet Banking BRI
                </AccordionTitle>
                <br/>
                <Accordion.Content>
                  <p className="mb-2 text-gray-500 dark:text-gray-400">
                    1. Login iBanking BRI, kemudian pilih Pembayaran Tagihan.
                  </p>
                  <p className="mb-2 text-gray-500 dark:text-gray-400">
                    2. Pilih Pembayaran kemudian pilih BRIVA.

                  </p>
                  <p className="mb-2 text-gray-500 dark:text-gray-400">
                    3. Masukkan nomor BRIVA dan Nominal Pembayaran.
                  </p>
                  <p className="mb-2 text-gray-500 dark:text-gray-400">
                    4. Masukkan Password dan mToken, klik Kirim, & selesaikan pembayaran.
                  </p>
                </Accordion.Content>
              </AccordionPanel>
              <br />
              <AccordionPanel className='border-b4'>
                <AccordionTitle>
                  Mobile Banking BRI
                </AccordionTitle>
                <br/>
                <Accordion.Content>
                  <p className="mb-2 text-gray-500 dark:text-gray-400">
                    1. Buka aplikasi BRI Mobile, pilih Mobile Banking.
                  </p>
                  <p className="mb-2 text-gray-500 dark:text-gray-400">
                    2. Kemudian pilih Pembayaran, lalu pilih BRIVA.

                  </p>
                  <p className="mb-2 text-gray-500 dark:text-gray-400">
                    3. Masukkan Nomor BRIVA dan Jumlah Pembayaran.
                  </p>
                  <p className="mb-2 text-gray-500 dark:text-gray-400">
                    4. Masukkan PIN, tekan OK/Kirim dan selesaikan Pembayaran.
                  </p>
                </Accordion.Content>
              </AccordionPanel>
            </Accordion>
          </div>
        ): ""}
       { selectedOption === 'doku' ? (
          <div>
            <p>1. Masukkan nominal UTJ</p>
            <p>2. Klik button selanjutnya {'>'} button Lanjutkan Pengajuan</p>
            <p>3. Masukkan nomor kartu kredit</p>
            <p>4. Masukkan expired date </p>
            <p>5. Masukkan kode CVV</p>
            <p>6. Klik button bayar </p>
            <p>7. Masukkan kode OTP transaksi kartu kredit </p>
            <p>8. Klik button submit</p>
          </div>
         ) : ""}
      <div className="mb-[3.5rem]" />
    </div>
  </div>
);
};

export default UtjKpr;