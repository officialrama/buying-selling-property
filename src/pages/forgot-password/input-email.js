import FormForgotPassword from "../../components/organisms/Form/forgot-password";

const ForgotPassword = () => {
  return (
    <div className="forgot-pass__basePage">
      <FormForgotPassword title="Lupa Kata Sandi" bodyType="forgotPassword" />
      <p className="forgot-pass__copyright">© {new Date().getFullYear()} PT. Bringin Inti Teknologi (BIT) | All Rights Reserved.</p>
    </div>
  );
};

export default ForgotPassword;