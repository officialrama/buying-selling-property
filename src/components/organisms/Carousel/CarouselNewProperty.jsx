import React from "react";
import Carousel from "react-grid-carousel";
import ProjectSearchResult from "../../molecules/Cards/search/v2/project-search-result";

const CarouselNewProperty = ({ property }) => {
  return (
    <Carousel cols={2} rows={property.length < 3 ? 1 : 2} gap={10} loop hideArrow={property.length < 5 ? true : false}>
      {property?.map((props, idx) => (
        <Carousel.Item>
          <ProjectSearchResult
            index={idx}
            data={props}
            isVirtual={props?.mediaProject?.virtual360Url ? true : false}
            onClick={false}
            resSearch={false}
          />
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default CarouselNewProperty;
