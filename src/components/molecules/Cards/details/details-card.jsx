import PropTypes from "prop-types";

function DetailsCard({ children, title, className }) {
  return (
    <div
      className={`prod-detail__pages__property__detailBuying__left__detailCard__wrapper ${className}`}
    >
      {title !== "" ? (
        <p
          className={
            "prod-detail__pages__property__detailBuying__left__detailCard__title mt-0"
          }
        >
          {title}
        </p>
      ) : (
        <div></div>
      )}
      {children}
    </div>
  );
}

DetailsCard.propTypes = {
  title: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
};

DetailsCard.defaultProps = {
  title: "",
  className: "",
};

export default DetailsCard;
