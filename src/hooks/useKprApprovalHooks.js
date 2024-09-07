import { useState } from "react";
import { personalDataConst } from "../static/personal-data/personal-data";

const useKprApprovalHooks = () => {
  const [ktpFiles, setKtpFiles] = useState({ file: "", name: "", preview: "" });
  const [selfieKtpfiles, setSelfieKtpFiles] = useState({ file: "", name: "", preview: "" });
  const [files, setFiles] = useState([]);
  const [dropdownVal, setDropdownVal] = useState({
    gender: personalDataConst.gender[0],
    maritalStatus: personalDataConst.maritalStatus[0],
    agama: personalDataConst.agama[0],
    waktuKontak: personalDataConst.waktuKontak[0],
    tujuanNasabah: personalDataConst.tujuanNasabah[0]
  })
 const setImgFiles = (imgFile, preview, msgError) => {
    return setFiles((files) => [...files, { imgfile: imgFile, preview: preview, msgError: msgError }]);
  };
  return {
    ktpFiles,
    setKtpFiles,
    selfieKtpfiles,
    setSelfieKtpFiles,
    dropdownVal,
    setDropdownVal,
    files,
    setFiles,
    setImgFiles
  };
};

export default useKprApprovalHooks;
