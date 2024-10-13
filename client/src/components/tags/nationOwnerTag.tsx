import { GiLaurelCrown } from "react-icons/gi";
import Tag from "./tag";
import { useTranslation } from "react-i18next";

export default function NationOwnerTag() {
  const { t } = useTranslation();

  return (
    <Tag
      text={t("components.hoverInfos.tags.nationOwner")}
      hover={t("components.hoverInfos.tags.nationOwner")}
      bgColor="bg-info"
      children={<GiLaurelCrown />}
    />
  );
}
