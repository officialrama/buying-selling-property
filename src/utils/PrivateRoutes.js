import { Navigate, Outlet } from 'react-router-dom';
import OutletIndex from '../pages/outlet';
import cookie from 'hs-cookie';
import { decryptStr } from '../helpers/encryptDecrypt';

const PrivateRoutes = (role) => {

    let typeUser = "";

    const morgateCookieStr = cookie.get("morgateCookie")

    if (morgateCookieStr) {
        const morgateCookie = JSON.parse(morgateCookieStr)
        typeUser = decryptStr(morgateCookie?.userType);
    }

    return (
        typeUser === role?.role ? <OutletIndex /> : <RedirectPage role={typeUser} />
    )
}

const RedirectPage = (role) => {
    // console.log("redirect page", role);
    switch (role?.role) {
        case "superadmin":
            return (<Navigate to='/admin/monitoring-status-user' />);
        case "developer":
            return (<Navigate to='/profile-user/property-listing' />);
        case "Sales":
            return (<Navigate to='/sales-dashboard/penjualanresult/sales' />);
        default:
            return (<Navigate to='/' />);
    }
}

export default PrivateRoutes;