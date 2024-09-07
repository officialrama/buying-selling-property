import moment from 'moment';
import _ from "lodash-contrib";
import React, { useEffect, useState } from 'react';
import FieldSummaryData from '../../components/atoms/Text/personal-data/field-personal-data';
import { formatRupiah, formatRupiahWord } from '../../helpers/string';
import { personalDataConst } from '../../static/personal-data/personal-data';
import { MenuItems } from '../../components/molecules';

const SummarySubmitSalesKpr = ({ inputs, dataAddress, dataAddressKTP, waktuKontak, selectedOption }) => {
  moment.locale('id');
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [state, setState]= useState({
    value: '',
    copied: false,
  });
  const detailProperti = JSON.parse(localStorage.getItem('detailProperti'))
  const alamatProperti = _.isJSON(detailProperti?.project?.alamatProperti?.alamat) ? JSON.parse(detailProperti?.project?.alamatProperti?.alamat) : "-"
  const detailGimmick = JSON.parse(localStorage.getItem('simulasiSalesCalc'))
  const alamatKTP = !dataAddressKTP?.address ? dataAddress?.address : dataAddressKTP?.address
  return (
    <div className='flex flex-row gap-6'>
    <div className="mobile:hidden flex flex-col gap-3">
    <MenuItems name={"Properti"} href={"#properti"}/>
    <MenuItems name={"Informasi Pribadi"} href={"#informasi-pribadi"}/>
    <MenuItems name={"Alamat"} href={"#alamat"}/>
    <MenuItems name={"Pengajuan"} href={"#pengajuan"}/>
    <MenuItems name={"UTJ"} href={"#utj"}/>
     </div>
    <div className='flex flex-col gap-4'>
      <div id="properti" className="p-4 border border-[#D3D4D4] rounded-lg w-[660px]">
        <p className='text-[20px] leading-[30px] font-bold text-[#292929]'>Properti</p>
        <div className='grid grid-cols-2 gap-6'>
        <FieldSummaryData field="Nama Properti" value={detailProperti?.detailProperti?.namaProperti ? detailProperti?.detailProperti?.namaProperti : detailProperti?.responseData?.name} />
        <FieldSummaryData field="Referral" value={'-'} />
        <div className='col-span-2'>
        <FieldSummaryData field="Alamat Properti" value={`${alamatProperti?.alamat ? alamatProperti?.alamat : `${detailProperti?.responseData?.addresses?.address},` + `${detailProperti?.responseData?.addresses?.district},` + detailProperti?.responseData?.addresses?.province}`} />
        </div>
        <FieldSummaryData field="Harga Properti" value={formatRupiah(detailGimmick?.hargaAkhir?.value ? detailGimmick?.hargaAkhir?.value : detailGimmick?.hargaAkhir)} />
        <FieldSummaryData field="Uang Muka" value={formatRupiah(detailGimmick?.uangMuka?.value)} />
        <FieldSummaryData field="Masa Kredit Fix" value={`${(detailGimmick?.gimmick?.value?.tenorFixedRate / 12)} Tahun`} />
        <FieldSummaryData field="Suku Bunga" value={detailGimmick?.gimmick?.value?.name} />
        <FieldSummaryData field="Nominal Suku Bunga" value={detailGimmick?.gimmick?.value?.fixedRate} />
        <FieldSummaryData field="Jangka Waktu" value={detailGimmick?.lamaPinjaman?.value} />
        </div>
      </div>
      <div id="informasi-pribadi" className="p-4 border border-[#D3D4D4] rounded-lg w-[660px]">
        <p className='text-[20px] leading-[30px] font-bold text-[#292929]'>Informasi Pribadi</p>
        <div className='grid grid-cols-2 gap-6'>
        <FieldSummaryData field="Nama Lengkap" value={inputs?.fullName?.value} />
        <FieldSummaryData field="NIK" value={inputs?.nik?.value} />
        <FieldSummaryData field="Tempat Lahir" value={inputs?.pob?.value} />
        <FieldSummaryData field="Tanggal Lahir" value={moment(inputs?.dob?.value)?.format("DD-MMMM-YYYY")} />
        <FieldSummaryData field="Nomor Handphone" value={(inputs?.mobileNoArea?.value+inputs?.mobileNo?.value?.replace(/^((62)|(0))/g, ""))} />
        <FieldSummaryData field="Email" value={inputs?.email?.value} />
        <FieldSummaryData field="Jenis Kelamin" value={personalDataConst.gender.filter((e) => e.value === inputs?.jenisKelamin?.value)[0].name} />
        <FieldSummaryData field="Agama" value={personalDataConst.agama.filter((e) => e.value === inputs?.agama?.value)[0].name} />
        <FieldSummaryData field="Status Kawin" value={personalDataConst.maritalStatus.filter((e) => e.value === inputs?.statusKawin?.value)[0].name} />
        </div>
      </div>
      <div id="alamat" className="p-4 border border-[#D3D4D4] rounded-lg w-[660px]">
        <p className='text-[20px] leading-[30px] font-bold text-[#292929]'>Alamat</p>
        <div className='grid grid-rows-2 gap-6 w-[600px]'>
        <FieldSummaryData field="Alamat KTP" value={alamatKTP} />
        <FieldSummaryData field="Alamat Domisili" value={dataAddress?.address } />
        </div>
      </div>
      <div id="pengajuan" className="p-4 border border-[#D3D4D4] rounded-lg w-[660px]">
        <p className='text-[20px] leading-[30px] font-bold text-[#292929]'>Pengajuan</p>
        <div className='grid grid-cols-2 gap-6'>
        <FieldSummaryData field="Waktu Kontak" value={`${waktuKontak}`} />
        <FieldSummaryData field="Kantor Cabang" value={`${inputs.ukerName?.value} | ${inputs.kanwil?.value}`} />
        </div>
      </div>
      <div id="utj" className="p-4 border border-[#D3D4D4] rounded-lg w-[660px]">
        <p className='text-[20px] leading-[30px] font-bold text-[#292929]'>UTJ</p>
        <div className='grid grid-cols-2 gap-6'>
        <FieldSummaryData field="Metode Pembayaran" value={selectedOption === "Paid" ? "Bayar Langsung" : selectedOption === "briva" ? "Virtual Account" : selectedOption === "doku" ? "Credit Card" : ""}/>
        <FieldSummaryData field="Nominal" value={formatRupiah(inputs?.utj?.value?.split(",")[0])}/>
        </div>
      </div>
    </div>
    </div>
  );
};

export default SummarySubmitSalesKpr;