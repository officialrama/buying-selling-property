import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";

const InsuranceCard = ({ data, index }) => {
  const isIndex0To2 = index >= 0 && index <= 2;
  const isIndex3To5 = index >= 3;

  return (
    <div
      className="bg-white rounded-lg items-center text-center font-bold"
      style={{ position: "relative" }}
    >
      <a href={data.linkInsurance} rel="noopener noreferrer" className="cursor-pointer">
        <div
          className="largePc:ml-[16px] largePc:mt-[45px] xxl:ml-[16px] xxl:mt-[36px] md:ml-[16px] md:mt-[45px] tab:ml-[16px] tab:mt-[45px] mobile:ml-[16px] mobile:mt-[45px]"
          style={{ position: "absolute", top: 0, left: 0, zIndex: 1 }}
        >
          {data.namaInsurance}
        </div>
        <LazyLoadImage
          src={data.logoInsurance}
          alt={data.namaInsurance}
          style={{
            width: "204px",
            height: "204px",
            objectFit: "contain",
            position: "relative",
            zIndex: 0
          }}
        />
        <div
          className={`largePc:ml-[16px] largePc:mt-[22px] xxl:ml-[16px] xxl:mt-[16px] md:ml-[16px] md:mt-[25px] tab:ml-[16px] tab:mt-[25px] mobile:ml-[16px] mobile:mt-[25px]  ${
            isIndex0To2
              ? "w-[62px] h-[20px]"
              : isIndex3To5
              ? "largePc:w-[60%] xl:w-[60%] lg:w-[60%] largePc:h-[22px] xxl:w-[34%] md:w-[30%] tab:w-[30%] mobile:w-[30%]"
              : ""
          }`}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            zIndex: 2 // Place the background behind other elements
          }}
        >
          <img src={data.briLogo} alt="BRI Logo" />
        </div>
      </a>
      <br />
    </div>
  );
};

export default InsuranceCard;
