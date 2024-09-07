/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useRef } from "react";
import { Button } from 'flowbite-react'
import InitialsAvatar from "react-initials-avatar";
import {useDispatch, useSelector} from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { decryptStr, encryptStr } from "../../../helpers/encryptDecrypt";
import { setLongLat } from "../../../store/actions/changeState";
import { userLogout } from "../../../store/actions/fetchData/userState";
import useWindowDimensions from "../../../utils/dimensions";
import { staticConst } from "./../../../static/staticConst";
import "@reach/menu-button/styles.css";
import "@reach/combobox/styles.css";
import './navheader.css';
import Dropdown, { DropdownNested } from "./../../../static/dropdown";
import DropdownKpr, { DropdownKprNested } from "../../../static/dropdownkpr";
import useListPropertyHooks from "../../../hooks/useListPropertyHooks";
import { listKprProperty, getNotification, readNotification, listNotification } from "../../../store/actions/fetchData/inquiryProp";
import _ from "lodash-contrib";
import cookie from "hs-cookie";
import Notification from "./Notification";
import { DropdownNavbar } from "../../atoms/";

const Component = ({ onClickLogin }) => {
  const loginState = useSelector((state) => state.loginReducer)
  const saState = useSelector((state) => state.superAdminReducer);
  const {resApi: userProps} = loginState;

  const [isDropdown, setIsDropdown] = useState(false);
  const { width } = useWindowDimensions();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [menuClicked, setMenuClicked] = useState(false);
  const [click, setClick] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const [dropdownkpr, setDropdownKpr] = useState(false);
  const [dropdownNotif, setDropdownNotif] = useState(false);
  const [listNotif, setListNotif] = useState({})
  const location = useLocation();

  const { bodyListPengajuanKpr, listProp, setListProp, dataTemp, setDataTemp, setOnFetchData } = useListPropertyHooks();
  // useEffect(() => {
  //   if(loginState.isLoggedIn) {
  //     if(_.isJSON(cookie.get("morgateCookie")) && JSON.parse(cookie.get("morgateCookie")).email) {
  //       dispatch(listKprProperty({ ...bodyListPengajuanKpr, email: _.isJSON(cookie.get("morgateCookie")) ? JSON?.parse?.(cookie.get("morgateCookie"))?.email : "" }, setListProp, setOnFetchData));
  //     }
  //   }
  // }, [loginState.isLoggedIn]);

  // useEffect(() => {
  //   if(_.isJSON(cookie.get("morgateCookie")) && JSON.parse(cookie.get("morgateCookie")).email) {
  //     setDataTemp({
  //       ...dataTemp,
  //       originalRows: listProp?.res?.responseData,
  //       rows: listProp?.res?.responseData,
  //     });
  //     if(listProp?.res?.responseData) {
  //       const notEqualCode = ['200', '0']
  //       const seqArr = []
  //       listProp?.res?.responseData?.forEach((rd, seq) => {
  //         const index = notEqualCode.indexOf(rd.kpr.statusCodeBrispot)
  //         if(index === -1) {
  //           seqArr.push(seq)
  //         }
  //       })
  //       const kpr = listProp?.res?.responseData[seqArr[0]]?.kpr
  //       if (kpr) {
  //         dispatch(getNotification(
  //           {refNoPengajuanBrispot: kpr?.refNoPengajuanBrispot, nik: kpr?.nik, propertiId: kpr?.propertyId },
  //           setListNotif
  //         ))
  //       }
  //     }
  //   }
  // }, [listProp?.res]);

  useEffect(() => {
    if(loginState.isLoggedIn && decryptStr(JSON.parse(cookie.get("morgateCookie"))?.userType) === "visitor") {
    dispatch(listNotification(setListNotif));
    }
  }, [])
  
  const notifRef = useRef(null);
  const userTipe = decryptStr(userProps?.userType);

  const handleClickOutside = e => {
    if (!notifRef?.current?.contains(e.target)) {
        setDropdownNotif(false);
    }
  };

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const onMouseEnter = () => {
    if (window.innerWidth < 960) {
      setDropdown(false);
    } else {
      setDropdown(true);
    }
  };
  const onMouseLeave = () => {
    if (window.innerWidth < 960) {
      setDropdown(false);
    } else {
        setDropdown(false);
    }
  };

  const onMouseEnters = () => {
    if (window.innerWidth < 960) {
      setDropdownKpr(false);
    } else {
      setDropdownKpr(true);
    }
  };

  const onMouseLeaves = () => {
    if (window.innerWidth < 960) {
      setDropdownKpr(false);
    } else {
      setDropdownKpr(false);
  }
  };
  const onClickNotif = () => setDropdownNotif(!dropdownNotif);

  useEffect(() => {
    window.document.dispatchEvent(
      new Event("DOMContentLoaded", { bubbles: true, cancelable: true })
    );
  }, []);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  });

  useEffect(() => {
    if (menuClicked) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [menuClicked]);

  const handleClickNested = () => {
    setMenuClicked(!menuClicked);
    setDropdown(!dropdown);
  };

  const handleClickKprNested = () => {
    setMenuClicked(!menuClicked);
    setDropdownKpr(!dropdownkpr);
  };

  const handleReadNotif = (notif) => {
    dispatch(readNotification(notif.id, setListNotif))
    setDropdownNotif(false);
    navigate('/profile-user/list-pengajuan-kpr')
  }

  const handleLinkProfile = () => {
    let link
    switch(userTipe){
      case "CustomerService": 
        link = "/customer-service/setting"
      break;
      case "AdminCabang":
        link = "/admin-cabang/setting"
      break;
      default:
        link = "/profile-user/profile"
    }
    window.location.href = link 
  }

  return (
    <>
      {/* <nav className="navbarneo__wrapperNav" style={{ position: "sticky", top: 0, left: 0, right: 0, zIndex: 50 }}> */}
      <nav className="navbarneo__wrapperNav">
        <div className="navbarneo__container">
          {userTipe !== "developer" ? 
          <>
            <button data-collapse-toggle="mobile-menu-4" type="button" className="navbarneo__btnBurger absolute top-2 right-7" aria-controls="mobile-menu-4" aria-expanded="false" onClick={() => setMenuClicked(!menuClicked)}>
              <span className="sr-only">Open main menu</span>
              <img src={menuClicked ? "/icons/menu-exit.svg" : "/icons/menu-list.svg"} alt="menu" />
            </button>          
          </> : ""}
          {userTipe !== "developer" && userTipe !== "Sales" ?
            <a href="/">
              <img className="navbarneo__imgLink absolute left-8 top-3 mobile:left-5 mobile:top-4 w-[141px] h-[28px]" src="/icons/logo.svg" alt="img" />
            </a> : <img className="navbarneo__imgLink absolute left-8 top-3 mobile:left-5 mobile:top-4" src="/icons/logo.svg" alt="img" />
          }
          <div className="flex largePc:order-2 mobile:ml-auto mobile:mr-3 tab:ml-auto tab:mr-3">
            <div>
              {loginState.isLoggedIn ? (
                <div className="navbarneo__wrapperAv absolute top-2 right-9">
                  {userTipe === 'visitor' && (
                    <div ref={notifRef} className="absolute mobile:top-3 mobile:right-20 mobile:w-5 mobile:h-5 top-2 right-52 w-9 h-9">
                      <Notification
                        onClickNotif={onClickNotif}
                        dropdownNotif={dropdownNotif}
                        listNotif={listNotif}
                        handleReadNotif={handleReadNotif}
                      />
                    </div>
                  )}
                  <button
                    className="navbarneo__btnProfile"
                    onClick={() => setIsDropdown(!isDropdown)}
                  > 
                    {saState?.resApi?.responseData?.[0]?.ppUrl ?
                      <span className=" absolute top-1 right-44 w-8 h-8 mobile:right-9 mobile:top-2 mx-auto mobile:mb-2 tab:mb-2 xl:mx-0 rounded-full bg-[#F2F5F7] ring-2 object-cover">
                          <img
                            className="object-cover w-full h-full rounded-full"
                            src={saState?.resApi?.responseData?.[0]?.ppUrl}
                            alt="profile_pict"
                          />
                      </span>
                      :
                      <InitialsAvatar
                        className={`navbarneo__avInit absolute mobile:top-2 mobile:right-8 top-1 right-44 w-7 h-7 ${userTipe === "developer" ?  "absolute mobile:top-1 mobile:-right-5" : "" }`}
                        name={userProps?.emailView ? decryptStr(userProps?.emailView).toString() : ""}
                      />
                    }
                    <div className="navbarneo__profileName absolute top-2 right-1" style={{maxWidth: '165px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', color: '#fff'}}>{width >= 770 && decryptStr(userProps?.emailView)}</div>
                  </button>
                  <div className={`dropdown-list__wraperProfile ${isDropdown ? "block" : "hidden"}`}>
                    <ul className="dropdown-list__listWrap">
                      {userTipe !== "superadmin" && userTipe !== "Sales" ?
                        (staticConst.profileMenuNav.map((dataMap, idx) => (
                          <li key={idx}>
                            <p onClick={() => idx === 0 ? handleLinkProfile() : dispatch(userLogout())} className="dropdown-list__list--sm">
                              {dataMap.name}
                            </p>
                          </li>
                        )))
                        :
                        (staticConst.profileMenuNavSA.map((dataMap, idx) => (
                          <li key={idx}>
                            <p onClick={() => idx === 0 && dispatch(userLogout())} className="dropdown-list__list--sm">
                              {dataMap.name}
                            </p>
                          </li>
                        )))
                      }
                    </ul>
                  </div>
                </div>
              ) : (
                <div className="absolute top-2 right-8 mobile:hidden tab:hidden">
                <Button color="light" style={{border:"2px solid", borderColor:"#ffff", color:"#ffff", backgroundColor:"#1078CA", fontWeight:"bold"}} onClick={onClickLogin}>
                  {width >= 770 ? "Daftar / Login" : "Login"}
                </Button>
                </div>
              )}
            </div>
          </div>
          {/* Large Pc */}
          <div className="hidden justify-between items-center w-full largePc:flex largePc:w-auto largePc:order-1">
            <div className="">
              { !location.pathname.includes("/profile-user/property-listing") ?(
            <ul className="flex flex-row xxl:ml-0 largePc:-ml-3 mt-0 gap-2 xxl:space-x-3 xxl:text-sm font-medium largePc:text-xs largePc:space-x-1 absolute left-52 -top-3 smallPc:hidden">
              <li className="nav-item z-40 xxl:mt-[0px] largePc:mt-[1px]" onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
                {(userTipe !== "developer" && userTipe !== "superadmin" && userTipe !== "Sales" && userTipe !== "CustomerService" && userTipe !== "AdminCabang") ? (
                    <p className='nav-links' onClick={closeMobileMenu}>
                      <DropdownNavbar
                        placeholder="Kota Pilihan"
                        onClickDrop={() => {
                          setIsDropdown({

                          })
                        }}
                      />
                      {/* <span>Kota Pilihan</span><span aria-hidden>▾</span> */}
                    </p>
                ): <></>}
                  {dropdown && <Dropdown />}
              </li>
              

              <li className="nav-item">
                {userTipe !== "developer" && userTipe !== "superadmin" && userTipe !== "Sales" && userTipe !== "CustomerService" && userTipe !== "AdminCabang" ? (
                  <li>
                    <p onClick={() => {
                      navigator.geolocation.getCurrentPosition(function (position) {
                        dispatch(setLongLat(position.coords.longitude, position.coords.latitude));
                        window.location.href = `/v2/search?type=nearby&lat=${position.coords.latitude}&lng=${position.coords.longitude}`;
                      }, (err => {
                        // default surabaya
                        dispatch(setLongLat(112.768845, -7.250445));
                        window.location.href = `/v2/search?type=nearby&lat=${-7.250445}&lng=${112.768845}`;
                      }));
                      localStorage.removeItem('infolelangUtj')
                      }
                    }className={`${userProps.isLoggedIn ? "navbarneo__anchorLogin" : "navbarneo__anchor"}`}
                    style={{color:"#fff", fontWeight:"600"}}>
                      Beli
                    </p>
                  </li>
                ) : ("") }
              </li>

              <li className="nav-item z-40 xxl:mt-[0px] largePc:mt-[1px]" onMouseEnter={onMouseEnters} onMouseLeave={onMouseLeaves}>
                {(loginState.isLoggedIn && userTipe === "visitor") ? (
                  <p className='nav-links' onClick={closeMobileMenu}>
                    <DropdownNavbar
                      placeholder="KPR"
                      onClickDrop={() => {
                        setIsDropdown({

                        })
                      }}
                    />
                    {/* <span>KPR</span><span aria-hidden>▾</span> */}
                  </p>
                ): <></>}
                {dropdownkpr && <DropdownKpr />}
              </li>

              <li className="nav-item">
                {(userTipe !== "developer" && userTipe !== "superadmin" && userTipe !== "Sales" && userTipe !== "CustomerService" && userTipe !== "AdminCabang") ? (
                    <Link to="/about-us">
                      <p className={`${userProps.isLoggedIn ? "navbarneo__anchorLogin" : "navbarneo__anchor"}`}
                      style={{color:"#fff", fontWeight:"600"}}>
                        Tentang Kami
                      </p>
                    </Link>
                ): <></>}
              </li>

              <li className="nav-item">
                {(userTipe !== "developer" && userTipe !== "superadmin" && userTipe !== "Sales" && userTipe !== "CustomerService" && userTipe !== "AdminCabang") ? (
                    <Link to="/insurance">
                      <p className={`${userProps.isLoggedIn ? "navbarneo__anchorLogin" : "navbarneo__anchor"}`}
                      style={{color:"#fff", fontWeight:"600"}}>
                        Asuransi
                      </p>
                    </Link>
                ): <></>}
              </li>

              <li className="nav-item">
                {(userTipe !== "developer" && userTipe !== "superadmin" && userTipe !== "Sales" && userTipe !== "CustomerService" && userTipe !== "AdminCabang") ? (
                    <p onClick={() => {
                      navigator.geolocation.getCurrentPosition(function (position) {
                        dispatch(setLongLat(position.coords.longitude, position.coords.latitude));
                        window.location.href = `/properti-secondary?lat=${position.coords.latitude}&lng=${position.coords.longitude}`;
                      });
                      localStorage.removeItem('FilterInfoLelang')
                      localStorage.removeItem('infolelangDetail')
                      localStorage.removeItem('infolelangUtj')
                      }
                    }className={`${userProps.isLoggedIn ? "navbarneo__anchorLogin" : "navbarneo__anchor"}`}
                    style={{color:"#fff", fontWeight:"600"}}>
                      Properti Aset Bank
                    </p>
                ): <></>}
              </li>
                
              <li className="nav-item">
                {(userTipe !== "developer" && userTipe !== "superadmin" && userTipe !== "Sales" && userTipe !== "CustomerService" && userTipe !== "AdminCabang") ? (
                    <Link to="/homespot-update">
                      <p className={`${userProps.isLoggedIn ? "navbarneo__anchorLogin" : "navbarneo__anchor"}`}
                      style={{color:"#fff", fontWeight:"600"}}>
                        Homespot Update
                      </p>
                    </Link>
                ): <></>}
              </li>

            {/* <ul className="navbar__underList smallPc:hidden">
              {decryptStr(userProps?.userType) !== "developer" && decryptStr(userProps?.userType) !== "superadmin" ? (staticConst.navigation || []).map((nav, idx) => (
                <li key={idx}>
                  <p onClick={() => {
                    if (nav.title === "Beli") {
                      navigator.geolocation.getCurrentPosition(function (position) {
                        dispatch(setLongLat(position.coords.longitude, position.coords.latitude));
                        window.location.href = `/v2/search?type=nearby&lat=${position.coords.latitude}&lng=${position.coords.longitude}`;
                      });
                    } else {
                      navigate(nav.path);
                    }
                  }} className={`${userProps.isLoggedIn ? "navbar__anchorLogin" : "navbar__anchor"}`}>
                    {nav.title}
                    </p>
                </li>
              )) : ("") } */}

              {/* {(decryptStr(userProps?.userType) !== "developer" && decryptStr(userProps?.userType) !== "superadmin") ? (
                <li>
                  <p className={`${userProps.isLoggedIn ? "navbar__anchorLogin" : "navbar__anchor"}`}>
                    <HoverCityButton title="Kota Pilihan" />
                  </p>
                </li>
              ) : <></> } */}

              {/* {decryptStr(userProps?.userType) !== "developer" && decryptStr(userProps?.userType) !== "superadmin" ? (staticConst.navigation || []).map((nav, idx) => (
                <li key={idx}>
                  <p onClick={() => {
                    if (nav.title === "Beli") {
                      navigator.geolocation.getCurrentPosition(function (position) {
                        dispatch(setLongLat(position.coords.longitude, position.coords.latitude));
                        window.location.href = `/v2/search?type=nearby&lat=${position.coords.latitude}&lng=${position.coords.longitude}`;
                      });
                    } else {
                      navigate(nav.path);
                    }
                  }} className={`${userProps.isLoggedIn ? "navbar__anchorLogin" : "navbar__anchor"}`}>
                    Beli
                  </p>
                </li>
              )) : ("") } */}

              {/* {(decryptStr(userProps?.userType) !== "developer" && decryptStr(userProps?.userType) !== "superadmin") ? (
                <li>
                  <p className={`${userProps.isLoggedIn ? "navbar__anchorLogin" : "navbar__anchor"}`}>
                    <HoverMenuButton title="Beli" />
                  </p>
                </li>
              ) : <></> } */}

              {/* {(loginState.isLoggedIn && decryptStr(userProps?.userType) === "developer" && decryptStr(userProps?.userType) !== "superadmin") ? (
                <Link to="/profile-user/property-listing">
                  <Button buttonColor="blueLight" textColor="blue">
                    Jual Properti
                  </Button>
                </Link>
              ) : <></>} */}

            </ul>
            )  : ""}
            </div>
          </div>
        </div>
      </nav>
      {/* Small Pc, Tablet, Mobile */}
      <div className={`${menuClicked ? "" : "hidden"} navbarneo__mobileMenu px-4`} id="mobile-menu-4">
        <ul className={`${menuClicked ? "" : "largePc:hidden"} navbarneo__underList`}>
        <li className="nav-item-mobile" onClick={() => setMenuClicked(false)}>
          {loginState?.isLoggedIn !== true ?(
        <Button color="light" style={{border:"2px solid", borderColor:"#ffff", color:"#ffff", fontWeight:"bold", backgroundColor:"#1078CA", width:"90%"}} onClick={onClickLogin}>
         Daftar / Login
        </Button>
        ): <></>}
        </li>
        <li className="nav-item-mobile">
          {(userTipe !== "developer" && userTipe !== "superadmin" && userTipe !== "Sales") ? (
            <li onClick={() => setDropdown(!dropdown)}>
              <p className={`${userProps.isLoggedIn ? "navbarneo__anchorLogin" : "navbarneo__anchor"}`}>
               <p>
                  <DropdownNavbar 
                    placeholder="Kota Pilihan"
                    onClickDrop={() => {
                      setIsDropdown({

                      })
                    }}
                  />
                  {/* <span>Kota Pilihan</span><span aria-hidden>▾</span> */}
               </p>
              </p>
            </li>
          ): ("")}
          {/* {dropdown && <Dropdown />} */}
        </li>
        {dropdown && <DropdownNested handleClick={handleClickNested} />}

        <li className="nav-item-mobile">
          {userTipe !== "developer" && userTipe !== "superadmin" && userTipe !== "Sales" && userTipe !== "CustomerService" && userTipe !== "AdminCabang" ? (
            <li>
              <p
                onClick={() => {
                  navigator.geolocation.getCurrentPosition(function (position) {
                    dispatch(setLongLat(position.coords.longitude, position.coords.latitude));
                    window.location.href = `/v2/search?type=nearby&lat=${position.coords.latitude}&lng=${position.coords.longitude}`;
                  }, (err => {
                    // default surabaya
                    dispatch(setLongLat(112.768845, -7.250445));
                    window.location.href = `/v2/search?type=nearby&lat=${-7.250445}&lng=${112.768845}`;
                  }))
                }}
                className={`${userProps.isLoggedIn ? "navbarneo__anchorLogin" : "navbarneo__anchor"}`}
                style={{color:"#fff", fontWeight:"600"}}>
                Beli
              </p>
            </li>
          ) : ("") }
        </li>

        <li className="nav-item-mobile">
          {(loginState.isLoggedIn && userTipe === "visitor") ? (
            <p>
              <li onClick={() => setDropdownKpr(!dropdownkpr)}>
              <p className={`${userProps.isLoggedIn ? "navbarneo__anchorLogin" : "navbarneo__anchor"}`}>
                {/* <span>KPR</span><span aria-hidden>▾</span> */}
                <DropdownNavbar 
                  placeholder="KPR"
                  onClickDrop={() => {
                    setIsDropdown({

                    })
                  }}
                />
              </p>
              </li>
            </p>
          ): <></>}
          {/* {dropdownkpr && <DropdownKpr />} */}
        </li>
        {dropdownkpr && <DropdownKprNested handleClick={handleClickKprNested} />}

        <li className="nav-item-mobile" onClick={() => setMenuClicked(false)}>
          {(userTipe !== "developer" && userTipe !== "superadmin" && userTipe !== "Sales" && userTipe !== "CustomerService" && userTipe !== "AdminCabang") ? (
            <Link to="/about-us">
              <p className={`${userProps.isLoggedIn ? "navbarneo__anchorLogin" : "navbarneo__anchor"}`}
              style={{color:"#fff", fontWeight:"600"}}>
                Tentang Kami
              </p>
            </Link>
          ): <></>}
        </li>

        <li className="nav-item-mobile" onClick={() => setMenuClicked(false)}>
          {(userTipe !== "developer" && userTipe !== "superadmin" && userTipe !== "Sales" && userTipe !== "CustomerService" && userTipe !== "AdminCabang") ? (
            <Link to="/insurance">
              <p className={`${userProps.isLoggedIn ? "navbarneo__anchorLogin" : "navbarneo__anchor"}`}
              style={{color:"#fff", fontWeight:"600"}}>
                Asuransi
              </p>
            </Link>
          ): <></>}
        </li>

        <li className="nav-item-mobile" onClick={() => setMenuClicked(false)}>
          {(userTipe !== "developer" && userTipe !== "superadmin" && userTipe !== "Sales" && userTipe !== "CustomerService" && userTipe !== "AdminCabang") ? (
            <Link to="/properti-secondary">
              <p className={`${userProps.isLoggedIn ? "navbarneo__anchorLogin" : "navbarneo__anchor"}`}
              style={{color:"#fff", fontWeight:"600"}}>
                Properti Aset Bank
              </p>
            </Link>
          ): <></>}
        </li>

        <li className="nav-item-mobile" onClick={() => setMenuClicked(false)}>
          {(userTipe !== "developer" && userTipe !== "superadmin" && userTipe !== "Sales" && userTipe !== "CustomerService" && userTipe !== "AdminCabang") ? (
            <Link to="/homespot-update">
              <p className={`${userProps.isLoggedIn ? "navbarneo__anchorLogin" : "navbarneo__anchor"}`}
              style={{color:"#fff", fontWeight:"600"}}>
                Homespot Update
              </p>
            </Link>
          ): <></>}
        </li>

        <li className="nav-item">
          {(loginState.isLoggedIn &&  userTipe === "Sales") ? (
              <li>
                <p onClick={() => {
                    window.location.href = `/sales-dashboard/penjualanresult/sales`;
                  }}
                    className={`${userProps?.isLoggedIn ? "navbarneo__anchorLogin" : "navbarneo__anchor"}`}>
                      Penjualan
                </p>
              </li>
          ) : <></>} 
        </li>

        <li className="nav-item">
          {(loginState.isLoggedIn &&  userTipe === "Sales") ? (
              <li>
                <p onClick={() => {
                    window.location.href = `/sales-dashboard/datapenjualan/draft`;
                  }}
                    className={`${userProps?.isLoggedIn ? "navbarneo__anchorLogin" : "navbarneo__anchor"}`}>
                      Manag. Information System
                </p>
              </li>
          ) : <></>} 
        </li>        

        </ul>
        </div>
                  {/* {(staticConst.navigation || []).map((nav, idx) => (
            <li key={idx}>
              <p onClick={() => {
                  navigator.geolocation.getCurrentPosition(function (position) {
                    dispatch(setLongLat(position.coords.longitude, position.coords.latitude));
                    window.location.href = `/v2/search?type=nearby&lat=${position.coords.latitude}&lng=${position.coords.longitude}`;
                  });
                setMenuClicked(false);
              }} className={`${userProps.isLoggedIn ? "navbar__anchorLogin" : "navbar__anchor"}`}>
                Beli
              </p>
            </li>
          ))} */}

        {/* <div className="largePc:hidden mobile:m-4 tab:m-4">
          {(loginState.isLoggedIn && decryptStr(userProps?.userType) !== "visitor" && decryptStr(userProps?.userType) !== "superadmin") ? (
            <Link to="/profile-user/property-listing" onClick={() => { setMenuClicked(false) }}>
              <Button buttonColor="blueLight" textColor="blue">
                Jual Properti
              </Button>
            </Link>
          ) : <></>}
        </div> */}
    </>
  );
};

export default Component;
