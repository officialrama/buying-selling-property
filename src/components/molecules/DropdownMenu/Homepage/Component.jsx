import _ from "lodash-contrib"
import PropTypes from "prop-types"
import { encryptStr, encryptStrGO } from "../../../../helpers/encryptDecrypt"
import React, { forwardRef } from 'react'

const Component = forwardRef((props, ref) => {
    const { kota, proyek, searchTerm, setSearchTerm, isDropdown, setIsDropdown, onClick, otherProps } = props;
    const slicedData = proyek.slice(0,6)
    const checkData = (type) => {
        let res
        switch(type) {
            case "kota":
                (kota.length > 0) ? res = true : res = false
                break
            case "proyek":
                (proyek.length > 0) ? res = true : res  = false
                break
            default:
                res = true
        }

        return res
    }

    return (
        <>
            <div className="dropdown-inputs__wrapper" ref={ref}>
                <div>
                    <div className="dropdown-inputs__header  rounded-t-xl">
                        <p className="dropdown-inputs__text">Kota & Kabupaten</p>
                    </div>
                    <div className={checkData("kota") ? 'dropdown-inputs__list' : 'dropdown-inputs__list-zero'}>
                    { checkData("kota") ? (
                            kota.map((v, i) => {
                                const searchTermLower = searchTerm.toLowerCase()
                                const vLower = v.toLowerCase()
                                const startIndex = vLower.indexOf(searchTermLower)
                                if (startIndex === -1) {
                                    return (
                                        <div className="hover:bg-[#DDEFFC] cursor-pointer rounded-md" key={i} onClick={() => otherProps.handleClickCity(v)}>
                                            <p>{v}</p>
                                        </div>
                                    );
                                }
    
                                const string = v.substring(0, startIndex);
                                const highlightedText = v.substring(startIndex, startIndex + searchTerm.length);
                                const endString = v.substring(startIndex + searchTerm.length);
    
                                return (
                                    <div className="hover:bg-[#DDEFFC] cursor-pointer rounded-md" key={i} onClick={() => otherProps.handleClickCity(v)}>
                                        <p>
                                            {string}
                                            <span className="text-[#1078CA]">{highlightedText}</span>
                                            {endString}
                                        </p>
                                    </div>
                                );
                            })
                        ) :  
                        (
                            <div>
                                <p>{`Tidak ada hasil pencarian '${searchTerm.length > 12 ? searchTerm.substring(0,12) + '...' : searchTerm}' untuk Kota & Kabupaten`}</p>
                            </div>
                        )  
                    }
                    </div>
                </div>
                <div>
                    <div className="dropdown-inputs__header flex flex-row justify-between">
                        <p className="dropdown-inputs__text">Proyek</p>
                        <button onClick={onClick}>Lihat Semua</button>
                    </div>
                    <div className={checkData("proyek") ? 'dropdown-inputs__proyek__wrapper' : 'dropdown-inputs__list-zero'}>
                        { checkData("proyek") ? (
                            slicedData.map((data, index) => {
                                const namaProyekLower = data.namaProyek.toLowerCase()
                                const searchTermLower = searchTerm.toLowerCase()
                                const startIndex = namaProyekLower.indexOf(searchTermLower)
                        
                                if (startIndex === -1) {
                                    return (
                                        <div className={checkData("proyek") ? 'dropdown-inputs__proyek-list' : 'dropdown-inputs__proyek-list-zero'} key={index} onClick={() => otherProps.handleClickProject(encryptStr(data.idProperti))}>
                                            <div>
                                                <img className="dropdown-inputs__proyek_img" alt="Image here" src={data.imageUrl} />
                                            </div>
                                            <div>
                                                {/* <p className="font-semibold text-[14px] text-[#292929]">{data.namaProyek}</p> */}
                                                <p className="font-semibold text-[14px] text-[#292929]">{data.namaProperti}</p>
                                                <p className="font-medium text-[#777777] text-[12px]">
                                                    {/* <SlicedText text={JSON.parse(data.alamat).alamat} maxLength={15} searchTerm={searchTerm} /> */}
                                                    <SlicedText text={ JSON.parse(data.alamat).alamat } maxLength={15} searchTerm={searchTerm} />
                                                </p>
                                            </div>
                                        </div>
                                    )
                                }
                        
                                // const judul = data.namaProyek.substring(0, startIndex)
                                // const judulhighlightedText = data.namaProyek.substring(startIndex, startIndex + searchTerm.length)
                                // const judulendString = data.namaProyek.substring(startIndex + searchTerm.length)
                                const judul = data.namaProperti.substring(0, startIndex)
                                const judulhighlightedText = data.namaProperti.substring(startIndex, startIndex + searchTerm.length)
                                const judulendString = data.namaProperti.substring(startIndex + searchTerm.length)
                        
                                return (
                                    <div className="dropdown-inputs__proyek-list hover:bg-[#DDEFFC] rounded-xl cursor-pointer" key={index} onClick={() => otherProps.handleClickProject(encryptStr(data.idProperti))}>
                                        <div>
                                            <img className="dropdown-inputs__proyek_img" alt="Image here" src={data.imageUrl} />
                                        </div>
                                        <div>
                                            <p className="font-semibold text-[14px] text-[#292929]">
                                                {judul}
                                                <span className="text-[#1078CA]">{judulhighlightedText}</span>
                                                {judulendString}
                                            </p>
                                            <p className="font-medium text-[#777777] text-[12px]">
                                                <SlicedText text={ JSON.parse(data.alamat).alamat  } maxLength={15} searchTerm={searchTerm} />
                                            </p>
                                        </div>
                                    </div>
                                )
                            })
                        ) : (
                            <div>
                                <p>{`Tidak ada hasil pencarian '${searchTerm.length > 12 ? searchTerm.substring(0,12) + '...' : searchTerm}' untuk Proyek`}</p>
                            </div>
                        )
                            
                        }
                    </div>
                </div>
            </div>
        </>
    )
})

