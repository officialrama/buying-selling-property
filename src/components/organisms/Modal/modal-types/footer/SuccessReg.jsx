import { useDispatch } from "react-redux";
import { Link } from "react-router-dom"
import { closeModalSuccess } from "../../../../../store/actions/fetchData/superAdminState";
import { Button } from "../../../../atoms"

function FooterSuccessReg() {
  const dispatch = useDispatch();
  return (
    <div className="w-[100%] mt-4">
      <Link to="/profile-user/property-listing" onClick={() => dispatch(closeModalSuccess())}>
        <Button buttonColor="blue" textColor="white" fullWidth={true} paddingSize={"padding-0"}>
          Lihat Dashboard
        </Button>
      </Link>
    </div>
  )
}

export default FooterSuccessReg