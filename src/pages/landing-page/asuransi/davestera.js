import React, {useEffect, useState} from "react";
import cookie from "hs-cookie";
import { useDispatch, useSelector } from "react-redux";
import { Dropdown } from 'flowbite-react';
import { AccordionFaq, Footer, MenuItems } from "../../../components/molecules";
import { useNavigate } from "react-router-dom";
import InsuranceData from "../insuranceData.json";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { ListGroup, Breadcrumb, Accordion } from "flowbite-react";
import { ListGroupItem } from "flowbite-react/lib/esm/components/ListGroup/ListGroupItem";
import { showModalLogin } from "../../../store/actions/changeState";
import { Button } from "../../../components/atoms";
import { InsuranceCard, SnackBar } from "../../../components/organisms";
import Snackbar from "../../../components/organisms/Modal/modal-types/SnackBar/Component";

const Davestera = () => {
  const state = useSelector((state) => state.stateReducer);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [windowSize, setWindowSeize] = useState(window.innerWidth)

    const handleResize = () => {
        setWindowSeize(window.innerWidth)
    }

    useEffect(() => {
        window.addEventListener('resize', handleResize)

        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, []);

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
  
      const sections = document.querySelectorAll('h1[id]');
      sections.forEach(section => observer.observe(section));
  
      return () => observer.disconnect();
    }, []);

    const handleNavigate = () => {
      cookie.get("morgateCookie")
      ? navigate("/asuransi/approval-insurance", {state: {name : "BRI Life - Davestera", href : "/davestera"}})
      : dispatch(showModalLogin(!state.showModalLogin));
    };

  return (
    <div className="pt-7">
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
      <Breadcrumb.Item href='/davestera'>
      <span className="text-sm">
          BRI Life - Davestera
          </span>
      </Breadcrumb.Item>
    </Breadcrumb>
    </div>
    {/* <Snackbar message="Berhasil mengajukan asuransi, Anda akan segera dihubungi oleh pihak asuransi" /> */}
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
          Davestera
        </div>
        </div>
        <img
          src={
            windowSize <= 769
              ? "../images/Insurance Card/davestera-jumbotron.png"
              : windowSize <= 1280
              ? "../images/Insurance Card/davestera-jumbotron.png"
              : "../images/Insurance Card/davestera-jumbotron.png"
          }
          alt="jumbotron"
          className="w-[100%] object-contain"
          style={{            
            position: "relative",
            zIndex: 0
            }}
        />
        
      </div>
      <div className="flex flex-row">
      <div className="mobile:hidden flex flex-col gap-3 pt-8">
      <div className='flex flex-col gap-3 sticky top-16 right-0'>
         <MenuItems name={"Informasi Umum"} href={"#informasi-umum"} active={activeSection === 'informasi-umum'}/>
         <MenuItems name={"Pengajuan Premi"} href={"#pengajuan-premi"} active={activeSection === 'pengajuan-premi'}/>
         <MenuItems name={"FAQ"} href={"#faq"} active={activeSection === 'faq'}/>
         <MenuItems name={"Bantuan"} href={"#bantuan"} active={activeSection === 'bantuan'}/>
          </div>
        </div>
        <div className="flex flex-col mt-5 px-6 mobile:w-full mobile:mr-[24px]">
        <div>
          <h1 id="informasi-umum" className="my-6 text-lg text-start font-bold tracking-tight text-gray-900 dark:text-white">
            Informasi Umum
          </h1> 
          <div className="text-base font-medium">
             <span className="text-[#777777]">
             Davestera adalah program asuransi unit link yang memberikan proteksi sekaligus mengoptimalkan dana investasi kita.
             </span>
             <br></br>
             <br></br>
             <br/>
             <div className="mt-[12px]">
             <span className="font-bold">
             Manfaat
             </span>
             <div className="flex flex-col gap-1 ml-3">
             <ul className="text-[#777777] mt-2 ml-1 list-disc">
             <li>Meninggal dalam masa asuransi sebesar 100% JUP + Nilai Investasi</li>
             </ul>
    
             <ul className="text-[#777777] mt-2 ml-1 list-disc">
             <li>Hidup pada akhir kontrak sebesar Nilai Investasi akhir kontrak</li>
             </ul>
             
             <ul className="text-[#777777] mt-2 ml-1 list-disc">
             <li>Mengundurkan diri dalam masa asuransi sebesar Nilai Investasi saat mengundurkan diri</li>
             </ul>
             </div>
             </div>
          </div>
        </div>
        <div>
          {/* <h1 id="pengajuan-premi" className="my-6 text-lg text-start font-bold tracking-tight text-gray-900 dark:text-white">
            Pengajuan Premi
          </h1> */}
          <div>
            <h1 id="pengajuan-premi" ></h1>
             <div className="mt-4 flex flex-wrap justify-between" style={{ backgroundColor: '#DDEFFC', borderRadius: '12px', padding: '16px', maxWidth:'660px'  }}>
             <div className="grid grid-cols-1 gap-2">
                <span className="font-bold text-xl">
                    Pengajuan Premi
                </span>
                <span className="text-base font-medium text-[#777777]">
                  Yuk ajukan premi sekarang
                </span>
                </div>
                <div className="p-4 max-h-12 ">
                <Button
                buttonColor="bluefigma"
                textColor="white"
                fullWidth={false}
                onClick={handleNavigate}
                >
                Ajukan Sekarang
                </Button>
                </div>
             </div>
          </div>
        </div>
        <div>
          <h1 id="faq" className="my-6 text-lg text-start font-bold tracking-tight text-gray-900 dark:text-white">
            FAQ
          </h1>
          <div className="flex flex-col gap-4 max-w-[660px]">
          <AccordionFaq 
          question = "Apa saja keunggulan asuransi Davestera ?"
          answer = "Biaya akuisisi yang sangat kompetitif, hanya 150% (tahun 1: 40%, tahun 2: 40%, tahun 3: 40%, tahun 4: 20%, tahun 5: 10%), rata-rata industri sebesar 185%-215% dan Bebas memilih Manfaat tambahan sesuai dengan kebutuhan"
          />
        </div>
        </div>
        <div className="mb-8">
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
          <div className="flex flex-row gap-2 mobile:grid-cols-1 mobile:grid mt-3">
           <div className="border-[1px] border-[#D3D4D4] rounded-lg p-4 w-[204px] h-[88px] ">
        <img
        src="../images/Insurance Card/Headphone.png"
        >
        </img>
        <p className="text-[#777777] mb-4 font-medium text-base">
        1500087
        </p>
    </div>
    <div className="border-[1px] border-[#D3D4D4] rounded-lg p-4 w-[204px] h-[88px] ">
        <img
        src="../images/Insurance Card/Smartphone.png"
        >
        </img>
        <p className="text-[#777777] mb-4 font-medium text-base">
        (021) 526-1260
        </p>
    </div>
    <div className="border-[1px] border-[#D3D4D4] rounded-lg p-4 w-[204px] h-[88px] cursor-pointer">
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
        {/* <div>
          <h1 id="produk-lainnya" className="my-6 text-lg text-start font-bold tracking-tight text-gray-900 dark:text-white">
            Produk Lainnya
          </h1>
        </div>
        <div className="flex flex-wrap justify-start gap-[24px]">
        {InsuranceData.map((data, index) => {
        if (index === 0 || index === 1) {
      return <InsuranceCard key={index} data={data} index={index} />;
    } else {
      return null;
    }
  })}
</div> */}
      </div>
      </div>
      </div>
    <Footer />
    </div>
  );
};
export default Davestera;