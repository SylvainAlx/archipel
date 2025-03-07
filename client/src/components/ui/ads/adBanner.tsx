import { useTranslation } from "react-i18next";

export default function AdBanner() {
  const { t } = useTranslation();
  return (
    <div className="top-0 w-full h-[100px] text-3xl bg-info flex items-center justify-center">
      {t("components.ads.nation")}
    </div>
  );
}
