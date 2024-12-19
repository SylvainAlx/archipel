import Tag from "./tag";
import { useTranslation } from "react-i18next";
import { MdWorkspacePremium } from "react-icons/md";

export default function PioneerTag() {
  const { t } = useTranslation();
  return (
    <Tag
      text={t("components.hoverInfos.tags.pioneer")}
      hover={t("components.hoverInfos.tags.pioneer")}
      bgColor="bg-secondary2"
      children={<MdWorkspacePremium />}
    />
  );
}
