import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";

const Component = ({ onClick, type, dropdownData }) => {
  return (
    <div className="drop-usr-mgmt__wrapper">
      <Menu as="div" className="drop-usr-mgmt__menu">
        <div>
          <Menu.Button className="drop-usr-mgmt__menu-btn">
            {type?.name}
            <img src="/icons/small-icons/arrow-down.svg" alt="arrow-down" />
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="drop-usr-mgmt__menu-item">
            {dropdownData.map((data, idx) => {
              return (
                <div className="drop-usr-mgmt__item-wrap" key={idx}>
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={() => onClick(data)}
                        className={`${
                          active
                            ? "drop-usr-mgmt__btn--active"
                            : "drop-usr-mgmt__btn--inactive"
                        } drop-usr-mgmt__btn`}
                      >
                        {data.name}
                      </button>
                    )}
                  </Menu.Item>
                </div>
              );
            })}
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
};

export default Component;
