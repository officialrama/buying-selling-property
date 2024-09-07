import PropTypes from "prop-types";

function DropdownNavbar({
  placeholder,
  onClickDrop,
}) {

  return (
    <div>
      <button className="mobile:text-[12px] tab:text-[12px] smallPc:text-[14px] largePc:text-[12px] xxl:text-[14px] text-[#00529C] font-medium cursor-pointer" onClick={onClickDrop}>
        <div className="landing-page dropdown-srch__btn-wrap">
          <p style={{color:"#fff",fontWeight:"600"}}>{placeholder}</p>
          <img src="/icons/small-icons/arrow-down-new.svg" alt="arrow-down" className="xxl:w-5 xxl:h-5 largePc:w-3 largePc:h-3" />
        </div>
      </button>
    </div>
  );
}

DropdownNavbar.propTypes = {
  placeholder: PropTypes.string.isRequired,
  onClickDrop: PropTypes.func.isRequired,
  onClickReset: PropTypes.func.isRequired,
  onClickSave: PropTypes.func.isRequired
};

DropdownNavbar.defaultProps = {
  placeholder: "Placeholder",
  onClickDrop: [() => {}]
};

export default DropdownNavbar;
