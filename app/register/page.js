import { Button } from "../components/buttons";
import { TitleLogin } from "../components/text";

export default function Register() {

  return (
        <div className="flex justify-center my-20">
          <div className="text-black font-medium bg-customGrey p-5 w-4/12 space-y-5 rounded-lg">
            <TitleLogin className="">Iniciar Sesión</TitleLogin>
            <h2>Correo electrónico</h2>
            <input type="text" className="w-full rounded-lg"></input>
            <h2>Contraseña</h2>
            <input type="text" className="w-full rounded-lg"></input>
            <div className="flex">
                <h4>¿No tienes una cuenta?</h4>
                <h4 className="mx-3 text-carouselBlue underline cursor-pointer">Registro</h4>
            </div>
            <div className="flex">
              <h4>¿Olvidaste la contraseña?</h4>
              <h4 className="mx-3 text-carouselBlue underline cursor-pointer">Recuperar contraseña</h4>
            </div>
            <div className="flex justify-center">
              <Button>Ingresar</Button>
            </div>
          </div>
        </div>
      
  )
}
 


