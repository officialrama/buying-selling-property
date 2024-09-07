import PropTypes from "prop-types";

function RBtnCarousel({ onClick }) {
  return (
    <>
      {/* <img
        className="small-img is-slideshow__right-btn"
        src="/icons/small-icons/arrow-right-white-circle.svg"
        alt="right-button"
        onClick={onClick}
      /> */}
    </>
  )
}

RBtnCarousel.propTypes = {
  onClick: PropTypes.func
};

RBtnCarousel.defaultProps = {
  onClick: [() => {}],
};

export default RBtnCarousel;