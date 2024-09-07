/* eslint-disable react-hooks/exhaustive-deps */
import PropTypes from "prop-types";
import { useEffect } from "react";
import Carousel from "react-grid-carousel";
import useSearchPropertyHooks from "../../../../hooks/useSearchPropertyHooks";
import { Button, LBtnCarousel, RBtnCarousel } from "../../../atoms";
import { formatRupiahWord } from "../../../../helpers/string";

function Components({ isDetail, imgSrc, isVirtual, isImgResult, virtualClassName, imgClassName, v360Link, diskonPersen, diskonNominal, dataCluster, secondary, Classes }) {
  const { imgCount, setImgCount } = useSearchPropertyHooks();
  const filteredImg = imgSrc?.filter?.(function (value) {
    return !String(value?.imageName)?.includes("BrosurProyek");
  });

  useEffect(() => {
    setImgCount({
      ...imgCount,
      total: filteredImg?.length,
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


  return ( 
    <div className="small-img__wrapper">
    {diskonPersen !== null && diskonPersen !== "" && diskonPersen !== "0" &&
    <div class={`absolute top-0 z-30 ${Classes ? Classes : 'left-0'}`} id="tagDiskon">
     <div className="px-2 py-1 ml-4 mr-2 mt-2 text-sm tab:text-[10px] smallPc:text-[10px] xxl:text-[12px] bg-[#E84040] text-white font-semibold rounded-tl-lg rounded-tr-lg rounded-br-lg relative">
     <p class="relative z-10">{`${typeof dataCluster !== 'undefined' && secondary === false ? 'Diskon hingga' : 'Diskon'} ${diskonPersen}%`}</p>
    <svg class="absolute -bottom-[0.30rem] left-0 z-0" width="10" height="6" viewBox="0 0 8 4" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 0H8V4L2.45718 2.96072C1.03244 2.69358 0 1.44957 0 0Z" fill="#C61818" />
        </svg>
      </div>
      </div>}
    {diskonNominal !== null && diskonNominal !== "" && diskonNominal !== "0" &&
    <div class={`absolute top-0 z-30 ${Classes ? Classes : 'left-0'}`} id="tagDiskon">
      <div className="px-2 py-1 ml-4 mr-2 mt-2 text-sm tab:text-[10px] smallPc:text-[10px] xxl:text-[12px] bg-[#E84040] text-white font-semibold rounded-tl-lg rounded-tr-lg rounded-br-lg relative">
     <p class="relative z-10">{`${typeof dataCluster !== 'undefined' && secondary === false ? 'Diskon hingga' : 'Diskon'} ${formatRupiahWord(diskonNominal)}`}</p>
    <svg class="absolute -bottom-[0.30rem] left-0 z-0" width="10" height="6" viewBox="0 0 8 4" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 0H8V4L2.45718 2.96072C1.03244 2.69358 0 1.44957 0 0Z" fill="#C61818" />
        </svg>
      </div>
      </div>}      
      <Carousel
        cols={1}
        rows={1}
        loop
        arrowLeft={<LBtnCarousel onClick={() => decrementCount()} />}
        arrowRight={<RBtnCarousel onClick={() => incrementCount()} />}
        mobileBreakpoint={200}
      >
        {filteredImg?.map((data, idx) => (
          <Carousel.Item>
            <img
              className={`${isImgResult ? "small-img__imgResult" : "small-img__img"} ${imgClassName}`}
              src={data.sharedUrl}
              alt="img"
            /> 
            {isVirtual && isDetail ? (
              // <div className={`small-img__is-virtual ${virtualClassName}`}>
              //   <Button
              //     buttonColor="grayLight"
              //     textColor="gray3"
              //     className="whitespace-nowrap mobile:text-xs text-[8px] flex"
              //     onClick={v360Link}
              //   >
              //     <div className="flex flex-row gap-1">
              //       <div><img className="place-self-center w-4 h-4" src="/icons/small-icons/3D-blue.svg" alt="3D" /></div>
              //       <div className="text-xs place-self-center">Virtual 360</div>
              //     </div>
              //   </Button>
              // </div>
              <div onClick={v360Link} className="rounded-[80px] w-[44px] h-[18px] text-[12px] leading-[18px] mx-2 my-2 text-center bg-white  whitespace-nowrap text-[#777777] absolute bottom-0 right-0 cursor-pointer">360°</div>
            ) : isVirtual && !isDetail ? (
              <div className="rounded-[80px] w-[44px] h-[18px] text-[12px] leading-[18px] mx-2 my-2 text-center bg-white  whitespace-nowrap text-[#777777] absolute bottom-0 right-0">360°
                  {/*<img className="place-self-center w-4 h-4" src="/icons/small-icons/3D-blue.svg" alt="3D" />*/}
                  {/* <div className="text-[12px] leading-[18px] mx-2" style={{ whiteSpace: 'nowrap' }}>360°</div> */}
              </div>
            ) : <></>}
          </Carousel.Item>
        ))}
      </Carousel>
      {/* {filteredImg?.length > 0 && (
        <div>
          <div className="small-img is-slideshow__count-img-wrap">
            <p className="small-img is-slideshow__count-img">
              {imgCount?.current + "/" + imgCount?.total}
            </p>
          </div>
        </div>
      )} */}
    </div>
  );
}

Components.propTypes = {
  imgSrc: PropTypes.string.isRequired,
  isVirtual: PropTypes.bool.isRequired,
  imgClassName: PropTypes.string.isRequired
};

Components.defaultProps = {
  imgSrc: "",
  isVirtual: false,
  imgClassName: "h-64"
};

export default Components;
