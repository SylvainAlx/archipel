import { FaPen } from "react-icons/fa6";
import { useAtom } from "jotai";
import { editbox } from "../../../settings/store";
import { useTranslation } from "react-i18next";
import { EditBox } from "../../../types/typAtom";

export interface EditButtonProps {
  editBox?: EditBox;
  onClick?: () => void;
}

export default function EditButton({ editBox, onClick }: EditButtonProps) {
  const [, setEditBox] = useAtom(editbox);
  const { t } = useTranslation();
  const handleClick = () => {
    if (editBox) {
      setEditBox(editBox);
    } else if (onClick) {
      onClick();
    }
  };
  return (
    <button
      aria-label={t("components.buttons.edit")}
      onClick={handleClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleClick();
        }
      }}
      className="opacity-30 hover:text-secondary3 hover:opacity-100 cursor-pointer transition-all text-sm"
    >
      <FaPen />
    </button>
  );
}
