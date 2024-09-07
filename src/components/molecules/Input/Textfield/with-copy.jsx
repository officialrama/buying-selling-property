import PropTypes from 'prop-types';
import { Button } from '../../../atoms';

function TextfieldCopy({value, onClick}) {
  return (
    <div className="cash-submission__textfield__wrapper">
      <p className="cash-submission__textfield__textNumber">{value}</p>
      <Button buttonColor="orangeBorderOnly" textColor="orange" fullWidth={false} paddingSize={"padding-0"}>Salin</Button>
    </div>
  )
}

TextfieldCopy.propTypes = {
  value: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
}

TextfieldCopy.defaultProps = {
  value: "",
  onClick: [() => {}]
}

export default TextfieldCopy;