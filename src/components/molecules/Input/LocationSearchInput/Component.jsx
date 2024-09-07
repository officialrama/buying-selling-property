import { useState } from "react";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";

const Component = ({ mapsState, setMapsState }) => {
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
      const addressInsurance = address.split(",")
      const cuttingAddress = addressInsurance[0]
      setAddress(cuttingAddress);
      setMapsState({
        ...mapsState,
        address: cuttingAddress,
        center: latLng,
        placeId,
        city: city,
        draggable: true,
      });
    }).catch((error) => console.error("Error", error));
  };

  return (
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
              placeholder: "Search Places ...",
              className: "gmapsApps__input--findAddress",
            })}
          />
          <div
            className={`gmapsApps__input--complited ${
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
  );
};

export default Component;
