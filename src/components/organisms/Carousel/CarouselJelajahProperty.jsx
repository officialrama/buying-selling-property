/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable array-callback-return */
import React, { useEffect, useState } from "react";
import Carousel from "react-grid-carousel";
import { HouseCardBig } from "../../molecules";
import useWindowDimensions from "../../../utils/dimensions";
import ProjectSearchResult from "../../molecules/Cards/search/v2/project-search-result";

const CarouselJelajahProperty = ({ property }) => {
  const { width } = useWindowDimensions();
  const [itemProps, setItemProps] = useState([]);

  useEffect(() => {
    const perChunk = 3;
    const result = property?.reduce((resultArray, item, index) => {
      const chunkIndex = Math.floor(index / perChunk);

      if (!resultArray[chunkIndex]) {
        resultArray[chunkIndex] = [];
      }

      resultArray[chunkIndex].push(item);

      return resultArray;
    }, []);

    setItemProps(result);
  }, [property]);

  return (
    <Carousel cols={1} rows={1} gap={10} loop>
      {(width < 640 ? property : itemProps).map((data, id) => (
        <Carousel.Item>
          {width < 640 ? (
            <div className="landing-page v360__card-left">
                    <ProjectSearchResult
                    index={id}
                    data={data}
                    isVirtual={true}
                    onClick={undefined}
                    resSearch={false}
                  />
            </div>
          ) : (
            <div className="landing-page v360__card-wrap" key={id}>
              <div className="landing-page v360__card-wrap-child">
                {data.map((item, index) => (
                  (index === 0 && <HouseCardBig data={item} />)
                ))}
              </div>
              <div className="landing-page v360__card-left">
                {data.map(
                  (item, index) => index > 0 && (
                    <ProjectSearchResult
                    index={index}
                    data={item}
                    isVirtual={true}
                    onClick={undefined}
                    resSearch={false}
                  />
                  )
                )}
              </div>
            </div>
          )}
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default CarouselJelajahProperty;
