import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { disableEdit, showAdmMenu } from "../../../store/actions/fetchData/superAdminState"
import { Button } from "../../atoms"
import { staticConst } from "../../../static/staticConst"
import useWindowDimensions from "../../../utils/dimensions"

const SideMenuAdminCabang = ({
    title, 
    desc, 
    children, 
    action
}) => {
    const saState = useSelector((state) => state.superAdminReducer)
    const dispatch = useDispatch()
    const [openMenu, setOpenMenu] = useState({})
    const { width } = useWindowDimensions()
    useEffect(() => {
        if(saState.showAdmMenu) {
            document.body.style.overflow = "hidden"
        }else{
            document.body.style.overflow = "unset"
        }
    }, [saState.showAdmMenu])

    return (
        <div>
            {width <= 700 ? <aside
        className={`sm-admin__wrapper ${saState.showAdmMenu ? "sm-admin__wrapperSmallPcAct" : "hidden"} largePc:w-80 largePc:hidden smallPc:hidden`}
        aria-label="Sidebar"
      >
        <div className="sm-admin__sidebar-wrap">
          <ul className="sm-admin__ul-parent">
            {staticConst.profileMenu.sales.userMenu.map((data, idx) => {
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
                </li>
              );
            })}
          </ul>
        </div>
    </aside> : <></>}
    </div>
    )
}

export default SideMenuAdminCabang