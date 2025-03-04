import Tag from "./tag";
import { useTranslation } from "react-i18next";
import { RiGovernmentFill } from "react-icons/ri";

interface NationStateTagProps {
  isNationState: boolean;
}

export default function NationStateTag({ isNationState }: NationStateTagProps) {
  const { t } = useTranslation();

  return (
    <Tag
      text={
        isNationState
          ? t("pages.nation.nationIdentity.nationState")
          : t("pages.nation.nationIdentity.noNationState")
      }
      hover={t("components.hoverInfos.tags.particularity")}
      bgColor="bg-info"
      children={<RiGovernmentFill />}
    />
  );
}
