import { Tab } from "@headlessui/react"
import Button from "../../atoms/Button/button-calc-homepage"
import TextboxLabel from "./../../molecules/Input/textbox-custom/textbox-label"
import { useNavigate } from 'react-router-dom'

function classNames(...classes){
    return classes.filter(Boolean).join(" ")
}

const Component = ({
    categories, 
    dropdownData, 
    onClickDropdown, 
    type, 
    setModalDelete, 
    setId, 
    handleClickTab, 
    selectedIndex, 
    handleInputSearchChange, 
    handleKeyDown, 
    dataTemp, 
    onFetchData, 
    children, 
    showSellBtn
}) => {
    const navigate = useNavigate()

    return (
        <div className="tabs-profile__wrapper">
            <Tab.Group onChange={(e) => handleClickTab(e)} selectedIndex={selectedIndex}>
                <Tab.List className="tabs-profile__tab-list ">
                    <div className="tabs-profile__tab-wrap">
                        {Object.keys(categories).map((category) => (
                        <Tab key={category} className={({ selected }) => classNames("tabs-profile__tab", selected ? "tabs-profile__select" : "tabs-profile__not-select")}>
                            {category}
                        </Tab>
                        ))}
                    </div>
                </Tab.List>
                <Tab.Panels className="tabs-profile__tab-panels">
                    <div className="tabs-profile__search-dropdown gtc-tab-panels">
                        <div>
                            {!window.location.pathname.includes("/list-pengajuan-kpr") && 
                            <div className="mb-4">
                                <TextboxLabel placeholder="Search" onChange={handleInputSearchChange} onKeyDown={handleKeyDown} />
                            </div>}
                        </div>
                        <div className="tabs-profile__sellprop-btn-wrap mobile:hidden tab:hidden">
                            <Button className="basic-button__button-color--bluefigma basic-button__padding-size--padding-0 tabs-profile__sellprop-btn" onClick={() => navigate("/admin-cabang/properti-secondary")}>
                                Tambah Properti
                            </Button>
                        </div>
                        <div className="tabs-profile__sellprop-btn-wrap largePc:hidden smallPc:hidden">
                            <Button className="basic-button__button-color--bluefigma basic-button__padding-size--padding-0 tabs-profile__sellprop-btn" onClick={() => navigate("/admin-cabang/properti-secondary")}>
                                Tambah Properti
                            </Button>
                        </div>
                    </div>
                    {Object.values(categories).map((posts, idx) => (
                        <Tab.Panel key={idx} className={classNames("tabs-profile__tab-panel")}>
                            {children}
                        </Tab.Panel>
                    ))}
                </Tab.Panels>
            </Tab.Group>
        </div>
    )
}

export default Component