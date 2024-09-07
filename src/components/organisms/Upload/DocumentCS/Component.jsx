
import React, { useEffect } from 'react';
import { Button } from '../../../atoms';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

const Component = ({ files, getRootProps, getInputProps, removeItem, handleOnDragEnd, alertImg }) => {
  function ReadyToPick(title) {
    return (
      <>
        <div className="properti-secondary__frame-dashed__wrapper" {...getRootProps()}>
          <input {...getInputProps()} />
          <img className="mx-auto" src="/icons/small-icons/properti-secondary/Vector_uploadsecondary.svg" alt="img-icon" />
          <p className="properti-secondary__upload_foto__dnd-text">{title}</p>
          <p><span className="properti-secondary__upload_foto__info-text">Maksimal 1.5mb</span></p>
        </div>
      </>
    )
  }
  function ImgPicked({imgArray,title}) {
    return (
      <div className="h-[100%] text-center flex relative gap-2 justify-center">
        {files[imgArray] && files[imgArray]?.preview !== '' && <img className="relative object-cover rounded-lg opacity-50" src={files[imgArray]?.imgfile?.type === "application/pdf" ? '/images/RawDocument.png'  : files[imgArray]?.preview} alt="img-preview" />}
        {files[imgArray] && <div className='absolute top-11 z-20 cursor-pointer'><img src="/icons/small-icons/Delete_Document.svg" alt='deleted' className="relative" onClick={() => removeItem(imgArray, files[imgArray]?.preview)}></img></div>}
        {!files[imgArray] && ReadyToPick(title)}
      </div>
    )
  }
  return (
    <div>
          <div className="sellprops__card__upload-wrap">
            <div className={`${files[0] ? "mobile:w-auto w-[268px] mobile:h-auto tab:h-auto h-[132px] rounded-lg" : "mobile:w-auto w-[268px] mobile:h-auto tab:h-auto h-[132px] rounded-lg border border-dashed border-[#00529C]"}`}>
              {files.length < 1 ?
                ReadyToPick("Pilih File")
                :
                ImgPicked({imgArray: 0, title: 'Pilih File'})
              }
              {files?.[0]?.msgError &&
               <p className='text-[#E84040] text-xs'>{files?.[0]?.msgError}</p>
              }
            </div>

            <div className={`${files[1] ? "mobile:w-auto w-[268px] mobile:h-auto tab:h-auto h-[132px] rounded-lg" : "mobile:w-auto w-[268px] mobile:h-auto tab:h-auto h-[132px] rounded-lg border border-dashed border-[#00529C]"}`}>
              {files.length >= 1 && files.length < 2 ?
                ReadyToPick("Pilih File")
                :
                ImgPicked({imgArray: 1, title: 'Pilih File'})
              }
              {files?.[1]?.msgError &&
               <p className='text-[#E84040] text-xs'>{files?.[1]?.msgError}</p>
              }
            </div>

            <div className={`${files[2] ? "mobile:w-auto w-[268px] mobile:h-auto tab:h-auto h-[132px] rounded-lg" : "mobile:w-auto w-[268px] mobile:h-auto tab:h-auto h-[132px] rounded-lg border border-dashed border-[#00529C]"}`}>
              {files.length >= 2 && files.length < 3 ?
                ReadyToPick("Pilih File")
                :
                ImgPicked({imgArray: 2, title: 'Pilih File'})
              }
              {files?.[2]?.msgError &&
               <p className='text-[#E84040] text-xs'>{files?.[2]?.msgError}</p>
              }
            </div>
          </div>
    </div>
  );
};

export default Component;