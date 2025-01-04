import Tag from "./tag";
import { useTranslation } from "react-i18next";
import { RiGovernmentFill } from "react-icons/ri";

export default function NationStateTag() {
  const { t } = useTranslation();

  return (
    <Tag
      text={t("pages.nation.nationIdentity.nationState")}
      hover={t("components.hoverInfos.tags.particularity")}
      bgColor="bg-info"
      children={<RiGovernmentFill />}
    />
  );
}
