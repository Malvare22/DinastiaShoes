import { useContext, useState } from "react";
import { Button, CancelModalButton } from "./buttons";
import { InputChangePassword, InputRegisterPassword } from "./forms/inputs";
import { formContext } from "./context";


/***
 * La clase Modal son las ventanas emergentes.
 * Se asume que siempre tendran un botón de cancelar
 * button -> Es la acción que queremos hacer al aceptar
 * text -> El texto de la alerta
 * setIsVisible -> Es necesario para cerrar la ventana
 */
const Modal = (props) => {

    const {button, text, setIsVisible} = props;

    return (
      <div>
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
                    <Button color="bg-grey" handleButton={() => setIsVisible(false)}>Cancelar</Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  export const ModalUnstandard = ({children}) => {

    return (
      <div>
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex justify-center items-center w-full h-full">
            <div className="modal-container rounded-lg shadow-lg overflow-hidden p-4 w-6/12 bg-lightGrey">
              <div className="modal-content px-6 my-10">
                  {children}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export const ModalChangePassword = (props) =>{
    const {setIsVisible} = props;
  
    return (
      <div>
          <div className="fixed z-10 inset-0 overflow-y-auto">
            <div className="flex justify-center items-center w-full h-full">
              <div className="modal-container rounded-lg shadow-lg overflow-hidden p-4 w-6/12 bg-lightGrey">
                <div className="modal-content px-6 my-10 space-y-10">
                    <InputChangePassword setIsVisible={setIsVisible}></InputChangePassword>
                </div>
              </div>
            </div>
          </div>
      </div>
    );
  };


  export default Modal;