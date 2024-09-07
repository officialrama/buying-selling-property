import { useState } from "react";
import { emailRegex, nameRegex, phoneNoRegisterRegex } from "../helpers/regex";

const useRegSalesHooks = () => {
    const [inputs, setInputs] = useState({});
    const [disabled, setDisabled] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [downloadData, setDownloadData] = useState([]);
    const [listDeveloper, setListDeveloper] = useState([]);
    const [cari, setCari] = useState("")
    const handleSetDisabled = (value) => {
      setDisabled(value);
    };

    const [bodyListOfUser, setBodyListOfUser] = useState({
      userType: "all",
      userStatus: "all",
      pageStart: 0,
      sortBy: "createdAt",
      sortDirection: "desc",
      keyword: "",
      startDate: "",
      endDate: ""
    });
    const [bodySalesReferral] = useState({
      status: "all",
      pageStart: 1,
      sortBy: "createdAt",
      sortDirection: "desc"
    });

    const [dataTemp, setDataTemp] = useState({
      originalRows: [],
      rows: [],
      search: "",
    });

    const handleSearchChange = (evt) => {
      setCari(evt.target.value);
    };

    const handleName = event => {
        event.persist();
        if (!nameRegex.test(event.target.value)) {
          setInputs({
            ...inputs,
            [event.target.name]: { isValid: false, value: event.target.value, msgError: "Nama Lengkap yang dimasukkan belum benar" },
          });
        } else {
          setInputs({
            ...inputs,
            [event.target.name]: { isValid: true, value: event.target.value, msgError: "" },
          });
        }
      };    

    const handleEmail = (event) => {
        event.persist();
        setInputs((inputs) => ({
          ...inputs,
          [event.target.name]: event.target.value,
        }));
        if (!emailRegex.test(event.target.value)) {
          setInputs({
            ...inputs,
            [event.target.name]: {
              isValid: false,
              value: event.target.value,
              msgError: "Email yang dimasukkan belum sesuai",
            },
          });
        } else {
          setInputs({
            ...inputs,
            [event.target.name]: {
              isValid: true,
              value: event.target.value,
              msgError: "",
            },
          });
        }
      };    

    const handleMobileNo = (event) => {
        event.persist();
        if (!phoneNoRegisterRegex.test(event.target.value)) {
          setInputs({
            ...inputs,
            [event.target.name]: {
              isValid: false,
              value: event.target.value.replace(/[^0-9]/gi, ""),
              msgError: "No Handphone yang dimasukkan belum benar",
            },
          });
        } else {
          setInputs({
            ...inputs,
            [event.target.name]: {
              isValid: true,
              value: event.target.value.replace(/[^0-9]/gi, ""),
              msgError: "",
            },
          });
        }
      };    

      const [referralId, setReferralId] = useState("");
      const [draftId, setDraftId] = useState("");
      const [salesReferralId, setSalesReferralId] = useState("");
      const [propertiId, setPropertiId] = useState("");
      const handleInputChange = (event) => {
        event.persist();
        setInputs((inputs) => ({
          ...inputs,
          [event.target.name]: event.target.value,
        }));
      };

    return {
        inputs,
        bodyListOfUser,
        setBodyListOfUser,
        bodySalesReferral,
        dataTemp, 
        setDataTemp,
        handleSearchChange,
        disabled,
        handleSetDisabled,
        editMode, 
        setEditMode,
        cari,
        setCari,
        handleEmail,
        handleMobileNo,
        downloadData,
        setDownloadData,
        listDeveloper,
        setListDeveloper,
        referralId,
        setReferralId,
        handleName,
        draftId,
        setDraftId,
        propertiId,
        setPropertiId,
        salesReferralId,
        setSalesReferralId
    };
};

export default useRegSalesHooks;