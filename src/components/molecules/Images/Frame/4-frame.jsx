import TotalImages from "../../../atoms/Button/total-images/total-images";
import PropTypes from "prop-types";

function Image4Frame({ dataImg, onClickImg0, onClickImg1, onClickImg2, onClickImg3 }) {
  const filteredImg = dataImg?.filter?.(function(value){ 
    return !String(value.imageName)?.includes("BrosurProyek");
  });
  return (
    <div className="relative overflow-hidden">
      {filteredImg && (
        <div className="prod-detail__pages__property__photos__wrapper-old">
          <div className="prod-detail__pages__property__photos__img-wrap">
            <img
              className="prod-detail__pages__property__photos__images"
              src={filteredImg[0] ? filteredImg[0]?.sharedUrl : "/images/default.jpg"}
              alt="images"
              onClick={onClickImg0}
            />
          </div>
          <div className="prod-detail__pages__property__photos__img-wrap">
            <img
              className="prod-detail__pages__property__photos__images"
              src={filteredImg[1] ? filteredImg[1]?.sharedUrl : "/images/default.jpg"}
              alt="images"
              onClick={onClickImg1}
            />
          </div>
          <div className="prod-detail__pages__property__photos__img-right-wrap">
            <img
              className="prod-detail__pages__property__photos__images"
              src={filteredImg[2] ? filteredImg[2]?.sharedUrl : "/images/default.jpg"}
              alt="images"
              onClick={onClickImg2}
            />
            <img
              className="prod-detail__pages__property__photos__images"
              src={filteredImg[3] ? filteredImg[3]?.sharedUrl : "/images/default.jpg"}
              alt="images"
              onClick={onClickImg3}
            />
          </div>
        </div>
      )}
      <TotalImages total={filteredImg?.length} />
    </div>
  );
}

Image4Frame.propTypes = {
  onClickImg0: PropTypes.func,
  onClickImg1: PropTypes.func,
  onClickImg2: PropTypes.func,
  onClickImg3: PropTypes.func,
};

Image4Frame.defaultProps = {
  onClickImg0: [() => {}],
  onClickImg1: [() => {}],
  onClickImg2: [() => {}],
  onClickImg3: [() => {}]
};

export default Image4Frame;
