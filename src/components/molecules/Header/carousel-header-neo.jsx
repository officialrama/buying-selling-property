import React from "react";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";
import { Title } from "../../atoms";

const CarouselHeaderNeo = ({ title, href }) => {
  return (
    <div className="pl-11 mt-20 pr-16">
    <div className="landing-page header-w-nav">
        <div className="flex flex-col">
            {/* <div className="flex mb-4">
                <img className="mr-2" src="/icons/icon-loc.svg" alt="img" />
                <p
                    className="landing-page header-w-nav__places text-[#666666] text-sm"
                    onClick={handleFindLocation}
                >
                    {kabKota}
                </p>
            </div> */}
            <div className="flex mb-2.5">
                <Title
                    className="landing-page font-bold fontsize__medium"
                    text="Cari Properti Berdasarkan Kota"
                />
            </div>

            <div className="flex mb-7 text-[#666666]">
                Yuk, cari properti yang sesuai dengan preferensimu di kota-kota pilihan terfavorit!
            </div>
            <div className="flex">
                <a
                    href={`/v2/search?type=city&cityName=all`}
                    className="landing-page header-w-nav__see-all-blue font-bold"
                >
                    Lihat Semua
                </a>
                <a href={`/v2/search?type=city&cityName=all`} className="flex items-center justify-center">
                    <HiOutlineArrowNarrowRight className="text-blue-500" />
                </a>

            </div>
        </div>

    </div>
</div>
  );
};

export default CarouselHeaderNeo;