function SlicedText({ text, maxLength, searchTerm }) {
    const searchTermLower = searchTerm.toLowerCase();
    const textLower = text.toLowerCase();
    const startIndex = textLower.indexOf(searchTermLower);

    // jika tidak ditemukan sesuai searchterm return truncated text
    if (startIndex === -1) {
        const displayText = text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
        return <span>{displayText}</span>;
    }

    // kalkulasi slice index
    const startSliceIndex = Math.max(0, startIndex - (maxLength - searchTerm.length) / 2);
    let endSliceIndex = startIndex + searchTerm.length + (maxLength - searchTerm.length) / 2;

    // memastikan akhir index tidak melebihi panjang  text
    if (endSliceIndex > text.length) {
        endSliceIndex = text.length;
    }

    // memastikan text yang didisplay tidak melebih maxLength
    let displayText = text.slice(startSliceIndex, endSliceIndex);
    if (displayText.length > maxLength) {
        displayText = displayText.slice(0, maxLength);
    }

    // penyesuaian prefix dan suffix untuk memastikan highlited yang benar
    const displayTextLower = displayText.toLowerCase();
    const adjustedStartIndex = displayTextLower.indexOf(searchTermLower);

    const prefix = displayText.substring(0, adjustedStartIndex);
    const highlightedText = displayText.substring(adjustedStartIndex, adjustedStartIndex + searchTerm.length);
    const suffix = displayText.substring(adjustedStartIndex + searchTerm.length);

    return (
        <span>
            {prefix}
            <span className="text-[#1078CA]">{highlightedText}</span>
            {suffix}
            {endSliceIndex < text.length && '...'}
        </span>
    );
}

Component.propTypes = {
    data: PropTypes.any.isRequired
}

Component.defaultProps = {
    data: []
}

export default Component