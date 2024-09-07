import PropTypes from 'prop-types';

function TotalImages({total}) {
  return (
    <div className="prod-detail__pages__property__photos__totalImg-old__wrapper">
      <img className="prod-detail__pages__property__photos__totalImg__icon" src="/icons/small-icons/Image-black.svg" alt="icon" />
      <p className="prod-detail__pages__property__photos__totalImg__text">{total}</p>
    </div>
  )
}

TotalImages.propTypes = {  
  total: PropTypes.string.isRequired
}

TotalImages.defaultProps = {
  total: "0"
}

export default TotalImages;