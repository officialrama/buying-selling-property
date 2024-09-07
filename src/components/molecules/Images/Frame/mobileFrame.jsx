import React, {useState} from "react"
import Slider from "react-slick"

const Component = ({
    images
}) => {
    const [imageIndex, setImageIndex] = useState(0)
    const settings = {
        dots: true,
        arrows: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        beforeChange: (current, next) => setImageIndex(next)
    }


    const templateImages = images.map((image, id) => {
        if(image != null){
            return (
                <div
                    className={`${id === imageIndex ? "activeSlide" : "slide"} w-full h-[218px]`}
                    key={id}
                >
                    <div>
                        <img
                         src={image?.sharedUrl} 
                         alt={image?.imageName}
                         className="bg-cover object-cover bg-center bg-no-repeat w-full"
                        />
                    </div>
                </div>
            )
        } else {
            return (<></>)
        }
    })
    return <Slider {...settings}>{templateImages}</Slider>
}

export default Component