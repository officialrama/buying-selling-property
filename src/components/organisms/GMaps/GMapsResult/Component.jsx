/* eslint-disable react-hooks/exhaustive-deps */
import GoogleMapReact from "google-map-react";
import Geocode from "react-geocode";
import { MarkerMaps } from "../../../atoms";

Geocode.setApiKey(process.env.REACT_APP_GMAPS_APIKEY);
Geocode.setLanguage("id");
Geocode.setRegion("id");

const Component = ({
  mapsState,
  setMapsState,
  dataProperty,
  setDetailProperty,
  propsIdx,
  setPropsIdx,
}) => {
  const defaultMapOptions = {
    fullscreenControl: false,
  };

  const handleDetailProperty = (data, idx) => {
    setMapsState({
      ...mapsState,
      center: {
        lat: Number(data?.project?.alamatProperti?.latitude),
        lng: Number(data?.project?.alamatProperti?.longitude),
      },
      zoom: 15,
    });
    setPropsIdx(idx);
    setDetailProperty({ ...data });
  };

  return (
    // Important! Always set the container height explicitly
    <div className="gmapsApps__wrapperResult">
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_GMAPS_APIKEY }}
        center={mapsState.center}
        defaultCenter={mapsState.center}
        defaultZoom={mapsState.zoom}
        zoom={mapsState.zoom}
        options={defaultMapOptions}
      >
        {dataProperty?.map((data, idx) => {
          return (
          <MarkerMaps
            key={idx}
            propsIdx={propsIdx}
            detailProperty={{ data, idx }}
            text={data?.detailProperti?.hargaProperti}
            lat={Number(data?.project?.alamatProperti?.latitude)}
            lng={Number(data?.project?.alamatProperti?.longitude)}
            onClick={() => handleDetailProperty(data, idx)}
          />
        )})}
      </GoogleMapReact>
    </div>
  );
};

export default Component;
