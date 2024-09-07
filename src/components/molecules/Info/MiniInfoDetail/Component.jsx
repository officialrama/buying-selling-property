import PropTypes from "prop-types";

function MiniInfoDetail({ iconPath, title, desc }) {
  return (
    <div className="prj-detail__miniInfoWrap">
      <div className="prj-detail__miniInfoIcon">
        <img src={iconPath} alt="mini-icon" />
      </div>
      <div className="prj-detail__miniInfoBody">
        <p className="prj-detail__miniInfoTitle">{title}</p>
        <p className="prj-detail__miniInfoDesc">{desc}</p>
      </div>
    </div>
  )
}

MiniInfoDetail.propTypes = {
  iconPath: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  desc: PropTypes.string.isRequired
};

MiniInfoDetail.defaultProps = {
  iconPath: "",
  title: "",
  desc: ""
};

export default MiniInfoDetail;
