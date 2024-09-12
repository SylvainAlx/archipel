import Tag from "./tag";
import { GiBlackFlag } from "react-icons/gi";

import { useTranslation } from "react-i18next";

export default function FounderTag() {
  const { t } = useTranslation();
  return (
    <Tag
      text={t("components.hoverInfos.tags.founder")}
      hover={t("components.hoverInfos.tags.founder")}
      bgColor="bg-success"
      children={<GiBlackFlag />}
    />
  );
}
