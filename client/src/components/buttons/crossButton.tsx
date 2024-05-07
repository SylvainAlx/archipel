import { IoMdCloseCircle } from "react-icons/io";
import { ClickProps } from "../../types/typProp";
import Button from "./button";
import { useTranslation } from "react-i18next";

export default function CrossButton({ click }: ClickProps) {
  const { t } = useTranslation();
  return (
    <div className="cursor-pointer overflow-hidden">
      <Button
        text={t("components.buttons.delete")}
        bgColor="bg-danger"
        click={click}
        children={
          <div className="hover:animate-ping text-xl">
            <IoMdCloseCircle />
          </div>
        }
      />
    </div>
  );
}
