import Tag from "./tag";
import { customTagProps } from "../../../types/typProp";
import { BsCurrencyExchange } from "react-icons/bs";
import { useTranslation } from "react-i18next";

export default function CurrencyTag({ label }: customTagProps) {
  const { t } = useTranslation();
  return (
    <Tag
      text={label != "" ? label.toString() : "non définie"}
      hover={t("components.hoverInfos.tags.currency")}
      bgColor="bg-info"
      children={<BsCurrencyExchange />}
    />
  );
}
