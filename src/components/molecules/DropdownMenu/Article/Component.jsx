import _ from "lodash-contrib"
import React, { forwardRef } from "react"
import PropTypes from "prop-types"

const Component = forwardRef((props, ref) => {
    const {artikel, video, searchTerm, otherProps} = props
    const checkData = (type) => {
        let res
        switch(type) {
            case "artikel":
                (artikel.length > 0) ? res = true : res = false
                break
            case "video":
                (video.length > 0) ? res = true : res  = false
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
                    <div className="dropdown-inputs__header rounded-t-xl">
                        <p className="dropdown-inputs__text">Artikel</p>
                    </div>
                    <div className={checkData("artikel") ? 'flex flex-col gap-2 overflow-x-auto max-h-[218px]' : 'dropdown-inputs__list-zero'}>
                    { checkData("artikel") ? (
                            artikel.map((v, i) => {
                                const searchTermLower = searchTerm.toLowerCase()
                                const vLower = v.toLowerCase()
                                const startIndex = vLower.indexOf(searchTermLower)
                                if (startIndex === -1) {
                                    return (
                                        <div className="dropdown-inputs__proyek-list hover:bg-[#DDEFFC] cursor-pointer rounded-md " key={i} onClick={() => otherProps.handleClickList(v)}>
                                            <p>{v}</p>
                                        </div>
                                    );
                                }
    
                                const string = v.substring(0, startIndex);
                                const highlightedText = v.substring(startIndex, startIndex + searchTerm.length);
                                const endString = v.substring(startIndex + searchTerm.length);
    
                                return (
                                    <div className="dropdown-inputs__proyek-list hover:bg-[#DDEFFC] cursor-pointer rounded-md " key={i} onClick={() => otherProps.handleClickList(v)}>
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
                                <p>{`Tidak ada hasil pencarian '${searchTerm.length > 12 ? searchTerm.substring(0,12) + '...' : searchTerm}' untuk Artikel`}</p>
                            </div>
                        )  
                    }
                    </div>
                </div>
                <div>
                    <div className="dropdown-inputs__header">
                        <p className="dropdown-inputs__text">Video</p>
                    </div>
                    <div className={checkData("video") ? 'flex flex-col gap-2 overflow-x-auto max-h-[218px]' : 'dropdown-inputs__list-zero'}>
                    { checkData("video") ? (
                            video.map((v, i) => {
                                const searchTermLower = searchTerm.toLowerCase()
                                const vLower = v.toLowerCase()
                                const startIndex = vLower.indexOf(searchTermLower)
                                if (startIndex === -1) {
                                    return (
                                        <div className="dropdown-inputs__proyek-list hover:bg-[#DDEFFC] cursor-pointer rounded-md " key={i} onClick={() => otherProps.handleClickList(v)}>
                                            <p>{v}</p>
                                        </div>
                                    );
                                }
    
                                const string = v.substring(0, startIndex);
                                const highlightedText = v.substring(startIndex, startIndex + searchTerm.length);
                                const endString = v.substring(startIndex + searchTerm.length);
    
                                return (
                                    <div className="dropdown-inputs__proyek-list hover:bg-[#DDEFFC] cursor-pointer rounded-md " key={i} onClick={() => otherProps.handleClickList(v)}>
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
                                <p>{`Tidak ada hasil pencarian '${searchTerm.length > 12 ? searchTerm.substring(0,12) + '...' : searchTerm}' untuk Video`}</p>
                            </div>
                        )  
                    }
                    </div>
                </div>
            </div>
        </>
    )
})

Component.propTypes = {
    data: PropTypes.any.isRequired
}

Component.defaultProps = {
    data: []
}

export default Component