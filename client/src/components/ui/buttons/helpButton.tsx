import { MdHelp } from "react-icons/md";
import Button from "./button";
import { myStore, showHelpAtom } from "../../../settings/store";
import { useTranslation } from "react-i18next";

interface HelpButtonProps {
  showText?: boolean;
  bgColor?: string;
}

export default function HelpButton({
  showText,
  bgColor = "bg-invisible",
}: HelpButtonProps) {
  const { t } = useTranslation();
  return (
    <Button
      text={showText ? t("components.modals.helpModal.title") : ""}
      click={() => myStore.set(showHelpAtom, true)}
      bgColor={bgColor}
    >
      <MdHelp className="flex items-center gap-1 hover:text-secondary3 transition-all" />
    </Button>
  );
}
