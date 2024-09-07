import { Title } from "../../atoms";

const ModalReferral = ({ closeModal, title, isModal, children, editMode, onClickBtn, userStatus, data }) => {
    return (
        <div>
          {isModal && (
            <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-black bg-opacity-50">
              <div className="relative w-auto my-auto mx-auto max-w-2xl">
                <div className="w-full rounded-lg bg-white">
                  <div className="flex items-start justify-between px-5 py-3 border-b border-solid border-gray-300 rounded-t mobile:mt-[50%]">
                    <div className="place-self-center">
                      <Title
                        className="fontsize__most_smallest fontcolor__blue fontweight__bold"
                        text={title}
                      />
                    </div>
                    <button
                      className="bg-transparent border-0 text-black float-right place-self-center"
                      onClick={closeModal}
                    >
                      <img src="/icons/Close_Circle.svg" alt="Close Button" />
                    </button>
                  </div>
                  <div>{children}</div>
                </div> 
              </div>
            </div>
          )}
        </div>
      );
}

export default ModalReferral;