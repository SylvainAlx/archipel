import Tag from "./tag";
import { useTranslation } from "react-i18next";
import { MdWorkspacePremium } from "react-icons/md";

export default function HonorTag({ honor }: { honor: string }) {
  const { t } = useTranslation();
  return (
    <Tag
      text={t(`components.hoverInfos.tags.${honor}`)}
      hover={t("components.hoverInfos.tags.honor")}
      bgColor="bg-secondary2"
    >
      <MdWorkspacePremium />
    </Tag>
  );
}
