import { TextColor } from "../../../theme/text/text";
import PropTypes from 'prop-types';
import classNames from "classnames";

function PropertyInfo({ title, value }) {
  return (
    <div className="flex flex-col gap-1">
      <p className={classNames("font-normal", "text-[0.875rem]", `text-[${TextColor.grayDesc}]`)}>{title}</p>
      <p className={classNames("font-semibold", "text-[0.875rem]", `text-[${TextColor.black}]`)}>{value}</p>
    </div>
  )
}

PropertyInfo.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired
}

PropertyInfo.defaultProps = {
  type: "",
  value: ""
}

export default PropertyInfo;