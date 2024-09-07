import React, {useEffect, useState} from "react";
import cookie from "hs-cookie";
import moment from "moment";
import { MdOutlineClear } from 'react-icons/md';
import DatePicker from "react-date-picker";
import { useDispatch, useSelector } from "react-redux";
import { Footer, Dropdown, Checkbox, CheckboxSalesDev, MenuItems, AccordionFaq } from "../../../components/molecules";
import { useNavigate } from "react-router-dom";
import InsuranceData from "../insuranceData.json";
import { personalDataConst } from "../../../static/personal-data/personal-data";
import { ListGroup, Breadcrumb, Accordion } from "flowbite-react";
import { ListGroupItem } from "flowbite-react/lib/esm/components/ListGroup/ListGroupItem";
import { showModalLogin } from "../../../store/actions/changeState";
import { Button, CurrencyInput, CurrencyInputCalc, LabelInputTextbox, RadioButtonWithLabel } from "../../../components/atoms";
import { InsuranceCard } from "../../../components/organisms";
import { setJangkaPerlindungan, setUangTanggungan } from "../../../store/actions/changePersonalDataState";
import AccordionFaq2 from "../../../components/molecules/Accordion/AccordionFaq2";
import { formatRupiahNumber } from "../../../helpers/string";
import { insuranceSimulasi } from "../../../store/actions/fetchData/insurancePremi";
import { StaticAsuransiBrins } from "../../../static/asuransi";

