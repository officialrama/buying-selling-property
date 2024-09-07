/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from "react";
import InitialsAvatar from "react-initials-avatar";
import cookie from "hs-cookie";
import { useDispatch, useSelector } from "react-redux";
import { userLogout } from "../../../store/actions/fetchData/userState";
import { GiHamburgerMenu } from "react-icons/gi";
import useWindowDimensions from "../../../utils/dimensions";
import { showAdmMenu } from "../../../store/actions/fetchData/superAdminState";
import { decryptStr } from "../../../helpers/encryptDecrypt";

const Component = ({ menuOnClick }) => {
  const profile = JSON.parse(cookie.get("morgateCookie"));
  const dispatch = useDispatch();
  const { width } = useWindowDimensions();
  const saState = useSelector((state) => state.superAdminReducer);
  const [isDropdown, setIsDropdown] = useState(false);
  const emailView = decryptStr(profile?.emailView).toString();
  useEffect(() => {
    return () => {
      window.document.dispatchEvent(
        new Event("DOMContentLoaded", {
          bubbles: true,
          cancelable: true,
        })
      );
    };
  }, []);

  return (
    <div className="nav-header-admin__wrapper">
      <button
        onClick={() => dispatch(showAdmMenu(!saState.showAdmMenu))}
        className={`p-2 mobile:justify-center tab:justify-center smallPc:justify-center largePc:hidden`}
      >
        <GiHamburgerMenu />
      </button>
      <div>
        <div>
          <span className="nav-header-admin__title--mortgage mobile:hidden">
            <img className="navbar__imgLink" src="/icons/logo.svg" alt="img" />
          </span>
          <span className="nav-header-admin__title--h-line mobile:hidden"> | </span>
          <span className="nav-header-admin__title--mgmt-sys">
            {width >= 640 ? "MANAGEMENT SYSTEM" : "MGMT SYSTEM"}
          </span>
        </div>
      </div>
      <div className="nav-header-admin__user-wrap mobile:hidden tab:hidden" onClick={() => setIsDropdown(!isDropdown)}>
        {/* <img alt="small-icons" src="/icons/small-icons/notif.svg" className="px-4"/> */}
        {/* <img src="/icons/small-icons/av-admin.svg" className="nav-header-admin__space-left" /> */}
        <InitialsAvatar
          className="navbar__avInit"
          name={profile?.emailView ? emailView : "superadmin@gmail.com"}
        />
        <p className="nav-header-admin__name">{profile?.emailView ? emailView : "superadmin@gmail.com"}</p>
        <button>
          <img alt="small-icons" src="/icons/small-icons/arrow-down.svg" className="nav-header-admin__space-left" />
        </button>
        <div className={`dropdown-list__wraperAdmin  ${isDropdown ? "block" : "hidden"}`}>
          <ul className="dropdown-list__listWrap" aria-labelledby="dropdownAdmin">
            <li>
              <p onClick={() => dispatch(userLogout())} className="dropdown-list__list--sm">
                Keluar
              </p>
            </li>
          </ul>
        </div>
      </div>
      {width <= 769 && <div>
        <div className="nav-header-admin__user-wrap largePc:hidden smallPc:hidden" onClick={() => { setIsDropdown(!isDropdown); dispatch(showAdmMenu(false)) }}>
          {/* <img alt="small-icons" src="/icons/small-icons/notif.svg" /> */}
          <img src="/icons/small-icons/av-admin.svg" className="nav-header-admin__space-left" />
        </div>
        <div className={`dropdown-list__wraperAdmin  ${isDropdown ? "block" : "hidden"}`}>
          <ul className="dropdown-list__listWrap" aria-labelledby="dropdownAdmin">
            <li>
              <p onClick={() => dispatch(userLogout())} className="dropdown-list__list--sm">
                Keluar
              </p>
            </li>
          </ul>
        </div>
      </div>}
    </div>
  );
};

export default Component;
