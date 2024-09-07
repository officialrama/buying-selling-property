const LabelTag = ({
    bgColor,
    bgColor2,
    textColor,
    text
}) => {

    return (
        <>
            <div className={`px-2 py-1 ml-4 mr-2 mt-2 text-sm tab:text-[10px] smallPc:text-[10px] xxl:text-[12px] ${bgColor ?? "bg-[#E84040]"} ${textColor ?? "text-white"} font-semibold rounded-tl-lg rounded-tr-lg rounded-br-lg relative w-fit`}>
                <p className="z-10">{text}</p>
                <svg className="absolute -bottom-[0.30rem] left-0 z-0" width="10" height="6" viewBox="0 0 8 4" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 0H8V4L2.45718 2.96072C1.03244 2.69358 0 1.44957 0 0Z" fill={`${bgColor2 ?? "#C61818"}`} />
                </svg>
            </div>
        </>
    )
}

export default LabelTag