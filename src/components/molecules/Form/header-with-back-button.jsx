import PropTypes from "prop-types";
import React from "react";
import FormBackButton from "../../atoms/Form/back-button";
import FormTitle from "../../atoms/Form/title";

function FormHeader({ text, showBackButton }) {
  const backButtonSwitch = (showBackButton) => {
    switch (showBackButton) {
      case true:
        return <FormBackButton />;
      case false:
        return <div></div>;
      default:
        return <div></div>;
    }
  };

  return (
    <div className="forgot-pass__form__baseForm">
      {window.location.pathname.includes('/visitor/activate') ?
       <></> :
       <div>
      {backButtonSwitch(showBackButton)}
      </div>
      }
      <FormTitle text={text} />
    </div>
  );
}

FormHeader.propTypes = {
  text: PropTypes.string.isRequired,
  showBackButton: PropTypes.bool.isRequired,
};

FormHeader.defaultProps = {
  text: "Title",
  showBackButton: true,
};

export default FormHeader;
