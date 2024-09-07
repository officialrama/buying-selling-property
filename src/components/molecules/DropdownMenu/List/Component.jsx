import PropTypes from "prop-types";

function Component({
  data,
  onClick,
  filterDataLoc,
  setIsDropdown,
  isDropdown,
}) {
  const handleOnClick = (dataMap) => {
    onClick(dataMap);
    setIsDropdown({
      ...isDropdown,
      typeDropdown: false,
    });
  };

  return (
    <div className="dropdown-list__wrapper mt-11">
      <div
        className="dropdown-list__listWrap"
        aria-labelledby="dropdown-homepage"
      >
        {data.map((dataMap, idx) => (
          <div
            key={idx}
            className={
              filterDataLoc?.nameType === dataMap.name
                ? "dropdown-list__list-active"
                : "dropdown-list__list"
            }
            onClick={() => handleOnClick(dataMap)}
          >
            {dataMap.name}
          </div>
        ))}
      </div>
    </div>
  );
}

Component.propTypes = {
  data: PropTypes.any.isRequired,
};

Component.defaultProps = {
  data: [],
};

export default Component;
