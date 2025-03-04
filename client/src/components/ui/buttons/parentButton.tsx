import { ClickProps } from "../../../types/typProp";
import Button from "./button";
import { useTranslation } from "react-i18next";
import { IoReturnUpBackSharp } from "react-icons/io5";

export default function ParentButton({ click }: ClickProps) {
  const { t } = useTranslation();
  return (
    <Button
      text={t("components.buttons.parent")}
      click={click}
      children={
        <div className="text-xl cursor-pointer overflow-hidden">
          <IoReturnUpBackSharp />
        </div>
      }
    />
  );
}
