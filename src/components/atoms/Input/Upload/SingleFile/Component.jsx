import React from "react";
import PropTypes from "prop-types";
import { MdOutlineClear } from "react-icons/md";
import { SmallLoading } from "../../..";
import useWindowDimensions from "../../../../../utils/dimensions";

function Component({
  onChange,
  selectedFile,
  fileName,
  name,
  onClickClear,
  acceptedFiles,
  reference,
  title,
  id,
  requiredStar,
  disabled,
  invalid,
  invalidTxt,
  files,
  loading
}) {
  const { width } = useWindowDimensions();
  function downloadFile() {
    const link = document.createElement('a')
    const url = URL.createObjectURL(files)

    link.href = url
    link.download = files.name
    document.body.appendChild(link)
    link.click()

    document.body.removeChild(link)
    window.URL.revokeObjectURL(url)
  }
  return (
    <div>
      {title !== "" && (
        <label for={id} className="input-prefix__label">
          {title}
          {requiredStar && <span className="sellprops__card__redstar">*</span>}
        </label>
      )}
      <div className={disabled ? "upload-single__wrapperDisabled" : "upload-single__wrapper"}>
        <input
          type="file"
          id={id}
          name={name}
          onChange={onChange}
          accept={acceptedFiles}
          ref={reference}
          disabled={disabled}
          hidden
        />
        {loading ?
          <div className="flex flex-row gap-2">
            <SmallLoading blueColor={true} />
            <span>Memuat file</span>
          </div>
          :
          <div>
            {fileName ?
              <></>
              :
              <div>
                <label className="btn-upload" for={id}>
                  <img
                    alt="icon"
                    src="/icons/small-icons/clip.svg"
                    className="btn-upload__img"
                  />{" "}
                  Choose file
                </label>
              </div>
            }

          </div>
        }
        {!loading &&
          <p className={`upload-single__placeholder ${selectedFile && "-ml-4 w-full"}`}
            onClick={() => { selectedFile && downloadFile() }}>
            {selectedFile === true ? fileName.length >= 50 ? `${fileName.substring(0,50)}...pdf` : fileName : `${width >= 770 ? `Pilih file untuk di upload (${acceptedFiles})` : ""}`}
          </p>
        }
        {selectedFile === true && !loading ? (
          <button onClick={disabled ? null : onClickClear}>
            <MdOutlineClear className="upload-single__clear-btn" />
          </button>
        ) : <></>}
      </div>
      <p className="text-sm text-[#808080]">*File maks. 5MB</p>
      {invalidTxt && <p className="textbox__invalidTxt">{invalidTxt}</p>}
    </div>
  );
}

Component.propTypes = {
  onChange: PropTypes.func.isRequired,
  selectedFile: PropTypes.bool.isRequired,
  fileName: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onClickClear: PropTypes.func.isRequired,
  acceptedFiles: PropTypes.string.isRequired,
  reference: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.any }),
  ]),
  title: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  requiredStar: PropTypes.bool,
  disabled: PropTypes.bool,
  invalid: PropTypes.bool,
  invalidTxt: PropTypes.string
};

Component.defaultProps = {
  onChange: [() => { }],
  selectedFile: false,
  fileName: "",
  name: "",
  onClickClear: [() => { }],
  acceptedFiles: ".jpg,.png,.jpeg,.pdf",
  title: "",
  id: "upload",
  requiredStar: false,
  disabled: false,
  invalid: false,
  invalidTxt: ""
};

export default Component;
