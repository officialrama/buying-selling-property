import JSZip from "jszip"
import { DetailsCard, Textbox } from "../../../components/molecules"
import { UploadPropertiSecondary } from "../../../components/organisms"
import useSellPropsHooksV2 from "../../../hooks/v2/useSellPropsHooksV2"
import { compressImage } from "../../../helpers/imageCompressor"
import { useDropzone } from "react-dropzone"
import { useDispatch } from "react-redux"
import { showModalFail } from "../../../store/actions/fetchData/superAdminState"

const Foto = ({
    inputs,
    files,
    setFiles,
    zip,
    getRootProps, 
    getInputProps,
    removeItem,
    otherProps
}) => {
    function RedStar() {
        return <span className="sellpropsV2__card__redstar">*</span>;
      }
    return (
        <div className="sellpropsV2__wrapper">
            <DetailsCard className="sellpropsV2__card__wrapper">
                <div>
                    <div className="sellpropsV2__card__wrapper-content pb-5">
                        <p className="sellpropsV2__card__title">Unggah Foto Properti{RedStar()}</p>
                        <UploadPropertiSecondary
                            files={files}
                            setFiles={setFiles}
                            zip={zip}
                            getRootProps={getRootProps}
                            getInputProps={getInputProps}
                            removeItem={removeItem}
                        />
                        {files.length < 1 && <p className="textbox__invalidTxt mb-4">Upload Foto Minimal 1</p>}
                    </div>
                </div>
            </DetailsCard>
            <DetailsCard className="sellpropsV2__card__wrapper">
                <div className="flex flex-col gap-6">
                    <div className="flex flex-row gap-6">
                        <p className="w-[180px] font-bold text-lg text-[#292929]">Video Youtube</p>
                        <div className="w-full">
                            <Textbox
                                placeholder="Masukkan Link Video YouTube"
                                name="urlVideo"
                                typeInput="text"
                                value={inputs?.urlVideo?.value}
                                onChange={otherProps.handleInputChange}
                            />
                        </div>
                    </div>
                    <div className="flex flex-row gap-6">
                        <p className="w-[180px] font-bold text-lg text-[#292929]">Virtual 360</p>
                        <div className="w-full">
                            <Textbox
                                placeholder="Masukkan Link Video YouTube"
                                name="url360"
                                typeInput="text"
                                value={inputs?.url360?.value}
                                onChange={otherProps.handleInputChange}
                            />
                        </div>
                    </div>
                </div>
            </DetailsCard>
        </div>
    )
}

export default Foto