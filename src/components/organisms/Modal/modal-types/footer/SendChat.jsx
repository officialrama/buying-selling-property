import { useDispatch } from "react-redux";
import { showChat } from "../../../../../store/actions/changeModalState";
import { Button } from "../../../../atoms";

function FooterSendChat() {
  const dispatch = useDispatch();
  return (
    <Button buttonColor="blue" textColor="white" fullWidth={true} paddingSize={"padding-0"} onClick={() => { dispatch(showChat(true)) }} >
      Kirim Chat
    </Button>
  )
}

export default FooterSendChat;