import Tag from "./tag";
import { useTranslation } from "react-i18next";
import { FaUserEdit } from "react-icons/fa";

export default function NationOwnerTag() {
  const { t } = useTranslation();

  return (
    <Tag
      text={t("components.hoverInfos.tags.nationOwner")}
      hover={t("components.hoverInfos.tags.role")}
      bgColor="bg-secondary2"
      children={<FaUserEdit />}
    />
  );
}
