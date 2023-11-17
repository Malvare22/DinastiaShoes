'use client'

import Link from "next/link";
import { useRef } from "react";

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

const DownloadIcon = () => {

    return(<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="black" className="bi bi-file-earmark-arrow-down-fill" viewBox="0 0 16 16">
    <path d="M9.293 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.707A1 1 0 0 0 13.707 4L10 .293A1 1 0 0 0 9.293 0zM9.5 3.5v-2l3 3h-2a1 1 0 0 1-1-1zm-1 4v3.793l1.146-1.147a.5.5 0 0 1 .708.708l-2 2a.5.5 0 0 1-.708 0l-2-2a.5.5 0 0 1 .708-.708L7.5 11.293V7.5a.5.5 0 0 1 1 0z"/>
  </svg>);
};

const UploadIcon = () => {

    return(<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="black" className="bi bi-file-earmark-arrow-up-fill" viewBox="0 0 16 16">
    <path d="M9.293 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.707A1 1 0 0 0 13.707 4L10 .293A1 1 0 0 0 9.293 0zM9.5 3.5v-2l3 3h-2a1 1 0 0 1-1-1zM6.354 9.854a.5.5 0 0 1-.708-.708l2-2a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1-.708.708L8.5 8.707V12.5a.5.5 0 0 1-1 0V8.707L6.354 9.854z"/>
  </svg>);
};



/**
 * type 1 = "upload"
 * type 2 = "download"
 * @returns 
 */
export const FileButton = ({text, type, handleButton, name}) =>{
    const inputSelector = useRef(); 

    const handleInput = () => {
        inputSelector.current.click();
    };

   
    return <div className="flex justify-center text-center space-x-4 items-center p-5 rounded-lg bg-lightGrey" onClick={handleInput}>
        <input type="file" className={"invisible w-0"} name={name} onChange={handleButton} ref={inputSelector}></input>
        {<h3>{text}</h3>}
        {type == 1 ? <UploadIcon></UploadIcon> : <DownloadIcon></DownloadIcon>}
    </div>
};


export const ImageButton = ({text , handleButton}) =>{
    const inputSelector = useRef(); 

    const handleInput = () => {
        inputSelector.current.click();
    };

   
    return <div className="flex justify-center text-center space-x-4 items-center p-5 rounded-lg">
        <input type="file" className={"invisible w-0"} onChange={handleButton} ref={inputSelector}></input>
        <Button color={"bg-green"} handleButton={handleInput}>{text}</Button>
    </div>
};