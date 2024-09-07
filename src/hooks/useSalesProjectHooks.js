import { useState } from "react";
import { selectConst } from "../static/selectConst";


const useSalesProjectHooks = () => {
  
  const [bodySearchProp] = useState({
    longitude: 0,
    latitude: 0,
    pageStart: 0,
    sortBy: "created_at",
    sortDirection: "desc",
  });
  const initialBodyFilter = {
    hargaMin: 0,
    hargaMax: 10000000000,
    tipeProperti: "",
    jumlahKamarTidur: "all",
    jumlahKamarMandi: "all",
    LuasTanahMinimal: "",
    LuasTanahMaksimal: "",
    LuasBangunanMinimal: "",
    LuasBangunanMaksimal: "", 
    jenisProperti: "",
    dapur: false,
    listrik: false,
    pdam: false,
    jalurTelepon: false,
    ruangKeluarga: false,
    ruangKerja: false,
    rumahSakit: false,
    jalanTol: false,
    sekolah: false,
    mall: false,
    bankAtm: false,
    pasar: false,
    farmasi: false,
    rumahIbadah: false,
    restoran: false,
    taman: false,
    bioskop: false,
    bar: false,
    halte: false,
    stasiun: false,
    bandara: false,
    gerbangTol: false,
    spbu: false,
    gymnasium: false,
    kolamRenang: false,
    tempatParkir: false,
    keamanan24Jam: false,
    penghijauan: false,
    lift: false,
    clubHouse: false,
    elevator: false,
    gym: false,
    jogingTrack: false,
    garasi: false,
    rowJalan12: false,
    cctv: false,
    pageStart: 0,
    sortBy: "created_at",
    sortDirection: "desc"
  }
  const [bodyFilterProp, setBodyFilterProp] = useState(initialBodyFilter);
  const [dataProperty, setDataProperty] = useState([]);
  const [dataNearby, setDataNearby] = useState([]);
  const [dataVirtual, setDataVirtual] = useState([]);
  const [totalData,setTotalData] = useState(0);
  const [resSearch, setResSearch] = useState({});
  const [isLoading, setLoading] = useState(false);
  const [metadata, setMetadata] = useState();
  const [kabKota, setKabKota] = useState("");
  const [lngLat, setLngLat] = useState({
    lng: 0,
    lat: 0
  });
  const [imgCount, setImgCount] = useState({
    current: 1,
    total: 1
  })
  const [priceSlider, setPriceSlider] = useState({
    slider: false,
    value: "Harga"
  });
  const handleChangePrice = (evt, type) => {
    setBodyFilterProp({
      ...bodyFilterProp,
      [type]: Number(evt.target.value.replaceAll('.', '')),
    });
  };
  const handleRadioDropChange = (name, value) => {
    setBodyFilterProp(inputs => ({ ...inputs, [name]: value }));
  };
  const handleCheckboxChange = event => {
    event.persist();
    setBodyFilterProp(inputs => ({ ...inputs, [event.target.name]: event.target.checked }));
  };
  const handleNumberInput = event => {
    event.persist();
    setBodyFilterProp(inputs => ({ ...inputs, [event.target.name]: event.target.value.replace(/[^0-9]/i, '') }));
  };
  const initialDropdown = {
    sellBuy: selectConst.sellBuy[0],
    price: selectConst.price[0],
    propertyType: selectConst.propertyType[0],
    bedroom: selectConst.bedroom[0],
    bathroom: selectConst.bathroom[0],
    filter: selectConst.filter[0]
  }
  const [dropdownVal, setDropdownVal] = useState(initialDropdown);

  return {
    bodySearchProp,
    initialBodyFilter,
    bodyFilterProp,
    setBodyFilterProp,
    dataProperty,
    setDataProperty,
    totalData,
    setTotalData,
    resSearch,
    setResSearch,
    isLoading,
    setLoading,
    metadata,
    setMetadata,
    kabKota,
    setKabKota,
    lngLat,
    setLngLat,
    imgCount,
    priceSlider,
    setPriceSlider,
    setImgCount,
    handleChangePrice,
    handleRadioDropChange,
    handleCheckboxChange,
    handleNumberInput,
    initialDropdown,
    dropdownVal,
    setDropdownVal,
    dataNearby,
    setDataNearby,
    dataVirtual,
    setDataVirtual,
  };
};

export default useSalesProjectHooks;
