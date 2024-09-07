import { useState } from "react";

const useGmapsHooks = () => {
  const [isModalGmaps, setModalGmaps] = useState(false);
  const [dataAddress, setDataAddress] = useState({
    address: "",
    rt: "",
    rw: "",
    posCode: "",
    province: "",
    subDistrict: "",
    district: "",
    urbanVillage: "",
  });

  const onChangeAdress = (key, value) => {
    setDataAddress({ ...dataAddress, [key]: value });
  };

  const stringMinified =
    '{"alamat":"' +
    dataAddress.address +
    '","rt":"' +
    (dataAddress.rt ? dataAddress.rt.replace(/ /g, "") : "-") +
    '","rw":"' +
    (dataAddress.rw ? dataAddress.rw.replace(/ /g, "") : "-") +
    '","kodePos":"' +
    dataAddress.posCode +
    '","provinsi":"' +
    dataAddress.province +
    '","kabupaten":"' +
    dataAddress.subDistrict +
    '","kecamatan":"' +
    dataAddress.district +
    '","kelurahan":"' +
    dataAddress.urbanVillage +
    '"}';

  const [mapsState, setMapsState] = useState({
    center: { lat: -6.22472, lng: 106.80778 },
    address: "",
    zoom: 11,
    draggable: false,
    gestureHandling: "cooperative",
  });

  const handleLoadPinLoc = () => {
    if (!!dataAddress.placeId) {
      setMapsState({
        ...mapsState,
        center: {
          lat: dataAddress.lat,
          lng: dataAddress.lng,
        },
        address: dataAddress.address,
      });
    }
    setModalGmaps(true);
  };

  return {
    isModalGmaps,
    setModalGmaps,
    dataAddress,
    setDataAddress,
    onChangeAdress,
    stringMinified,
    mapsState,
    setMapsState,
    handleLoadPinLoc
  };
};

export default useGmapsHooks;
