import { useNavigate } from "react-router-dom";
import Footer from "./../../molecules/Footer/footer";
import SideMenu from "./../../organisms/SideMenu/Component";
import { Breadcrumb } from "flowbite-react";

const Component = ({ title, desc, children, userStatus, data, isBreadcrumb }) => {
  const navigate = useNavigate()
  return (
    <div>
      <div className="profile__topWrapper">
        <div className="profile__wrapper gtc-side-menu">
          <div className="profile__sidemenu-children">
            {isBreadcrumb && (
              <div className="pb-4">
                <Breadcrumb>
                  <span className="font-semibold text-sm cursor-pointer text-[#1078CA]" onClick={() => navigate('/', { replace: true}) } >
                      Home
                  </span>
                  <Breadcrumb.Item>
                      <span className="text-sm font-medium text-[#777777]">Profil</span>
                  </Breadcrumb.Item>
                </Breadcrumb>
              </div>
            )}
            <SideMenu userStatus={userStatus} data={data} />
          </div>
          <div className="profile__sidemenu-children">
            <div className="profile__title-desc-wrap">
              <h2 className="profile__title">
                {title}
              </h2>
              <div>
                <p className="profile__desc">{desc}</p>
              </div>
            </div>
            {children}
          </div>
        </div>
        </div>
        <div className='h-[23.5rem]'></div>
      <Footer />
    </div>
  );
};

export default Component;
