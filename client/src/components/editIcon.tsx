import { FaPen } from "react-icons/fa6";
import { EditIconProps } from "../types/typProp";
import { useAtom } from "jotai";
import { editbox } from "../settings/store";

export default function EditIcon({ param, indice, path }: EditIconProps) {
  const [, setEditBox] = useAtom(editbox);
  const handleClick = () => {
    // console.log({ original: param, new: "", indice, path });

    setEditBox({ original: param, new: "", indice, path });
  };
  return (
    <div
      onClick={handleClick}
      className="absolute top-1 right-[-20px] opacity-30 hover:text-secondary hover:opacity-100 cursor-pointer transition-all text-sm"
    >
      <FaPen />
    </div>
  );
}
