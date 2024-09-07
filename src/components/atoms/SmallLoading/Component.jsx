import React from "react";

const Component = ({ blueColor }) => {
  return (
    <div>
      <div className={blueColor ? "lds-ring-blue" : "lds-ring"}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Component;
