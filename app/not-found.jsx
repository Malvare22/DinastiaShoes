import { Button, ToLink } from "./components/buttons";

export default function NotFound() {

  
    return (
        <div className="text-black text-center flex-col align-middle items-center my-20 h-72 space-y-20">
          
            <div className="text-5xl">¡Ups!</div>
            <div className="text-5xl">El sitio al que intentas acceder no se encuentra permitido en este momento :(</div>
            <div className="text-2xl"><ToLink link='/' color='bg-blue'>Volver</ToLink></div>
            
          
        </div>
    )
  }