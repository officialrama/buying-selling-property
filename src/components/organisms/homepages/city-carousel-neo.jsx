import React, { useEffect } from "react";
import Carousel from "react-grid-carousel";
import { CityList, CityListNeo } from "../../molecules";

const CityCarouselNeo = ({ dataMap }) => {
  let isMobile = false;
  const allowCity = ["Sumatera Utara", "Daerah Khusus Ibukota Jakarta", "Jawa Barat", "Sulawesi Selatan", "JAWA TIMUR"];
  useEffect(() => {
    isMobile = window.innerWidth <= 768;
  }, [window.innerWidth]);
  
  return (
    <div className="landing-page city-carousel-neo relative">
      <Carousel cols={isMobile ? 3 : 5} rows={1} gap={isMobile ? 1 : 24} mobileBreakpoint={280} >
      {dataMap?.map((data, idx) => {
          if (allowCity.includes(data[0])) {
            return (
              <Carousel.Item key={idx}>
                <CityListNeo
                  cityName={data[0]}
                  totalProperties={data[1]}
                  imgSrc={
                    data[0] === "Daerah Khusus Ibukota Jakarta"
                      ? "/images/logo city/jakarta.png"
                      : data[0] === "Sumatera Utara"
                      ? "/images/logo city/medan.png"
                      : data[0] === "Sulawesi Selatan"
                      ? "/images/logo city/makassar.png"
                      : data[0] === "JAWA TIMUR"
                      ? "/images/logo city/surabaya.png"
                      : data[0] === "Jawa Barat"
                      ? "/images/logo city/bandung.png"
                      : ""
                  }
                />
              </Carousel.Item>
            );
          }
          return null;
        })}
      </Carousel>
    </div>
    //   <CityListNeo
    //   key={idx}
    //   cityName={data[0]}
    //   totalProperties={data[1]}
    //   imgSrc={(data[0] === "DKI JAKARTA" ? ("/images/logo city/jakarta.png") : 
    //            data[0] === "Jakarta" ? ("/images/logo city/jakarta.png") :
    //            data[0] === "Daerah Khusus Ibukota Jakarta" ? ("/images/logo city/jakarta.png") :
    //            data[0] === "Daerah Istimewa Yogyakarta" ? ("/images/logo city/yogyakarta.png") :
    //            data[0] === "D.I. YOGYAKARTA" ? ("/images/logo city/yogyakarta.png") :
    //            data[0] === "D I YOGYAKARTA" ? ("/images/logo city/yogyakarta.png") :
    //            data[0] === "Special Region of Yogyakarta" ? ("/images/logo city/yogyakarta.png") :
    //            data[0] === "Bali" ? ("/images/logo city/bali.png") :
    //            data[0] === "Jambi" ? ("/images/logo city/jambi.png") :
    //            data[0] === "West Sumatra" ? ("/images/logo city/padang.png") :
    //            data[0] === "Sumatera Barat" ? ("/images/logo city/padang.png") :
    //            data[0] === "West Nusa Tenggara" ? ("/images/logo city/west-nusa-tenggara.png") :
    //            data[0] === "NUSA TENGGARA BARAT" ? ("/images/logo city/west-nusa-tenggara.png") :
    //            data[0] === "South Sulawesi" ? ("/images/logo city/sulawesi-utara.png") :
    //            data[0] === "SULAWESI UTARA" ? ("/images/logo city/sulawesi-utara.png") :
    //            data[0] === "Sulawesi Selatan" ? ("/images/logo city/sulawesi-tengah.png") :
    //            data[0] === "Sulawesi Tengah" ? ("/images/logo city/sulawesi-tengah.png") :
    //            data[0] === "Papua" ? ("/images/logo city/papua.png") :
    //            data[0] === "Papua Barat" ? ("/images/logo city/papua.png") :
    //            data[0] === "Papua" ? ("/images/logo city/papua.png") :
    //            data[0] === "JAWA TIMUR" ? ("/images/logo city/jawa Timur.png") :
    //            data[0] === "East Java" ? ("/images/logo city/jawa Timur.png") :
    //            data[0] === "North Sumatra" ? ("/images/logo city/medan.png") : 
    //            data[0] === "Sumatera Utara" ? ("/images/logo city/medan.png") :  
    //            data[0] === "Sumatera Utara" ? ("/images/logo city/medan.png") :
    //            data[0] === "Jawa Tengah" ? ("/images/logo city/jawa tengah.png") :
    //            data[0] === "Central Java" ? ("/images/logo city/jawa tengah.png") :
    //            data[0] === "Bengkulu" ? ("/images/logo city/bengkulu.png") :
    //            data[0] === "West Java" ? ("/images/logo city/jawa-barat.png") : 
    //            data[0] === "Jawa Barat" ? ("/images/logo city/jawa-barat.png") : 
    //            data[0] === "Banten" ? ("/images/logo city/banten.png") : 
    //            data[0] === "Riau" ? ("/images/logo city/riau.png") :  
    //            data[0] === "NUSA TENGGARA TIMUR" ? ("/images/logo city/ntt.png") :  
    //            data[0] === "East Nusa Tenggara" ? ("/images/logo city/ntt.png") :  
    //            data[0] === "Kalimantan Barat" ? ("/images/logo city/kalimantan barat.png") :  
    //            data[3])
              
    //          }
    //  // data[0] === "DKI JAKARTA" && "JAKARTA" ? ("/images/logo city/jakarta.png") : data[3]
    // />
  );
};

export default CityCarouselNeo;
