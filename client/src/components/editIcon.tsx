/* eslint-disable @typescript-eslint/no-explicit-any */
import { FaPen } from "react-icons/fa6";
import { useAtom } from "jotai";
import { editbox } from "../settings/store";
import { LabelId, PoliticalSide, Regime } from "../types/typNation";

export interface EditIconProps {
  target: string;
  param:
    | number
    | string
    | boolean
    | Regime[]
    | PoliticalSide[]
    | LabelId[]
    | any[];
  path: string;
  indice?: number;
  canBeEmpty?: boolean;
}

export default function EditIcon({
  target,
  param,
  indice,
  path,
  canBeEmpty,
}: EditIconProps) {
  const [, setEditBox] = useAtom(editbox);
  const handleClick = () => {
    // console.log({ original: param, new: "", indice, path });

    setEditBox({
      target,
      original: param,
      new: "",
      indice,
      path,
      canBeEmpty: canBeEmpty != undefined ? canBeEmpty : true,
    });
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
