import PropTypes from "prop-types"
import MobileFrame from "../Frame/mobileFrame"
import { useNavigate } from "react-router-dom";
import { formatDateIndo } from "../../../../helpers/date";
import { useEffect, useState } from "react";
import moment from "moment";


function Component({ 
  isMobile, 
  data,   
}) {
  const navigate = useNavigate();
  const [colorBadges0, setColorBadges0] = useState("")
  const [backgroundBadges0, setBackgroundBadges0] = useState("")
  const [colorBadges1, setColorBadges1] = useState("")
  const [backgroundBadges1, setBackgroundBadges1] = useState("")
  const [colorBadges2, setColorBadges2] = useState("")
  const [backgroundBadges2, setBackgroundBadges2] = useState("")
  const [colorBadges3, setColorBadges3] = useState("")
  const [backgroundBadges3, setBackgroundBadges3] = useState("")
  const colorMap = {
    1: { color: "#F87304", background: "#D16104" }, // Tips & Trick
    2: { color: "#E84040", background: "#C61818" }, // Legalitas
    3: { color: "#1078C", background: "#0C5A98" }, // Promo
    4: { color: "#27AE60", background: "#1D8348" }, // Finansial
    5: { color: "#8000C7", background: "#600095" }, // Design
    6: { color: "#EDB812", background: "#DEAB10" }, // LifeStyle
  };
  useEffect(() => {
      const categoryId = data?.[0]?.category?.id;
      if (colorMap[categoryId]) {
        setColorBadges0(colorMap[categoryId].color);
        setBackgroundBadges0(colorMap[categoryId].background);
      } else {
        setColorBadges0("");
        setBackgroundBadges0("");
      }
  }, [data?.[0]?.category?.id]);
  useEffect(() => {
    const categoryId = data?.[1]?.category?.id;
    if (colorMap[categoryId]) {
      setColorBadges1(colorMap[categoryId].color);
      setBackgroundBadges1(colorMap[categoryId].background);
    } else {
      setColorBadges1("");
      setBackgroundBadges1("");
    }
}, [data?.[1]?.category?.id]);
  useEffect(() => {
      const categoryId = data?.[2]?.category?.id;
      if (colorMap[categoryId]) {
        setColorBadges2(colorMap[categoryId].color);
        setBackgroundBadges2(colorMap[categoryId].background);
      } else {
        setColorBadges2("");
        setBackgroundBadges2("");
      }
  }, [data?.[2]?.category?.id]);
  useEffect(() => {
    const categoryId = data?.[3]?.category?.id;
    if (colorMap[categoryId]) {
      setColorBadges3(colorMap[categoryId].color);
      setBackgroundBadges3(colorMap[categoryId].background);
    } else {
      setColorBadges3("");
      setBackgroundBadges3("");
    }
}, [data?.[3]?.category?.id]);

  return (
    <>
        <div className="flex flex-row mobile:flex-col md:gap-6 md:mb-8 gap-6">
          <div className="relative w-[75%] mobile:w-[96%]" onClick={() => navigate(`/homespot-update/${data?.[0]?.slug}`) }>
          <div className="absolute top-2 z-30 -left-[18px]" >
          <div className={`px-2 py-1 ml-4 mr-2 mt-2 text-sm tab:text-[10px] smallPc:text-[10px] xxl:text-[12px] text-white font-semibold rounded-tl-lg rounded-tr-lg rounded-br-lg relative`}  style={{ backgroundColor: colorBadges0 }}>
          <p class="relative z-10">{data?.[0]?.category?.name}</p>
          <svg class="absolute -bottom-[0.30rem] left-0 z-0" width="10" height="6" viewBox="0 0 8 4" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 0H8V4L2.45718 2.96072C1.03244 2.69358 0 1.44957 0 0Z" fill={`${backgroundBadges0}`} />
              </svg>
            </div>
            </div>
          <div className="absolute left-1 w-full inset-0 bg-gradient-to-t from-[#292929] to-transparent rounded-lg"></div>
            <img
              className="pl-2 w-full h-[500px] mobile:h-[185px] object-cover mobile:object-fill rounded-lg"
              // src={filteredImg[0] ? filteredImg[0]?.sharedUrl : "/images/default.jpg"}
              src={data?.[0]?.image_url ? data?.[0]?.image_url : "/images/default.jpg" }
              alt="images"
            />
              <div className="absolute bottom-6 left-6 z-10 flex flex-col gap-2">
              <p className="font-bold text-base text-[#fff]">{data?.[0]?.title}</p>
              <p className="text-xs text-[#fff] font-medium">{moment.utc(data?.[0]?.published_at).utcOffset("0").format("DD MMM YYYY") ?? "-"}</p>
            </div>
          </div>
          <div className="h-[500px] flex flex-col gap-3 cursor-pointer mobile:px-3">
          {data[1] &&
            <div className="flex flex-row relative gap-3" onClick={() => navigate(`/homespot-update/${data?.[1]?.slug}`) }>
            <div className="absolute top-2 z-20 -left-[26px]" >
          <div className="px-2 py-1 ml-4 mr-2 mt-2 text-sm tab:text-[10px] smallPc:text-[10px] xxl:text-[12px] text-white font-semibold rounded-tl-lg rounded-tr-lg rounded-br-lg relative" style={{ backgroundColor: colorBadges1 }}>
          <p class="relative z-10">{data?.[1]?.category?.name}</p>
          <svg class="absolute -bottom-[0.30rem] left-0 z-0" width="10" height="6" viewBox="0 0 8 4" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 0H8V4L2.45718 2.96072C1.03244 2.69358 0 1.44957 0 0Z" fill={`${backgroundBadges1}`} />
              </svg>
            </div>
            </div>
            <img
              className="w-40 h-40 rounded-lg object-cover"
              // src={filteredImg[1] ? filteredImg[1]?.sharedUrl : "/images/default.jpg"}
              src={data?.[1]?.image_url ? data?.[1]?.image_url : "/images/default.jpg" }
              alt="images"
            />
            <div className="flex relative flex-col gap-2">
            <p className="font-bold text-base">{data?.[1]?.title}</p>
            <p className="text-[#777777] text-xs font-medium">{moment.utc(data?.[1]?.published_at).utcOffset("0").format("DD MMM YYYY") ?? "-"}</p>
            </div>
            </div>}
           {data[2] &&
            <div className="flex relative flex-row gap-3" onClick={() => navigate(`/homespot-update/${data?.[2]?.slug}`) }>
            <div className="absolute top-2 z-20 -left-[26px]" >
            <div className="px-2 py-1 ml-4 mr-2 mt-2 text-sm tab:text-[10px] smallPc:text-[10px] xxl:text-[12px] text-white font-semibold rounded-tl-lg rounded-tr-lg rounded-br-lg relative" style={{ backgroundColor: colorBadges2 }}>
          <p class="relative z-10">{data?.[2]?.category?.name}</p>
          <svg class="absolute -bottom-[0.30rem] left-0 z-0" width="10" height="6" viewBox="0 0 8 4" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 0H8V4L2.45718 2.96072C1.03244 2.69358 0 1.44957 0 0Z" fill={`${backgroundBadges2}`} />
              </svg>
            </div>
            </div>
            <img
              className="w-40 h-40 rounded-lg object-cover"
              // src={filteredImg[1] ? filteredImg[1]?.sharedUrl : "/images/default.jpg"}
              src={data?.[2]?.image_url ? data?.[2]?.image_url : "/images/default.jpg" }
              alt="images"
            />
            <div className="flex relative flex-col gap-2">
            <p className="font-bold text-base">{data?.[2]?.title}</p>
            <p className="text-[#777777] text-xs font-medium">{moment.utc(data?.[2]?.published_at).utcOffset("0").format("DD MMM YYYY") ?? "-"}</p>
            </div>
            </div>}
            {data[3] &&
              <div className="flex relative flex-row gap-3" onClick={() => navigate(`/homespot-update/${data?.[3]?.slug}`) }>
            <div className="absolute top-2 z-20 -left-[26px]" >
            <div className="px-2 py-1 ml-4 mr-2 mt-2 text-sm tab:text-[10px] smallPc:text-[10px] xxl:text-[12px] text-white font-semibold rounded-tl-lg rounded-tr-lg rounded-br-lg relative" style={{ backgroundColor: colorBadges3 }}>
          <p class="relative z-10">{data?.[3]?.category?.name}</p>
          <svg class="absolute -bottom-[0.30rem] left-0 z-0" width="10" height="6" viewBox="0 0 8 4" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 0H8V4L2.45718 2.96072C1.03244 2.69358 0 1.44957 0 0Z" fill={`${backgroundBadges3}`} />
              </svg>
            </div>
            </div>
            <img
              className="w-40 h-40 rounded-lg object-cover"
              // src={filteredImg[1] ? filteredImg[1]?.sharedUrl : "/images/default.jpg"}
              src={data?.[3]?.image_url ? data?.[3]?.image_url : "/images/default.jpg" }
              alt="images"
            />
            <div className="flex flex-col gap-2">
              <p className="font-bold text-base">{data?.[3]?.title}</p>
              <p className="text-[#777777] text-xs font-medium">{moment.utc(data?.[3]?.published_at).utcOffset("0").format("DD MMM YYYY") ?? "-"}</p>
            </div>
            </div>}
          </div>
        </div>
    </>
  );
}

Component.propTypes = {
};

Component.defaultProps = {
};

export default Component;
