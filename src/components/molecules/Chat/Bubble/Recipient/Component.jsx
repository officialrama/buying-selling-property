import React from "react";
import PropTypes from "prop-types";

function Component({ name, time, imgAvatar, chatContent }) {
  return (
    <div className="chat__body__bubble">
      <img
        className="chat__body__bubble__avatar"
        src={imgAvatar}
        alt="avatar"
      />
      <div className="chat__body__bubble__chat-wrapper">
        {chatContent.map((items, idx) => {
          return (
            <div
              key={idx}
              className={`chat__body__bubble__content-wrapper ${
                idx !== 0 && "rounded-tl-xl"
              }`}
            >
              {idx === 0 && <div className="chat__body__bubble__tri-left" />}
              {idx === 0 && (
                <p className="chat__body__bubble__name">
                  {name}{" "}
                  <span className="chat__body__bubble__time">
                    &bull; {time}
                  </span>
                </p>
              )}
              <p className="chat__body__bubble__items">{items}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

Component.propTypes = {
  name: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  imgAvatar: PropTypes.string.isRequired,
  chatContent: PropTypes.array.isRequired,
};

Component.defaultProps = {
  name: "",
  time: "",
  text: "",
  imgAvatar: "/icons/small-icons/avatar-example.svg",
  chatContent: [""],
};

export default Component;
