import React, { useState } from "react";
import { Title } from "../../atoms";
import ModalGMaps from "../Modal/ModalGMaps";

const NewPropertiesNearbyHeader = ({ lat, lng, kabKota }) => {
  const [isModalGmaps, setModalGmaps] = useState(false);
  const [mapsState, setMapsState] = useState({
    center: {
      lat: -6.22472,
      lng: 106.80778,
    },
    address: "",
    zoom: 11,
    draggable: false,
    gestureHandling: "cooperative",
  });

  const handleFindLocation = () => {
    setModalGmaps(true);
  };

  const handleOnConfirm = () => {
    window.location.href = `/v2/search?type=nearby&lat=${mapsState.center.lat - 14}&lng=${mapsState.center.lng - 5}`;

    setModalGmaps(false);
  };

  return (
    <div>
      <Title
        className="landing-page header-w-nav__title fontsize__medium"
        text="Properti Baru Dekat Kamu"
      />
      <div className="landing-page header-w-nav">
        <div className="flex">
          <img className="mr-2" src="/icons/icon-loc.svg" alt="img" />
          <p
            className="landing-page header-w-nav__places"
            onClick={handleFindLocation}
          >
            {kabKota}
          </p>
        </div>
        <div className="flex">
          <a
            href={`/v2/search?type=nearby&lat=${lat}&lng=${lng}`}
            className="landing-page header-w-nav__see-all"
          >
            Lihat Semua
          </a>
        </div>
      </div>

      <div className="mt-10 ">
        <ModalGMaps
          isModalGmaps={isModalGmaps}
          mapsState={mapsState}
          isConfirm
          onConfirm={handleOnConfirm}
          setMapsState={setMapsState}
          setModalGmaps={setModalGmaps}
        />
      </div>
    </div>
  );
};

export default NewPropertiesNearbyHeader;
