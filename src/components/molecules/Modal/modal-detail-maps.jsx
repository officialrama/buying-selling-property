import PropTypes from "prop-types";
import React from "react";
import { CarouselThumbImage } from "..";
import LikeButton from "../../atoms/Button/like/like-button";
import _ from 'lodash-contrib';
const convertRupiah = require("rupiah-format");

function ModalDetailMaps({
  imgSrc,
  typeProp,
  propertyName,
  location,
  price,
  likeButton,
  isVirtual,
  url360,
  isSlideshow,
}) {
  return (
    <div>
      <div className="search-result__modalMaps__flexWrapper">
        <div className="search-result__modalMaps__maxWidthWrapper">
          <div className="search-result__modalMaps__borderShadow">
            <div className="search-result__modalMaps__paddingWrapper">
              <div className="search-result__modalMaps__imageWrapper">
                <CarouselThumbImage
                  imgSrc={imgSrc}
                  isVirtual={isVirtual}
                  imgClassName="h-40"
                  v360Link={url360}
                />
              </div>
              <div>
                <div className="search-result__modalMaps__filter__baseWrapper">
                  <div className="search-result__modalMaps__filter__filterWrapper">
                    <p className="search-result__modalMaps__filter__dataFilter">
                      {typeProp?.project?.tipeProperti}
                    </p>
                    <p className="search-result__modalMaps__filter__dataFilter">
                      {`Tipe ${typeProp?.detailProperti?.lb}`}
                    </p>
                  </div>
                  <div>
                    <LikeButton likeButton={likeButton} />
                  </div>
                </div>
              </div>
              <div className="search-result__modalMaps__detail__baseWrapper">
                <p className="search-result__modalMaps__detail__propName">
                  {propertyName}
                </p>
                <p className="search-result__modalMaps__detail__location">
                  {location && _.isJSON(location) ? `${JSON.parse(location)?.kabupaten}, ${JSON.parse(location)?.provinsi}` : location}
                </p>
              </div>
              <p className="search-result__modalMaps__price">{convertRupiah.convert(price)}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

ModalDetailMaps.propTypes = {
  imgSrc: PropTypes.string.isRequired,
  filtering: PropTypes.array.isRequired,
  propertyName: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  likeButton: PropTypes.bool.isRequired,
  isVirtual: PropTypes.bool.isRequired,
  isSlideshow: PropTypes.bool.isRequired,
};

ModalDetailMaps.defaultProps = {
  imgSrc: "",
  filtering: ["filter"],
  propertyName: "",
  location: "",
  price: "",
  likeButton: false,
  isVirtual: false,
  isSlideshow: false,
};

export default ModalDetailMaps;
