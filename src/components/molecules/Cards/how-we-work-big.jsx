import React from "react";
import { Link } from "react-router-dom";
import { Button } from "../../atoms";

const HowWeWorkBigCard = ({ title, desc }) => {
  return (
    <div className="landing-page hww-big">
      <div className="z-10">
        <h2 className="landing-page hww-big__title fontsize__medium">
          {title}
        </h2>
        <p className="telanding-page hww-big__desc">{desc}</p>
        <Link to="/about-us">
          <Button buttonColor="orange" textColor="white">
            Lihat Selengkapnya
          </Button>
        </Link>
      </div>
      <div className="z-0">
        <img
          className="landing-page hww-big__img"
          src="/icons/building.svg"
          alt="building"
        />
      </div>
    </div>
  );
};

export default HowWeWorkBigCard;
