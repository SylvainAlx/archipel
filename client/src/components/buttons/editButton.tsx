import { MouseEventHandler } from "react";
import { FaPen } from "react-icons/fa";

export interface EditButtonProps {
  click: MouseEventHandler<HTMLButtonElement | HTMLDivElement>;
}

export default function EditButton({ click }: EditButtonProps) {
  return (
    <div
      onClick={click}
      className="absolute cursor-pointer text-sm hover:text-secondary transition-all top-2 left-2"
    >
      <FaPen />
    </div>
  );
}
