import { FaUserGroup } from "react-icons/fa6";
import Tag from "./tag";
import { customTagProps } from "../../types/typProp";
import { useTranslation } from "react-i18next";

export default function PopulationTag({ label }: customTagProps) {
  const { t } = useTranslation();
  return (
    <Tag
      text={label.toString()}
      hover={t("components.hoverInfos.tags.population")}
      bgColor="bg-info"
      children={<FaUserGroup />}
    />
  );
}
