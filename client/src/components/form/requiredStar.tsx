import { useTranslation } from "react-i18next";

export default function RequiredStar() {
  const { t } = useTranslation();
  return <span className="text-sm">{t("components.requiredStar")}</span>;
}
