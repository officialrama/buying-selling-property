import { Link, useLocation } from "react-router-dom";
import { Button } from "../../../../atoms";

function FooterKprSubmissionSalesDraft({ handleConvertSalesCalc, inputArrSalesPopup }){
    const location = useLocation();
    return (
        <div>
            {!location.pathname.includes("/kpr-sales/simulasi-sales") ? 
                <Button disabled={inputArrSalesPopup.filter(Boolean).length !==3 } onClick={handleConvertSalesCalc} buttonColor="blue" textColor="white" fullWidth={true} paddingSize={"padding-1"}>
                    Simulasi KPR dan Lanjut Draft
                </Button>
                :
                <Link to="/kpr-sales/simulasi-sales">
                    <Button disabled={!location.pathname.includes("/kpr-sales/simulasi-sales") ? inputArrSalesPopup.filter(Boolean).length !== 3 : false} buttonColor="blue" textColor="white" fullWidth={true} paddingSize={"padding-1"}></Button>
                    Lanjut
                </Link>
            }
        </div>
    )
}

export default FooterKprSubmissionSalesDraft;