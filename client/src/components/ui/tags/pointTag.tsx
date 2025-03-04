import { FaTrophy } from "react-icons/fa6";
import Tag from "./tag";
import { customTagProps } from "../../../types/typProp";
import { useTranslation } from "react-i18next";

export default function PointTag({ label }: customTagProps) {
  const { t } = useTranslation();
  return (
    <Tag
      text={label.toString()}
      hover={t("components.hoverInfos.tags.points")}
      bgColor="bg-info"
      children={<FaTrophy />}
    />
  );
}
