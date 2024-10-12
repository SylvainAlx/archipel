import Tag from "./tag";
import { customTagProps } from "../../types/typProp";
import { useTranslation } from "react-i18next";
import { FaBirthdayCake } from "react-icons/fa";

export default function NationalDayTag({ label }: customTagProps) {
  const { t } = useTranslation();
  return (
    <Tag
      text={label != "" ? label.toString() : "non défini"}
      hover={t("components.hoverInfos.tags.nationalDay")}
      bgColor="bg-info"
      children={<FaBirthdayCake />}
    />
  );
}
