'use client'

import { ToLink } from "../components/buttons";
import DirectionForm from "../components/forms/direction";
import PageContainer from "../components/pageContainer";
import { ValidTypes } from "../lib/information";

/**
 * Corresponde a la pestaña de edición de información de los usuarios
 */
export default function Page(){

    ValidTypes(['C']);    

    return(
        <div className="my-10">
            <DirectionForm type={2}></DirectionForm>
            <div className="mb-10 flex justify-center space-x-6">
                <ToLink link='/selectMethod' color='bg-green'>Continuar</ToLink>
                <ToLink link='/cart' color='bg-grey'>Cancelar</ToLink>
            </div>
        </div>
    );
}