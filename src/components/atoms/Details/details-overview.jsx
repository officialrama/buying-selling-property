import React from "react";

const DetailsOverview = ({ title, details }) => {
  return (
    <div>
      <p className="kprSim__pages__right__detailLoans__content__title">
        {title}
      </p>
      <div className="kprSim__pages__right__detailLoans__content__oneline">
        {details.map((data, index) => {
          return (
            <div
              key={index}
              className="kprSim__pages__right__detailLoans__content__oneline-wrap"
            >
              <p className="w-[50%]">{data.field}</p>
              <p className="w-[50%]">{data.value}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DetailsOverview;
