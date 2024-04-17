import Tag from "./tag";
import { customTagProps } from "../../types/typProp";
import { useTranslation } from "react-i18next";
import { ImTree } from "react-icons/im";

export default function TreeTag({ label }: customTagProps) {
  const { t } = useTranslation();
  return (
    <Tag
      text={label.toString()}
      hover={t("components.hoverInfos.tags.tree")}
      bgColor="bg-info"
      children={<ImTree />}
    />
  );
}
