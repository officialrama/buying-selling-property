import Geocode from "react-geocode";

export function getLocByLatLng(lng, lat) {
  Geocode.setApiKey(process.env.REACT_APP_GMAPS_APIKEY);
  Geocode.setLanguage("id");
  Geocode.setRegion("id");
  const geolocation = new Promise((resolve, reject) => {
    Geocode.fromLatLng(lat, lng).then(
      (response) => {
        resolve(response);
      },
      (error) => {
        reject(error)
      }
    );

  });
  return geolocation
};