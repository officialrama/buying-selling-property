import moment from 'moment';
import 'moment/locale/id';
import _ from "lodash-contrib";
import React, { useEffect, useState } from 'react';
import FieldSummaryData from '../../../components/atoms/Text/personal-data/field-personal-data';
import { formatRupiah } from '../../../helpers/string';
import { personalDataConst } from '../../../static/personal-data/personal-data';
import { MenuItems } from '../../../components/molecules';

const SummarySubmitCS = ({ inputs, dataAddress, dataAddressKTP, waktuKontak, nameCS, calcState, files }) => {
  moment.locale('id');
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);

    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 1,
    };

    const observerCallback = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    const sections = document.querySelectorAll('div[id]');
    sections.forEach(section => observer.observe(section));

    return () => observer.disconnect();
  }, []);
  
  const alamatProperti = _.isJSON(inputs?.dataAddressProperti?.value) ? JSON.parse(inputs?.dataAddressProperti?.value) : "-"
  const alamatKTP = !dataAddressKTP?.address ? dataAddress?.address : dataAddressKTP?.address
  
  return (
    <div className='flex flex-row gap-6'>
    <div className="mobile:hidden flex flex-col gap-3">
      <div className='flex flex-col gap-3 sticky top-16 right-0'>
        <MenuItems name={"Informasi Properti"} href={"#properti"} active={activeSection === 'properti'} />
        <MenuItems name={"Informasi Pribadi"} href={"#informasi-pribadi"} active={activeSection === 'informasi-pribadi'} />
        <MenuItems name={"Alamat"} href={"#alamat"} active={activeSection === 'alamat'} />
        <MenuItems name={"Pengajuan"} href={"#pengajuan"} active={activeSection === 'pengajuan'} />
        <MenuItems name={"Dokumen"} href={"#dokumen"} active={activeSection === 'dokumen'} />
        </div>
     </div>
    <div className='flex flex-col gap-4'>
      <div id="properti" className="p-4 border border-[#D3D4D4] rounded-lg">
        <p className='text-[20px] leading-[30px] font-bold text-[#292929]'>Properti</p>
        <div className='grid grid-cols-2 gap-6'>
        <FieldSummaryData field="Nama Properti" value={inputs?.namaProperti?.value} />
        <FieldSummaryData field="Referral/Lainnya" value={`${inputs?.noReferral?.value} | ${nameCS}`} />
        <div className='col-span-2'>
        <FieldSummaryData field="Alamat Properti" value={alamatProperti?.alamat} />
        </div>
        <FieldSummaryData field="Harga Properti" value={formatRupiah(calcState?.hargaRumah?.value)} />
        <FieldSummaryData field="Uang Muka" value={formatRupiah(calcState?.dp?.value)} />
        <FieldSummaryData field="Masa Kredit Fix" value={`${(calcState?.gimmick?.value?.tenorFixedRate / 12)} Tahun`} />
        <FieldSummaryData field="Suku Bunga" value={calcState?.gimmick?.value?.name} />
        <FieldSummaryData field="Nominal Suku Bunga" value={calcState?.gimmick?.value?.fixedRate} />
        <FieldSummaryData field="Jangka Waktu" value={calcState?.jangkaWaktu?.value} />
        </div>
      </div>
      <div id="informasi-pribadi" className="p-4 border border-[#D3D4D4] rounded-lg">
        <p className='text-[20px] leading-[30px] font-bold text-[#292929]'>Informasi Pribadi</p>
        <div className='grid grid-cols-2 gap-6'>
        <FieldSummaryData field="Nama Lengkap" value={inputs?.fullName?.value} />
        <FieldSummaryData field="NIK" value={inputs?.nik?.value} />
        <FieldSummaryData field="Tempat Lahir" value={inputs?.pob?.value} />
        <FieldSummaryData field="Tanggal Lahir" value={moment(inputs?.dob?.value)?.format("DD-MMMM-YYYY")} />
        <FieldSummaryData field="Nomor Handphone" value={(inputs?.mobileNoArea?.value+inputs?.mobileNo?.value?.replace(/^((62)|(0))/g, ""))} />
        <div className='mobile:col-span-2'>
        <FieldSummaryData field="Email" value={inputs?.email?.value} />
        </div>
        <FieldSummaryData field="Jenis Kelamin" value={personalDataConst.gender.filter((e) => e.value === inputs?.jenisKelamin?.value)[0].name} />
        <FieldSummaryData field="Agama" value={personalDataConst.agama.filter((e) => e.value === inputs?.agama?.value)[0].name} />
        <FieldSummaryData field="Status Kawin" value={personalDataConst.maritalStatus.filter((e) => e.value === inputs?.statusKawin?.value)[0].name} />
        </div>
      </div>
      <div id="alamat" className="p-4 border border-[#D3D4D4] rounded-lg">
        <p className='text-[20px] leading-[30px] font-bold text-[#292929]'>Alamat</p>
        <div className='grid grid-rows-2 gap-6'>
        <FieldSummaryData field="Alamat KTP" value={alamatKTP} />
        <FieldSummaryData field="Alamat Domisili" value={dataAddress?.address } />
        </div>
      </div>
      <div id="pengajuan" className="p-4 border border-[#D3D4D4] rounded-lg">
        <p className='text-[20px] leading-[30px] font-bold text-[#292929]'>Pengajuan</p>
        <div className='grid grid-cols-2 gap-6'>
        <FieldSummaryData field="Waktu Kontak" value={`${waktuKontak}`} />
        <FieldSummaryData field="Kantor Cabang" value={`${inputs.ukerName?.value} | ${inputs.kanwil?.value}`} />
        </div>
      </div>
      <div id="dokumen" className="p-4 border border-[#D3D4D4] rounded-lg">
        <p className='text-[20px] leading-[30px] font-bold text-[#292929]'>Dokumen Pendukung</p>
        <div className="grid grid-cols-3 sm:grid-cols-2 md:grid-cols-3 mobile:grid-cols-1 gap-3 mt-4 items-start justify-items-start">
                    {
                        files.map((item, index) => {
                            return (
                                <div className='flex flex-col' key={index}>
                                    <img src={item?.imgfile?.type === "application/pdf" ? '/images/RawDocument.png' : item.preview} alt={`Image ${index + 1}`} className="object-cover rounded-lg" style={{width: '268px', height: '132px'}} />
                                    <p className='text-xs font-semibold text-[#777777]'>{(item?.imgfile?.name)?.length > 100 ? ((item?.imgfile?.name).slice(0, 99) + "...") : (item?.imgfile?.name)}</p>
                                </div>
                            )
                        })
                    }
                </div>
      </div>
    </div>
    </div>
  );
};

export default SummarySubmitCS;