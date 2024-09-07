import React from 'react';

const HowWeWorkCard = ({number, title, desc, imgSrc}) => {
    return (
      <div className="landing-page hww">
        <div className="landing-page hww__icon-wrap">
          <p className="landing-page hww__title">{number}</p>
          <img src={imgSrc} alt="img" />
        </div>
        <p className="landing-page hww__title">{title}</p>
        <p className="landing-page hww__desc">
          {desc}
        </p>
      </div>
    );
};

export default HowWeWorkCard;