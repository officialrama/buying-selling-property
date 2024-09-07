import React from 'react';
import FBDoneChangePass from './form-types/done';
import FBForgotPassword from './form-types/forgot-password';
import FBNewPassword from './form-types/new-password';
import FBOtp from './form-types/otp';
import EditIdentitas from './form-types/identitas';
import PreferenceVisitor from '../Modal/ModalPreferensiVisitor';
import { useSelector } from 'react-redux';
import { Modal } from '../../organisms';

const FormBody = ({ type, paramId, paramEmail, action, user }) => {
  const saState = useSelector((state) => state.superAdminReducer);
  const formSwitch = (type) => {
    switch (type) {
      case "forgotPassword":
        return <FBForgotPassword />;
      case "otp":
        return <FBOtp />;
      case "newPassword":
        return <FBNewPassword paramId={paramId} paramEmail={paramEmail} action={action} user={user} />;
      case "doneChangePass":
        return <FBDoneChangePass action={action} user={user} paramId={paramId} />;
      case "identitas":
        return <EditIdentitas action={action} user={user} paramId={paramId} />;        
      case "preferenceVisitor":
        return <PreferenceVisitor />;        
      default:
        return <div></div>;
    }
  };

  return (
    <div>
      <div className="forgot-pass__form__bodyForm__base">
      {saState.successRegisterV2 === true && (
        <Modal
          modalTypes="successRegisterV2"
          title=""
        />
      )}
        {formSwitch(type)}
      </div>
    </div>
  );
};

export default FormBody;