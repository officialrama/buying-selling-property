/* eslint-disable react-hooks/exhaustive-deps */
import GoogleMapReact from "google-map-react";
import Geocode from "react-geocode";
import { formatRupiahWord } from "../../../../../helpers/string";
import MarkerMapsV2 from "../../../../atoms/v2/Marker-Maps-V2/marker-maps";
import MarkerKanca from "../../../../atoms/v2/Marker-Maps-V2/marker-kanca";

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
        lat: data?.project?.alamatProperti?.latitude ? Number(data?.project?.alamatProperti?.latitude) : mapsState.center?.lat,
        lng: data?.project?.alamatProperti?.longitude ? Number(data?.project?.alamatProperti?.longitude) : mapsState.center?.lng,
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
    <div className="gmapsApps__wrapperResult">
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_GMAPS_APIKEY }}
        center={mapsState?.center}
        defaultCenter={mapsState?.center}
        defaultZoom={mapsState?.zoom ? mapsState?.zoom : 14}
        zoom={mapsState?.zoom ? mapsState?.zoom : 14}
        options={defaultMapOptions}
      >
        {dataProperty?.map((data, idx) => {
          return (
            <MarkerMapsV2
              key={idx}
              propsIdx={propsIdx}
              detailProperty={{ data, idx }}
              // text={`${formatRupiahWord(data?.project?.kisaranHarga?.split(",")[0])} - ${formatRupiahWord(data?.project?.kisaranHarga?.split(",")[1])}`}
              text={ data?.project?.kisaranHarga?.includes(",") ? `${formatRupiahWord(data?.project?.kisaranHarga?.split(",")[0])} - ${formatRupiahWord(data?.project?.kisaranHarga?.split(",")[1])}` : formatRupiahWord(data?.project?.kisaranHarga) }
              lat={data?.project?.alamatProperti?.latitude ? Number(data?.project?.alamatProperti?.latitude) : mapsState.center?.lat}
              lng={data?.project?.alamatProperti?.longitude ? Number(data?.project?.alamatProperti?.longitude) : mapsState.center?.lng}
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
