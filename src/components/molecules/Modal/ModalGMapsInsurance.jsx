import PropTypes from "prop-types";
import React from "react";
import { Title } from "../../atoms";
import { GMapsApp } from "../../organisms";
import GMapsAppInsurance from "../../organisms/GMaps/GMapsApp/GMapsAppInsurance";

const ModalGMapsInsurance = ({
  isModalGmaps,
  setModalGmaps,
  setDataAddress,
  dataAddress,
  mapsState,
  setMapsState,
  isConfirm,
  onConfirm,
}) => {
  const closeModal = () => {
    if (!dataAddress?.placeId) {
      setMapsState({
        ...mapsState,
        center: {
          lat: -6.22472,
          lng: 106.80778,
        },
        address: "",
        placeId: "",
      });
    }

    setModalGmaps(false);
  };

   // console.log("[DEBUG] ModalGMaps dataAddress : ", dataAddress);

  return (
    <div
      className={`${
        isModalGmaps ? "flex" : "hidden"
      } justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-black bg-opacity-50`}
    >
      <div className="relative w-[80%] h-auto bg-transparent">
        <div className="px-4 pb-4 bg-white rounded-lg">
          <div className="flex items-start justify-between px-5 py-3 border-b mb-4 border-solid border-gray-300 rounded-t">
            <div className="place-self-center">
              <Title
                className="fontcolor__blue fontweight__bold"
                text="Pin Lokasi"
              />
            </div>
            <button
              className="bg-transparent border-0 text-black float-right place-self-center"
              onClick={closeModal}
            >
              <img src="/icons/Close_Circle.svg" alt="Close Button" />
            </button>
          </div>
          <GMapsAppInsurance
            isConfirm={isConfirm}
            setModalGmaps={setModalGmaps}
            setDataAddress={setDataAddress}
            dataAddress={dataAddress}
            mapsState={mapsState}
            onConfirm={onConfirm}
            setMapsState={setMapsState}
          />
        </div>
      </div>
    </div>
  );
};

ModalGMapsInsurance.propTypes = {
  children: PropTypes.any,
};

ModalGMapsInsurance.defaultProps = {
  children: "",
};

export default ModalGMapsInsurance;
