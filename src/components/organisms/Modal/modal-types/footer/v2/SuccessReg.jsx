import { useDispatch } from "react-redux";
import { Link } from "react-router-dom"
import { closeModalSuccess } from "../../../../../../store/actions/fetchData/superAdminState";
import { Button } from "../../../../../atoms"

function FooterSuccessRegV2() {
  const dispatch = useDispatch();
  return (
    <div className="w-[100%] mt-4">
      <Link to="/profile-user/property-listing" onClick={() => dispatch(closeModalSuccess())}>
        <Button buttonColor="blue" textColor="white" fullWidth={true} paddingSize={"padding-0"}>
          Kembali ke Daftar Proyek
        </Button>
      </Link>
    </div>
  )
}

export default FooterSuccessRegV2