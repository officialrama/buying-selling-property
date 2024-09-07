import PropTypes from 'prop-types';

function ListFaciltyDetail({ type, value }) {
  const valueSwitch = (type) => {
    switch (type) {
      case true:
        return "Ya";
      case false:
        return "Tidak";
      default:
        return "Tidak";
    }
  };
  return (
    <div className="prod-detail__pages__property__detailBuying__left__list-facility__wrapper">
      <div className="prod-detail__pages__property__detailBuying__left__list-facility__title">
        <img className="place-self-center w-5" src={type !== "" ? type.img : ""} alt="icons" />
        <p className="prod-detail__pages__property__detailBuying__left__list-facility__text font-medium text-sm">{type !== "" ? type.text : ""}</p>
      </div>
      <div className="prod-detail__pages__property__detailBuying__left__list-facility__desc w-[45px]">
        <p className="prod-detail__pages__property__detailBuying__left__list-facility__text font-medium text-sm text-right">{valueSwitch(value)}</p>
      </div>
    </div>
  )
}

ListFaciltyDetail.propTypes = {
  type: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired
}

ListFaciltyDetail.defaultProps = {
  type: "",
  value: "Tidak"
}

export default ListFaciltyDetail;