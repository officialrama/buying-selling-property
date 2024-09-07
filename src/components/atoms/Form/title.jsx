import React from 'react';
import Title from '../Text/title';

const FormTitle = ({text}) => {
  return (
    <div className="forgot-pass__form__title">
      <Title className="text-2xl text-[#292929] fontweight__bold" text={text} />
    </div>
  );
};

export default FormTitle;