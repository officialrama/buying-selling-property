import { React, useEffect, useRef, useState } from 'react';
import { ModalBaseComponent } from '../../../components/molecules';
import TextboxLabel from '../../../components/molecules/Input/textbox-custom/textbox-label';
import { Button, UploadSingleFile, } from '../../../components/atoms';
import { showModalFail } from '../../../store/actions/fetchData/superAdminState';
import { PendaftaranLRC } from '../../../store/actions/fetchData/hotLeadsManagement';

function ModalCompanyRegistration({ inputsRef, setInputsRef, closeModal, isModal, editMode, dispatch, otherProps }) {
    const disabled = false;
    const refSingleUpload = useRef(null);
    const resetSingleUpload = () => {
        refSingleUpload.current.value = null;
    };
    const [pksFile, setPksFile] = useState({ file: "", name: "", selected: false });
    const [loadingFile, setLoadingFile] = useState(false);
    const inputArr = [
        inputsRef?.namaPartner?.isValid,
    ];
    useEffect(() => {
        if (inputsRef?.filePKS?.value !== "-" && inputsRef?.namaFilePKS?.value !== "-") {
            setPksFile({ file: inputsRef?.filePKS?.value, name: inputsRef?.namaFilePKS?.value, selected: inputsRef?.filePKS?.value ? true : false })
        }
    }, [inputsRef]);

    return (
        <ModalBaseComponent isModal={isModal} closeModal={closeModal} title={!editMode ? "Company Registration" : "Edit Company"} editMode={editMode}>
            <form>
                <div className="p-6 pt-2 pb-0 flex-auto max-h-[50vh] overflow-y-auto lg:w-[600px]">
                    <div className="mb-4">
                        <TextboxLabel topLabel="Nama Partner" requiredStar={true} placeholder="Nama Partner" name="namaPartner" value={inputsRef?.namaPartner?.value}

                            onChange={(e) => {
                                otherProps.handleInputNoNumberAndSpec(e?.target?.value, e.target.name);
                            }}

                            warnText={inputsRef?.namaPartner?.msgError}
                        />
                    </div>
                    <div className="mb-4">
                        <TextboxLabel topLabel="Nomor PKS" requiredStar={false} placeholder="Nomor PKS" name="nomerPks" value={inputsRef?.nomerPks?.value}

                            onChange={otherProps.handleNumberInput}

                            warnText={inputsRef?.nomerPks?.msgError}
                        />
                    </div>
                    <div className="mb-4">
                        <UploadSingleFile
                            loading={loadingFile}
                            disabled={disabled && true}
                            requiredStar={false}
                            title="Upload PKS"
                            reference={refSingleUpload}
                            name="brosur"
                            files={pksFile.file}
                            onChange={(e) => {
                                const fileName = e.target.files[0].name.toString();
                                const idxDot = fileName.lastIndexOf(".") + 1;
                                const extFile = fileName.substr(idxDot, fileName.length).toLowerCase();
                                if (extFile !== "pdf") {
                                    // dispatch(showModalFail("Gagal", "Format file tidak didukung"));
                                    resetSingleUpload();
                                    setInputsRef({
                                        ...inputsRef,
                                        filePKS: { isValid: false, value: null, msgError: "Format file tidak didukung" },
                                    });
                                } else if (e.target.files[0].size > 5000000) {
                                    // dispatch(showModalFail("Gagal", "File Terlalu Besar"));
                                    resetSingleUpload();
                                    setInputsRef({
                                        ...inputsRef,
                                        filePKS: { isValid: false, value: null, msgError: "File Terlalu Besar" },
                                    });
                                } else {
                                    Array.from(e.target.files).forEach(file => {
                                        setPksFile({ ...pksFile, file: file, name: file.name, selected: true });
                                    })
                                }
                            }}
                            selectedFile={pksFile.selected && true}
                            fileName={pksFile !== [] && pksFile.name}
                            onClickClear={(e) => {
                                resetSingleUpload();
                                setPksFile({ file: "", name: "", selected: false });
                            }}
                            acceptedFiles=".pdf"
                            invalidTxt={inputsRef?.filePKS?.msgError}
                        />
                    </div>
                </div>
                <div className="p-6 w-full">
                    <Button btnTypes="submit" id="submitCompany" name="submitCompany" className="w-full" disabled={inputArr.filter(Boolean).length !== 1} onClick={() => {
                        closeModal();
                        dispatch(PendaftaranLRC(inputsRef, pksFile, editMode));
                        setInputsRef([])
                    }}>{editMode ? "Update" : "Submit"}</Button>
                </div>
            </form>
        </ModalBaseComponent>
    )
}

export default ModalCompanyRegistration