import { ClickProps } from "../../../types/typProp";
import Button from "./button";
import { useTranslation } from "react-i18next";
import { IoDiamondOutline } from "react-icons/io5";

export default function PlanButton({ click }: ClickProps) {
  const { t } = useTranslation();
  return (
    <Button
      text={t("components.buttons.plan")}
      click={click}
      children={<IoDiamondOutline />}
      bgColor="bg-gold"
      widthFull={true}
      disabled={true}
    />
  );
}
