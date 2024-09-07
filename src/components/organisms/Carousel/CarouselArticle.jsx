import React, { useState } from 'react'
import Slider from 'react-slick'
import useWindowDimensions from '../../../utils/dimensions'
import { LabelTag } from '../../molecules'
import moment from 'moment'
import { tagCategory } from "../../../static/articleStaticConst"

const CarouselArticle = ({data, navigate, type}) => {
    const { width } = useWindowDimensions()
    const PrevArrowButton = (props) => {
        const { className, style, onClick } = props
        return (
            <div id="article-slick">
                <div className={`arrow ${className}`} >
                    <img src='/icons/small-icons/Button_prevBanner.svg' alt='button' onClick={onClick} />
                </div>
            </div>
        )
    }
      
      const NextArrowButton = (props) => {
        const { className, style, onClick } = props
        return (
            <div id="article-slick">
                <div className={`arrow ${className}`}>
                    <img src='/icons/small-icons/Button_nextBanner.svg' alt='button' onClick={onClick} />
                </div>
            </div>
        )
    }

    const settings = {
        infinite: true,
        autoplaySpeed: 5000,
        speed: 1000,
        slidesToShow: width > 1440 ? 5 : width < 640 ? 1 : 4,
        slidesToScroll: 1,
        nextArrow: <NextArrowButton />,
        prevArrow: <PrevArrowButton />
    }
 
    const Card = data?.map((data, idx) => {
        return (
            <div key={idx} className="relative w-[318px] h-[265px]" onClick={() => navigate(`/homespot-update/${data?.slug}`)}>
                <div className={`bg-white ${type === "article" ? "border border-[#EAEBEB]" : ""} rounded-lg shadow items-center h-full`}>
                    <div id="thumb-image" className="relative w-full h-[159px]">
                        <div className="absolute top-0 z-30 xxl:left-[-7.4%] xl:left-[-9.8%]">
                            <LabelTag bgColor={tagCategory.find(tag => tag.name === data?.category?.name)?.bgColor} bgColor2={tagCategory.find(tag => tag.name === data?.category?.name)?.bgColor2} text={data?.category?.name} />
                        </div>
                        <div className="w-full h-[159px]">
                            <img
                                className="bg-cover bg-center bg-no-repeat w-full h-full rounded-lg object-cover"
                                src={data?.image_url}
                                alt="img"
                            />
                        </div>
                        {data?.type === "video" && (
                            <div className="absolute inset-0 flex items-center justify-center">
                                <img className="w-[18px] h-[24px]" src="/icons/play_button.svg" alt="play_button" />
                            </div>
                        )}
                    </div>
                    <div className="flex flex-col cursor-default p-4 gap-1">
                        <p className="font-bold text-base text-black line-clamp-2">{data?.title}</p>
                        <p className="font-medium text-xs text-[#777777]">{moment(data?.created_at).format("DD MMMM YYYY")}</p>
                    </div>
                </div>
            </div>
        )
    })

    return <Slider {...settings}>{Card}</Slider>
}

export default CarouselArticle