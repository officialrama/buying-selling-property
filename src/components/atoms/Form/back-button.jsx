import React from 'react';
import { useNavigate } from "react-router-dom";

const FormBackButton = () => {

  const navigate = useNavigate();
  return (
    <button className="forgot-pass__form__backButton" onClick={() => navigate(-1)}>
      <img src="/icons/small-icons/arrow-back.svg" alt="Back Button" />
    </button>
  );
};

export default FormBackButton;