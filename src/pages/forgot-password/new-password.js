import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Modal } from "../../components/organisms";
import FormForgotPassword from "../../components/organisms/Form/forgot-password";
import { closeModalFail } from "../../store/actions/fetchData/superAdminState";

const NewPassword = ({ action, user }) => {
  const { id } = useParams();
  const saState = useSelector((state) => state.superAdminReducer);
  const dispatch = useDispatch();

  return (
    <div className="forgot-pass__basePage">
      {saState.fail === true && (
        <Modal
          closeModal={() => dispatch(closeModalFail())}
          modalTypes="modalSF"
          title=""
          titleBody={saState.titleFail}
          descBody={saState.msgFail}
        />
      )}
      <FormForgotPassword title="Masukkan Password Baru" bodyType="newPassword" showBackButton={false} paramId={id} action={action} user={user} />
      <p className="forgot-pass__copyright">© {new Date().getFullYear()} PT. Bringin Inti Teknologi (BIT) | All Rights Reserved.</p>
    </div>
  );
};

export default NewPassword;