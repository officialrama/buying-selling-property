import _ from 'lodash-contrib';
import PropTypes from "prop-types";
import { CarouselThumbImage, ThumbImageInfoLelang } from "../..";
import { formatRupiahWord } from '../../../../helpers/string';
import LikeButton from "../../../atoms/Button/like/like-button";
import { validateProperti } from '../../../../store/actions/fetchData/info-lelang';
import { useDispatch } from 'react-redux';

function ModalDetailInfoLelang({
  imgSrc,
  typeProp,
  propertyName,
  location,
  price,
  likeButton,
  isVirtual,
  url360,
  tipeProject,
  listType,
  idProject,
  bookedStatus
}) {
  const dispatch = useDispatch();
  return (
    <div>
      <div className="search-result__modalMaps__flexWrapper">
        <div className="search-result__modalMaps__maxWidthWrapper">
          <div className="search-result__modalMaps__borderShadow">
            <div className="search-result__modalMaps__paddingWrapper">
              <div className="search-result__modalMaps__imageWrapper">
                <ThumbImageInfoLelang
                  imgSrc={imgSrc}
                  isVirtual={isVirtual}
                  imgClassName="h-40"
                  v360Link={url360}
                />
              </div>
              <div>
                <div className="search-result__modalMaps__filter__baseWrapper">
                  <div className="search-result__modalMaps__filter__filterWrapper">
                    {/* <p className="search-result__modalMaps__filter__dataFilter">
                      {tipeProject}
                    </p> */}
                  </div>
                </div>
              </div>
              <div className="search-result__modalMaps__detail__baseWrapper"
              onClick={() => {
                window.location.href = `properti-secondary/detail/${idProject}`
                }}>
                <p className="search-result__modalMaps__detail__propName cursor-pointer">
                  {propertyName}
                </p>
                <p className="search-result__modalMaps__detail__location">
                  {location}
                </p>
              </div>
              <p className="search-result__modalMaps__price">{`${formatRupiahWord(price)}`}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

ModalDetailInfoLelang.propTypes = {
  imgSrc: PropTypes.string.isRequired,
  propertyName: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  likeButton: PropTypes.bool.isRequired,
  isVirtual: PropTypes.bool.isRequired,
  isSlideshow: PropTypes.bool.isRequired,
  tipeProject: PropTypes.string.isRequired,
  listType: PropTypes.array.isRequired
};

ModalDetailInfoLelang.defaultProps = {
  imgSrc: "",
  propertyName: "",
  location: "",
  price: "",
  likeButton: false,
  isVirtual: false,
  isSlideshow: false,
  tipeProject: "",
  listType: []

};

export default ModalDetailInfoLelang;
