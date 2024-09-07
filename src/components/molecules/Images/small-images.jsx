import React from "react";
import { Button } from "../../atoms";
import PropTypes from "prop-types";

function SmallImages({
  imgSrc,
  isVirtual,
  isSlideshow,
  isImgResult,
  imgClassName,
  virtualClassName,
}) {
  return (
    <div className="small-img__wrapper">
      <img
        className={`${isImgResult ? "small-img__imgResult" : "small-img__img"
          } ${imgClassName}`}
        src={imgSrc}
        alt="img"
      />
      {isVirtual ? (
        <div className={`small-img__is-virtual ${virtualClassName}`}>
          <Button buttonColor="blueLight" textColor="blue">
            Virtual 360
          </Button>
        </div>
      ) : (
        <div></div>
      )}
      {isSlideshow ? (
        <div>
          <div>
            <img
              className="small-img is-slideshow__left-btn"
              src="/icons/small-icons/arrow-left-white-circle.svg"
              alt="left-button"
            />
            <img
              className="small-img is-slideshow__right-btn"
              src="/icons/small-icons/arrow-right-white-circle.svg"
              alt="right-button"
            />
          </div>
          <div className="small-img is-slideshow__count-img-wrap">
            <p className="small-img is-slideshow__count-img">1/40</p>
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}

SmallImages.propTypes = {
  imgSrc: PropTypes.string.isRequired,
  isVirtual: PropTypes.bool.isRequired,
  isSlideshow: PropTypes.bool.isRequired,
};

SmallImages.defaultProps = {
  imgSrc: "",
  isVirtual: false,
  isSlideshow: false,
};

export default SmallImages;
