import React, {useEffect, useState} from "react";
import cookie from "hs-cookie";
import moment from "moment";
import { MdOutlineClear } from 'react-icons/md';
import DatePicker from "react-date-picker";
import { useDispatch, useSelector } from "react-redux";
import { Footer, Dropdown, Checkbox, MenuItems, AccordionFaq } from "../../../components/molecules";
import { useNavigate } from "react-router-dom";
import InsuranceData from "../insuranceData.json";
import { personalDataConst } from "../../../static/personal-data/personal-data";
import { ListGroup, Breadcrumb, Accordion } from "flowbite-react";
import { ListGroupItem } from "flowbite-react/lib/esm/components/ListGroup/ListGroupItem";
import { showModalLogin } from "../../../store/actions/changeState";
import { Button, CurrencyInput } from "../../../components/atoms";
import { InsuranceCard } from "../../../components/organisms";

const BrinsSepeda = ({handleInput, dropdownVal, setDropdownVal}) => {
  const state = useSelector((state) => state.stateReducer);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [windowSize, setWindowSeize] = useState(window.innerWidth)

    const handleResize = () => {
        setWindowSeize(window.innerWidth)
    }

    const [isGold, setIsGold] = useState(false);
    const [isSilver, setIsSilver] = useState(false);
    const [isplatinum, setIsPlatinum] = useState(false);
  
    const handleRadioChange = (event) => {
      setIsGold(event.target.value === 'gold');
      setIsSilver(event.target.value === 'silver');
      setIsPlatinum(event.target.value === 'platinum');
    };

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
      <Breadcrumb.Item href='/asuransi-sepeda'>
      <span className="text-sm">
          Asuransi Sepeda
          </span>
      </Breadcrumb.Item>
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
          Asuransi Sepeda
        </div>
        </div>
        <img
          src={
            windowSize <= 769
              ? "../images/Insurance Card/sepeda-jumbotron.png"
              : windowSize <= 1280
              ? "../images/Insurance Card/sepeda-jumbotron.png"
              : "../images/Insurance Card/sepeda-jumbotron.png"
          }
          alt="jumbotron"
          className="w-[100%] object-contain"
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
             Asuransi yang memberikan ganti rugi kepada Tertanggung terhadap kerugian atas dan / atau kerusakan pada sepeda dan / atau kepentingan yang dipertanggungkan
             </span>
             <br></br>
             <br></br>
             <span className="text-[#777777]">
             ASURANSI SEPEDA adalah produk asuransi yang diterbitkan oleh PT. BRI Asuransi Indonesia. Produk ini bukan merupakan produk PT. Bank Rakyat Indonesia (Persero), Tbk. tidak mengandung kewajiban apapun dan tidak dijamin oleh PT. Bank Rakyat Indonesia (Persero) Tbk. serta tidak termasuk dalam program penjaminan pemerintah Republik Indonesia. PT. Bank Rakyat Indonesia (Persero), Tbk. tidak bertanggung jawab atas polis asuransi yang diterbitkan oleh PT. BRI Asuransi Indonesia, sehubungan dengan produk ASURANSI SEPEDA tersebut. Penggunaan logo PT. Bank Rakyat Indonesia (Persero), Tbk. adalah atas dasar persetujuan dari PT. Bank Rakyat Indonesia (Persero), Tbk. sebagai wujud kerjasama antara PT. Bank Rakyat Indonesia (Persero), Tbk. dengan PT. BRI Asuransi Indonesia dalam penawaran produk ASURANSI SEPEDA. PT. Bank Rakyat Indonesia (Persero), Tbk. bukan agen PT. BRI Asuransi Indonesia maupun broker di nasabah maupun broker PT. Bank Rakyat Indonesia (Persero), Tbk
             </span>
             <br/>
             <div className="mt-[12px]">
             <span className="font-bold">
             Manfaat
             </span>
             <div className="flex flex-col gap-1 ml-3">
             <ul className="text-[#777777] mt-2 ml-1 list-disc">
             <li>Harga Sepeda Maksimal s.d. Rp200.000.000</li>
             </ul>
             
             <ul className="text-[#777777] mt-2 ml-1 list-disc">
             <li>Harga Sepeda Minimal Rp5.000.000</li>
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
            Yuk coba simulasi di bawah ini dan ajukan premi sekarang
            </span>
            <div className="my-4">
            <table className="w-full text-xs font-medium">
              <thead className="">
                <tr className="bg-[#00529C] text-white">
                  <th className="border-l p-3 text-center rounded-tl-lg ">No</th>
                  <th className="text-center">Resiko</th>
                  <th className="text-center">Silver</th>
                  <th className="text-center">Gold</th>
                  <th className="text-center rounded-tr-lg">Platinum</th>
                </tr>
              </thead>
              <tbody className="">
                <tr className="bg-[#F8F9F9]">
                  <td className="border-l text-center border-b">1</td>
                  <td className="p-3 text-left border-b">Kerugian total</td>
                  <td className="text-center border-b"><Checkbox checked={true} /></td>
                  <td className="text-center border-b"><Checkbox checked={true} /></td>
                  <td className="text-center border-b border-r"><Checkbox checked={true} /></td>
                </tr>
                <tr className="bg-[#F8F9F9]">
                <td className="border-l text-center border-b">2</td>
                  <td className="p-3 text-left border-b">Pencurian dengan kekerasan</td>
                  <td className="text-center border-b"><Checkbox checked={true} /></td>
                  <td className="text-center border-b"><Checkbox checked={true} /></td>
                  <td className="text-center border-b border-r"><Checkbox checked={true} /></td>
                </tr>
                <tr className="bg-[#F8F9F9]" >
                <td className="border-l text-center border-b">3</td>
                  <td className="p-3 text-left border-b">Bencana alam</td>
                  <td className="text-center border-b"><Checkbox disabled={true}/></td>
                  <td className="text-center border-b"><Checkbox checked={true} /></td>
                  <td className="text-center border-b border-r"><Checkbox checked={true} /></td>
                </tr>
                <tr className="bg-[#F8F9F9]">
                <td className="border-l text-center border-b">4</td>
                  <td className="p-3 text-left border-b">Kerusuhan dan huru hara</td>
                  <td className="text-center border-b"><Checkbox disabled={true} /></td>
                  <td className="text-center border-b"><Checkbox disabled={true}  /></td>
                  <td className="text-center border-b border-r"><Checkbox checked={true} /></td>
                </tr>
                <tr className="bg-[#F8F9F9]" >
                <td className="border-l text-center border-b">5</td>
                  <td className="p-3 text-left border-b">Terorisme dan sabotase</td>
                  <td className="text-center border-b"><Checkbox disabled={true}/></td>
                  <td className="text-center border-b"><Checkbox disabled={true}  /></td>
                  <td className="text-center border-b border-r"><Checkbox checked={true} /></td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="flex flex-row gap-2 mb-4 text-sm" style={{maxWidth: '660px'}}>
        <div className="flex flex-col w-full gap-2">
        <label>
          <input
            type="radio"
            name="radioButton"
            value="silver"
            checked={true}
            onChange={handleRadioChange}
            className="mr-[8px]"
          />
          Silver
        </label>
        </div>
        <div className="flex flex-col w-full gap-2">
        <label>
          <input
            type="radio"
            name="radioButton"
            value="gold"
            checked={true}
            onChange={handleRadioChange}
            className="mr-[8px]"
          />
          Gold
        </label>
        </div>
        <div className="flex flex-col w-full gap-2">
        <label>
          <input
            type="radio"
            name="radioButton"
            value="platinum"
            checked={true}
            onChange={handleRadioChange}
            className="mr-[8px]"
          />
          Platinum
        </label>
        </div>
      </div>
            <div className="grid mobile:grid-cols-1 text-xs mb-11" style={{maxWidth: '660px'}}>
        <div className="">
         <CurrencyInput 
         topLabel="Harga Sepeda"
         className="textbox-label__currency"
         placeholder="0"
         decimalsLimit={2}
         groupSeparator="."
         decimalSeparator=","
         maxLength={14}
         allowNegativeValue={false}
         allowDecimals={false}
         />
        </div>
             </div>
             <div className="mt-4 flex flex-wrap justify-between" style={{ backgroundColor: '#DDEFFC', borderRadius: '12px', padding: '16px', maxWidth:'560px'  }}>
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
          <h1 id="FAQ" className="my-6 text-lg text-start font-bold tracking-tight text-gray-900 dark:text-white">
            FAQ
          </h1>
          <div className="flex flex-col gap-4 max-w-[660px]">
          <AccordionFaq
          question = "Apa saja manfaat yang diberikan dari Asuransi Sepeda?"
          answer = " Asuransi Sepeda memberikan manfaat atas risiko: Tabrakan, benturan, tergelincir, terjatuh dari jalan maupun berada di atas alat angkut untuk penyeberangan yang berada di bawah pengawasan Direktorat Jenderal Perhubungan Darat, Laut dan Udara"
          />
          <AccordionFaq
          question = " Apa itu Paket Silver dalam BRINS SEPEDA? "
          answer = " Berikut adalah risiko yang dijamin dari perlindungan Kerugian total dan Pencurian dengan kekerasan"
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
                src="../images/Insurance Card/BRI_Insurance_logo@3x.png"
            >
            </img>
            <div className="">
            <span className="text-base font-bold">
                PT BRI Asuransi Indonesia
            </span>
            <br></br>
            <span className="text-base font-medium text-[#777777]">
            Jl. Mampang Prapatan Raya No. 18, Jakarta Selatan , DKI Jakarta , 12790 
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
        14081
        </p>
    </div>
    <div className="bg-white shadow-md rounded-lg p-4 w-[204px] h-[88px]">
        <img
        src="../images/Insurance Card/Smartphone.png"
        >
        </img>
        <p className="text-[#777777] mb-4 font-medium text-base">
        (62)8118014081
        </p>
    </div>
    <div className="bg-white shadow-md rounded-lg p-4 w-[204px] h-[88px] cursor-pointer">
    <a href="https://mail.google.com/mail/?view=cm&fs=1&to=callbrins@brins.co.id">
        <img
        src="../images/Insurance Card/Mail.png"
        >
        </img>
        <p className="text-[#777777] mb-4 font-medium text-base">
        callbrins@brins.co.id
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
        if (index === 3 || index === 4) {
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
export default BrinsSepeda;