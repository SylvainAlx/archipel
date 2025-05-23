import { FaInfoCircle } from "react-icons/fa";
import { StringProps } from "../../types/typProp";

export default function HoverInfo({ text }: StringProps) {
  return (
    <div className="max-h-max fixed w-max z-50 py-1 px-2 top-2 left-2 bg-light text-primary text-sm rounded animate-fadeIn flex items-center gap-2">
      <FaInfoCircle />
      <div>{text}</div>
    </div>
  );
}
