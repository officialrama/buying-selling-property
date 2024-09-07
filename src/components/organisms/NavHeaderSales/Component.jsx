/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState, useRef } from "react";
import _ from "lodash-contrib";
import InitialsAvatar from "react-initials-avatar";
import cookie from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { userLogout } from "../../../store/actions/fetchData/userState";
import { GiHamburgerMenu } from "react-icons/gi";
import useWindowDimensions from "../../../utils/dimensions";
import { showAdmMenu } from "../../../store/actions/fetchData/superAdminState";
import { decryptStr, encryptStr } from "../../../helpers/encryptDecrypt";
import "@reach/menu-button/styles.css";
import './navheader.css';
import { Button } from "../../atoms";
import { useLocation, useNavigate } from "react-router-dom";
import { staticConst } from "../../../static/staticConst";
import { showModalLogin } from "../../../store/actions/changeState";

const Component = ({ onClickLogin }) => {
  const profile = cookie.get("morgateCookie") ? JSON.parse(cookie.get("morgateCookie")) : "";
  const dispatch = useDispatch();
  const state = useSelector((state) => state.stateReducer);
  const navigate = useNavigate();
  const [menuClicked, setMenuClicked] = useState(false);
  const { width } = useWindowDimensions();
  const saState = useSelector((state) => state.superAdminReducer);
  const [isDropdown, setIsDropdown] = useState(false);
  const [dropdownNotif, setDropdownNotif] = useState(false);
  const [listNotif, setListNotif] = useState({})
  const location = useLocation();
  const [openMenu, setOpenMenu] = useState({});
  const emailView = decryptStr(profile?.emailView).toString();
  useEffect(() => {
    if (menuClicked) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [menuClicked]);

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
    <>
    {!location.pathname.includes("/sales-dashboard/penjualanresult/sales") && !location.pathname.includes("/project-sales") && !location.pathname.includes("/kpr-sales") && !location.pathname.includes("/payment") && !location.pathname.includes("/kpr-sales/succes-beli") ? (
      <nav className="navbar__wrapperNav">
        <div className="navbar__container">
          <button
            onClick={() => {
              dispatch(showAdmMenu(!saState.showAdmMenu)); 
              // setMenuClicked(!menuClicked)
            }}
            type="button"
            className="navbar__btnBurger"
            aria-expanded="false"
            data-collapse-toggle="mobile-menu-4"
            aria-controls="mobile-menu-4"
          >
            <span className="sr-only">Open main menu</span>
            <img src={menuClicked ? "/icons/menu-exit.svg" : "/icons/menu-list.svg"} alt="menu" />
          </button>
          <img  src="/icons/logo.svg" alt="img" className="mobile:ml-12" />
          <div className="flex largePc:order-2 mobile:ml-auto mobile:mr-3 tab:ml-auto tab:mr-3">
            <div>
              {profile !== "" ? (
                <div className="navbar__wrapperAv">
                  <button 
                    className="navbar__btnProfile"
                    onClick={() => setIsDropdown(!isDropdown)}>
                    <InitialsAvatar 
                      className="navbar__avInit" 
                      name={profile?.emailView ? emailView : ""}  
                    />
                    <p className="navbar__profileName">{width >= 770 && emailView}</p>                      
                  </button>
                  <div className={`dropdown-list__wraperProfile ${isDropdown ? "block" : "hidden"}`}>
                    <ul className="dropdown-list-__listWrap">
                      <li>
                        <p onClick={() => dispatch(userLogout())} className="dropdown-list__list--sm">
                          Keluar
                        </p>
                      </li>
                    </ul>
                  </div>                    
                </div>
              ) : (
                <Button buttonColor="blueLight" textColor="blue" onClick={onClickLogin}>
                  {width >= 770 ? "Login / Daftar" : "Login"}
                </Button>                
              )}
            </div>
          </div>

          {profile !== "" ? 
            <>
              <div className="hidden justify-between items-center w-full largePc:flex largePc:w-auto largePc:order-1">
                {!location.pathname.includes("/sales-dashboard/datapenjualan") && !location.pathname.includes("/sales-dashboard/setting") ? (
                  <ul className="navbar__underList">
                    <li className="nav-item">
                      <p onClick={() => {
                          window.location.href = `/sales-dashboard/penjualanresult/sales`;
                        }}
                        className={`${profile !== "" ? "navbar__anchorLogin" : "navbar__anchor"}`}
                      >Penjualan</p>
                    </li>
                    <li className="nav-item">
                      <p onClick={() => {
                        window.location.href = `/sales-dashboard/datapenjualan/draft`;
                        }}
                        className={`${profile !== "" ? "navbar__anchorLogin" : "navbar__anchor"}`}>
                          Manag. Information System 
                      </p>
                    </li>
                  </ul>
                ) : ""}
              </div>
            </> : ""
          }               
        </div>
      </nav>
    ) : 
      <nav className="navbar__wrapperNav">
        <div className="navbar__container">
          <button data-collapse-toggle="mobile-menu-4" type="button" className="navbar__btnBurger" aria-controls="mobile-menu-4" aria-expanded="false" onClick={() => setMenuClicked(!menuClicked)}>
            <span className="sr-only">Open main menu</span>
            <img src={menuClicked ? "/icons/menu-exit.svg" : "/icons/menu-list.svg"} alt="menu" />
          </button>
          <img  src="/icons/logo.svg" alt="img"/>
          <div className="flex largePc:order-2 mobile:ml-auto mobile:mr-3 tab:ml-auto tab:mr-3">
            <div>
              {profile !== "" ? (
                <div className="navbar__wrapperAv">
                  <button 
                    className="navbar__btnProfile"
                    onClick={() => setIsDropdown(!isDropdown)}
                  >
                    <InitialsAvatar 
                      className="navbar__avInit" 
                      name={profile?.emailView ? emailView : ""}  
                    />
                    <p className="navbar__profileName">{width >= 770 && emailView}</p>
                  </button>
                  <div className={`dropdown-list__wraperProfile ${isDropdown ? "block" : "hidden"}`}>
                    <ul className="dropdown-list-__listWrap">
                      <li>
                        <p onClick={() => dispatch(userLogout())} className="dropdown-list__list--sm">
                          Keluar
                        </p>
                      </li>
                    </ul>
                  </div>
                </div>
              ) : ""}
            </div>
          </div>
          {profile !== "" ? 
            <>
              <div className="hidden justify-between items-center w-full largePc:flex largePc:w-auto largePc:order-1">
                {!location.pathname.includes("/sales-dashboard/datapenjualan") && !location.pathname.includes("/sales-dasboard/setting") ? (
                  <ul className="navbar__underList">
                    <li className="nav-item">
                      <p onClick={() => {
                          window.location.href = `/sales-dashboard/penjualanresult/sales`;
                        }}
                        className={`${profile !== "" ? "navbar__anchorLogin" : "navbar__anchor"}`}
                      >Penjualan</p>
                    </li>
                    <li className="nav-item">
                      <p onClick={() => {
                          window.location.href = `/sales-dashboard/datapenjualan/draft`;
                          }}
                          className={`${profile !== "" ? "navbar__anchorLogin" : "navbar__anchor"}`}>
                            Manag. Information System 
                      </p>
                    </li>
                  </ul>
                ) : ""}
              </div>
            </> : ""
          }
        </div>
      </nav>
    }    
    {!location.pathname.includes("/sales-dashboard/penjualanresult/sales") && !location.pathname.includes("/project-sales") && !location.pathname.includes("/kpr-sales") && !location.pathname.includes("/payment") && !location.pathname.includes("/payment-succes") && !location.pathname.includes("/payment-fail") ? (
      <div>
        {profile !== "" ? 
        <>
        <div className={`${menuClicked ? "" : "hidden"} navbar__mobileMenu`} id="mobile-menu-4">
          <ul className={`${menuClicked ? "" : "largePc:hidden"} navbar__underList`}>
            {staticConst.profileMenu.sales.userMenu.map((data, idx) => {
                return data.menu.subMenu ? (
                  <li key={idx}>
                    <button
                      type="button"
                      className="sm-admin__button-menu"
                      aria-controls={data.menu.status}
                      data-collapse-toggle={data.menu.status}
                      onClick={() => setOpenMenu({ ...openMenu, [data.menu.status] : !openMenu?.[data?.menu?.status]})}
                    >
                      <img src={location.pathname.includes(data.menu.path) ? `${data.menu.icon}-active.svg` : `${data.menu.icon}.svg`} />
                      <span sidebar-toggle-item="" className={`${saState.showAdmMenu ? "sm-admin__wrapperSmallPcAct__menuName" : "sm-admin__wrapperSmallPc__menuName"} ${location.pathname.includes(data.menu.path) ? "sm-admin__selected" : ""} sm-admin__btn-name`}>
                        {data.menu.name}
                      </span>
                      <svg
                        sidebar-toggle-item=""
                        className="w-6 h-6"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                    </button>
                    <ul
                      id={data.menu.status}
                      className={`${location.pathname.includes(data.menu.path) || openMenu?.[data?.menu?.status] ? "" : "hidden"} sm-admin__ul-sub`}
                    >
                      {data.menu.subMenu.map((dataSubMenu, index) => (
                        <li key={index} className={`${saState.showAdmMenu ? "block" : "hidden"} largePc:block`}>
                          <a href={dataSubMenu.path} className={`${location.pathname.includes(dataSubMenu.path) ? "sm-admin__selected-sub" : ""} sm-admin__link-sub`}>
                            {dataSubMenu.name}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </li>
                ) : (
                  <li key={idx}>
                    <a href="/sales-dashboard/setting">
                      <button type="button" className="sm-admin__btn-mon-status">
                        <img
                          src={location.pathname.includes(data.menu.path) ? `${data.menu.icon}-active.svg` : `${data.menu.icon}.svg`}
                          alt="icon"
                        />
                        <span className={`${saState.showAdmMenu ? "sm-admin__wrapperSmallPcAct__menuName" : "sm-admin__wrapperSmallPc__menuName"} ${location.pathname.includes(data.menu.path) ? "sm-admin__selected" : ""} sm-admin__span-mon`}>
                          {data.menu.name}
                        </span>
                      </button>
                    </a>
                    {/* <a href="/sales-dashboard/penjualanresult/sales">
                      <button type="button" className="sm-admin__btn-mon-status">
                        <img
                          src={location.pathname.includes(data.menu.path) ? `${data.menu.icon}-active.svg` : `${data.menu.icon}.svg`}
                          alt="icon"
                        />
                        <span className={`${saState.showAdmMenu ? "sm-admin__wrapperSmallPcAct__menuName" : "sm-admin__wrapperSmallPc__menuName"} ${location.pathname.includes(data.menu.path) ? "sm-admin__selected" : ""} sm-admin__span-mon`}>
                          {data.menu.name}
                        </span>
                      </button>
                    </a> */}
                  </li>
                );
              })}
          </ul>
        </div> 
      </> : ""}
    </div>
    ) : 
    <div>
      {profile !== "" ? 
      <>
      <div className={`${menuClicked ? "" : "hidden"} navbar__mobileMenu`} id="mobile-menu-4">
        <ul className={`${menuClicked ? "" : "largePc:hidden"} navbar__underList`}>
          <li className="nav-item">
            <p onClick={() => {
                window.location.href = `/sales-dashboard/penjualanresult/sales`;
              }}
              className = {`${profile !== "" ? "navbar__anchorLogin" : "navbar__anchor"}`}
            >Penjualan</p>
          </li>
          <li className="nav-item">
            <p 
              onClick={() => {
                window.location.href = `/sales-dashboard/datapenjualan/draft`;
              }}
              className={`${profile !== "" ? "navbar__anchorLogin" : "navbar__anchor"}`}            
            >
              Manag. Information System
            </p>
          </li>
        </ul>
      </div> 
      </> : ""}
    </div>
    }
    </>
  );
};

export default Component;
