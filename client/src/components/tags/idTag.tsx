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
      bgColor="bg-[rgba(255,255,255,0.3)]"
      // textStyle="uppercase"
      children={<TbWorld />}
    />
  );
}
