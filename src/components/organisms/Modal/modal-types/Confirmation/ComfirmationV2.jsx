import React from "react";
import { Title } from "../../../../atoms";
import { IoIosClose } from "react-icons/io";
import classNames from "classnames";

const ConfirmationV2 = ({ title, closeModal, description, onClicConfirmation, cancelText, confirmText }) => {
  return (
    <div>
        <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-black bg-opacity-50">
          <div className="relative w-auto my-auto mx-auto max-w-2xl">
            <div className="w-full rounded-lg bg-white">
              <div className="flex items-start justify-end px-5 py-3 rounded-t mobile:mt-[50%]">
                <button
                  className="bg-transparent border-0 text-black float-right place-self-center"
                  onClick={closeModal}
                >
                  <IoIosClose color="#777777" size={32}/>
                </button>
              </div>
              <div className="w-[432px] flex flex-col gap-2 px-6 pb-6">
                <p className="font-bold text-[24px] text-[#292929] text-center">{title}</p>
                <p className="font-medium text[16px] text-[#666666] text-center">{description}</p>
                <div className="flex flex-row gap-2 w-full py-2">
                  <button className={classNames(`basic-button__button-color--blueFigmaBorderOnly`, {"basic-button__width--full": true, [`basic-button__padding-size--padding-0`]: 'padding-0' } )} onClick={closeModal}>
                    <p className={`basic-button__text-style--blue text-primary`}>{cancelText ?? "Batal"}</p>
                  </button>
                  <button className={classNames(`basic-button__button-color--bluefigma`, {"basic-button__width--full": true, [`basic-button__padding-size--padding-0`]: 'padding-0' } )} onClick={onClicConfirmation}>
                    <p className={`basic-button__text-style--white text-primary`}>{confirmText ?? "Ya"}</p>
                  </button>
                </div>
              </div>
            </div> 
          </div>
        </div>
    </div>
  )
}

export default ConfirmationV2
