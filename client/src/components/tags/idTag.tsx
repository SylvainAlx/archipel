import Tag from "./tag";
import { customTagProps } from "../../types/typProp";
import { TbWorld } from "react-icons/tb";
import { useTranslation } from "react-i18next";

export default function IdTag({ label }: customTagProps) {
  const { t } = useTranslation();

  return (
    <Tag
      text={label.toString().toUpperCase()}
      hover={t("components.hoverInfos.tags.id")}
      bgColor="bg-complementary3"
      // textStyle="uppercase"
      children={<TbWorld />}
    />
  );
}
