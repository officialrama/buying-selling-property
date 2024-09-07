/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/alt-text */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import cookie from "hs-cookie";
import _ from "lodash-contrib";
import { staticConst } from "../../../static/staticConst";
import { disableEdit, showAdmMenu } from "../../../store/actions/fetchData/superAdminState";
import useWindowDimensions from "../../../utils/dimensions";
import { Button } from "../../atoms";
import { decryptStr } from "../../../helpers/encryptDecrypt";

const SideMenuAdmin = ({ title, desc, children, action, bottomBtn}) => {
  const location = useLocation();
  const saState = useSelector((state) => state.superAdminReducer);
  const [openMenu, setOpenMenu] = useState({});
  const dispatch = useDispatch();
  const { width } = useWindowDimensions();
  useEffect(() => {
    if (saState.showAdmMenu) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [saState.showAdmMenu])
  const decryptuserType = _.isJSON(cookie.get("morgateCookie")) ? (JSON.parse(cookie.get("morgateCookie")).userType) : ""
  return (
    <div>
      {width <= 700 ? <aside
        className={`sm-admin__wrapper ${saState.showAdmMenu ? "sm-admin__wrapperSmallPcAct" : "hidden"} largePc:w-80 largePc:hidden smallPc:hidden`}
        aria-label="Sidebar"
      >
        { decryptStr(decryptuserType) === "SuperAdminMIS" ?
        <div className="sm-admin__sidebar-wrap">
          <ul className="sm-admin__ul-parent">
            {staticConst.profileMenu.adminMIS.userMenu.map((data, idx) => {
              return data.menu.subMenu ? (
                <li key={idx}>
                  <button
                    type="button"
                    className="sm-admin__button-menu"
                    aria-controls={data.menu.statusMobile}
                    data-collapse-toggle={data.menu.statusMobile}
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
                    id={data.menu.statusMobile}
                    className={`${location.pathname.includes(data.menu.path) ? "" : "hidden"} sm-admin__ul-sub`}
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
                  <a href={data.menu.path}>
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
                </li>
              );
            })}
            
          </ul>
        </div>
         :  <div className="sm-admin__sidebar-wrap">
         <ul className="sm-admin__ul-parent">
           {staticConst.profileMenu.admin.userMenu.map((data, idx) => {
             return data.menu.subMenu ? (
               <li key={idx}>
                 <button
                   type="button"
                   className="sm-admin__button-menu"
                   aria-controls={data.menu.statusMobile}
                   data-collapse-toggle={data.menu.statusMobile}
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
                   id={data.menu.statusMobile}
                   className={`${location.pathname.includes(data.menu.path) ? "" : "hidden"} sm-admin__ul-sub`}
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
                 <a href={data.menu.path}>
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
               </li>
             );
           })}
           
         </ul>
       </div> }
      </aside> : <></>}
      <div className="flex">

        {width >= 275 ? <aside
          className={`sm-admin__wrapper ${saState.showAdmMenu ? "sm-admin__wrapperSmallPcAct" : "sm-admin__wrapperSmallPc"} largePc:w-80 mobile:w-80 tab:w-80`}
          aria-label="Sidebar"
        >
          { decryptStr(decryptuserType) === "SuperAdminMIS" ?
          <div className="sm-admin__sidebar-wrap">
            <ul className="sm-admin__ul-parent">
              {staticConst.profileMenu.adminMIS.userMenu.map((data, idx) => {
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
                    <a href={data.menu.path}>
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
                  </li>
                  
                );
              })}
            </ul>
          </div>
           : <div className="sm-admin__sidebar-wrap">
           <ul className="sm-admin__ul-parent">
             {staticConst.profileMenu.admin.userMenu.map((data, idx) => {
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
                   <a href={data.menu.path}>
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
                 </li>
                 
               );
             })}
           </ul>
         </div> }
        </aside> : <></>}

        {/* children */}
        <main onClick={() => dispatch(showAdmMenu(false))} className="bg-[#F9FAFB] w-full">
          <div className="largePc:m-[16px] smallPc:m-[16px] p-[24px] bg-white rounded-md">
            <h3 className={`font-bold text-[#101C3C] text-[24px] mb-2 flex items-center`}>
            {!location.pathname.includes("/developersummary") && location.pathname.includes("/developer") && (
                <img
                  src="/icons/small-icons/arrow-back-orange.svg"
                  alt="icon"
                  className={`mr-4 p-2 ${location.pathname.includes("/developer") ? "cursor-pointer" : "cursor-default"}`}
                  onClick={() => location.pathname.includes("/developer") && (window.location.href = "/admin/user-management/list-developer")}
                />
              )}
              <span>{title}</span>
              {location.pathname.includes("/developer") && action === "edit" ? (
                <Button
                  buttonColor="orangeBorder"
                  textColor="orange"
                  className="add-admin__btn-bottom--edit"
                  onClick={() => dispatch(disableEdit(!saState.disableEdit))}
                  paddingSize="padding-0"
                >
                  <span className="flex gap-2">
                    <img src="/icons/small-icons/edit-orange.svg" alt="edit" />{" "}
                    Edit
                  </span>
                </Button>
              ) : (
                <></>
              )}
            </h3>
            <p className="text-[#667085] text-[14px] mb-6">{desc}</p>
            {children}
          </div>
          {bottomBtn && (
            <div className={`flex justify-end h-[84px] bg-[#FFFFFF] shadow-md sticky`} style={{boxShadow: "0px -2px 2px rgba(0, 0, 0, 0.2)"}}>
              <div className="flex justify-center pr-12 pt-3 pb-6">
                <Button onClick={bottomBtn?.onClick} disabled={bottomBtn.disable ?? false} buttonColor={bottomBtn.buttonColor ?? "bluefigma"} textColor={bottomBtn.textColor ?? "white"}>{bottomBtn?.title}</Button>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default SideMenuAdmin;
