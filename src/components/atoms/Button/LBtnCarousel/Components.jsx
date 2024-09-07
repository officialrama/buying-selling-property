import PropTypes from "prop-types";

function LBtnCarousel({ onClick }) {
  return (
    <>
      {/* <img
        className="small-img is-slideshow__left-btn"
        src="/icons/small-icons/arrow-left-white-circle.svg"
        alt="left-button"
        onClick={onClick}
      /> */}
    </>
  )
}

LBtnCarousel.propTypes = {
  onClick: PropTypes.func
};

LBtnCarousel.defaultProps = {
  onClick: [() => {}],
};

export default LBtnCarousel;