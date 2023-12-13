import { StringProps } from "../../utils/types";

export default function H1({text}: StringProps){
    return (
        <h1 className="animate-in fade-in duration-700 text-3xl py-4 text-center">{text}</h1>
    )
}