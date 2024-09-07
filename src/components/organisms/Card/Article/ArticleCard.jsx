import moment from "moment"
import { tagCategory } from "../../../../static/articleStaticConst"
import { LabelTag } from "../../../molecules"
import useWindowDimensions from "../../../../utils/dimensions"

const ArticleCard = ({data, navigate}) => {
    const { width } = useWindowDimensions()
    
    return (      
        data?.map((data, key) => {
            return (
                <div key={key} className="mobile:landing-page mobile:city-carousel mobile:relative mobile:pl-4">
                    <div className="flex flex-row max-h-[160px] small:w-[432px] xl:w-[380px] gap-3 relative" onClick={() => navigate(`/homespot-update/${data?.slug}`)}>
                        <div className="relative">
                            <div className="absolute z-10 small:left-[-16.5%] xl:left-[-16.7%] mobile:left-[-16.7%]">
                                <LabelTag bgColor={tagCategory.find(tag => tag.name === data?.category?.name)?.bgColor} bgColor2={tagCategory.find(tag => tag.name === data?.category?.name)?.bgColor2} text={data?.category?.name} />
                            </div>
                            <div className="w-[160px] h-[160px]">
                                <img alt="image" src={data?.image_url} className="object-cover w-full h-full rounded-lg" />
                            </div>
                        </div>
                        <div className="flex flex-col gap-2 flex-grow min-w-0">
                            <p className="font-bold text-black small:text-base xl:text-[15px] break-words line-clamp-2">{data?.title}</p>
                            <p className="font-medium text-[12px] text-[#777777] break-words">{moment(data?.created_at).format("DD MMMM YYYY")}</p>
                        </div>
                    </div>
                </div>
            )
        })
    )
}

export default ArticleCard