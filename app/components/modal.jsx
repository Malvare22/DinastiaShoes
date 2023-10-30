import { useState } from "react";
import { Button, CancelModalButton } from "./buttons";
import { InputChangePassword, InputRegisterPassword } from "./forms/inputs";

const Modal = (props) => {

    const {isVisible, setIsVisible, button, text} = props;
  
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
  
  export const ModalChangePassword = (props) =>{
    const {setIsVisible, setInformation, setValidate} = props;
  
    return (
      <div>
          <div className="fixed z-10 inset-0 overflow-y-auto">
            <div className="flex justify-center items-center w-full h-full">
              <div className="modal-container rounded-lg shadow-lg overflow-hidden p-4 w-6/12 bg-lightGrey">
                <div className="modal-content px-6 my-10 space-y-10">
                    <InputChangePassword setInformation={setInformation} setValidate={setValidate} setIsVisible={setIsVisible}></InputChangePassword>
                </div>
              </div>
            </div>
          </div>
      </div>
    );
  };

  export const ModalCloseButton = (props) =>{

    const {setIsVisible, children} = props;

    const toggleModal = () => {
      setIsVisible(false);
    };

    return(
      <Button color="bg-grey" handleButton={toggleModal}>{children}</Button>
    )
  }  

  export default Modal;