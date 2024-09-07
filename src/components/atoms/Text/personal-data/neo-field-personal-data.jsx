import classNames from 'classnames';
import PropTypes from 'prop-types';
import { TextColor } from '../../../theme/text/text';

function NeoFieldSummaryData({ field, value }) {
  return (
    <div className="neo-field-persn-data">
      <p className={classNames("field-persn-data__field", `text-[#777777]`)}>{field}</p>
      <p className={classNames("field-persn-data__value", `text-[${TextColor.black}]`)}>{value}</p>
    </div>
  )
}

NeoFieldSummaryData.propTypes = {
  field: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired
}

NeoFieldSummaryData.defaultProps = {
  field: "",
  value: ""
}

export default NeoFieldSummaryData;