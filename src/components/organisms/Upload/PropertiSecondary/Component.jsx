import React, { useEffect } from 'react';
import { Button } from '../../../atoms';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

const Component = ({ files, getRootProps, getInputProps, removeItem, handleOnDragEnd }) => {
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
      <div className="properti-secondary__frame-dashed__wrapper">
        {files[imgArray] && <div className="sellprops__card__frame-dashed__img-wrap"><img className="sellprops__card__frame-dashed__img" src={files[imgArray]?.preview} alt="img-preview" /></div>}
        {files[imgArray] && <div><Button buttonColor="blue" textColor="white" fullWidth={false} paddingSize={"padding-0"} onClick={() => removeItem(imgArray, files[imgArray]?.preview)}>Hapus Foto</Button></div>}
        {/* {!files[imgArray] && <img className="mx-auto" src="/icons/small-icons/Add-Plus.svg" alt="img-icon" />} */}
        {!files[imgArray] && ReadyToPick(title)}
      </div>
    )
  }
  return (
    <div>
          <div className="sellprops__card__upload-wrap">
            <div className="sellprops__card__frame-dashed">
              {files.length < 1 ?
                ReadyToPick("Tampak Depan")
                :
                ImgPicked({imgArray: 0, title:"Tampak Depan"})
              }
            </div>

            <div className="sellprops__card__frame-dashed">
              {files.length >= 1 && files.length < 2 ?
                ReadyToPick("Tampak Belakang")
                :
                ImgPicked({imgArray: 1, title:"Tampak Belakang"})
              }
            </div>

            <div className="sellprops__card__frame-dashed">
              {files.length >= 2 && files.length < 3 ?
                ReadyToPick("Tampak Samping")
                :
                ImgPicked({imgArray: 2, title:"Tampak Samping"})
              }
            </div>

          </div>
          <div className="sellprops__card__upload-wrap">
            <div className="sellprops__card__frame-dashed">
              {files.length >= 3 && files.length < 4 ?
                ReadyToPick("Bagian dalam properti")
                :
                ImgPicked({imgArray: 3, title:"Bagian dalam properti"})
              }
            </div>

            <div className="sellprops__card__frame-dashed">
              {files.length >= 4 && files.length < 5 ?
                ReadyToPick("Bagian dalam properti")
                :
                ImgPicked({imgArray: 4, title:"Bagian dalam properti"})
              }
            </div>

            <div className="sellprops__card__frame-dashed">
              {files.length >= 5 && files.length < 6 ?
                ReadyToPick("Bagian dalam properti")
                :
                ImgPicked({imgArray: 5, title:"Bagian dalam properti"})
              }
            </div>

          </div>
          <div className="sellprops__card__upload-wrap">
            <div className="sellprops__card__frame-dashed">
              {files.length >= 6 && files.length < 7 ?
                ReadyToPick("Garasi (Jika ada)")
                :
                ImgPicked({imgArray: 6, title:"Garasi (Jika ada)"})
              }
            </div>

            <div className="sellprops__card__frame-dashed">
              {files.length >= 7 && files.length < 8 ?
                ReadyToPick("Halaman Depan (Jika ada)")
                :
                ImgPicked({imgArray: 7, title:"Halaman Depan (Jika ada)"})
              }
            </div>

            <div className="sellprops__card__frame-dashed">
              {files.length >= 8 && files.length < 9 ?
                ReadyToPick("Halaman Belakang (Jika ada)")
                :
                ImgPicked({imgArray: 8, title:"Halaman Belakang (Jika ada)"})
              }
            </div>

          </div>
    </div>
  );
};

export default Component;