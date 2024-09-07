import moment from "moment"
import { LabelTag } from "../../../molecules"
import { tagCategory } from "../../../../static/articleStaticConst"
import useWindowDimensions from "../../../../utils/dimensions"
import Carousel from "react-grid-carousel"

const ArticlePilihan = ({data, navigate}) => {
    const { width } = useWindowDimensions()

    return (
        <>
            {width > 640 ? (
                data?.map((data, key) => {
                    return (
                        <div key={key} className="relative p-4 small:w-[318px] xl:w-[280px] mx-auto" onClick={() => navigate(`/homespot-update/${data?.slug}`)}>
                            <div class="absolute z-10 small:left-[-3%] xl:left-[-3.5%]">                        
                                <LabelTag bgColor={tagCategory.find(tag => tag.name === data?.category?.name)?.bgColor} bgColor2={tagCategory.find(tag => tag.name === data?.category?.name)?.bgColor2} text={data?.category?.name} />
                            </div>
                            <div className="relative small:w-[318px] small:h-[424px] xl:-w[290px] xl:h-[396px] rounded-lg shadow-lg overflow-hidden">
                                <img src={data?.image_url} alt="Card Image" className="w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent p-4 flex flex-col justify-between">
                                    <div className="mt-auto">
                                        <p className="font-bold text-white text-base mb-2">{data?.title}</p>
                                        <p className="text-gray-300 text-xs">{moment(data?.created_at).format("DD MMMM YYYY")}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })
            ) : (
                <div className="landing-page city-carousel relative">
                    <Carousel cols={1} rows={1} gap={0} hideArrow={true} loop>
                        {data?.map((data, key) => (
                            <Carousel.Item key={key}>
                                <div key={key} className="relative p-4 mobile:w-[242px]" onClick={() => navigate(`/homespot-update/${data?.slug}`)}>
                                    <div class="absolute z-10 small:left-[-3%] mobile:left-[-3.5%]">                        
                                        <LabelTag bgColor={tagCategory.find(tag => tag.name === data?.category?.name)?.bgColor} bgColor2={tagCategory.find(tag => tag.name === data?.category?.name)?.bgColor2} text={data?.category?.name} />
                                    </div>
                                    <div className="relative mobile:h-[323px] mobile:w-[242px] rounded-lg shadow-lg overflow-hidden">
                                        <img src={data?.image_url} alt="Card Image" className="w-full h-full object-cover" />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent p-4 flex flex-col justify-between">
                                            <div className="mt-auto">
                                                <p className="font-bold text-white text-base mb-2">{data?.title}</p>
                                                <p className="text-gray-300 text-xs">{moment(data?.created_at).format("DD MMMM YYYY")}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Carousel.Item>
                        ))}
                    </Carousel>
                </div>
            )}
        </>
    )

}

export default ArticlePilihan