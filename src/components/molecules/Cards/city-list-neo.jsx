import React from "react";
import { Title } from "../../atoms";

// landing-page city-carousel

const CityListNeo = ({ cityName, totalProperties, imgSrc, logoCity }) => {

  let finalSentence = "";
  let nameCity = "";
  let cityLower = "";
  if (cityName?.includes("D.I. ")) {
    const pisah = cityName?.split(" ")
    const yogya = pisah[1]?.toLowerCase();
    finalSentence = pisah[0]+" "+yogya?.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase());
  } else if (cityName?.includes("DKI")) {
    const pisah = cityName?.split(" ")
    const jakarta = pisah[1]?.toLowerCase();
    cityLower = pisah[0]+" "+jakarta
    finalSentence = cityLower?.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase());
  } else if (cityName?.includes("Daerah Khusus Ibukota Jakarta")){
    nameCity = "Jakarta"
    finalSentence = "Daerah Khusus Ibukota Jakarta"
  }
  else if (cityName?.includes("Sumatera Utara")){
    nameCity = "Medan"
    finalSentence = "Medan"
  }
  else if (cityName?.includes("Sulawesi Selatan")){
    nameCity = "Makassar"
    finalSentence = "Makassar"
  }
  else if (cityName?.includes("JAWA TIMUR")){
    nameCity = "Surabaya"
    finalSentence = "Surabaya"
  }
  else if (cityName?.includes("Jawa Barat")){
    nameCity = "Bandung"
    finalSentence = "Bandung"
  }
  else {
    cityLower = cityName?.toLowerCase();
    finalSentence = cityLower?.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase());
  }
  let latitude = null;
  let longitude = null;

  if (finalSentence === "Bandung") {
    latitude = -6.914744;
    longitude = 107.609810;
  } else if (finalSentence === "Medan") {
    latitude = 3.597031;
    longitude = 98.678513;
  } else if (finalSentence === "Surabaya") {
    latitude = -7.2574719;
    longitude = 112.7520883;
  } else if (finalSentence === "Makassar") {
    latitude = -5.147665099999999;
    longitude = 119.4327314;
  } else if (finalSentence === "Daerah Khusus Ibukota Jakarta") {
    latitude = -6.1805113;
    longitude = 106.8283831;
  }

  return (
    <div onClick={() => window.location.href = `/v2/search?type=city-only&cityName=${encodeURIComponent(finalSentence)}&lat=${latitude}&lng=${longitude}`} className="landing-page city-carousel-neo__card-wrap-neo">
      <div className="landing-page city-carousel-neo__img-wrap-neo">
          <p className="text-[20px] leading-[30px] mobile:text-[10px] mobile:leading-[14px] font-bold whitespace-nowrap">{nameCity?.length > 13 ? (nameCity.slice(0, 12) + "...") : nameCity || "-"}</p>
          <p className="text-sm mobile:text-[10px] mobile:leading-[14px] text-[#666666]">
          {totalProperties} Properti
        </p>
        </div>
        <div className="landing-page city-carousel-neo__img-neo"> 
        <img
          className="object-cover"
          src={imgSrc}
          alt={cityName}
        />
        </div>
      {/* <div className="landing-page bg-[#FFFFFF]">
          <Title
            className="text-[1rem] fontcolor__black fontweight__bold mb-1 ml-2 whitespace-nowrap"
            // text={cityName?.length > 13 ? (cityName.slice(0, 12) + "...") : cityName || "-"}
            text={finalSentence?.length > 13 ? (finalSentence.slice(0, 12) + "...") : finalSentence || "-"}
          />
        <p className="ml-2 mb-1 text-[0.8rem]">
          {totalProperties} Properti
        </p>
        </div> */}
        {/* <div> 
        <img
          className="landing-page city-carousel-neo__img-neo"
          src={imgSrc}
          alt={cityName}
          style={{ width:"500px", height: "auto", objectFit:"contain"}}
        />
        </div> */}
      </div>
  );
};

export default CityListNeo;
