import React from "react";
import Carousel from "react-grid-carousel";
import { CityList } from "../../molecules";

const CityCarousel = ({ dataMap }) => {
  return (
    <div className="landing-page city-carousel">
      <Carousel cols={4} rows={1} gap={10} loop>
        {dataMap?.map((data, idx) => (
          <Carousel.Item>
            <CityList
              key={idx}
              cityName={data[0]}
              totalProperties={data[1]}
              imgSrc={data[3]}
            />
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
};

export default CityCarousel;
