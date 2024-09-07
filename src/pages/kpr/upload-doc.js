import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { UploadBox } from '../../components/atoms';
import { showModalFail } from '../../store/actions/fetchData/superAdminState';

const UploadDoc = ({ ktp, selfieKtp }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])
  return (
    <div>
      <div className="kprApproval__pages__upload__childWrapper">
        <div className="kprApproval__pages__upload__uploadWrapper">
          <UploadBox
            files={ktp.ktpFiles}
            label="Foto KTP"
            nameUpload="losKtp"
            idUpload="losKtp"
            acceptedFiles=".jpg,.png,.jpeg"
            showRemoveBtn={true}
            onChangeUpload={(e) => {
              const fileName = e.target.files[0].name.toString();
              const extFile = fileName.substr(fileName.lastIndexOf(".") + 1, fileName.length).toLowerCase();
              const filterExtArray = [extFile !== "jpg", extFile !== "jpeg", extFile !== "png"];
              if (filterExtArray.indexOf(false) === -1) {
                dispatch(showModalFail("Gagal", "Format file tidak didukung"));
              } else {
                Array.from(e.target.files).forEach((file) => {
                  ktp.setKtpFiles({ ...ktp.ktpFiles, file: file, name: file.name, preview: URL.createObjectURL(file) });
                });
              }
            }}
            onClickRemove={() => {
              URL.revokeObjectURL(ktp.ktpFiles.preview);
              ktp.setKtpFiles({ file: "", name: "", preview: "" })
            }}
            altImg="ktp"
          />
          <UploadBox
            files={selfieKtp.selfieKtpfiles}
            label="Swafoto KTP"
            nameUpload="losSelfie"
            idUpload="losSelfie"
            showRemoveBtn={true}
            onChangeUpload={(e) => {
              const fileName = e.target.files[0].name.toString();
              const extFile = fileName.substr(fileName.lastIndexOf(".") + 1, fileName.length).toLowerCase();
              const filterExtArray = [extFile !== "jpg", extFile !== "jpeg", extFile !== "png"];
              if (filterExtArray.indexOf(false) === -1) {
                dispatch(showModalFail("Gagal", "Format file tidak didukung"));
              } else {
                Array.from(e.target.files).forEach((file) => {
                  selfieKtp.setSelfieKtpFiles({ ...selfieKtp.selfieKtpfiles, file: file, name: file.name, preview: URL.createObjectURL(file) });
                });
              }
            }}
            onClickRemove={() => {
              URL.revokeObjectURL(selfieKtp.selfieKtpfiles.preview);
              selfieKtp.setSelfieKtpFiles({ file: "", name: "", preview: "" })
            }}
            altImg="selfie-ktp"
          />
        </div>
      </div>
    </div>
  );
};

export default UploadDoc;