import { FaInfoCircle } from "react-icons/fa";
import { StringProps } from "../types/typProp";

export default function HoverInfo({ text }: StringProps) {
  return (
    <div className="absolute w-max z-50 p-1 top-[-35px] bg-light text-primary text-sm rounded animate-fadeIn flex items-center gap-2">
      <FaInfoCircle />
      <div>{text}</div>
    </div>
  );
}