const BrinsAsri = ({handleInput, dropdownVal, setDropdownVal}) => {
  const state = useSelector((state) => state.stateReducer);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [windowSize, setWindowSeize] = useState(window.innerWidth)
  const [isPackage, setIsPackage] = useState('SILVER')
  const [errorMsg, setErrorMsg ] = useState("");
  const [simulasiData, setSimulasiData] = useState();
  const [activeSection, setActiveSection] = useState('');
  const [input, setInput] = useState()

  const handlePackage = (event) => {
    setIsPackage(event);

  };

    const handleResize = () => {
        setWindowSeize(window.innerWidth)
    }

    useEffect(() => {
        window.addEventListener('resize', handleResize)

        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, []);

    const handleChangeAsri = (value, name) => {
      setInput({
        ...input,
        [name]: { isValid: !!value, value: value},
      });
    };

    useEffect(() => {
      const hargaPerlengkapan = Number(input?.hargaPerlengkapan?.value ?? 0)
      const hargaBangunan = (input?.hargaBangunan?.value * 0.1)
      if(hargaPerlengkapan < 100000) {
        setErrorMsg('Harga Perlengkapan tidak boleh kurang dari Rp100.000')
      } else if(hargaBangunan < hargaPerlengkapan) {
        setErrorMsg('Harga Perlengkapan tidak boleh lebih dari 10% harga Bangunan')
      } else {
        setErrorMsg('')
      }
    },[input?.hargaPerlengkapan?.value, input?.hargaBangunan?.value, errorMsg])

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
      ? navigate("/asuransi/approval-insurance", {state: {name: "Brins Asri", href: "/brins-asri"}})
      : dispatch(showModalLogin(!state.showModalLogin));
    };
    const getItem = localStorage.getItem("selectedProgramId")
    const handleSimulasi = () => {
      dispatch(insuranceSimulasi({
        FIDProgram: Number(getItem),
        Package: isPackage,
        HargaBangunan: Number(input?.hargaBangunan?.value),
        HargaPerlengkapan : Number(input?.hargaPerlengkapan?.value)
      },setSimulasiData))
    };

  return (
    <div>
        <div className="px-[276px] mobile:px-[12px] pb-6">
      <div className="relative">
      <div className="gap-[4px] py-[16px]">
            <Breadcrumb>
              <span className="font-semibold text-[#1078CA] text-sm cursor-pointer" onClick={() => navigate('/') } >Home</span>
              <Breadcrumb.Item href='/insurance'><span className="font-semibold text-[#1078CA] text-sm">Asuransi</span></Breadcrumb.Item>
              <Breadcrumb.Item href='/brins-asri'><span className="font-medium text-sm text-[#777777]">Brins Asri</span></Breadcrumb.Item>
            </Breadcrumb>
          </div>
    <div className="absolute largePc:top-16 left-11 xxl:top-32">
    <div
          className={`largePc:w-[145.358px] largePc:h-[24px] largePc:ml-[16px] largePc:mt-[22px] xxl:ml-[16px] xxl:mt-[16px] md:ml-[16px] md:mt-[25px] tab:ml-[16px] tab:mt-[25px] mobile:ml-[16px] mobile:mt-[25px]`}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            zIndex: 2 // Place the background behind other elements
          }}
        >
          <img src="../images/Insurance Card/BRI_Insurance_logo@3x.png" alt="BRI Logo" />
        </div>
        <div
          className="font-bold largePc:ml-[16px] largePc:mt-[45px] xxl:ml-[16px] xxl:mt-[36px] md:ml-[16px] md:mt-[45px] tab:ml-[16px] tab:mt-[45px] mobile:ml-[16px] mobile:mt-[45px] w-[321px]"
          style={{ fontSize:"28px", lineHeight:"42px", position: "absolute", top: 0, left: 0, zIndex: 1 }}
        >
          Brins Asri
        </div>
        </div>
        <img
          src={
            windowSize <= 769
              ? "../images/Insurance Card/asri-jumbotron.png"
              : windowSize <= 1280
              ? "../images/Insurance Card/asri-jumbotron.png"
              : "../images/Insurance Card/asri-jumbotron.png"
          }
          alt="jumbotron"
          className="w-[100%] object-contain"
        />
        
      </div>
      <div className="flex flex-row gap-6 mt-10">
      <div className="mobile:hidden flex flex-col gap-3">
        <div className='flex flex-col gap-3 sticky top-16 right-0'>
         <MenuItems name={"Informasi Umum"} href={"#informasi-umum"} active={activeSection === 'informasi-umum'}/>
         <MenuItems name={"Pengajuan Premi"} href={"#pengajuan-premi"} active={activeSection === 'pengajuan-premi'}/>
         <MenuItems name={"FAQ"} href={"#faq"} active={activeSection === 'faq'}/>
         <MenuItems name={"Bantuan"} href={"#bantuan"} active={activeSection === 'bantuan'}/>
          </div>
        </div>
        <div className="flex flex-col mobile:w-full mobile:mr-[24px]">
        <div className="mb-10">
          <h1 id="informasi-umum" className="pb-3 text-lg text-start font-bold tracking-tight text-gray-900 dark:text-white">
            Informasi Umum
          </h1>
          <div className="text-base font-medium">
             <span className="text-[#777777]">
             Melindungi rumah tinggal dan properti yang ada di dalamnya dari kehilangan dan kerusakan yang disebabkan oleh risiko yang tidak terduga (yaitu: kebakaran, petir, ledakan, kejatuhan pesawat terbang, asap, dan perluasannya).
             </span>
             <br></br>
             <br/>
             <div className="mt-[12px]">
             <span className="font-bold">
             Harga Pertanggungan
             </span>
             <div className="flex flex-col gap-1 ml-3">
             <ul className="text-[#777777] mt-2 ml-1 list-disc">
             <li>Harga pertanggungan maksimal sampai dengan Rp3.000.000.000.000</li>
             </ul>
             
             <ul className="text-[#777777] mt-2 ml-1 list-disc">
             <li>Harga perlengkapan minimal RP100.000 dan maksimal 10% dari total harga bangunan (jika diisi)</li>
             </ul>
             
             </div>
             </div>
          </div>
        </div>
        <div>
          <h1 id="pengajuan-premi" className="my-6 text-lg text-start font-bold tracking-tight text-gray-900 dark:text-white">
            Pengajuan Premi
          </h1>
          <div>
            <span className="text-base font-medium text-[#777777]">
            Hitung perkiraan biaya premi untuk bantu membuat perencanaan anggaran yang tepat.
            </span>
            <div className="my-4">
            <table className="w-full text-xs font-medium">
              <thead className="">
                <tr className="bg-[#1078CA] text-white">
                  <th className="border-l p-3 text-center rounded-tl-lg ">No</th>
                  <th className="text-center">Resiko</th>
                  <th className="text-center w-[80px]">Silver</th>
                  <th className="text-center w-[80px]">Gold</th>
                  <th className="text-center w-[80px] rounded-tr-lg">Platinum</th>
                </tr>
              </thead>
              <tbody>
                      {StaticAsuransiBrins.brinsAsriTable.map((row, idx) => (
                        <tr key={idx} className="bg-[#F8F9F9]">
                          <td className="border-l text-center border-b">{idx+1}</td>
                          <td className="p-3 text-left border-b">{row.resiko}</td>
                          <td className="text-center border-b"><input name="packageSilver" disabled={!row.silver} checked={row.silver} type="checkbox" className={`checkbox__checker`}/></td>
                          <td className="text-center border-b"><input name="packageGold" disabled={!row.gold} checked={row.gold} type="checkbox" className={`checkbox__checker`}/></td>
                          <td className="text-center border-b border-r"><input name="packagePlatinum" disabled={!row.platinum} checked={row.platinum} type="checkbox" className={`checkbox__checker`}/></td>
                        </tr>
                      ))}
                    </tbody>
            </table>
          </div>
          <span className="font-medium text-[#292929] text-[12px]">Pilihan Paket*</span>
          <div className="flex flex-row gap-12 mb-4 text-sm">
          <div className="flex flex-col gap-2">
                  <RadioButtonWithLabel
                   text="Silver"
                   name="SILVER"
                   checkColor="blueFigma"
                   onChange={(e) => handlePackage(e.target.name)}
                   checked={isPackage === "SILVER"}
                  />
                  </div>
                  <div className="flex flex-col gap-2">
                  <RadioButtonWithLabel
                   text="Gold"
                   name="GOLD"
                   checkColor="blueFigma"
                   onChange={(e) => handlePackage(e.target.name)}
                   checked={isPackage === "GOLD"}
                  />
                  </div>
                  <div className="flex flex-col gap-2">
                  <RadioButtonWithLabel
                   text="Platinum"
                   name="PLATINUM"
                   checkColor="blueFigma"
                   onChange={(e) => handlePackage(e.target.name)}
                   checked={isPackage === "PLATINUM"}
                  />
                  </div>
            </div>
            <div className="grid grid-cols-2 gap-4 mobile:grid-cols-1 pb-4">
                  <div>
                    <div className="mb-2">
                      <LabelInputTextbox text="Harga Bangunan*" />
                    </div>
                    <div>
                    <CurrencyInputCalc
                      className="textbox-label__currency"
                      name="hargaBangunan"
                      placeholder="0"
                      decimalsLimit={2}
                      groupSeparator="."
                      decimalSeparator=","
                      maxLength={16}
                      allowNegativeValue={false}
                      value={input?.hargaBangunan?.value}
                      onValueChange={(value) => handleChangeAsri(value, "hargaBangunan" || 0)}
                    />
                    </div>
                  </div>
                  <div>
                    <div className="mb-2">
                      <LabelInputTextbox text="Harga Perlengkapan*" />
                    </div>
                    <div>
                    <CurrencyInputCalc
                      className="textbox-label__currency"
                      name="hargaPerlengkapan"
                      placeholder="0"
                      decimalsLimit={2}
                      groupSeparator="."
                      decimalSeparator=","
                      maxLength={16}
                      allowNegativeValue={false}
                      value={input?.hargaPerlengkapan?.value}
                      onValueChange={(value) => handleChangeAsri(value, "hargaPerlengkapan" || 0)}
                    />
                    {errorMsg !== '' && <p className="text-[#F04438] text-[12px] font-semibold">{errorMsg}</p>}
                    </div>
                  </div>
                </div>
                <div className="mt-4 flex flex-wrap justify-between" style={{ backgroundColor: '#DDEFFC', borderRadius: '12px', padding: '16px' }}>
                  <span className="font-semibold text-base grid grid-rows-2">
                      Estimasi Premi
                      <div className="flex flex-row gap-1">
                        <p className="text-[20px] font-bold text-[#1078CA]">{formatRupiahNumber(simulasiData?.NominalPremi ?? 0)}</p>
                        <p className="font-medium text-md text-[#777777]">/tahun</p>
                      </div>
                  </span>
                  <button
                    className="flex flex-row bg-[#ffff] border-2 border-[#1078CA] justify-center items-center rounded-lg p-4 h-12 "
                    onClick={handleSimulasi}
                  ><img src="/icons/small-icons/calculator.svg" className="mr-1"/><p className="text-[#1078CA] font-bold text-base">Hitung Estimasi Premi</p></button>
                </div>
                <button
                    className="font-semibold mt-4 h-14 text-[#ffff] bg-[#1078CA] w-full rounded-lg"
                    onClick={handleNavigate}
                    paddingSize={"padding-0"}
                  >Lewati dan Ajukan Asuransi</button>
          </div>
        </div>
        <div className="mb-3 mt-10">
          <h1 id="faq" className=" text-lg text-start font-bold tracking-tight text-gray-900 dark:text-white">FAQ</h1>
          <div className="flex flex-col gap-4 w-full">
          <AccordionFaq2 question="Apa saja manfaat yang diberikan dari Asuransi BRINS ASRI?" >
                  <span className="text-base text-[#292929]">
                    <p>Asuransi BRINS ASRI memberikan manfaat perlindungan menyeluruh untuk rumah Anda dan penghuninya. Berikut beberapa manfaat utama yang ditawarkan:</p>
                    <br />
                    <p className="font-bold">1. Perlindungan Terhadap Kebakaran dan Bencana Alam:</p>
                    <li>Melindungi rumah Anda dari kerusakan akibat kebakaran, petir, ledakan, jatuhnya pesawat terbang, asap, dan bencana alam seperti gempa bumi, letusan gunung berapi, tsunami, angin topan, badai, banjir, kerusuhan, huru-hara, terorisme, dan sabotase.</li>
                    <p className="font-bold">2. Perlindungan Kecelakaan Diri:</p>
                    <ul className="list-disc ml-3 pl-3">
                      <li>Memberikan santunan atas risiko kematian, cacat tetap, biaya perawatan dan/atau pengobatan medis yang diakibatkan oleh kecelakaan yang terjadi di rumah Anda.</li>
                    </ul>
                    <p className="font-bold">3. Bantuan Sewa Rumah:</p>
                    <li>Jika rumah Anda mengalami kebakaran dan tidak layak dihuni, BRINS ASRI akan memberikan bantuan sewa rumah untuk sementara waktu.</li>
                    <p className="font-bold">4. Tanggung Jawab Hukum Kepada Pihak Ketiga:</p>
                    <li>Melindungi Anda dari tuntutan hukum pihak ketiga akibat kecelakaan, kebakaran, dan kerusakan lain yang terjadi di rumah Anda.</li>
                  </span>
                </AccordionFaq2>
        </div>
        </div>
        <div>
              <h1 id="bantuan" className="my-6 text-lg text-start font-bold tracking-tight text-gray-900 dark:text-white">Bantuan</h1>
              <div className="flex items-start mb-3 gap-2">
                <img
                    className="w-[80px] h-[80px] object-contain" 
                    src="../images/Insurance Card/BRI_Insurance_logo@3x.png"
                />
                <div className="flex flex-col my-auto">
                  <span className="text-base font-bold">PT BRI Asuransi Indonesia</span>
                  <span className="text-base font-medium text-[#777777]">Jl. Mampang Prapatan Raya No. 18, Jakarta Selatan , DKI Jakarta , 12790 </span>
                </div>
              </div>
              <div className="flex flex-row gap-2 mobile:grid-cols-1 mobile:grid">
                <div className="bg-white shadow-md rounded-lg p-4 w-[204px] h-[88px] ">
                  <img src="../images/Insurance Card/Headphone.png" />
                  <p className="text-[#777777] mb-4 font-medium text-base">14081</p>
                </div>
                <div className="bg-white shadow-md rounded-lg p-4 w-[204px] h-[88px] ">
                    <img src="../images/Insurance Card/Smartphone.png" />
                    <p className="text-[#777777] mb-4 font-medium text-base">(62)8118014081</p>
                </div>
                <div className="bg-white shadow-md rounded-lg p-4 w-[204px] h-[88px] cursor-pointer">
                  <a href="https://mail.google.com/mail/?view=cm&fs=1&to=callbrins@brins.co.id">
                    <img src="../images/Insurance Card/Mail.png" />
                    <p className="text-[#777777] mb-4 font-medium text-base">callbrins@brins.co.id</p>
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
        if (index === 4 || index === 5) {
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
export default BrinsAsri;