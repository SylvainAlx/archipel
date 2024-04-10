import { ClickProps } from "../../types/typProp";
import Button from "./button";
import { useTranslation } from "react-i18next";
import { IoReturnUpBackSharp } from "react-icons/io5";

export default function ParentButton({ click }: ClickProps) {
  const { t } = useTranslation();
  return (
    <div className="cursor-pointer overflow-hidden">
      <Button
        text={t("components.buttons.back")}
        path=""
        click={click}
        children={
          <div className="hover:animate-ping text-xl">
            <IoReturnUpBackSharp />
          </div>
        }
      />
    </div>
  );
}
