import { useState } from "react";
import { Button, CancelModalButton } from "./buttons";

const Modal = (props) => {

    const {isVisible, setIsVisible, children, button, text} = props;
  
    const toggleModal = () => {
      setIsVisible(!isVisible);
    };
  
    return (
      <div>
        {isVisible && (
          <div className="fixed z-10 inset-0 overflow-y-auto">
            <div className="flex justify-center items-center w-full h-full">
              <div className="modal-container rounded-lg shadow-lg overflow-hidden p-4 w-6/12 bg-lightGrey">
                <div className="modal-content px-6 my-10 space-y-10">
                  <div className="text-center">
                      {text}
                  </div>
                  <div className="flex justify-center">
                    <div className="mx-10">
                      <Button handleButton={button.make} color={button.color}>{button.text}</Button>
                    </div>
                    <div className="mx-10">
                      <ModalCloseButton isVisible={isVisible} setIsVisible={setIsVisible}>Cancelar</ModalCloseButton>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };
  
  export const ModalCloseButton = (props) =>{

    const {isVisible, setIsVisible, children} = props;

    const toggleModal = () => {
      setIsVisible(!isVisible);
    };

    return(
      <Button color="bg-grey" handleButton={toggleModal}>{children}</Button>
    )
  }  

  export default Modal;