import React, { useState } from 'react';
import Slider from 'react-slick';
import useWindowDimensions from '../../../../../utils/dimensions';

const Component = ({ images, slidesToShow = 1 }) => {
  const [imageIndex, setImageIndex] = useState(0)
  const { width } = useWindowDimensions();


  const PrevArrowButton = (props) => {
    const { className, style, onClick } = props
    return (
      <div className={`arrow ${className}`} >
        <img src='/icons/small-icons/Button_prevBanner.svg' alt='button' onClick={onClick} />
      </div>
    )
  }
  
  const NextArrowButton = (props) => {
    const { className, style, onClick } = props
    return (
      <div className={`arrow ${className}`}>
        <img src='/icons/small-icons/Button_nextBanner.svg' alt='button' onClick={onClick} />
      </div>
    )
  }

  const settings = {
    dots: width < 768 ? false : true,
    arrows: width < 768 ? false : true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 5000,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: '10%',
    beforeChange: (current, next) => setImageIndex(next),
    dotsClass: "slick-dots slick-thumb",
    appendDots: dots => <ul>{dots}</ul>,
    customPaging: (i) => {
      return <div className="dot"></div>;
    },
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: false,
          centerPadding: false
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: false,
          centerPadding: false
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: false,
          centerPadding: false
        }
      }
    ],
    nextArrow: <NextArrowButton />,
    prevArrow: <PrevArrowButton />
  }

  const templateImages = images.map((image, idx) => {
    if (image !== null) {
      return (
        <div
          className={idx === imageIndex ? "activeSlide" : "slide"}
          key={image.id}
        >
          <div>
            {image.url !== "" ? <a href={image.url} target="_blank">{image.code ? image.code : <img className={idx === imageIndex ? "imgSliderPromo" : "imgSliderPromo imgNotActive"} src={image.src} alt={image.alt} />}</a> :
              image.code ? image.code : <img className={idx === imageIndex ? "imgSliderPromo" : "imgSliderPromo imgNotActive"} src={image.src} alt={image.alt} />}
          </div>
        </div>
      );
    }
    return null
  })

  return <Slider {...settings}>{templateImages}</Slider>
}

export default Component;