/* eslint-disable react-hooks/exhaustive-deps */
import GoogleMapReact from "google-map-react";
import Geocode from "react-geocode";
import { formatRupiahWord } from "../../../../../helpers/string";
import MarkerMapsV2 from "../../../../atoms/v2/Marker-Maps-V2/marker-maps";
import MarkerKanca from "../../../../atoms/v2/Marker-Maps-V2/marker-kanca";
import MarkerInfoLelang from "../../../../atoms/v2/Marker-Maps-V2/marker-InfoLelang";

Geocode.setApiKey(process.env.REACT_APP_GMAPS_APIKEY);
Geocode.setLanguage("id");
Geocode.setRegion("id");

const Component = ({
  mapsState,
  setMapsState,
  dataProperty,
  dataKanca,
  setDetailProperty,
  detailKanca,
  setDetailKanca,
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
        lat: data?.addresses?.longitude ? Number(data?.addresses?.longitude) : mapsState.center?.lat,
        lng: data?.addresses?.langitude ? Number(data?.addresses?.langitude) : mapsState.center?.lng,
      },
      zoom: 15,
    });
    if (propsIdx === idx) {
      setPropsIdx(-1);
    } else {
      setPropsIdx(idx);
    }
    setDetailProperty({ ...data });
    setDetailKanca([]);
  };

  const handleDetailKC = (kanca) => {
    setMapsState({
      ...mapsState,
      center: {
        lat: kanca?.latitude ? Number(kanca?.latitude) : mapsState.center?.lat,
        lng: kanca?.longitude ? Number(kanca?.longitude) : mapsState.center?.lng,
      },
      zoom: 15,
    });
    if (kanca?.unitKerja === detailKanca?.unitKerja) {
      setDetailKanca([]);
    } else {
      setDetailKanca({...kanca});
    }
    setPropsIdx(-1);
    
  };
  return (
    // Important! Always set the container height explicitly
    <div className="gmapsApps__wrapperInfolelang">
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
            <MarkerInfoLelang
              key={idx}
              propsIdx={propsIdx}
              detailProperty={{ data, idx }}
              text={`${formatRupiahWord(data?.price)}`}
              lat={data?.addresses?.longitude ? Number(data?.addresses?.longitude) : mapsState.center?.lat}
              lng={data?.addresses?.langitude ? Number(data?.addresses?.langitude) : mapsState.center?.lng}
              onClick={() => handleDetailProperty(data, idx)}
            />)
        })}

        {dataKanca?.map((kanca, idk) => {
          return (
            <MarkerKanca
              key={idk}
              propsIdx={idk}
              detailProperty={{ kanca, idk }}
              detailKanca={detailKanca}
              text={kanca}
              lat={kanca?.latitude}
              lng={kanca?.longitude}
              onClick={() => handleDetailKC(kanca)}
            />
          )
        })

        }
      </GoogleMapReact>
    </div>
  );
};

export default Component;
