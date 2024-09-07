import classNames from 'classnames';
import PropTypes from 'prop-types';
import { TextColor } from '../../../theme/text/text';

function FieldSummaryData({ field, value }) {
  return (
    <div className="field-persn-data">
      <p className={classNames("field-persn-data__field whitespace-nowrap text-xs font-semibold", `text-[#777777]`)}>{field}</p>
      <p className={classNames("field-persn-data__value text-sm font-medium mobile:whitespace-normal", `text-[#292929]`)}>{value}</p>
    </div>
  )
}

FieldSummaryData.propTypes = {
  field: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired
}

FieldSummaryData.defaultProps = {
  field: "",
  value: ""
}

export default FieldSummaryData;