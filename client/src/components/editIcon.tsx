/* eslint-disable @typescript-eslint/no-explicit-any */
import { FaPen } from "react-icons/fa6";
import { useAtom } from "jotai";
import { editbox } from "../settings/store";
import { LabelId, Regime } from "../types/typNation";

export interface EditIconProps {
  target: string;
  param: number | string | boolean | Regime[] | LabelId[] | any[];
  path: string;
  indice?: number | string;
  canBeEmpty?: boolean;
  action?: (path: string, value: any) => void;
}

export default function EditIcon({
  target,
  param,
  indice,
  path,
  canBeEmpty,
  action,
}: EditIconProps) {
  const [, setEditBox] = useAtom(editbox);
  const handleClick = () => {
    setEditBox({
      target,
      original: param,
      new: "",
      indice,
      path,
      canBeEmpty: canBeEmpty != undefined ? canBeEmpty : true,
      action,
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
