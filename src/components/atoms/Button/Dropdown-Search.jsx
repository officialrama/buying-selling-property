import PropTypes from "prop-types";

function DropdownSearch({
  placeholder,
  onClickDrop,
}) {

  return (
    <div>
      <button className="landing-page dropdown-srch" onClick={onClickDrop}>
        <div className="landing-page dropdown-srch__btn-wrap">
          <p>{placeholder}</p>
          <img src="/icons/small-icons/arrow-down.svg" alt="arrow-down" />
        </div>
      </button>
    </div>
  );
}

DropdownSearch.propTypes = {
  placeholder: PropTypes.string.isRequired,
  onClickDrop: PropTypes.func.isRequired,
  onClickReset: PropTypes.func.isRequired,
  onClickSave: PropTypes.func.isRequired
};

DropdownSearch.defaultProps = {
  placeholder: "Placeholder",
  onClickDrop: [() => {}]
};

export default DropdownSearch;
