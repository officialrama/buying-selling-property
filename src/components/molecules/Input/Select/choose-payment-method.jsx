import PropTypes from 'prop-types';
import { Radio } from "../../../atoms";

function ChoosePaymentMethod({ text, checked, onChange, disabled, imgSrc, imgAlt }) {
  return (
    <div className="choose-payment__wrapper">
      <div className="choose-payment__radioWrapper">
        <Radio checked={checked} onChange={onChange} disabled={disabled} />
      </div>
      <div className="choose-payment__circle">
        <img className="choose-payment__centerImg" src={imgSrc} alt={imgAlt} />
      </div>
      <p className="choose-payment__text">{text}</p>
    </div>
  )
}

ChoosePaymentMethod.propTypes = {
  text: PropTypes.string.isRequired
}

ChoosePaymentMethod.defaultProps = {
  text: ""
}

export default ChoosePaymentMethod;