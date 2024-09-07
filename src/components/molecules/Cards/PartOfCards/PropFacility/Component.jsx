import PropTypes from "prop-types";

function Component({ facIcons, facName }) {
  return (
    <div className="flex">
      <img
        className="landing-page hc__facility-icon"
        src={facIcons}
        alt="img"
      />
      <p className="landing-page hc__facility-name">
        {facName}
      </p>
    </div>
  )
}

Component.propTypes = {
  facIcons: PropTypes.string.isRequired,
  facName: PropTypes.string.isRequired
};

Component.defaultProps = {
  facIcons: "",
  facName: ""
};

export default Component;