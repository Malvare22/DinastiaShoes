import Link from "next/link";

export const TitleInput = (props) => {
    return(
        <div className="font-bold text-4xl mb-8">{props.children}</div>
    );
}

export const LabelInput = (props) => {
    return(
        <div className="font-medium">{props.children}</div>
    );
}

export const AText = (props) => {
    return(
        <Link href={props.link}>
            <h3 className="text-blueDark underline ml-2">{props.children}</h3>
        </Link>
    );
}