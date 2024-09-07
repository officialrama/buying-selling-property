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
import { submitCSKpr } from "../../../store/actions/fetchData/uploadFile";
import { savePropertiCS } from "../../../store/actions/fetchData/customer-service";
import { encryptStr } from "../../../helpers/encryptDecrypt";

const ModalKPRCS = ({isModalDone, setModalDone, submitStepperKprVisitor}) => {
  const dispatch = useDispatch();
  const closeModal = () => {
    setModalDone(false);
  };

  return (
    <div
      className={`${
        isModalDone ? "flex" : "hidden"
      } justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-black bg-opacity-50`}
    >
      <div className="relative w-[432px] h-auto bg-transparent">
        <div className="px-4 pb-4 bg-white rounded-lg">
          <div className="flex items-end justify-end px-5 py-3 mb-4 border-solid border-gray-300 rounded-t">
            <button
              className="bg-transparent text-black float-right place-self-center"
              onClick={closeModal}
            >
              <img src="/icons/Close_Circle.svg" alt="Close Button" />
            </button>
          </div>
          <div className="flex flex-col justify-center items-center">
            <p className="font-bold text-2xl">Ajukan Pembelian?</p>
            <p className="text-[#666666] text-base text-center">Pastikan datamu sudah benar, ya! Data yang sudah diajukan tidak dapat diubah lagi.</p>
            <div className="px-4 py-2 flex flex-row gap-4">
            <Button className=" h-[48px] bg-[#ffff] border border-[#1078CA] text-[#1078CA] font-bold"onClick={closeModal} >
                Periksa Ulang
              </Button>
              <Button className="h-[48px] bg-[#1078CA] font-bold" onClick={submitStepperKprVisitor}>
                Ya, Ajukan
              </Button>
            </div>
            </div>
        </div>
      </div>
    </div>
  );
};

ModalKPRCS.propTypes = {
  children: PropTypes.any,
};

ModalKPRCS.defaultProps = {
  children: "",
};

export default ModalKPRCS;
