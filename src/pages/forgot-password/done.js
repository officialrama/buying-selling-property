import React from 'react';
import { useParams } from 'react-router-dom';
import FormBody from '../../components/molecules/Form/body';

const ForgotPasswordDoneChange = ({ action, user }) => {
  const { id } = useParams();
  return (
    <div className="forgot-pass__basePage">
      <div className="forgot-pass__baseForm">
        <FormBody type="doneChangePass" action={action} user={user} paramId={id} />
      </div>
      <p className="forgot-pass__copyright">© {new Date().getFullYear()} PT. Bringin Inti Teknologi (BIT) | All Rights Reserved.</p>
    </div>
  );
};

export default ForgotPasswordDoneChange;