import Link from "next/link";

export const ToLink = (props) => {
    return(
        <Link href={props.link}><button className="bg-customGreen p-3 rounded-lg font-medium">{props.children}</button></Link>
    );
}

export const Button = (props) => {
    return(
        <button className="bg-redForButton text-white text-center min-w-[150px] mt-4 p-2 rounded-lg font-semibold">{props.children}</button>
    );
}
