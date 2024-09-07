import { useState } from "react";

const useListPropertyHooks = () => {
  const [bodyListProp] = useState({
    email: "",
    status: "sale",
    pageStart: 0,
    sortBy: "created_at",
    sortDirection: "desc"
  });
  const [bodyListPengajuanKpr] = useState({
    email: "",
    status: "",
    pageStart: 0,
    sortBy: "createdAt",
    sortDirection: "desc"
  });
  const [listProp, setListProp] = useState({
    res: {}
  });
  const [modalDelete, setModalDelete] = useState(false);
  const [id, setId] = useState(0);
  const [tabId, setTabId] = useState(0);
  const [dataTemp, setDataTemp] = useState({
    originalRows: [],
    rows: [],
    search: "",
  });
  const [onFetchData, setOnFetchData] = useState(false);
  const [selectType, setSelectType] = useState(false);

  return {
    bodyListProp,
    bodyListPengajuanKpr,
    listProp,
    setListProp,
    modalDelete,
    setModalDelete,
    id,
    setId,
    tabId,
    setTabId,
    dataTemp,
    setDataTemp,
    onFetchData,
    setOnFetchData,
    selectType,
    setSelectType
  };
};

export default useListPropertyHooks;
