import { StringProps } from "../../types/typProp";

export default function H2({ text }: StringProps) {
  return <h2 className=" text-2xl py-4 text-center capitalize">{text}</h2>;
}
