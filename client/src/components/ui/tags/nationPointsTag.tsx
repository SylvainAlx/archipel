import Tag from "./tag";
import { customTagProps } from "../../../types/typProp";
import { FaStar } from "react-icons/fa6";
import { useTranslation } from "react-i18next";
export default function NationPointsTag({ label }: customTagProps) {
  const { t } = useTranslation();

  return (
    <Tag
      text={label != undefined ? label.toString() : ""}
      hover={`${t("components.hoverInfos.tags.points")} : ${t("components.hoverInfos.tags.population")} x 10 + ${t("components.hoverInfos.tags.places")} + ${t("components.hoverInfos.tags.treasury")} / 10`}
      bgColor="bg-gold"
    >
      <FaStar />
    </Tag>
  );
}
