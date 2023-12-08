import { StringProps } from "../../utils/types";

export default function H1({text}: StringProps){
    return (
        <h1 className="text-3xl py-4">{text}</h1>
    )
}