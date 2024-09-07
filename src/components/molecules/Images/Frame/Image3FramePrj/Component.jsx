import Virtual360 from "../../../../../components/atoms/Button/virtual-360/virtual-360-galery"
import ButtonGalery from "../../../../../components/atoms/Button/button-galery"
import PropTypes from "prop-types"
import Carousel from "react-grid-carousel"
import MobileFrame from "../mobileFrame"
import { formatRupiahWord } from "../../../../../helpers/string"


function Component({ 
  isMobile, 
  dataImg, 
  type, 
  onClickImg0, 
  onClickImg1, 
  onClickImg2, 
  functionButton, 
  isDiscount, 
  isSave,
  is360,
  isSecondary,
}) {
  const filteredImg = dataImg?.filter?.(function(value){ 
    return !String(value.imageName)?.includes("BrosurProyek");
  })

  const discountType = () => {
    if(isDiscount.diskonPersen > "0" && isDiscount.diskonPersen !== null){
      if(type === "project"){
        return `Diskon hingga ${isDiscount.diskonPersen}%`
      }else{
        return `Diskon ${isDiscount.diskonPersen}%`
      }
    }else{
      if(type === "project"){
        return `Diskon hingga ${formatRupiahWord(isDiscount.diskonNominal)}`
      }else{
        return `Diskon ${formatRupiahWord(isDiscount.diskonNominal)}`
      }
    }
  }

  function TotalImages({total, onClicks}) {
    return (
      <div className="prod-detail__pages__property__photos__totalImg__wrapper">
        <div className="prod-detail__pages__property__photos__totalImg__wrapper-button" onClick={onClicks}>
          <img className="prod-detail__pages__property__photos__totalImg__icon" src="/icons/small-icons/Image-black.svg" alt="icon" />
          <p className="prod-detail__pages__property__photos__totalImg__text">{total}</p>
        </div>
      </div>
    )
  }

  return (
    <>
    {isDiscount && (isDiscount.diskonPersen !== null && isDiscount.diskonPersen > "0" || isDiscount.diskonNominal !== null && isDiscount.diskonNominal > "0") && (
      <div class="absolute -left-[26px] top-16 z-20 mobile:top-16" id="tagDiskon">
        <div class="px-2 py-1 ml-4 mr-2 mt-2 text-sm tab:text-[10px] smallPc:text-[10px] xxl:text-[12px] bg-[#E84040] text-white font-semibold rounded-tl-lg rounded-tr-lg rounded-br-lg relative">
          <p class="relative z-10">{discountType()}</p>
          <svg class="absolute -bottom-[0.30rem] left-0 z-0" width="10" height="6" viewBox="0 0 8 4" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 0H8V4L2.45718 2.96072C1.03244 2.69358 0 1.44957 0 0Z" fill="#C61818" />
          </svg>
        </div>
      </div>
    )}
    <div className="relative overflow-hidden">
      {filteredImg && !isMobile && (
        <div className="prod-detail__pages__property__photos__wrapper">
          <div className="prod-detail__pages__property__photos__img-wrap-2">
            <img
              className="prod-detail__pages__property__photos__images"
              src={filteredImg[0] ? filteredImg[0]?.sharedUrl : "/images/default.jpg"}
              alt="images"
              onClick={onClickImg0}
            />
            <div className="absolute flex flex-row top-0 justify-end w-full gap-4 mobile:hidden">
                {type === 'unit' && (
                  <>
                    <ButtonGalery type={isSave ? "liked" : "like"} onClick={functionButton.handleFavorite} />
                    {!isSecondary && (
                      <ButtonGalery type="download" onClick={functionButton.handleBrosur} />
                    )}
                  </>
                )}
                <ButtonGalery setClass="mr-4" type="share" onClick={functionButton.handleShareButton} />
            </div>
          </div>
          <div className="prod-detail__pages__property__photos__img-right-wrap">
            <img
              className="prod-detail__pages__property__photos__left-images"
              src={filteredImg[1] ? filteredImg[1]?.sharedUrl : "/images/default.jpg"}
              alt="images"
              onClick={onClickImg1}
            />
            <div className="relative">
              <img
                className="prod-detail__pages__property__photos__left-images"
                src={filteredImg[2] ? filteredImg[2]?.sharedUrl : "/images/default.jpg"}
                alt="images"
                onClick={onClickImg2}
              />
              <TotalImages total={filteredImg?.length} className="content-center" onClicks={onClickImg2} />
            </div>
          </div>
        </div>
      )}
      {filteredImg && isMobile && (
        <div className="rounded-2xl mobile:h-[218px]">
          <MobileFrame images={filteredImg} />
        </div>
      )}
      {is360 && (
        <div className={`absolute bottom-0 justify-between w-full mobile:hidden`}>
          <Virtual360 onClick={functionButton.handle360button}/>
        </div>
      )}
    </div>
    </>
  );
}

Component.propTypes = {
  onClickImg0: PropTypes.func,
  onClickImg1: PropTypes.func,
  onClickImg2: PropTypes.func,
};

Component.defaultProps = {
  onClickImg0: [() => {}],
  onClickImg1: [() => {}],
  onClickImg2: [() => {}]
};

export default Component;
