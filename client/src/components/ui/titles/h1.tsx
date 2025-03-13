import { StringProps } from "../../../types/typProp";

export default function H1({ text }: StringProps) {
  return <h1 className="text-3xl py-4 text-center animate-fadeIn">{text}</h1>;
}
