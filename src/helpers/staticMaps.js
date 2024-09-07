import { staticMapUrl } from 'static-google-map';

export const genStaticMapsUrl = ({ size = "600x600", lat = "", lng = "" }) => {
  return staticMapUrl({
    key: process.env.REACT_APP_GMAPS_APIKEY,
    scale: 1,
    size: size,
    format: 'jpg',
    maptype: 'roadmap',
    region: 'id',
    markers: [
      {
        location: { lat: lat, lng: lng },
        color: 'red',
        size: 'normal'
      },
    ]
  });
};

export const genClickToGmaps = ({lat = "", lng = ""}) => {
  return `https://maps.google.com/maps?q=${lat},${lng}&hl=id&z=14`
}