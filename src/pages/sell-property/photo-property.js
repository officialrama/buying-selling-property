import React, { useEffect } from "react";
import { DetailsCard, Textbox } from "../../components/molecules";
import { UploadSellProp } from "../../components/organisms";

const SellPhotoProperty = ({
  inputs,
  handleInputChange,
  files,
  setFiles,
  zip,
  getRootProps,
  getInputProps,
  removeItem,
  handleOnDragEnd
}) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <div className="sellprops__wrapper">
        <div className="sellprops__text-wrapper">
          <p className="sellprops__title">Foto Properti</p>
          <p>
            Upload foto properti anda.
          </p>
        </div>
        <DetailsCard className="sellprops__card__wrapper">
          <UploadSellProp
            files={files} 
            setFiles={setFiles}
            zip={zip}
            getRootProps={getRootProps}
            getInputProps={getInputProps}
            removeItem={removeItem}
            handleOnDragEnd={handleOnDragEnd}
          />
          <p>*Wajib diupload, Maks. 5MB</p>
          {files.length < 4 && <p className="textbox__invalidTxt">Foto Properti kurang dari 4</p>}
        </DetailsCard>
        <DetailsCard className="sellprops__card__wrapper">
          <div className="mb-6">
            <p className="sellprops__card__title--mb-2">Video Youtube</p>
            <Textbox
              placeholder="Link video youtube"
              typeInput="text"
              name="youtubeUrl"
              value={inputs?.youtubeUrl?.value}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <p className="sellprops__card__title--mb-2">Virtual 360</p>
            <Textbox
              placeholder="Virtual 360"
              typeInput="text"
              name="virtual360Url"
              value={inputs?.virtual360Url?.value}
              onChange={handleInputChange}
            />
          </div>
        </DetailsCard>
      </div>
    </div>
  );
};

export default SellPhotoProperty;
