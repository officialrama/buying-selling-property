import moment from "moment";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectConst } from "../../static/selectConst";

const useSellPropsHooksV2 = () => {
  const stateSellProp = useSelector((state) => state.sellPropertyReducer);
  const [inputs, setInputs] = useState({});
  const getYear = new Date().getFullYear();
  const maxYear = getYear - 3;
  const [files, setFiles] = useState([]);

  const [dropdownVal, setDropdownVal] = useState({
    pic: selectConst.pic[0],
    bathroom: selectConst.bathroom[0],
    bedroom: selectConst.bedroom[0],
    garageCar: selectConst.garageCar[0],
    certificate: selectConst.certificate[0],
    numberOfFloors: selectConst.numberOfFloors[0],
    propertyCondition: selectConst.propertyCondition[0],
    electricalPower: selectConst.electricalPower[0],
    facingHouse: selectConst.facingHouse[0],
    yearOfDevelopment: selectConst.yearOfDevelopment[0],
    maidRoom: selectConst.maidRoom[0],
    statusCluster: selectConst.statusCluster[0],
    statusUnit: selectConst.statusUnit[0],
    statusDiscount: selectConst.statusDiscount[0],
    tipeProperti: selectConst.tipeProperti[0],
  });

  useEffect(() => {
    /* eslint-disable react-hooks/exhaustive-deps */
    setInputs({
      ...inputs,
      provinsi: stateSellProp.dati2.provinsi,
      kabupaten: stateSellProp.dati2.kabupaten,
      kecamatan: stateSellProp.dati2.kecamatan,
      kelurahan: stateSellProp.dati2.kelurahan,
      tahunBangun: maxYear.toString(),
    });
  }, [stateSellProp]);

  const handleInputChange = (event) => {
    event.persist();
    setInputs((inputs) => ({ ...inputs, [event.target.name]: event.target.value }));
  };
  const handleRadioDropChange = (name, value) => {
    setInputs((inputs) => ({ ...inputs, [name]: value }));
  };
  const handleCheckboxChange = (event) => {
    event.persist();
    setInputs((inputs) => ({ ...inputs, [event.target.name]: event.target.checked }));
  };
  const initiateState = (payload) => {
    for (const [key, value] of Object.entries(payload)) {
      setInputs((inputs) => ({ ...inputs, [key]: value }));
    }
  };
  const handleDateInputChange = (date, name) => {
    setInputs((inputs) => ({ ...inputs, [name]: date }));
    setInputs((inputs) => ({
      ...inputs,
      [name + "_value"]: parseInt(moment(date).format("yyyy")),
    }));
  };
  const handleCurrency = (value, name) => {
    setInputs((inputs) => ({ ...inputs, [name]: value }));
  };
  const setImgFiles = (imgFile, preview) => {
    return setFiles((files) => [...files, { imgfile: imgFile, preview: preview }]);
  };
  return {
    inputs,
    setInputs,
    files,
    setFiles,
    dropdownVal,
    setDropdownVal,
    handleInputChange,
    handleRadioDropChange,
    handleCheckboxChange,
    initiateState,
    handleDateInputChange,
    handleCurrency,
    setImgFiles,
  };
};

export default useSellPropsHooksV2;
