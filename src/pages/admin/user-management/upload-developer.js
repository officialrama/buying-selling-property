/* eslint-disable react-hooks/exhaustive-deps */
import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { GrDocumentCsv } from "react-icons/gr";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "../../../components/atoms";
import {
  Modal,
  NavHeaderAdmin,
  SideMenuAdmin
} from "../../../components/organisms";
import { showSingleModal } from "../../../store/actions/changeState";
import {
  closeModalFail,
  closeModalSuccess, saReset,
  showModalFail
} from "../../../store/actions/fetchData/superAdminState";

const UploadDeveloper = () => {
  const state = useSelector((state) => state.stateReducer);
  const saState = useSelector((state) => state.superAdminReducer);
  const dispatch = useDispatch();
  const [files, setFiles] = useState(null);

  const { getRootProps, getInputProps, inputRef } = useDropzone({
    accept: "text/csv",
    onDrop: (acceptedFiles) => {
      acceptedFiles.forEach((file) => {
        if (file.size > 5000000) {
          dispatch(showModalFail("Gagal", "File Terlalu Besar"));
        } else {
          setFiles(file);
        }
      })
    }
  });

  const removeFiles = () => {
    setFiles(null);
    inputRef.current.value = ''
  }

  // console.log("[DEBUG] files masuk sini : ", files);

  return (
    <div>
      {state.showSingleModal === true && (
        <Modal
          closeModal={() => dispatch(showSingleModal(!state.showSingleModal))}
          onClickDelete={() => {}}
          modalTypes="deleteConfirm"
          title="Konfirmasi"
        />
      )}
      {saState.success === true && (
        <Modal
          closeModal={() => {
            dispatch(closeModalSuccess());
            dispatch(saReset());
          }}
          modalTypes="modalSF"
          title=""
          titleBody={saState.titleSuccess}
          descBody={saState.msgSuccess}
        />
      )}
      {saState.fail === true && (
        <Modal
          closeModal={() => {
            dispatch(closeModalFail());
            dispatch(saReset());
          }}
          modalTypes="modalSF"
          title=""
          titleBody={saState.titleFail}
          descBody={saState.msgFail}
        />
      )}
      <NavHeaderAdmin />
      <SideMenuAdmin title="Upload Developer">
      {files === null ?
        <div className="sellprops__card__frame-dashed__wrapper" {...getRootProps()}>
          <input {...getInputProps()} />
          <center><GrDocumentCsv className="w-24 h-24" /></center>
          <p className="sellprops__card__dnd-text">Drag & drop file <b>*.csv</b> disini <span className="sellprops__card__or-txt">atau</span></p>
          <div><Button buttonColor="blue" textColor="white" fullWidth={false} paddingSize={"padding-0"}>Upload *.csv</Button></div>
        </div>
        :
        <div className="sellprops__card__frame-dashed__wrapper">
          <center><GrDocumentCsv className="w-24 h-24" /></center>
          <p className="sellprops__card__dnd-text">{files?.name}</p>
          <div className="flex flex-row gap-4 mx-auto">
            <Button buttonColor="blue" textColor="white" fullWidth={false} paddingSize={"padding-0"} onClick={() => removeFiles()}>Remove File</Button>
            <Button buttonColor="orange" textColor="white" fullWidth={false} paddingSize={"padding-0"} onClick={() => {}}>Upload</Button>
          </div>
        </div>
      }
      </SideMenuAdmin>
    </div>
  );
};

export default UploadDeveloper;
