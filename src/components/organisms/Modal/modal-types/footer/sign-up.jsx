import { useDispatch, useSelector } from "react-redux";
import { showModalLogin, showModalRegister } from "../../../../../store/actions/changeState";
import { userReg } from "../../../../../store/actions/fetchData/userState";
import { Button, SmallLoading } from "../../../../atoms";

function FooterSignup() {
  const showModalRegisterState = useSelector(state => state.stateReducer);
  const loginState = useSelector(state => state.loginReducer);
  const dispatch = useDispatch();
  return (
    <div>
      <div className="w-full mb-6">
        <Button buttonColor="blue" textColor="white" fullWidth={true} paddingSize={"padding-1"} onClick={() => dispatch(userReg(loginState.inputUserReg))}>
          { showModalRegisterState.loading ? <SmallLoading /> : "Daftar Sekarang" }
        </Button>
      </div>
      <div className="flex place-content-center">
        <p className="font-medium text-[#101C3C] text-[14px] mr-2">Sudah punya akun?  <br /></p>
        <button onClick={showModalRegisterState.loading ? () => {} : () => { dispatch(showModalRegister(!showModalRegisterState.showModalRegister)); dispatch(showModalLogin(!showModalRegisterState.showModalLogin)) }}>
          <p className={`font-medium ${showModalRegisterState.loading ? "text-[#667085]" : "text-[#F87304]"} text-[14px]`}>Masuk</p>
        </button>
      </div>
    </div>
  );
}

export default FooterSignup;