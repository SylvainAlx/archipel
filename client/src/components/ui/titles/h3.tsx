import { StringProps } from "../../../types/typProp";

export default function H3({ text }: StringProps) {
  return (
    <h3 className="text-3xl text-wrap text-center overflow-auto">{text}</h3>
  );
}
