import Tag from "./tag";
import { customTagProps } from "../../../types/typProp";
import { useTranslation } from "react-i18next";

export default function IdTag({ label }: customTagProps) {
  const { t } = useTranslation();

  return (
    <Tag
      text={label.toString().toUpperCase()}
      hover={t("components.hoverInfos.tags.id")}
      bgColor="bg-complementary3"
    >
      <span>@</span>
    </Tag>
  );
}
