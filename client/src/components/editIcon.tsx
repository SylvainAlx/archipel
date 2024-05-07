import { FaPen } from "react-icons/fa6";
import { useAtom } from "jotai";
import { editbox } from "../settings/store";
import { LabelId, PoliticalSide, Regime } from "../types/typNation";

export interface EditIconProps {
  target: string;
  param: number | string | boolean | Regime[] | PoliticalSide[] | LabelId[];
  path: string;
  indice?: number;
}

export default function EditIcon({
  target,
  param,
  indice,
  path,
}: EditIconProps) {
  const [, setEditBox] = useAtom(editbox);
  const handleClick = () => {
    // console.log({ original: param, new: "", indice, path });

    setEditBox({ target: target, original: param, new: "", indice, path });
  };
  return (
    <div
      onClick={handleClick}
      className="opacity-30 hover:text-secondary hover:opacity-100 cursor-pointer transition-all text-sm"
    >
      <FaPen />
    </div>
  );
}
