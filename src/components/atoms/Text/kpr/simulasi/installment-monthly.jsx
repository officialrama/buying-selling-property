import classNames from 'classnames';
import PropTypes from 'prop-types';
import { TextColor } from '../../../../theme/text/text';

function InstallmentMonthly({ field, value }) {
    return (
        <div className={classNames("flex flex-row gap-2 font-bold text-[1rem]", `text-[${TextColor.blue}]`)}>
            <p className="w-[50%]">{field}</p>
            <p className="w-[50%]">{value}</p>
        </div>
    )
}

InstallmentMonthly.propTypes = {
    field: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired
}

InstallmentMonthly.defaultProps = {
    field: "Angsuran Per Bulan",
    value: "Rp. x.xxx.xxx"
}

export default InstallmentMonthly;