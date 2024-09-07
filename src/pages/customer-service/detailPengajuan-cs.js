import _ from "lodash-contrib";
import React, { useEffect, useState } from 'react';
import FieldSummaryData from '../../components/atoms/Text/personal-data/field-personal-data';
import { formatRupiah } from '../../helpers/string';
import { personalDataConst } from '../../static/personal-data/personal-data';
import { MenuItems } from '../../components/molecules';
import { useDispatch } from 'react-redux';
import { detailPengajuanCS } from '../../store/actions/fetchData/customer-service';
import cookie from 'hs-cookie';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '../../components/atoms';
import { Breadcrumb } from 'flowbite-react';
import { formatDateIndo } from "../../helpers/date";

const DetailPengajuanCS = ({email}) => {
  const [activeSection, setActiveSection] = useState('');
  const navigate = useNavigate();
  // const email = _.isJSON(cookie.get("morgateCookie")) ? JSON?.parse?.(cookie.get("morgateCookie"))?.emailView : ""
  const dispatch = useDispatch();
  const { id } = useParams();
  const [data, setData] = useState();
  
  useEffect(() => {
    dispatch(detailPengajuanCS(email, id, setData))
  }, []);

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
  
  return (
    <div className='px-[276px] py-4 mobile:px-[10px]'>
      <div className="gap-[4px] mt-4">
      <Breadcrumb>
        <span className="text-sm cursor-pointer text-[#1078CA] font-semibold" onClick={() => navigate('/') } >
          Home
          </span>
      <Breadcrumb.Item href={`/customer-service/list-pengajuan`}>
      <span className="text-sm text-[#1078CA] font-semibold">
        List Pengajuan
          </span>
      </Breadcrumb.Item>
      <Breadcrumb.Item>
      <span className="text-sm text-[#777777] font-semibold">
        Detail Pengajuan
          </span>
      </Breadcrumb.Item>
        </Breadcrumb>
          </div>
      <p className='text-[#292929] text-[28px] leading-[42px] font-bold pt-4'>Detail Pengajuan Pembelian</p>
    <div className='flex flex-row gap-6 pt-4'>
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
        <FieldSummaryData field="Nama Properti" value={data?.namaProperti} />
        <FieldSummaryData field="Referral/Lainnya" value={data?.kodeReferral} />
        <div className='col-span-2'>
        <FieldSummaryData field="Alamat Properti" value={data?.alamatProperti} />
        </div>
        <FieldSummaryData field="Harga Properti" value={formatRupiah(data?.hargaProperti)} />
        <FieldSummaryData field="Uang Muka" value={formatRupiah(data?.uangMuka)} />
        <FieldSummaryData field="Program Suku Bunga" value={data?.gimmick} />
        </div>
      </div>
      <div id="informasi-pribadi" className="p-4 border border-[#D3D4D4] rounded-lg">
        <p className='text-[20px] leading-[30px] font-bold text-[#292929]'>Informasi Pribadi</p>
        <div className='grid grid-cols-2 gap-6'>
        <FieldSummaryData field="Nama Lengkap" value={data?.namaDebitur} />
        <FieldSummaryData field="NIK" value={data?.nik} />
        <FieldSummaryData field="Tempat Lahir" value={data?.placeOfBirth} />
        <FieldSummaryData field="Tanggal Lahir" value={formatDateIndo(data?.dateOfBirth)} />
        <FieldSummaryData field="Nomor Handphone" value={(data?.mobileNo.replace(/^(\+62)/, "0").replace('|', ""))}  />
        <div className='mobile:col-span-2'>
        <FieldSummaryData field="Email" value={data?.email} />
        </div>
        <FieldSummaryData field="Jenis Kelamin" value={data?.gender === "L" ? "Laki-Laki" : data?.gender === 'P' ? "Perempuan" : ""} />
        <FieldSummaryData field="Agama" value={ data?.agama === "ISL" ? "Islam" : data?.agama === "BUD" ? "Budha" : data?.agama === "HIN" ? "Hindu" : data?.agama === "KRI" ? "Kristen" : data?.agama === "KAT" ? "Katolik" : "Lainnya"} />
        <FieldSummaryData field="Status Kawin" value={data?.maritalStatus === "1" ? "Belum Kawin" : data?.maritalStatus === "2" ? "Menikah" : data?.maritalStatus === "3" ? "Cerai" : ""} />
        </div>
      </div>
      <div id="alamat" className="p-4 border border-[#D3D4D4] rounded-lg">
        <p className='text-[20px] leading-[30px] font-bold text-[#292929]'>Alamat</p>
        <div className='grid grid-rows-2 gap-6'>
        <FieldSummaryData field="Alamat KTP" value={data?.alamatKtp} />
        <FieldSummaryData field="Alamat Domisili" value={data?.alamatDomisili } />
        </div>
      </div>
      <div id="pengajuan" className="p-4 border border-[#D3D4D4] rounded-lg">
        <p className='text-[20px] leading-[30px] font-bold text-[#292929]'>Pengajuan</p>
        <div className='grid grid-cols-2 gap-6'>
        <FieldSummaryData field="Waktu Kontak" value={data?.waktuKontak} />
        <FieldSummaryData field="Kantor Cabang" value={`${data?.ukerName} | ${data?.kanwil}`} />
        </div>
      </div>
     {data?.media[0] && 
      <div id="dokumen" className="p-4 border border-[#D3D4D4] rounded-lg">
        <p className='text-[20px] leading-[30px] font-bold text-[#292929]'>Dokumen Pendukung</p>
        <div className="grid grid-cols-3 sm:grid-cols-2 md:grid-cols-3 mobile:grid-cols-1 gap-3 mt-4 items-start justify-items-start">
                    {
                        data?.media?.map((item, index) => {
                          const isPDF = item?.sharedURL?.endsWith('.pdf');
                          const imagesplit = item?.imageName?.split("|");
                          const FinalNameImg = imagesplit?.[1].replace("_","")
                            return (
                                <div className='flex flex-col' key={index}>
                                    <img src={isPDF ? '/images/RawDocument.png' : item?.sharedURL} className="object-cover rounded-lg" style={{width: '268px', height: '132px'}} />
                                    <p className='text-xs font-semibold text-[#777777]'>{(FinalNameImg)?.length > 100 ? ((FinalNameImg).slice(0, 99) + "...") : (FinalNameImg)}</p>
                                </div>
                            )
                        })
                    }
                </div>
      </div>}
      <div className='flex justify-end items-end pt-6'>
    <Button onClick={() => window.location.href = '/customer-service/list-pengajuan'}>Kembali</Button>
    </div>
    </div>
    </div>
    </div>
  );
};

export default DetailPengajuanCS;