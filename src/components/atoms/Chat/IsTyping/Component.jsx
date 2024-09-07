import PropTypes from "prop-types";

function Component({ name }) {
  return (
    <div className="chat__is-typing">
      <img src="/icons/small-icons/is-typing.svg" alt="is-typing" />
      <p>{name}...</p>
    </div>
  )
}

Component.propTypes = {
  name: PropTypes.string.isRequired
};

Component.defaultProps = {
  name: ""
};

export default Component;