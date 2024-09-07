import { useDispatch, useSelector } from "react-redux";
import {
  showApprovalKprModal,
  showBrivaModal,
  showMethodPaymentModal,
} from "../../../../../store/actions/changeModalState";
import { Button } from "../../../../atoms";

function FooterPaymentMethod() {
  const stateRadio = useSelector((stateRadio) => stateRadio.radioReducer);
  const stateModal = useSelector((stateModal) => stateModal.modalReducer);
  const dispatch = useDispatch();
  const onClickSwitch = () => {
    if (stateRadio.cashSubmission === true) {
      dispatch(showBrivaModal(!stateModal.showBrivaModal));
    } else if (stateRadio.kprSubmission === true) {
      dispatch(showApprovalKprModal(!stateModal.showApprovalKprModal));
    }
  };
  return (
    <div>
      <Button
        buttonColor="blue"
        textColor="white"
        fullWidth={true}
        paddingSize={"padding-1"}
        onClick={() => {
          dispatch(showMethodPaymentModal(!stateModal.showMethodPaymentModal));
          onClickSwitch();
        }}
      >
        Lanjutkan dan Bayar
      </Button>
    </div>
  );
}

export default FooterPaymentMethod;
