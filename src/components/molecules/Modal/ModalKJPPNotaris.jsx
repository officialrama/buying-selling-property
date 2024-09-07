import PropTypes from "prop-types";
import React, { useEffect, useRef, useState } from "react";
import { AutocompleteProvincies, Title } from "../../atoms";
import { GMapsApp } from "../../organisms";
import { useDispatch } from "react-redux";
import { provincies } from "../../../store/actions/fetchData/branch";
import { infoLelangSearch } from "../../../store/actions/fetchData/info-lelang";
import useFormStepperHooks from "../../../hooks/useFormStepperHooks";
import useInputHooks from "../../../hooks/useInputHooks";
import { Button } from "flowbite-react";
import { AccordionFaq, AccordionKjppNotaris } from "..";

const ModalKJPPNotaris = ({isModalKjppNotaris, setModalKjppNotaris, dataKjppNotaris}) => {
  const closeModal = () => {
    setModalKjppNotaris(false);
  };
  return (
    <div
      className={`${
        isModalKjppNotaris ? "flex" : "hidden"
      } justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-black bg-opacity-50`}
    >
      <div className="relative w-[760px] h-auto bg-transparent">
        <div className="px-4 pb-4 bg-white rounded-lg">
          <div className="flex items-start justify-between px-5 py-3 mb-4 border-solid border-gray-300 rounded-t">
            <div className="flex justify-center">
              <Title
                className="text-[#292929] text-center text-3xl fontweight__bold"
                text="Daftar KJPP dan Notaris"
              />
            </div>
            <button
              className="bg-transparent text-black float-right place-self-center"
              onClick={closeModal}
            >
              <img src="/icons/Close_Circle.svg" alt="Close Button" />
            </button>
          </div> 
            <div className="px-4 py-2 flex flex-col gap-4">
            <AccordionKjppNotaris
            data={dataKjppNotaris?.listKjpp || []}
            name="KJPP"
            />
            <AccordionKjppNotaris
            data={dataKjppNotaris?.listNotaris || []}
            name="Notaris"
            />
            </div>
        </div>
      </div>
    </div>
  );
};

ModalKJPPNotaris.propTypes = {
  children: PropTypes.any,
};

ModalKJPPNotaris.defaultProps = {
  children: "",
};

export default ModalKJPPNotaris;
