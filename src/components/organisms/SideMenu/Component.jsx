/* eslint-disable react-hooks/exhaustive-deps */
import cookie from "hs-cookie";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { useLocation } from "react-router-dom";
import { decryptStr } from "../../../helpers/encryptDecrypt";
import { staticConst } from "../../../static/staticConst";
import { disableEdit, inquiryUser } from "../../../store/actions/fetchData/superAdminState";


const SideMenu = ({ userStatus, data }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const morgateCookie = cookie.get("morgateCookie");
  const cookieIsExist = morgateCookie && JSON.parse(morgateCookie);

  useEffect(() => {
    dispatch(inquiryUser(cookieIsExist.email));
    dispatch(disableEdit(true));
  }, []);

  return (
    <div className="sideMenu__wrapper __montserat-text">
      <div className="sideMenu__acc-info">
        {!data?.ppUrl ?
          <div className="sideMenu__profile-pic">
            <img className="profile-page__profile-pic-icon" src="/icons/avatar.svg" alt="avatar" />
          </div>
          :
          <img src={data?.ppUrl} alt="profile_pict" className="sideMenu__profile-pic" />
        }
        <div>
          <div className="sideMenu__name">
            {decryptStr(userStatus) === "visitor" || decryptStr(userStatus) === "CustomerService" || decryptStr(userStatus) === "AdminCabang" ?
              ((data?.metadata?.fullName)?.length > 10 ? ((data?.metadata?.fullName).slice(0, 9) + "...") : (data?.metadata?.fullName)) :
              ((data?.metadata?.name)?.length > 10 ? ((data?.metadata?.name).slice(0, 9) + "...") : (data?.metadata?.name)) 
            }
          </div>
          {data?.status === "Active" || data?.status === "SocialMediaLogin" ? (
            <div className="sideMenu__status-wrap">
              <span>
                <img src={`${decryptStr(userStatus) === "CustomerService" ? "/icons/small-icons/Check Circle_blue.svg" : "/icons/Vector (2).svg"}`} alt="verif" className="" />
              </span>
              <p className="sideMenu__status">{data?.status === "Active" || data?.status === "SocialMediaLogin" ? "Akun terverifikasi" : ""}</p>
            </div>
          ): <></>}
        </div>
      </div>
      <div className="my-5 w-full border-t border-gray-300" />
      <div className="mt-2">
        {decryptStr(userStatus) === "visitor"
          ? staticConst.profileMenu.user.userMenu.map((el, index) => (
            <div key={index}>
              {el.menu.subMenu.map((elm, idx) => (
                <div
                  className={`${location.pathname === elm.path
                    ? "bg-[#EAF6FF] text-[#00529C]"
                    : "bg-white text-[#101828]"
                    } text-sm py-[12px] px-[15px] mb-[8px] rounded-lg font-semibold cursor-pointer`}
                  key={idx}
                >
                  <div
                    className="flex"
                    onClick={() => navigate(elm.path, { replace: true })}
                  >
                    <span className="mr-[10px]">
                      <img
                        src={`${location.pathname === elm.path
                          ? `/icons/${elm.status}-active.svg`
                          : `/icons/${elm.status}.svg`
                          }`}
                        alt="verif"
                        className=""
                      />
                    </span>
                    {elm.name}
                  </div>
                </div>
              ))}
            </div>
          ))
          : decryptStr(userStatus) === "AdminCabang" 
          ? staticConst.profileMenu.adminCabang.userMenu.map((el, index) => (
            <div key={index}>
              {el.menu.subMenu.map((elm, idx) => (
                <div
                  className={`${location.pathname === elm.path
                    ? "bg-[#EAF6FF] text-[#00529C]"
                    : "bg-white text-[#101828]"
                    } text-sm py-[12px] px-[15px] mb-[8px] rounded-lg font-semibold cursor-pointer`}
                  key={idx}
                >
                  <div
                    className="flex"
                    onClick={() => navigate(elm.path, { replace: true })}
                  >
                    <span className="mr-[10px]">
                      <img
                        src={`${location.pathname === elm.path
                          ? `/icons/${elm.status}-active.svg`
                          : `/icons/${elm.status}.svg`
                          }`}
                        alt="verif"
                        className=""
                      />
                    </span>
                    {elm.name}
                  </div>
                </div>
              ))}
            </div>
          ))
          : decryptStr(userStatus) === "CustomerService" 
          ? staticConst.profileMenu.customerService.userMenu.map((el, index) => (
            <div key={index}>
              {el.menu.subMenu.map((elm, idx) => (
                <div
                  className={`${location.pathname === elm.path
                    ? "bg-[#EAF6FF] text-[#00529C]"
                    : "bg-white text-[#101828]"
                    } text-sm py-[12px] px-[15px] mb-[8px] rounded-lg font-semibold cursor-pointer`}
                  key={idx}
                >
                  <div
                    className="flex"
                    onClick={() => navigate(elm.path, { replace: true })}
                  >
                    <span className="mr-[10px]">
                      <img
                        src={`${location.pathname === elm.path
                          ? `/icons/${elm.status}-active.svg`
                          : `/icons/${elm.status}.svg`
                          }`}
                        alt="verif"
                        className=""
                      />
                    </span>
                    {elm.name}
                  </div>
                </div>
              ))}
            </div>
          ))
          : staticConst.profileMenu.developer.userMenu.map((el, index) => (
            <div key={index}>
              {el.menu.subMenu.map((elm, idx) => (
                <div
                  className={`${location.pathname === elm.path
                    ? "bg-[#EAF6FF] text-[#00529C]"
                    : "bg-white text-[#101828]"
                    } text-sm py-[12px] px-[15px] mb-[8px] rounded-lg font-semibold cursor-pointer`}
                  key={idx}
                >
                  <div
                    className="flex"
                    onClick={() => navigate(elm.path, { replace: true })}
                  >
                    <span className="mr-[10px]">
                      <img
                        src={`${location.pathname === elm.path
                          ? `/icons/${elm.status}-active.svg`
                          : `/icons/${elm.status}.svg`
                          }`}
                        alt="verif"
                        className=""
                      />
                    </span>
                    {elm.name}
                  </div>
                </div>
              ))}
            </div>
          ))}
      </div>
    </div>
  );
};

export default SideMenu;
