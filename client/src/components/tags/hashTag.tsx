import Tag from "./tag";
import { customTagProps } from "../../types/typProp";
import { useTranslation } from "react-i18next";

export default function HashTag({ label }: customTagProps) {
  const { t } = useTranslation();
  return (
    <Tag
      text={"#" + label.toString()}
      hover={t("components.hoverInfos.tags.hash")}
      bgColor="bg-complementary3"
    />
  );
}
