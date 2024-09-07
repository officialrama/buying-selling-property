import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { LabelInputTextbox } from "../../components/atoms";
import { Footer } from "../../components/molecules";
import Button from "./../../components/atoms/Button/Component";
import TextboxLabel from "./../../components/molecules/Input/textbox-custom/textbox-label";
import Dropdown from "./../../components/molecules/Dropdown/dropdown";
import { MdEmail } from "react-icons/md";
import { IoCall } from "react-icons/io5";

const About = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <div className="about__wrapper mt-20">
        <div className="about__card about__cardAbout">
          <h2 className="about__title">Tentang Kami</h2>
          <div className="about__about-us gtc-about-us">
            <div className="about__about-us-txt">
              <p className="about__desc text-justify">
                Berkenalan lebih dekat dengan homespot <br /><br />

                Homespot adalah platform teknologi berbasis web base dengan sistem one-stop housing marketplace. Homespot menghubungkan antara pembeli, penjual dan penyewa dengan masyarakat yang membutuhkan layanan informasi jual beli dan memudahkan untuk memperoleh hunian sesuai dengan impian.

              </p>
              <div className="about__title-ck mt-6 mb-4  text-center">
                Hubungi Kami

              </div>
              <div class="flex justify-center items-center mb-8">
                <div class="flex flex-row space-x-12 place-self-center">
                  <div className="about__has-tooltip">
                    <span class='about__tooltip rounded shadow-lg p-1 bg-gray-100 text-zinc-800 mt-10 -ml-6'>Whatsapp</span>
                    <a href="https://api.whatsapp.com/send?phone=6281389001162" target="_blank">
                      <img src="/icons/small-icons/whatsapp-color.svg" width="32px" height="32px" alt="wa-icon" />
                    </a>
                  </div>
                  {/* <div className="about__has-tooltip">
                    <span class='about__tooltip rounded shadow-lg p-1 bg-gray-100 text-zinc-800 mt-10 -ml-4'>Kontak</span>
                    <a href="tel:+6281389001162">
                      <IoCall className="about__image" style={{ color: 'grey', width: '32px', height: '32px' }} />
                    </a>
                  </div> */}
                  <div className="about__has-tooltip pt-1">
                    <span class='about__tooltip rounded shadow-lg p-1 bg-gray-100 text-zinc-800 mt-10 -ml-9'>Email Support</span>
                    <a href="mailto:support@homespot.id">
                      <img src="/icons/GmailIcon.svg" width="32px" height="32px" alt="email-icon" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="about__video-wrap">
              <div className="about__video">
                <iframe
                  className="about__iframe"
                  src="https://www.youtube.com/embed/675dJ8Q_ZWY"
                  title="YouTube video player"
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowfullscreen="allowfullscreen"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
        <div className="about__card about__find-prop">
          <h2 className="about__title">Cari Properti</h2>
          <p className="about__desc">
            Segera temukan hunian impianmu melalui Homespot.
          </p>
          <br></br>
          <Link to="/">
            <Button
              buttonColor="orange"
              textColor="white"
              className="about__findLink"
            >
              Cari Properti
            </Button>
          </Link>
        </div>
        <div className="about__card about__sel-prop">
          <p className="about__title">Pilih Properti</p>
          <p className="about__desc">
            Jadikan Homespot sebagai bagian dari perjalanan anda berikutnya,
            dengan memilih hunian sesuai dengan impian.
          </p>
        </div>
        <div className="about__card about__calc-kpr">
          <p className="about__title">Kalkulasi KPR</p>
          <p className="about__desc">
            Hitung estimasi angsuran KPR perbulan anda menggunakan kalkulator
            ini :
          </p>
          <div className="landing-page calc-kpr__wrapper">
            <p className="landing-page calc-kpr__notes">
              *Catatan: Perhitungan ini adalah hasil perkiraaan aplikasi KPR
              secara umum. Data perhitungan di atas dapat berbeda dengan
              perhitungan bank. Untuk perhitungan yang akurat, silahkan hubungi
              kantor cabang kami.
            </p>
          </div>
          <Link to="/">
            <Button
              buttonColor="orange"
              textColor="white"
              className="about__findLink"
            >
              Kalkulator
            </Button>
          </Link>
        </div>
        <div className="about__app-kpr">
          <p className="about__title">Ajukan KPR</p>
          <p className="about__desc">
            Ajukan sekarang, KPR BRI untuk mewujudkan rumah impian anda!
          </p>
          <p className="about__desc">Untuk syarat dokumen sebagai berikut :</p>
          <div className="my-4">
            <table className="w-full">
              <thead>
                <tr className="bg-[#00529C] text-white">
                  <th className="border-l p-3 text-left rounded-tl-lg ">Dokumen</th>
                  <th className="text-center">Karyawan</th>
                  <th className="text-center">Pengusaha</th>
                  <th className="text-center rounded-tr-lg">Profesional</th>
                </tr>
              </thead>
              <tbody>
                <tr >
                  <td className="border-l p-3 text-left">Fotokopi KTP Pemohon </td>
                  <td className="text-center">Ya</td>
                  <td className="text-center">Ya</td>
                  <td className="text-center border-b border-r">Ya</td>
                </tr>
                <tr className="bg-gray-200 text-left">
                  <td className="border-l p-3 text-left">Fotokopi KTP Suami/lstri </td>
                  <td className="text-center">Ya</td>
                  <td className="text-center">Ya</td>
                  <td className="text-center border-b border-r">Ya</td>
                </tr>
                <tr >
                  <td className="border-l p-3">Pas foto Suami/lstri </td>
                  <td className="text-center">Ya</td>
                  <td className="text-center">Ya</td>
                  <td className="text-center border-b border-r">Ya</td>
                </tr>
                <tr className="bg-gray-200">
                  <td className="border-l p-3"> Fotokopi Kartu Keluarga </td>
                  <td className="text-center">Ya</td>
                  <td className="text-center">Ya</td>
                  <td className="text-center border-b border-r">Ya</td>
                </tr>
                <tr >
                  <td className="border-l p-3">Fotokopi Akta Nikah/Cerai/Akta Kematian Pasangan  </td>
                  <td className="text-center">Ya</td>
                  <td className="text-center">Ya</td>
                  <td className="text-center border-b border-r">Ya</td>
                </tr>
                <tr className="bg-gray-200 text-left">
                  <td className="border-l p-3">Fotokopi NPWP Pribadi* </td>
                  <td className="text-center">Ya</td>
                  <td className="text-center">Ya</td>
                  <td className="text-center border-b border-r">Ya</td>
                </tr>
                <tr >
                  <td className="border-l p-3">Fotokopi NPWP Badan Usaha </td>
                  <td className="text-center">Tidak</td>
                  <td className="text-center">Ya</td>
                  <td className="text-center border-b border-r">Ya</td>
                </tr>
                <tr className="bg-gray-200 text-left">
                  <td className="border-l p-3">Fotokopi Akta Pendirian Perusahaan atau Perubahan Terkini, SIUP, & TDP</td>
                  <td className="text-center">Tidak</td>
                  <td className="text-center">Ya</td>
                  <td className="text-center border-b border-r">Tidak</td>
                </tr>
                <tr >
                  <td className="border-l p-3">Fotokopi Izin Praktek</td>
                  <td className="text-center">Tidak</td>
                  <td className="text-center">Tidak</td>
                  <td className="text-center border-b border-r">Ya</td>
                </tr>
                <tr className="bg-gray-200 text-left">
                  <td className="border-l p-3">Slip Gaji atau Surat Keterangan Penghasilan asli 1 bulan terakhir*</td>
                  <td className="text-center">Ya</td>
                  <td className="text-center">Tidak</td>
                  <td className="text-center border-b border-r">Tidak</td>
                </tr>
                <tr >
                  <td className="border-l p-3">Fotokopi SK Pengangkatan Pegawai Tetap</td>
                  <td className="text-center">Ya</td>
                  <td className="text-center">Tidak</td>
                  <td className="text-center border-b border-r">Tidak</td>
                </tr>
                <tr className="bg-gray-200 text-left">
                  <td className="border-l p-3">Fotokopi SPT PPh Ps.21</td>
                  <td className="text-center">Ya</td>
                  <td className="text-center">Ya</td>
                  <td className="text-center border-b border-r">Ya</td>
                </tr>
                <tr >
                  <td className="border-l p-3">Fotokopi Rekening Koran atau Tabungan 3 bulan terakhir*</td>
                  <td className="text-center">Ya</td>
                  <td className="text-center">Ya</td>
                  <td className="text-center border-b border-r">Ya</td>
                </tr>
                <tr className="bg-gray-200 text-left">
                  <td className="border-l p-3">Akta Pisah Harta Notaris yang didaftarkan ke KUA atau Catatan Sipil (jika ada)</td>
                  <td className="text-center">Ya</td>
                  <td className="text-center">Ya</td>
                  <td className="text-center border-b border-r">Ya</td>
                </tr>
                <tr className="border-b">
                  <td className="border-l p-3 rounded-bl-lg">Fotokopi SHM/SHGB serta IMB </td>
                  <td className="text-center">Ya</td>
                  <td className="text-center">Ya</td>
                  <td className="text-center border-r rounded-br-lg">Ya</td>
                </tr>
              </tbody>
            </table>
          </div>
          {/* <img
            src="/images/Dokumen.png"
            alt="dokumen"
            className="about__imgDocs"
          /> */}
          <p className="about__desc">
            *) Untuk pendapatan gabungan suami dan istri, dilampirkan dokumen
            keduanya.
          </p>
          <p className="about__desc">
            *) Untuk syarat lebih lanjut, hubungi unit kerja BRI terdekat.
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default About;
