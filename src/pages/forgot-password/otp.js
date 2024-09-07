import React from 'react';
import FormForgotPassword from "../../components/organisms/Form/forgot-password";

const ForgotPasswordOTP = () => {
  return (
    <div className="forgot-pass__basePage">
      <FormForgotPassword title="Masukkan Kode OTP" bodyType="otp" />
      <p className="forgot-pass__copyright">© {new Date().getFullYear()} PT. Bringin Inti Teknologi (BIT) | All Rights Reserved.</p>
    </div>
  );
};

export default ForgotPasswordOTP;