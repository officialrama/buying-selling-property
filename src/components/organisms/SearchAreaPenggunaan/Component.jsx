import { useEffect, useState } from "react";
import Geocode from "react-geocode";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";

Geocode.setApiKey(process.env.REACT_APP_GMAPS_APIKEY);
Geocode.setLanguage("id");
Geocode.setRegion("id");

const AreaPenggunaan = ({isKodepos, setKodepos}) => {
  const [mapsState, setMapsState] = useState({
    center: {
      lat: -6.22472,
      lng: 106.80778,
    },
  });
  const [address, setAddress] = useState("");
  const handleChange = (address) => {
    setAddress(address);
  };

  const handleSelect = (address) => {
    let placeId = "";
    let city = "";
    geocodeByAddress(address).then((results) => {
      placeId = results[0].place_id;
      city = (results?.[0]?.address_components || []).filter((data) => data.types[0] === "administrative_area_level_2")[0]?.long_name || "-";
      return getLatLng(results[0]);
    }).then((latLng) => {
      setAddress(address);
      setMapsState({
        ...mapsState,
        address,
        center: latLng,
        placeId,
        city: city,
        draggable: true,
      });
    }).catch((error) => console.error("Error", error));
  };

  useEffect(() => {
    if (mapsState.center.lat && mapsState.center.lng) {
      Geocode.fromLatLng(mapsState.center.lat, mapsState.center.lng).then(
        (response) => {
          const postalCode = (response?.results || [])
            .find((result) =>
              (result?.address_components || []).some((component) =>
                component.types.includes("postal_code")
              )
            )?.address_components.find((component) =>
              component.types.includes("postal_code")
            )?.long_name || "-";
          setKodepos(postalCode);
        },
        (error) => {
          console.error(error);
        }
      );
    }
  }, [mapsState.center.lat, mapsState.center.lng]);

  return (
    <div className="w-full h-[44px] relative z-10">
       <PlacesAutocomplete
      value={address}
      onChange={handleChange}
      onSelect={handleSelect}
      searchOptions={{
        language: "id",
        region: "id"
      }}
    >
      {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
        <div>
          <input
            {...getInputProps({
              placeholder: "Cari Area Penggunaan",
              className: "w-full flex border border-[#D3D4D4] rounded-lg top-0 bg-white",
            })}
          />
          <div
            className={`w-full flex flex-col border rounded-lg top-0 bg-white${
              suggestions.length !== 0 && "p-3"
            }`}
          >
            {loading && <div>Loading...</div>}
            {suggestions.map((suggestion, idx) => {
              const className = suggestion.active
                ? "suggestion-item--active"
                : "suggestion-item";
              // inline style for demonstration purpose
              const style = suggestion.active
                ? { backgroundColor: "#fafafa", cursor: "pointer" }
                : { backgroundColor: "#ffffff", cursor: "pointer" };
              return (
                <div
                  key={idx}
                  {...getSuggestionItemProps(suggestion, {
                    className,
                    style,
                  })}
                >
                  <span>{suggestion.description}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </PlacesAutocomplete>
    </div>
  );
};

export default AreaPenggunaan;