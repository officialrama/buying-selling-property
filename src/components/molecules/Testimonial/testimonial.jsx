import React from "react";
import { Title } from "../../atoms";

const TestimonialHomepage = () => {
  return (
    <div className="landing-page testimoni">
      <div className="landing-page testimoni__text-right-wrap">
        <div className="mb-[2vh]">
          <Title
            className="fontsize__small fontcolor__blue fontweight__bold"
            text="Kata mereka yang telah mengajukan KPR BRI"
          />
        </div>
        <p className="landing-page testimoni__show-more">Lihat Semua</p>
      </div>
      <div className="landing-page testimoni__text-left-wrap">
        <img
          className="landing-page testimoni__img-people"
          src="/icons/people.png"
          alt="people"
        />
        <img
          className="landing-page testimoni__comma"
          src="/icons/comma.svg"
          alt="comma"
        />
        <p className="landing-page testimoni__testi-text">
          Apartment maintenance and staff is very courteous and kind and
          everything is completed in a timely manner.{" "}
        </p>

        <div className="landing-page testimoni__name-button-wrap">
          <div className="landing-page testimoni__name-flex">
            <p className="landing-page testimoni__name-people">Erin Carder</p>
            <p className="landing-page testimoni__name-pos">CEO Tech Company</p>
          </div>
          <div className="landing-page testimoni__btn-nav-flex">
            <img
              className="landing-page testimoni__btn-nav"
              src="/icons/small-icons/arrow-left-white.svg"
              alt="arrow-left"
            />
            <img
              className="landing-page testimoni__btn-nav"
              src="/icons/small-icons/arrow-right-white.svg"
              alt="arrow-right"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialHomepage;
