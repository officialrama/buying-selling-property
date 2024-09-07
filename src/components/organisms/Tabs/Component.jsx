import { Tab } from "@headlessui/react";
import { Dropdown } from "../../atoms";
import Button from "./../../atoms/Button/Component";
import TextboxLabel from "./../../molecules/Input/textbox-custom/textbox-label";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Component = ({ categories, dropdownData, onClickDropdown, type, setModalDelete, setId, handleClickTab, selectedIndex, handleInputSearchChange, handleKeyDown, dataTemp, onFetchData, children, showSellBtn, setSelectType }) => {
  return (
    <div className="tabs-profile__wrapper">
      <Tab.Group onChange={(e) => handleClickTab(e)} selectedIndex={selectedIndex}>
        <Tab.List className="tabs-profile__tab-list">
          <div className="tabs-profile__tab-wrap">
            {Object.keys(categories).map((category) => (
              <Tab key={category} className={({ selected }) => classNames("tabs-profile__tab", selected ? "tabs-profile__select" : "tabs-profile__not-select")}>
                {category}
              </Tab>
            ))}
          </div>
          {showSellBtn &&
            <div className="tabs-profile__sellprop-btn-wrap mobile:hidden tab:hidden">
              {/* <Link to="/sell-property"> */}
                <Button className="tabs-profile__sellprop-btn" onClick={() => setSelectType(true)}>
                  Jual Properti
                </Button>
              {/* </Link> */}
            </div>
          }
        </Tab.List>
        {showSellBtn &&
          <div className="tabs-profile__sellprop-btn-wrap largePc:hidden smallPc:hidden">
            {/* <Link to="/sell-property"> */}
              <Button className="tabs-profile__sellprop-btn" onClick={() => setSelectType(true)}>
                Jual Properti
              </Button>
            {/* </Link> */}
          </div>
        }
        <Tab.Panels className="tabs-profile__tab-panels">
          <div className="tabs-profile__search-dropdown gtc-tab-panels">
            <div>
              {!window.location.pathname.includes("/list-pengajuan-kpr") && <div className="mb-4">
                <TextboxLabel placeholder="Search" onChange={handleInputSearchChange} onKeyDown={handleKeyDown} />
              </div>}
            </div>
            {!window.location.pathname.includes("/list-pengajuan-kpr") && <div>
              <div className="mb-4">
                <Dropdown onClick={onClickDropdown} type={type} dropdownData={dropdownData} />
              </div>
            </div>}
          </div>
          {Object.values(categories).map((posts, idx) => (
            <Tab.Panel key={idx} className={classNames("tabs-profile__tab-panel")}>
              {children}
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
      {/* <Pagination /> */}
    </div>
  );
};

export default Component;
