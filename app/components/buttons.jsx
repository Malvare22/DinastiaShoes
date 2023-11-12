'use client'

import Link from "next/link";

export const ToLink = (props) => {
    return(
        <Link href={props.link} className={"text-white text-center min-w-[150px] mt-4 p-2 rounded-lg font-semibold " + props.color}>{props.children}</Link>
    );
}

export const Button = (props) => {

    const {handleButton, color, disable} = props;
    
    const onAction = (e) => {
        e.preventDefault();
        handleButton();
    }

    return(
        <button onClick={onAction} disabled={(disable)} className={"text-white text-center min-w-[150px] mt-4 p-2 rounded-lg font-semibold "+ (disable? "opacity-25": "" ) + " " + color}>{props.children}</button>
    );
}

