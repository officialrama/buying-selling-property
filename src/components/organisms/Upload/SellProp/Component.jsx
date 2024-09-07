import React, { useEffect } from 'react';
import { Button } from '../../../atoms';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

const Component = ({ files, getRootProps, getInputProps, removeItem, handleOnDragEnd }) => {
  // useEffect(() => {
    //   console.log("Ini files >>> ", files);
  // }, [files]);
  function ReadyToPick() {
    return (
      <div className="sellprops__card__frame-dashed__wrapper" {...getRootProps()}>
        <input {...getInputProps()} />
        <img className="mx-auto" src="/icons/Image_perspective_matte.png" alt="img-icon" />
        <p className="sellprops__card__dnd-text">Drag & drop foto disini <span className="sellprops__card__or-txt">atau</span></p>
        <div><Button buttonColor="blue" textColor="white" fullWidth={false} paddingSize={"padding-0"}>Upload Foto</Button></div>
      </div>
    )
  }
  function ImgPicked(imgArray) {
    return (
      <Draggable isDragDisabled={!files[imgArray]} key={imgArray.toString()} draggableId={imgArray.toString()} index={imgArray}>
        {provided => (
          <div 
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            className="sellprops__card__frame-dashed__wrapper"
          >
            {files[imgArray] && <div className="sellprops__card__frame-dashed__img-wrap"><img className="sellprops__card__frame-dashed__img" src={files[imgArray]?.preview} alt="img-preview" /></div>}
            {files[imgArray] && <div><Button buttonColor="blue" textColor="white" fullWidth={false} paddingSize={"padding-0"} onClick={() => removeItem(imgArray, files[imgArray]?.preview)}>Hapus Foto</Button></div>}
            {!files[imgArray] && <img className="mx-auto" src="/icons/small-icons/Add-Plus.svg" alt="img-icon" />}
          </div>
        )}
      </Draggable>
    )
  }
  return (
    <div>
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId='top' direction='horizontal'>
          {provided => (
            <div {...provided.droppableProps} ref={provided.innerRef} className="sellprops__card__upload-wrap">
              <div className="sellprops__card__frame-dashed">
                {files.length < 1 ?
                  ReadyToPick()
                  :
                  ImgPicked(0)
                }
              </div>

              <div className="sellprops__card__frame-dashed">
                {files.length >= 1 && files.length < 2 ?
                  ReadyToPick()
                  :
                  ImgPicked(1)
                }
              </div>

              <div className="sellprops__card__frame-dashed">
                {files.length >= 2 && files.length < 3 ?
                  ReadyToPick()
                  :
                  ImgPicked(2)
                }
              </div>

              <div className="sellprops__card__frame-dashed">
                {files.length >= 3 && files.length < 4 ?
                  ReadyToPick()
                  :
                  ImgPicked(3)
                }
              </div>
            </div>
          )}
        </Droppable>
        <Droppable droppableId='bottom' direction='horizontal'>
          {provided => (
            <div {...provided.droppableProps} ref={provided.innerRef} className="sellprops__card__upload-wrap">
              <div className="sellprops__card__frame-dashed">
                {files.length >= 4 && files.length < 5 ?
                  ReadyToPick()
                  :
                  ImgPicked(4)
                }
              </div>

              <div className="sellprops__card__frame-dashed">
                {files.length >= 5 && files.length < 6 ?
                  ReadyToPick()
                  :
                  ImgPicked(5)
                }
              </div>

              <div className="sellprops__card__frame-dashed">
                {files.length >= 6 && files.length < 7 ?
                  ReadyToPick()
                  :
                  ImgPicked(6)
                }
              </div>

              <div className="sellprops__card__frame-dashed">
                {files.length >= 7 && files.length < 8 ?
                  ReadyToPick()
                  :
                  ImgPicked(7)
                }
              </div>
            </div>
          )}
        </Droppable>
        {/* <div className="sellprops__card__upload-wrap">
          <div className="sellprops__card__frame-dashed">
            {files.length >= 4 && files.length < 5 ?
              ReadyToPick()
              :
              ImgPicked(4)
            }
          </div>

          <div className="sellprops__card__frame-dashed">
            {files.length >= 5 && files.length < 6 ?
              ReadyToPick()
              :
              ImgPicked(5)
            }
          </div>

          <div className="sellprops__card__frame-dashed">
            {files.length >= 6 && files.length < 7 ?
              ReadyToPick()
              :
              ImgPicked(6)
            }
          </div>

          <div className="sellprops__card__frame-dashed">
            {files.length >= 7 && files.length < 8 ?
              ReadyToPick()
              :
              ImgPicked(7)
            }
          </div>
        </div> */}
      </DragDropContext>
    </div>
  );
};

export default Component;