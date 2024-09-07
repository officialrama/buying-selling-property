import React from "react";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";

const CarouselHeader = ({ title, href }) => {
  return (
    <div className="landing-page header-w-nav flex mobile:flex-col">
      <div className="flex">
        <h2 className="landing-page header-w-nav__title-virtual fontsize__medium text-black mobile:pl-4">
          {title}
        </h2>
      </div>
      <div className="flex flex-row mobile:pl-4 mobile:mt-2">
        <a href={href || '#'} className="landing-page header-w-nav__see-all-blue" >Lihat Semua </a> <a href={href || '#'}></a>
      </div>
    </div>
  );
};

export default CarouselHeader;
