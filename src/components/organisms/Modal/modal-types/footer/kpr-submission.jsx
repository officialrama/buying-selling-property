import { Link, useLocation } from "react-router-dom";
import { Button } from "../../../../atoms";

function FooterKprSubmission({ handleConvertCalc, inputArrPopup }) {
  const location = useLocation();
  return (
    <div>
      {!location.pathname.includes("/kpr/simulasi") ?
        <Button disabled={inputArrPopup.filter(Boolean).length !== 3} onClick={handleConvertCalc} buttonColor="blue" textColor="white" fullWidth={true} paddingSize={"padding-1"}>
          Simulasi KPR dan Lanjut
        </Button>
        :
        <Link to="/kpr/approval">
          <Button disabled={!location.pathname.includes("/kpr/simulasi") ? inputArrPopup.filter(Boolean).length !== 3 : false} buttonColor="blue" textColor="white" fullWidth={true} paddingSize={"padding-1"}>
            Lanjut
          </Button>
        </Link>
      }

    </div>
  );
}

export default FooterKprSubmission;
