import { IoMdEye } from "react-icons/io";
import { ClickProps } from "../../types/typProp";
import Button from "./button";
import { useTranslation } from "react-i18next";

export default function EyeButton({ click }: ClickProps) {
  const { t } = useTranslation();
  return (
    <div className="cursor-pointer overflow-hidden">
      <Button
        text={t("components.buttons.access")}
        path=""
        click={click}
        children={
          <div className="hover:animate-ping text-xl">
            <IoMdEye />
          </div>
        }
      />
    </div>
  );
}