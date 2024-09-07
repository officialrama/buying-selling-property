import React, { useState } from "react";
import { Title } from "../../atoms";
import ModalGMaps from "../Modal/ModalGMaps";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";
import { PropertyCarousel } from "../../organisms";

const NewPropertiesNearbyHeaderNeo = ({ lat, lng, kabKota, is360, property }) => {
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
        <div className="pl-12 pr-16 mobile:pr-0  mobile:pl-0">
            <div className="landing-page header-w-nav flex flex-col">
                <div className="flex flex-col mobile:px-6">
                    <div className="flex mb-4">
                        <img className="mr-2" src="/icons/icon-loc.svg" alt="img" />
                        <p
                            className="landing-page header-w-nav__places text-[#666666] text-sm"
                            onClick={handleFindLocation}
                        >
                            {kabKota}
                        </p>
                    </div>
                    <div className="flex mb-2.5">
                        <Title
                            className="landing-page font-bold fontsize__medium tab:fontsize__small smallPc:fontsize__small"
                            text="Properti di Sekitarmu"
                        />
                    </div>
                    <div className="flex">
                        <a
                            href={`/v2/search?type=nearby&lat=${lat}&lng=${lng}`}
                            className="landing-page header-w-nav__see-all-blue"
                        >
                            Lihat Semua
                        </a>
                        <a href={`/v2/search?type=nearby&lat=${lat}&lng=${lng}`} className="flex items-center justify-center">
                            <HiOutlineArrowNarrowRight className="text-blue-500" />
                        </a>

                    </div>
                </div>
                <div className="mobile:flex flex-col mobile:w-full hidden bg-[#EAF6FFCC] bg-opacity-80 pl-4" style={{ backgroundImage: `url("images/logo city/background-nearby.png")`, backgroundPosition: "right bottom", backgroundRepeat: "no-repeat", backgroundSize: "auto" }}>
                    <PropertyCarousel is360={is360} property={property} />
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

export default NewPropertiesNearbyHeaderNeo;
