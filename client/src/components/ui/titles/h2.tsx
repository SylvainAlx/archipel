import { StringProps } from "../../../types/typProp";

export default function H2({ text }: StringProps) {
  return <h2 className="w-full text-2xl py-4 text-center">{text}</h2>;
}
