import Tag from "./tag";
import { customTagProps } from "../../types/typProp";
import { useTranslation } from "react-i18next";
import { MdGrade } from "react-icons/md";

export default function RoleTag({ label }: customTagProps) {
  const { t } = useTranslation();
  return (
    <Tag
      text={label.toString()}
      hover={t("components.hoverInfos.tags.role")}
      bgColor="bg-info"
      children={<MdGrade />}
    />
  );
}
