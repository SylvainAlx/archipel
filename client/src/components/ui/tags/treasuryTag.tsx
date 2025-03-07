import Tag from "./tag";
import { customTagProps } from "../../../types/typProp";
import { useTranslation } from "react-i18next";
import { FaCoins } from "react-icons/fa";

export default function TreasuryTag({ label }: customTagProps) {
  const { t } = useTranslation();

  return (
    <Tag
      text={label != undefined ? label.toString() : ""}
      hover={t("components.hoverInfos.tags.treasury")}
      bgColor="bg-gold"
    >
      <FaCoins />
    </Tag>
  );
}
