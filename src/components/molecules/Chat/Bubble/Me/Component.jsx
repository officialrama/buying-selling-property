import React from "react";
import PropTypes from "prop-types";

function Component({ name, time, content, isRead, chatContent }) {
  return (
    <div className="chat__body__bubble-me">
      <div className="chat__body__bubble__chat-wrapper">
        {chatContent.map((items, idx) => {
          return (
            <div
              key={idx}
              className={`chat__body__bubble-me__content-wrapper ${
                idx !== 0 && "rounded-tr-xl"
              }`}
            >
              {idx === 0 && (
                <div className="chat__body__bubble-me__tri-right" />
              )}
              {idx === 0 && (
                <p className="chat__body__bubble-me__name">
                  <p>
                    {name}{" "}
                    <span className="chat__body__bubble-me__time">
                      &bull; {time}
                    </span>
                  </p>
                  {isRead ? (
                    <img
                      src="/icons/small-icons/read-checklist.svg"
                      alt="checklist"
                    />
                  ) : (
                    <></>
                  )}
                </p>
              )}
              <div>{items}</div>
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
