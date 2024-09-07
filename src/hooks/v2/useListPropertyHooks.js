import {useState} from "react";

const useListPropertyHooksV2 = () => {
    const [bodyListProp, setBodyListProp] = useState({
        email: "",
        status: "draft",
        pageStart: 0,
        sortBy: "created_at",
        sortDirection: "desc"
    });

    // console.log("[DEBUG] bodyListProp : ", bodyListProp)

    const [bodyListPengajuanKpr] = useState({
        email: "",
        status: "all",
        pageStart: 0,
        sortBy: "createdAt",
        sortDirection: "desc"
    });
    const [listProp, setListProp] = useState({
        res: {}
    });

    const [listClusterUnit, setListClusterUnit] = useState([]);
    const [modalDelete, setModalDelete] = useState(false);
    const [modalPublish, setModalPublish] = useState(false);
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
        setBodyListProp,
        bodyListPengajuanKpr,
        listProp,
        setListProp,
        listClusterUnit,
        setListClusterUnit,
        modalDelete,
        setModalDelete,
        modalPublish,
        setModalPublish,
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

export default useListPropertyHooksV2;
