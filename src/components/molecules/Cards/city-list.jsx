import React from "react";
import { Title } from "../../atoms";

// landing-page city-carousel

const CityList = ({ cityName, totalProperties, imgSrc }) => {

  let finalSentence = "";
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
  } else {
    cityLower = cityName?.toLowerCase();
    finalSentence = cityLower?.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase());
  }
  
  return (
    <div onClick={() => window.location.href = `/v2/search?type=city-only&cityName=${cityName}`} className="landing-page city-carousel__card-wrap">
      <div className="landing-page city-carousel__img-wrap">
        <img
          className="landing-page city-carousel__img"
          src={imgSrc}
          alt={cityName}
        />
      </div>
      <div className="landing-page city-carousel__desc-wrap">
        <div className="landing-page city-carousel__title">
          <Title
            className="fontsize__medium fontcolor__white fontweight__semibold mb-10 whitespace-nowrap"
            // text={cityName?.length > 13 ? (cityName.slice(0, 12) + "...") : cityName || "-"}
            text={finalSentence?.length > 13 ? (finalSentence.slice(0, 12) + "...") : finalSentence || "-"}
          />
        </div>
        <p className="landing-page city-carousel__prop-number">
          {totalProperties} Properti
        </p>
      </div>
    </div>
  );
};

export default CityList;
