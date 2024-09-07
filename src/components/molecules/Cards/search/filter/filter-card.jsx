import classNames from 'classnames';
import PropTypes from 'prop-types';

function FilterCard({ children, title }) {
  return (
    <div className="filter-search__wrapper__baseBox">
      <p className={classNames("filter-search__text__title mt-0")}>{title}</p>
      {children}
    </div>
  )
};

FilterCard.propTypes = {
  title: PropTypes.string.isRequired
}

FilterCard.defaultProps = {
  title: ""
}

export default FilterCard;