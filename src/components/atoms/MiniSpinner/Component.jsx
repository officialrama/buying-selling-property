import { Oval } from 'react-loader-spinner';
import PropTypes from "prop-types";

function Component({ width, height, strokeWidth }) {
  return (
    <Oval ariaLabel="loading-indicator" width={width} height={height} strokeWidth={strokeWidth} secondaryColor="#E4E7EC" color="#00529C" />
  )
}

Component.propTypes = {
  width: PropTypes.string | PropTypes.number,
  height: PropTypes.string | PropTypes.number,
  strokeWidth: PropTypes.string | PropTypes.number
};

Component.defaultProps = {
  width: 20,
  height: 20,
  strokeWidth: 2
};

export default Component;