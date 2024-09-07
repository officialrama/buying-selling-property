import React, {useEffect, useState} from "react";
import cookie from "hs-cookie";
import moment from "moment";
import { MdOutlineClear } from 'react-icons/md';
import { useDispatch, useSelector } from "react-redux";
import { Footer, Dropdown, AccordionFaq, MenuItems } from "../../../components/molecules";
import { useNavigate } from "react-router-dom";
import InsuranceData from "../insuranceData.json";
import { personalDataConst } from "../../../static/personal-data/personal-data";
import { ListGroup, Breadcrumb, Accordion, Datepicker } from "flowbite-react";
import { ListGroupItem } from "flowbite-react/lib/esm/components/ListGroup/ListGroupItem";
import { showModalLogin } from "../../../store/actions/changeState";
import { Button, LabelInputTextbox } from "../../../components/atoms";
import { InsuranceCard } from "../../../components/organisms";
import { setJangkaPerlindungan, setUangTanggungan } from "../../../store/actions/changePersonalDataState";


const AcciCare = ({handleInput, dropdownVal, setDropdownVal}) => {
  const state = useSelector((state) => state.stateReducer);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [windowSize, setWindowSeize] = useState(window.innerWidth)

    const handleResize = () => {
        setWindowSeize(window.innerWidth)
    }

    
    useEffect(() => {
      dispatch(setJangkaPerlindungan(personalDataConst.jangkaPerlindungan[0]));
      dispatch(setUangTanggungan(personalDataConst.uangTanggungan[0]));
      window.scrollTo(0, 0);
    }, []);
  

    useEffect(() => {
        window.addEventListener('resize', handleResize)

        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, []);

  return (
    <div>
        <div className="px-[276px] mobile:px-[0px]">
      <div className="relative">
      <div className="gap-[4px] py-[16px]">
      <Breadcrumb>
        <span className="text-sm cursor-pointer" onClick={() => navigate('/') } >
          Home
          </span>
      <Breadcrumb.Item href='/insurance'>
      <span className="text-sm">
          Asuransi
          </span>
      </Breadcrumb.Item>
      <Breadcrumb.Item href='/acci-care'>
      <span className="text-sm">
          BRI Life - Accicare
          </span>
      </Breadcrumb.Item>
    </Breadcrumb>
    </div>
    <div className="absolute largePc:top-16 left-11 xxl:top-32">
    <div
          className={`largePc:w-[74px] largePc:h-[24px] largePc:ml-[16px] largePc:mt-[22px] xxl:ml-[16px] xxl:mt-[16px] md:ml-[16px] md:mt-[25px] tab:ml-[16px] tab:mt-[25px] mobile:ml-[16px] mobile:mt-[25px]`}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            zIndex: 2 // Place the background behind other elements
          }}
        >
          <img src="../images/Insurance Card/BRI_Life_logo 1@3x.png" alt="BRI Logo" />
        </div>
        <div
          className="font-bold largePc:ml-[16px] largePc:mt-[45px] xxl:ml-[16px] xxl:mt-[36px] md:ml-[16px] md:mt-[45px] tab:ml-[16px] tab:mt-[45px] mobile:ml-[16px] mobile:mt-[45px]"
          style={{ fontSize:"28px", lineHeight:"42px", position: "absolute", top: 0, left: 0, zIndex: 1 }}
        >
          AcciCare
        </div>
        </div>
        <img
          src={
            windowSize <= 769
              ? "../images/Insurance Card/accicare-jumbotron.png"
              : windowSize <= 1280
              ? "../images/Insurance Card/accicare-jumbotron.png"
              : "../images/Insurance Card/accicare-jumbotron.png"
          }
          alt="jumbotron"
          className="w-[100%] object-contain"
          style={{            
            position: "relative",
            zIndex: 0
            }}
        />
        
      </div>
      <div className="flex ">
      <div className="w-1/5 my-10 text-base h-[10%]">
          <div className="xxl:w-[250px] h-[288px] largePc:w-[250px] md:w-[100px] mobile:hidden">
         <MenuItems />
          </div>
        </div>
        <div className="w-4/5 mt-8 mobile:w-full mobile:mr-[24px]">
        <div>
          <h1 id="informasi-umum" className="my-6 text-lg text-start font-bold tracking-tight text-gray-900 dark:text-white">
            Informasi Umum
          </h1>
          <div className="text-base font-medium">
             <span className="text-[#777777]">
             Asuransi Acci Care adalah Perlindungan risiko kecelakaan yang Beri ketenangan dalam melakukan kegiatan sehari-hari, perjalanan, maupun pekerjaan mu
             </span>
             <br></br>
             <br></br>
             <span className="text-[#777777]">
             Asuransi Acci Care adalah produk asuransi yang diterbitkan oleh PT Asuransi BRI Life. Produk ini bukan merupakan produk dari PT. Bank Rakyat Indonesia (Persero), Tbk tidak mengandung kewajiban apapun dan tidak dijamin oleh PT. Bank Rakyat Indonesia (Persero), Tbk serta tidak termasuk dalam program penjaminan Pemerintah Republik Indonesia. PT. Bank Rakyat Indonesia (Persero), Tbk tidak bertanggung jawab atas kepesertaan asuransi yang diterbitkan oleh PT. Asuransi BRI Life sehubungan dengan produk Asuransi Acci Care. PT. Bank Rakyat Indonesia (Persero), Tbk bukan agen PT. Asuransi BRI Life maupun broker dari nasabah PT. Bank Rakyat Indonesia (Persero), Tbk. PT. Asuransi BRI Life adalah perusahaan asuransi yang terdaftar dan diawasi oleh Otoritas Jasa Keuangan (OJK).
             </span>
             <br/>
             <div className="mt-[12px]">
             <span className="font-bold">
             Manfaat
             </span>
             <br></br>
             <span className="text-[#777777] mt-2 ml-1 list-disc">
             Manfaat meninggal dunia karena kecelakaan
             </span>
             <br></br>
             <span className="text-[#777777] mt-2 ml-1 list-disc">
             Manfaat Perlindungan untuk meninggal dunia akibat kecelakaan mulai Rp 25.000.000 hingga Rp 200.000.000
             </span>
             <br></br>
             <span className="text-[#777777] mt-2 ml-1 list-disc">
             Cacat Tetap Total atau sebagian karena kecelakaan (Sesuai tabel cacat tetap total atau sebagian karena kecelakaan)
             </span>
             </div>
          </div>
        </div>
        <div>
          <h1 id="pengajuan-premi" className="my-6 text-lg text-start font-bold tracking-tight text-gray-900 dark:text-white">
            Pengajuan Premi
          </h1>
          <div>
            <span className="text-base font-medium text-[#777777]">
            Yuk coba simulasi di bawah ini dan ajukan premi sekarang
            </span>
            <div className="grid mobile:grid-cols-1 grid-cols-2 gap-10 mb-4" style={{maxWidth: '660px'}}>
            <div className="w-[204px] h-[44px]">
          <Dropdown
            topLabel="Pekerjaan"
            value='Rp.25.000.000'
            defaultValuePrice={['Rp.25.000.000']}
            onChange={(value) => {
              setDropdownVal({ ...dropdownVal, uangTanggungan: value });
              handleInput.handleRadioDropChange("uang pertanggungan", value.value);
            }}
            data={personalDataConst.uangTanggungan}
          />
          {/* {dropdownVal.gender.value === "" && (
            <div className="my-2">
              <p className="textbox__invalidTxt">Jenis Kelamin Wajib Diisi</p>
            </div>
          )} */}
        </div>
              <div>
             <div className="mb-2">
            <LabelInputTextbox text="Tanggal Lahir" />
             </div>
             <div className="w-[204px] h-[44px]">
             <Datepicker
              // value=""
              // onChangeRaw={(e) => e.preventDefault()}
              // maxDate={new Date(moment().subtract(17, "years"))}
              // format="dd-MM-yyyy"
              // locale="id-ID"
              // clearIcon={<MdOutlineClear />}
            />
            {/* {!inputs.dob?.isValid && (
              <div className="my-2">
                <p className="textbox__invalidTxt">Tanggal Lahir Wajib Diisi</p>
              </div>
            )} */}
            </div>
            </div>
            <div className="w-[204px] h-[44px]">
          <Dropdown
            topLabel="Jumlah uang pertanggungan"
            value='Rp.25.000.000'
            defaultValuePrice={['Rp.25.000.000']}
            onChange={(value) => {
              setDropdownVal({ ...dropdownVal, uangTanggungan: value });
              handleInput.handleRadioDropChange("uang pertanggungan", value.value);
            }}
            data={personalDataConst.uangTanggungan}
          />
          {/* {dropdownVal.gender.value === "" && (
            <div className="my-2">
              <p className="textbox__invalidTxt">Jenis Kelamin Wajib Diisi</p>
            </div>
          )} */}
        </div>
        <div className="w-[204px] h-[44px]">
          <Dropdown
            topLabel="Jangka Waktu Perlindungan"
            value='1 Hari'
            defaultValuePrice={['1 Hari']}
            onChange={(value) => {
              setDropdownVal({ ...dropdownVal, jangkaPerlindungan: value });
              handleInput.handleRadioDropChange("Pilih Jangka Waktu", value.value);
            }}
           data={personalDataConst.jangkaPerlindungan}
          />
          {/* {dropdownVal.gender.value === "" && (
            <div className="my-2">
              <p className="textbox__invalidTxt">Jenis Kelamin Wajib Diisi</p>
            </div>
          )} */}
        </div>
             </div>
             <div className="mt-10 flex flex-wrap justify-between" style={{ backgroundColor: '#DDEFFC', borderRadius: '12px', padding: '16px', maxWidth:'560px'  }}>
                <span className="font-semibold text-base">
                    Estimasi Premi
                </span>
                <Button
                buttonColor="bluefigma"
                textColor="white"
                fullWidth={false}
                onClick={() => {
                      cookie.get("morgateCookie")
                      ? navigate("/asuransi/approval-insurance")
                      : dispatch(showModalLogin(!state.showModalLogin));
                  }}
                paddingSize={"padding-0"}
                >
                Ajukan Sekarang
                </Button>
             </div>
          </div>
        </div>
        <div>
          <h1 id="faq" className="my-6 text-lg text-start font-bold tracking-tight text-gray-900 dark:text-white">
            FAQ
          </h1>
          <div className="flex flex-col gap-4 max-w-[660px]">
          <AccordionFaq
          question = "Apa itu Asuransi AcciCare ?"
          answer = "Asuransi kecelakaan yang mampu memberikan ketenangan dalam melakukan kegiatan sehari-hari dengan keleluasaan besaran Manfaat dan periode Asuransi sesuai dengan kebutuhan"
          />
          <AccordionFaq 
          question = "Berapa lama Masa pertanggungan AcciCare ? "
          answer = "Masa Pertanggungan/Asuransi : dapat dipilih secara Harian, Bulanan atau Tahunan"
          />
          <AccordionFaq 
          question = "Bagaimana cara pembayaran AcciCare ? "
          answer = "Cara pembayaran premi : dilakukan secara Sekaligus/Tunggal menggunakan BRIVA "
          />
          <AccordionFaq 
          question = "Berapa Usia Masuk dan Ketentuan Pembelian AcciCare ?"
          answer = "Usia Masuk : 5 s.d 64 Tahun"
          />
          <AccordionFaq 
          question = "Apakah Nasabah Boleh Melakukan Pembelian Lebih dari 1x AcciCare ? "
          answer = "Nasabah dapat memiliki lebih dari 1 polis dengan maksimal Uang Pertanggungan Rp 200.000.000"
          />
        </div>
        </div>
        <div>
          <h1 id="bantuan" className="my-6 text-lg text-start font-bold tracking-tight text-gray-900 dark:text-white">
            Bantuan
          </h1>
          <div className="flex items-start">
            <img
                className="w-[69.155px] h-[22.46px] mr-2" 
                src="../images/Insurance Card/BRI_Life_logo 1@3x.png"
            >
            </img>
            <div className="">
            <span className="text-base font-bold">
                PT Asuransi BRI Life
            </span>
            <br></br>
            <span className="text-base font-medium text-[#777777]">
            Graha Irama Jalan H. R. Rasuna Said Blok X-1 Kav 1&2, DKI Jakarta
            </span>
            </div>
          </div>
          <div className="flex flex-row gap-2 mobile:grid-cols-1 mobile:grid">
           <div className="bg-white shadow-md rounded-lg p-4 w-[204px] h-[88px] ">
        <img
        src="../images/Insurance Card/Headphone.png"
        >
        </img>
        <p className="text-[#777777] mb-4 font-medium text-base">
        1500087
        </p>
    </div>
    <div className="bg-white shadow-md rounded-lg p-4 w-[204px] h-[88px] ">
        <img
        src="../images/Insurance Card/Smartphone.png"
        >
        </img>
        <p className="text-[#777777] mb-4 font-medium text-base">
        (021) 526-1260
        </p>
    </div>
    <div className="bg-white shadow-md rounded-lg p-4 w-[204px] h-[88px] cursor-pointer">
    <a href="https://mail.google.com/mail/?view=cm&fs=1&to=cs@brilife.co.id">
        <img
        src="../images/Insurance Card/Mail.png"
        >
        </img>
        <p className="text-[#777777] mb-4 font-medium text-base">
        cs@brilife.co.id
        </p>
        </a>
    </div>
    </div>
        </div>
        <div>
          <h1 id="produk-lainnya" className="my-6 text-lg text-start font-bold tracking-tight text-gray-900 dark:text-white">
            Produk Lainnya
          </h1>
        </div>
        <div className="flex flex-wrap justify-start gap-[24px]">
        {InsuranceData.map((data, index) => {
        if (index === 0 || index === 2) {
      return <InsuranceCard key={index} data={data} index={index} />;
    } else {
      return null;
    }
  })}
</div>
      </div>
      </div>
      </div>
    <Footer />
    </div>
  );
};
export default AcciCare;