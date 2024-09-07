import PropTypes from "prop-types";

function Share({ onClick }) {
  return (
    <div className="save-love-share__wrapper" onClick={onClick}>
      <img className="save-love-share__loveIcon" src="/icons/small-icons/Share-orange.svg" alt="love-orange" />
      <p className="save-love-share__text">Share</p>
    </div>
  )
}

Share.propTypes = {
  onClick: PropTypes.func
};

Share.defaultProps = {
  onClick: [() => {}]
};

export default Share;