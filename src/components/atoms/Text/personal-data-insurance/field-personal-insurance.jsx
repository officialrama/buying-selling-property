import classNames from 'classnames';
import PropTypes from 'prop-types';
import { TextColor } from '../../../theme/text/text';

function FieldSummaryInsurance({ field, value }) {
  return (
    <div className="flex mobile:block flex-col">
      <p className={classNames("field-persn-data__field", `text-[#777777]`)}>{field}</p>
      <p className={classNames("field-persn-data__value", `text-[${TextColor.black}]`)}>{value}</p>
    </div>
  )
}

FieldSummaryInsurance.propTypes = {
  field: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired
}

FieldSummaryInsurance.defaultProps = {
  field: "",
  value: ""
}

export default FieldSummaryInsurance;