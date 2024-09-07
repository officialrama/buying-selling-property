import { useState } from "react";
import GoogleMapReact from "google-map-react";
import Geocode from "react-geocode";
import Input from "../../../atoms/Input/Component";
import { geocodeByPlaceId } from "react-places-autocomplete";
import { LocationSearchInput } from "../../../molecules";
import { Modal } from "../..";

Geocode.setApiKey(process.env.REACT_APP_GMAPS_APIKEY);
Geocode.setLanguage("id");
Geocode.setRegion("id");

const MapsMarker = ({ setIsModal }) => {
  const handleSetLocation = (evt) => {
    evt.stopPropagation();
    setIsModal(true);
  };

  return (
    <div>
      <div
        className="rounded-lg shadow-lg bg-white w-36 absolute -left-[72px] -top-[95px] cursor-pointer"
        onClick={(evt) => handleSetLocation(evt)}
      >
        <p className="text-black text-[20px] font-semibold text-center px-3 py-2">
          Pilih Lokasi
        </p>
      </div>
      <div className="w-10 overflow-hidden inline-block absolute -left-[14.14px] -top-[55px]">
        <div className=" h-5 shadow-lg w-5 bg-white -rotate-45 transform origin-top-left"></div>
      </div>
      <img
        alt="pin-img"
        className="w-[40px] h-[40px] absolute -left-[20px] -top-[40px]"
        src="/images/locator.png"
      />
    </div>
  );
};

const GMapsApp = ({
  setDataAddress,
  dataAddress,
  setModalGmaps,
  mapsState,
  setMapsState,
  isConfirm,
  onConfirm,
}) => {
  const [isModal, setIsModal] = useState(false);

  const defaultMapOptions = {
    fullscreenControl: false,
  };

  const handleMarker = (lat, lng) => {
    Geocode.fromLatLng(lat, lng).then(
      (response) => {
        const address = response.results[0].formatted_address;
        const placeId = response.results[0].place_id;
        const city = (response?.results?.[0]?.address_components || []).filter((data) => data.types[0] === "administrative_area_level_2")[0]?.long_name || "-";

        setMapsState({
          ...mapsState,
          center: {
            lat,
            lng,
          },
          city,
          placeId,
          address,
        });
      },
      (error) => {
        console.error(error);
      }
    );
  };


  const handleConfirmLocation = async () => {
    const [place] = await geocodeByPlaceId(mapsState.placeId);
    let placeAddressData = {
      rt: "",
      rw: "",
      posCode: "",
      province: "",
      subDistrict: "",
      district: "",
      urbanVillage: "",
    };

    // RT
    placeAddressData.rt =
      (place?.address_components || [])
        .filter((data) => data.types[0] === "administrative_area_level_7")[0]
        ?.long_name.split("RT")
        .join("") || "-";

    // RW
    placeAddressData.rw =
      (place?.address_components || [])
        .filter((data) => data.types[0] === "administrative_area_level_6")[0]
        ?.long_name.split("RW")
        .join("") || "-";

    // Kode Pos
    placeAddressData.posCode =
      (place?.address_components || []).filter(
        (data) => data.types[0] === "postal_code"
      )[0]?.long_name || "-";

    // Provinsi
    placeAddressData.province =
      (place?.address_components || []).filter(
        (data) => data.types[0] === "administrative_area_level_1"
      )[0]?.long_name || "-";

    // Kecamatan
    placeAddressData.subDistrict =
      (place?.address_components || []).filter(
        (data) => data.types[0] === "administrative_area_level_3"
      )[0]?.long_name || "-";

    // Kota / Kabupaten
    placeAddressData.district =
      (place?.address_components || []).filter(
        (data) => data.types[0] === "administrative_area_level_2"
      )[0]?.long_name || "-";

    // Kelurahan
    placeAddressData.urbanVillage =
      (place?.address_components || []).filter(
        (data) => data.types[0] === "administrative_area_level_4"
      )[0]?.long_name || "-";

    setDataAddress({
      ...dataAddress,
      ...placeAddressData,
      placeId: mapsState.placeId,
      lat: mapsState.center.lat,
      lng: mapsState.center.lng,
      address: mapsState.address,
    });

    setIsModal(false);
    setModalGmaps(false);
  };
  
  const handleWithConfirm = () => {
    if (window.location.pathname.includes("/search")) {
      console.log("[DEBUG] handleWithConfirm 1");
      handleConfirmLocation();
      onConfirm();
    } else {
      console.log("[DEBUG] handleWithConfirm 2");
      onConfirm();
      setIsModal(false);
    }
  };

  const onMarkerInteraction = (childKey, childProps, mouse) => {
    console.log("[DEBUG] onMarkerInteraction : ", mouse);
    setMapsState({
      ...mapsState,
      center: {
        lat: mouse.lat,
        lng: mouse.lng,
      },
      draggable: true,
    });
  };

  const onMarkerInteractionMouseUp = (childKey, childProps, mouse) => {
    console.log("[DEBUG] onMarkerInteractionMouseUp masuk ");
    console.log("[DEBUG] onMarkerInteractionMouseUp : ", mouse);
    handleMarker(mouse.lat, mouse.lng);
  };
  // console.log("[DEBUG] mapsState.center : ", mapsState.center)

  return (
    // Important! Always set the container height explicitly
    <div className="gmapsApps__wrapper">
      <GoogleMapReact
        onChildMouseMove={onMarkerInteraction}
        onChildMouseUp={onMarkerInteractionMouseUp}
        draggable={mapsState.draggable}
        bootstrapURLKeys={{ key: process.env.REACT_APP_GMAPS_APIKEY, language: "id" }}
        // center={mapsState.draggable ? mapsState.center : ""}
        center={mapsState.center}
        defaultCenter={mapsState.center}
        defaultZoom={mapsState.zoom}
        options={defaultMapOptions}
        onClick={(evt) => handleMarker(evt.lat, evt.lng)}
      >
        <MapsMarker
          lat={mapsState.center.lat}
          lng={mapsState.center.lng}
          setIsModal={setIsModal}
        />
      </GoogleMapReact>
      <LocationSearchInput mapsState={mapsState} setMapsState={setMapsState} />
      <Input
        className="gmapsApps__input--getAddress"
        value={mapsState.address}
        disabled
      />
      {isModal &&
        <div className={`${isModal ? "block" : "hidden"}`}>
          <Modal
            closeModal={() => setIsModal(false)}
            title="Konfirmasi"
            modalTypes="confirm"
            onConfirm={isConfirm ? handleWithConfirm : handleConfirmLocation}
            descBody="Apakah anda yakin ingin memilih lokasi ini?"
          />
        </div>
      }
    </div>
  );
};

export default GMapsApp;