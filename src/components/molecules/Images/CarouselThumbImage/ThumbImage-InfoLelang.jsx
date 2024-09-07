/* eslint-disable react-hooks/exhaustive-deps */
import PropTypes from "prop-types";
import { useEffect } from "react";
import Carousel from "react-grid-carousel";
import useSearchPropertyHooks from "../../../../hooks/useSearchPropertyHooks";
import { Button, LBtnCarousel, RBtnCarousel } from "../../../atoms";
import { formatRupiahWord } from "../../../../helpers/string";

function Components({ imgSrc, isVirtual, isImgResult, virtualClassName, imgClassName, v360Link, statusSold, statusBooked, diskonTipe, diskonNominal }) {
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
          {statusSold === true || statusBooked === true ? '' : diskonTipe === 'persen' &&
          <div class="absolute top-0 left-0 z-20" id="tagDiskon">
          <div className="px-2 py-1 ml-4 mr-2 mt-2 text-sm tab:text-[10px] smallPc:text-[10px] xxl:text-[12px] bg-[#E84040] text-white font-semibold rounded-tl-lg rounded-tr-lg rounded-br-lg relative">
          <p class="relative z-10">{`Diskon ${diskonNominal}%`}</p>
          <svg class="absolute -bottom-[0.30rem] left-0 z-0" width="10" height="6" viewBox="0 0 8 4" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 0H8V4L2.45718 2.96072C1.03244 2.69358 0 1.44957 0 0Z" fill="#C61818" />
        </svg>
      </div>
      </div>}
      {statusSold === true || statusBooked === true ? '' : diskonTipe === 'rupiah' &&
    <div class="absolute top-0 left-0 z-20" id="tagDiskon">
      <div className="px-2 py-1 ml-4 mr-2 mt-2 text-sm tab:text-[10px] smallPc:text-[10px] xxl:text-[12px] bg-[#E84040] text-white font-semibold rounded-tl-lg rounded-tr-lg rounded-br-lg relative">
     <p class="relative z-10">{`Diskon ${formatRupiahWord(diskonNominal)}`}</p>
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
          <Carousel.Item key={idx}>
            <div className="relative">
              <img
                className={`${isImgResult ? "small-img__imgResult" : "small-img__img"} ${imgClassName}`}
                src={data.filename.replace('https://sandbox.partner.api.bri.co.id/v1.0/info-lelang/v1/file?subdir', 'https://sandbox.partner.api.bri.co.id/v1.0/info-lelang/file?subdir')}
                alt="img"
              />
              {statusSold === true && (
                <img
                  src="/icons/soldout.svg"
                  alt="Sold Out"
                  className="w-[180px] mobile:w-[150px] absolute top-0 left-0 mobile:left-0 z-10"
                />
              )}
              {statusBooked === true && (
                <img
                  src="/icons/booked.svg"
                  alt="Booked"
                  className="w-[180px] mobile:w-[150px] absolute top-0 left-0 mobile:left-0 z-10"
                />
              )}
            </div>
          </Carousel.Item>
        ))}
      </Carousel>
      {filteredImg?.length > 0 && (
        <div>
          <div className="small-img is-slideshow__count-img-wrap">
            <p className="small-img is-slideshow__count-img">
              {imgCount?.current + "/" + imgCount?.total}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

Components.propTypes = {
  imgSrc: PropTypes.string.isRequired,
  isVirtual: PropTypes.bool.isRequired,
  imgClassName: PropTypes.string.isRequired,
  statusBooked: PropTypes.bool.isRequired,
  statusSold: PropTypes.bool.isRequired
};

Components.defaultProps = {
  imgSrc: "",
  isVirtual: false,
  imgClassName: "h-64",
  statusBooked: false,
  statusSold: false
};

export default Components;
