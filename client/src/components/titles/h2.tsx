import { StringProps } from "../../types/typNation";

export default function H2({text}: StringProps){
    return (
        <h2 className="animate-in fade-in duration-700 text-2xl py-4 text-center">{text}</h2>
    )
}