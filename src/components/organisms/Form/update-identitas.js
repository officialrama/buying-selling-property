import React from 'react';
import FormBody from '../../molecules/Form/body';
import FormHeader from '../../molecules/Form/header-with-back-button';

const FormForgotPassword = ({ title, bodyType, showBackButton, paramId, action, user }) => {

  return (
    <div>
      <div className="forgot-pass__baseForm">
        <FormHeader text={title} showBackButton={false} />
        <FormBody type={bodyType} paramId={paramId} action={action} user={user} />
      </div>
    </div>
  );
};

export default FormForgotPassword;