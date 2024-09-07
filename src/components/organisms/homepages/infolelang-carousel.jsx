import React, { useEffect, useState } from "react";
import Carousel from "react-grid-carousel";
import { InfolelangList, PropertyList } from "../../molecules";

const InfolelangCarousel = ({ property, is360 = false }) => {
  let isMobile = false;
  const [ imgCount, setImgCount ] = useState();
  useEffect(() => {
    isMobile = window.innerWidth <= 768;
  }, [window.innerWidth]);

  useEffect(() => {
    setImgCount({
      ...imgCount,
      current: 1,
      total: is360 ? 3 : 4
    });
  }, []);

  function incrementCount() {
    if (imgCount.current === imgCount.total) {
      setImgCount({ ...imgCount, current: 1 });
    } else {
      setImgCount({ ...imgCount, current: imgCount.current + 1 });
    }
  }

  function decrementCount() {
    if (imgCount.current === 1) {
      setImgCount({ ...imgCount, current: imgCount.total });
    } else {
      setImgCount({ ...imgCount, current: imgCount.current - 1 });
    }
  }

  const LeftNavigation = () => {
    return (
      <div className={`${is360 ? "navLeft360" : "navLeft"} ${imgCount?.current === 1 ? "pointer-events-none" : ""} ${is360 ? "" : "tab:left-[86%] smallPc:left-[86%] xxl:left-[92%]"} `} onClick={decrementCount}>
        <div className={`rounded-full w-8 h-8 flex justify-center items-center ${imgCount?.current === 1 ? "bg-[#EAEBEB]" : "bg-[#DDEFFC]"}`}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M15.8081 4.19865C16.0666 4.46086 16.0636 4.88296 15.8013 5.14144L9.67713 11.1785C9.21874 11.6303 9.21874 12.3697 9.67713 12.8215L15.8013 18.8586C16.0636 19.117 16.0666 19.5391 15.8081 19.8013C15.5496 20.0636 15.1275 20.0666 14.8653 19.8081L8.7411 13.7711C7.75297 12.797 7.75297 11.203 8.7411 10.2289L14.8653 4.19189C15.1275 3.93342 15.5496 3.93644 15.8081 4.19865Z" fill={imgCount?.current === 1 ? "#B5B6B6" : "#1078CA"}/>
          </svg>
        </div>
      </div>
    );
  };

  const RightNavigation = () => {
    return (
      <div className={`${is360 ? "navRight360" : "navRight"} navRight ${imgCount?.current === imgCount?.total ? "pointer-events-none" : ""}`} onClick={incrementCount}>
        <div className={`rounded-full w-8 h-8 flex justify-center items-center ${imgCount?.current === imgCount?.total ? "bg-[#EAEBEB]" : "bg-[#DDEFFC]"}`}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M8.19189 19.8013C7.93342 19.5391 7.93644 19.117 8.19865 18.8586L14.3229 12.8215C14.7813 12.3697 14.7813 11.6303 14.3229 11.1785L8.19865 5.14144C7.93644 4.88296 7.93342 4.46086 8.19189 4.19865C8.45037 3.93644 8.87247 3.93342 9.13468 4.1919L15.2589 10.2289C16.247 11.203 16.247 12.797 15.2589 13.7711L9.13468 19.8081C8.87247 20.0666 8.45037 20.0636 8.19189 19.8013Z" fill={imgCount?.current === imgCount?.total  ? "#B5B6B6" : "#1078CA"}/>
          </svg>
        </div>
      </div>
    );
  };

  return (
    <div className="landing-page city-carousel relative">
      <Carousel
        cols={isMobile ? 1 : 4}
        rows={1}
        gap={2}
        // arrowLeft={<LeftNavigation />}
        // arrowRight={<RightNavigation />}
        loop
      >
        {property?.map((props, idx) => (
          <Carousel.Item key={idx}>
            <InfolelangList
              index={idx}
              data={props}
              isVirtual={props?.mediaProject?.virtual360Url ? true : false}
              onClick={false}
              resSearch={false}
            />
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
};

export default InfolelangCarousel;