import { useState } from "react";
import { Button, CancelModalButton } from "./buttons";

const Modal = (props) => {

    const {isVisible, setIsVisible, button, children} = props;
  
    const toggleModal = () => {
      setIsVisible(!isVisible);
    };
  
    return (
      <div>
        {isVisible && (
          <div className="fixed z-10 inset-0 overflow-y-auto">
            <div className="flex justify-center items-center w-full h-full">
              <div className="modal-container rounded-lg shadow-lg overflow-hidden p-4 w-6/12 bg-lightGrey">
                <div className="modal-content py-4 px-6">
                  {children}
                </div>
                <div className="modal-footer py-3 px-6">
                    <div>{button}</div>
                  <div
                    className="modal-close btn-link text-gray-400 hover:bg-gray-700 hover:text-white">
                    <Button color="bg-grey" handleButton={toggleModal}>A</Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };
  
  export default Modal;