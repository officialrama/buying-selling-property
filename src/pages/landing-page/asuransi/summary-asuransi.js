import moment from 'moment';
import 'moment/locale/id';
import React, { useEffect, useState } from 'react';
import { formatRupiah } from '../../../helpers/string';
import { personalDataConst } from '../../../static/personal-data/personal-data';
import FieldSummaryInsurance from '../../../components/atoms/Text/personal-data-insurance/field-personal-insurance';
import { MenuItems } from '../../../components/molecules';
import FieldSummaryData from '../../../components/atoms/Text/personal-data/field-personal-data';

const SummaryAsuransi = ({ inputs, dataAddress, dataAddressKTP, waktuKontak }) => {
  moment.locale('id')
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [state, setState]= useState({
    value: '',
    copied: false,
  });
  const alamatKTP = !dataAddressKTP?.address ? dataAddress?.address : dataAddressKTP?.address
  return (
    <div className='flex flex-row gap-6'>
    <div className="mobile:hidden flex flex-col gap-3">
    <MenuItems name={"Informasi Pribadi"} href={"#informasi-pribadi"}/>
    <MenuItems name={"Alamat"} href={"#alamat"}/>
    <MenuItems name={"Pengajuan"} href={"#pengajuan"}/>
     </div>
    <div className='flex flex-col gap-4'>
      <div id="informasi-pribadi" className="p-4 border border-[#D3D4D4] rounded-lg w-[660px]">
        <p className='text-[20px] leading-[30px] font-bold text-[#292929]'>Informasi Pribadi</p>
        <div className='grid grid-cols-2 gap-6'>
        <FieldSummaryData field="Nama Lengkap" value={inputs?.fullName?.value} />
        <FieldSummaryData field="NIK" value={inputs?.nik?.value} />
        <FieldSummaryData field="Tempat Lahir" value={inputs?.pob?.value} />
        <FieldSummaryData field="Tanggal Lahir" value={moment(inputs?.dob?.value)?.format("DD-MMMM-YYYY")} />
        <FieldSummaryData field="Nomor Handphone" value={(inputs?.mobileNoArea?.value+inputs?.mobileNo?.value?.replace(/^((62)|(0))/g, ""))} />
        <FieldSummaryData field="Email" value={inputs?.email?.value} />
        <FieldSummaryData field="No Rekening BRI" value={inputs?.noRekeningSimpanan?.value} />
        <FieldSummaryData field="Tujuan Pengajuan" value={inputs?.tujuanNasabah?.value} />
        </div>
      </div>
      <div id="alamat" className="p-4 border border-[#D3D4D4] rounded-lg w-[660px]">
        <p className='text-[20px] leading-[30px] font-bold text-[#292929]'>Alamat</p>
        <div className='grid grid-rows-2 gap-6 w-[600px]'>
        <FieldSummaryData field="Alamat Domisili" value={dataAddress?.address} />
        <FieldSummaryData field="Alamat KTP" value={alamatKTP} />
        </div>
      </div>
      <div id="pengajuan" className="p-4 border border-[#D3D4D4] rounded-lg w-[660px]">
        <p className='text-[20px] leading-[30px] font-bold text-[#292929]'>Pengajuan</p>
        <div className='grid grid-cols-2 gap-6'>
        <FieldSummaryData field="Waktu Kontak" value={`${waktuKontak}`} />
        <FieldSummaryData field="Kantor Cabang" value={`${inputs.ukerName?.value} | ${inputs.kanwil?.value}`} />
        </div>
      </div>
    </div>
    </div>
  );
};

export default SummaryAsuransi;