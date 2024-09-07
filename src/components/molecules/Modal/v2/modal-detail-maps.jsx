import _ from 'lodash-contrib';
import PropTypes from "prop-types";
import { CarouselThumbImage } from "../..";
import { formatRupiahWord } from '../../../../helpers/string';
import LikeButton from "../../../atoms/Button/like/like-button";

function ModalDetailMapsV2({
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
  dataCluster,
  diskonPersen,
  diskonNominal,
  hargaAkhir
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
                  dataCluster={dataCluster}
                  diskonNominal={diskonNominal}
                  diskonPersen={diskonPersen}
                />
              </div>
              <div>
                <div className="search-result__modalMaps__filter__baseWrapper">
                  <div className="search-result__modalMaps__filter__filterWrapper">
                    {/* <p className="search-result__modalMaps__filter__dataFilter">
                      {tipeProject}
                    </p> */}
                  </div>
                  <div>
                    <LikeButton likeButton={likeButton} />
                  </div>
                </div>
              </div>
              <div className="search-result__modalMaps__detail__baseWrapper" onClick={() => window.location.href = `/project-details/${encodeURIComponent(idProject)}`}>
                <p className="search-result__modalMaps__detail__propName">
                  {propertyName}
                </p>
                <p className="search-result__modalMaps__detail__location">
                  {location && _.isJSON(location) ? `${JSON.parse(location)?.kabupaten}, ${JSON.parse(location)?.provinsi}` : location}
                </p>
              </div>
              {/* <p className="search-result__modalMaps__price">{`${formatRupiahWord(price?.split(",")[0])} - ${formatRupiahWord(price.split(",")[1])}`}</p> */}
              <p className="search-result__modalMaps__price">{ formatRupiahWord(hargaAkhir)}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

ModalDetailMapsV2.propTypes = {
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

ModalDetailMapsV2.defaultProps = {
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

export default ModalDetailMapsV2;
