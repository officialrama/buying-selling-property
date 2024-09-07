import React, { useState } from 'react';
import Slider from 'react-slick';

const Component = ({ images, slidesToShow = 1 }) => {
  const [imageIndex, setImageIndex] = useState(0);

  const settings = {
    dots: true,
    arrows: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: '300px',
    beforeChange: (current, next) => setImageIndex(next)
  };

  const templateImages = images.map((image, idx) => {
    if (image !== null) {
      return (
        <div
          className={idx === imageIndex ? "activeSlide" : "slide"}
          key={idx}
        >
          <div className="">
            <img className="imgSliderPromo" src={image?.sharedUrl} alt={image?.imageName} />
          </div>
        </div>
      );
    } else {
      return (<></>)
    }
  });

  return <Slider {...settings}>{templateImages}</Slider>;
};

export default Component;