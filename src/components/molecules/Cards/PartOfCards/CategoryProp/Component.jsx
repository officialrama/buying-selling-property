import PropTypes from "prop-types";

function Component({ tipeProperti }) {
  return (
    <p className={`${tipeProperti === "Hot Deals" ? "bg-[#FCE7E7] text-[#E84040] py-[2px] px-[12px] mx-[2px] font-semibold rounded-full" : "landing-page hc__filter"}`}>
      {tipeProperti === "Hot Deals" ? "Hot Deals 🔥" : tipeProperti}
    </p>
  )
}

Component.propTypes = {
  tipeProperti: PropTypes.string.isRequired
};

Component.defaultProps = {
  tipeProperti: ""
};

export default Component;