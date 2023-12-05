'use client'

import { ToLink } from "../components/buttons";
import DirectionForm from "../components/forms/direction";
import PageContainer from "../components/pageContainer";

/**
 * Corresponde a la pestaña de edición de información de los usuarios
 */
export default function Page(){

    

    return(
        <div className="my-10">
            <DirectionForm type={2}></DirectionForm>
            <div className="mb-10 flex justify-center">
                <ToLink link='/selectMethod' color='bg-green'>Continuar</ToLink>
            </div>
        </div>
    );
}