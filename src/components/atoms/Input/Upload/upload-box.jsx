import PropTypes from "prop-types";
import Button from "../../Button/Component";
import LabelInputTextbox from "../../Label/label-input-textbox";

function Uploadbox({ files, label, idUpload, nameUpload, onChangeUpload, altImg, onClickRemove, acceptedFiles, showRemoveBtn }) {
  return (
    <div className="uploadbox">
      {label && (
        <div className="mb-2">
          <LabelInputTextbox text={label} />
        </div>
      )}
      <div className="uploadbox__dashed">
        {!files?.preview ?
          (label && (
            <Button
              btnTypes="upload"
              buttonColor="orangeBorderOnly"
              textColor="orange"
              fullWidth={false}
              paddingSize={"padding-1"}
              nameUpload={nameUpload}
              onChangeUpload={onChangeUpload}
              idUpload={idUpload}
              acceptedFiles={acceptedFiles}
            >
              {label}
            </Button>
          ))
          :
          <div className="uploadbox__imgPick-wrap">
            <img className={showRemoveBtn ? " uploadbox__imgPick" : "uploadbox__imgPick-full"} src={files.preview} alt={altImg} />
            {showRemoveBtn &&
              <Button buttonColor="white" textColor="orange" className="uploadbox__remove-btn" onClick={onClickRemove}>
                Hapus
              </Button>
            }
          </div>
        }
      </div>
    </div>
  );
}

Uploadbox.propTypes = {
  label: PropTypes.string.isRequired,
  nameUpload: PropTypes.string.isRequired,
  onChangeUpload: PropTypes.func.isRequired,
  altImg: PropTypes.string.isRequired,
  onClickRemove: PropTypes.func.isRequired,
  referenceUpload: PropTypes.any,
  idUpload: PropTypes.string.isRequired,
  acceptedFiles: PropTypes.string.isRequired,
  showRemoveBtn: PropTypes.bool
};

Uploadbox.defaultProps = {
  label: "",
  nameUpload: "",
  onChangeUpload: [() => { }],
  altImg: "",
  onClickRemove: [() => { }],
  idUpload: "upload",
  acceptedFiles: ".jpg,.png,.jpeg,.pdf",
  showRemoveBtn: true
};

export default Uploadbox;
