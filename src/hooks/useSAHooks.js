import { useState } from "react";

const useSAHooks = () => {
  const [inputs, setInputs] = useState({});
  const [disabled, setDisabled] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [cari, setCari] = useState("")
  const handleSetDisabled = (value) => {
    setDisabled(value);
  };
  const [bodyListOfUser, setBodyListOfUser] = useState({
    userType: "all",
    userStatus: "all",
    pageStart: 1,
    sortBy: "createdAt",
    sortDirection: "desc",
    nameSearch: ""
  });
  const [bodyInquiryGimmick, setBodyInquiryGimmick] = useState({
    status: "all",
    pageStart: 1,
    sortBy: "createdAt",
    sortDirection: "desc",
    nameSearch: ""
  });
  const [dataTemp, setDataTemp] = useState({
    originalRows: [],
    rows: [],
    search: "",
  });
  const [bodyListDev, setBodyListDev] = useState({
    userType: "developer",
    userStatus: "all",
    pageStart: 1,
    sortBy: "createdAt",
    sortDirection: "desc",
    nameSearch: ""
  });
  const handleSearchChange = (evt) => {
    setCari(evt.target.value);
  };
  const [gimmickId, setGimmickId] = useState("");
  const handleInputChange = (event) => {
    event.persist();
    setInputs((inputs) => ({
      ...inputs,
      [event.target.name]: event.target.value,
    }));
  };
  const initiateState = (payload) => {
    for (const [key, value] of Object.entries(payload)) {
      setInputs((inputs) => ({ ...inputs, [key]: value }));
    }
  };
  return {
    inputs,
    handleInputChange,
    bodyListOfUser,
    setBodyListOfUser,
    setBodyInquiryGimmick,
    bodyInquiryGimmick,
    dataTemp, 
    setDataTemp,
    bodyListDev,
    setBodyListDev,
    handleSearchChange,
    gimmickId,
    setGimmickId,
    disabled,
    handleSetDisabled,
    editMode, 
    setEditMode,
    initiateState,
    cari,
    setCari
  };
};

export default useSAHooks;
